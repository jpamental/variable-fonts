
const labels = {
  on: "Playing",
  off: "",
  onInitial: "Playing",
  offInitial: ""
}

let initHero = function(heroEls) {
  for (let i = 0; i < heroEls.length; i++) {
    let clicked = false
    
    let createLetterDelay  = function (el, amount) {
      if (!el) {
        return
      }
      amount = amount || 0.25
      
      let str = el.innerHTML;
      let chars = str.split('');
      el.setAttribute('aria-label', str);
      el.innerHTML = '';
      
      chars.forEach(function (item, index) {
        var c = document.createElement('span');
        // and give it some content 
        var letter = document.createTextNode(item); 
        // add the text node to the newly created div
        c.appendChild(letter);  
        // add the newly created element and its content into the DOM 
        el.append(c);
      
        // Add aria-hidden to each character if the aria-label has been applied to the parent
        if (c.parentElement.getAttribute('aria-label')) {
          c.setAttribute('aria-hidden', true);
        }
      
        // Add a staggered animation delay to each span
        c.style.setProperty('animation-delay', (index * amount) + 's');
      });
    }
    
    let removeLetterDelay = function(el, amount) {
      if (!el || !el.children || !el.children.length) {
        return
      }
      for(let k = 0; k < el.children.length; k++) {
        let c = el.children[k]
        c.style.removeProperty('animation-delay')
      }
    }

    let getActiveAttrName = function(axisName) {
      return `data-${axisName}-active`;
    };

    let getActive = function(axisName) {
      let attrName = getActiveAttrName(axisName);
      let attrValue = heroEl.getAttribute(attrName) === "false" ? false : true;
      return attrValue;
    };

    let setActive = function(axisName, isActive) {
      let attrName = getActiveAttrName(axisName);
      heroEl.setAttribute(attrName, isActive);
    };

    let handleClick = function(e) {
      e.preventDefault();
      let axisName = this.axis;
      let button = e.target;

      setActive(axisName, true);

      resetAxes(axisName);

      if (button) {
        let label = button.getAttribute("data-label");
        button.innerHTML = `${label} ${labels.on}`;

        button.classList.add("hero-button--active");


        if (!clicked) {
          removeLetterDelay(heroAnimationText, 0)
          clicked = true
        }
      }
    };

    let resetAxes = function(axisToSkip) {
      for (let k = 0; k < heroElButtons.length; k++) {
        let button = heroElButtons[k].children[0];
        let axisName = button.getAttribute("data-axis");

        if (typeof axisToSkip === "undefined" || axisToSkip !== axisName) {
          let label = button.getAttribute("data-label");

          // Update label
          button.innerHTML = `${label} ${labels.off}`;

          button.classList.remove("hero-button--active");

          // Update the state in the parent data attributes
          setActive(axisName, false);
        }
      }
    };

    let initHeroAnimation = function () {
      createLetterDelay(heroAnimationText)

      for (let j = 0; j < heroElControlLabels.length; j++) {
        let button = heroElButtons[j].children[0];
        let buttonLabel = button.getAttribute("data-label");
        let axisName = button.getAttribute("data-axis");
        let isActiveInitially = getActive(axisName);

        button.innerHTML = `${buttonLabel} ${isActiveInitially ? labels.onInitial : labels.offInitial}`;

        button.addEventListener(
          "click",
          handleClick.bind({
            axis: axisName,
          })
        );
      }
    }

    document.addEventListener("DOMContentLoaded", initHeroAnimation, false);
  }
};

let heroEls = document.querySelectorAll(".js-hero");
initHero(heroEls);
