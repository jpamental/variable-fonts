// Text from the hero animation element ('Typography Revolution')
const heroElement = document.querySelector('.hero-animation__text');
const str = heroElement.innerHTML;

const words = str.split(' ');
const chars = str.split('');

// Remove the existing text so it can be replaced by the characters in spans
heroElement.innerHTML = '';
// Set up an aria-label so screen readers will still read out the whole string
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

  // Add aria-hidden to each character if the aria-label has been applied to the parent
  if (c.parentElement.getAttribute('aria-label')) {
    c.setAttribute('aria-hidden', true);
  }

  // Add a staggered animation delay to each span
  c.style.setProperty('animation-delay',(index * 0.25) + 's');
});

var container = document.getElementById('hero_animation');
var controls = document.getElementById('play_pause');

document.addEventListener('DOMContentLoaded', toggleEvent, false);
controls.addEventListener('click', toggleEvent, false);

function toggleEvent() {
  var opposite = controls.classList.contains('play');

  if (opposite) {
    container.classList.remove('play');
    container.classList.add('pause');
    controls.classList.remove('play');
    controls.classList.add('pause');
  } else {
    document.querySelector('.hero-animation').style.setProperty(`--text-vf-wght`, 150);
    document.querySelector('.hero-animation').style.setProperty(`--text-vf-CASL`, 0);
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
};

var inputs = [].slice.call(document.querySelectorAll('.hero-animation .controls input'));

// listen for changes
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));


function handleUpdate(e) {
  document.querySelector('.hero-animation').style.setProperty(`--${this.id}`, this.value);
}
