// Text from the hero animation element ('Typography Revolution')
const heroElement = document.querySelector('.hero-animation__text');
const str = heroElement.innerHTML;

const words = str.split(' ');
const chars = str.split('');

heroElement.innerHTML = '';
heroElement.setAttribute('aria-label', str);

chars.forEach(function (item, index) {
  //console.log(item, index);
  var c = document.createElement('span');
  // and give it some content 
  var letter = document.createTextNode(item); 
  // add the text node to the newly created div
  c.appendChild(letter);  
  // add the newly created element and its content into the DOM 
  heroElement.append(c);

  if (c.parentElement.getAttribute('aria-label')) {
    c.setAttribute('aria-hidden', true);
  }

  c.style.setProperty('animation-delay',(index * 0.25) + 's');
});

var container = document.getElementById('hero_animation');
var controls = document.getElementById('play-pause');

controls.addEventListener('click', function(evt) {
  var input=evt.target;
  switch (input.name) {
    case "play-pause":
      var opposite = input.classList.contains('play');

if (opposite) {
  container.classList.remove('play');
  container.classList.add('pause');
  controls.classList.remove('play');
  controls.classList.add('pause');
}         else {
  container.classList.add('play');
  container.classList.remove('pause');
  controls.classList.add('play');
  controls.classList.remove('pause');
  var delayInMilliseconds = 15000; 
  
  setTimeout(function() {
      container.classList.remove('play');
      container.classList.add('pause');
      controls.classList.remove('play');
      controls.classList.add('pause');
  }, delayInMilliseconds);
}
      break;

      }
});

