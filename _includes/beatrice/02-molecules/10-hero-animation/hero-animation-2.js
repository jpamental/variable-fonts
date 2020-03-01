import { MDCSlider } from "@material/slider";

const labels = {
  on: "Playing",
  off: "",
  onInitial: "Playing",
  offInitial: ""
}

let initHero = function(heroEls) {
  for (let i = 0; i < heroEls.length; i++) {
    let heroEl = heroEls[i];
    let heroElButtons = heroEl.children[0].children[1].children;
    let heroMain = heroEl.children[1];
    let heroAnimationEl = heroMain.children[0];
    let heroAnimationText = heroAnimationEl.children[1].children[0];
    let heroElControlLabels = heroMain.children[1].children;
    let heroPlayPauseButton = heroAnimationEl.children[1];
    let clicked = false
    
    let createLetterDelay  = function (el, amount) {
      if (!el) {
        return
      }
      amount = amount || 0.25
      
      let str = el.innerHTML;
      let words = str.split(' ');
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

    let playStatePlaying = function () {
      heroEl.classList.remove("hero--paused");
      heroEl.classList.add("hero--playing");
    }

    let playStatePause = function () {
      heroEl.classList.remove("hero--playing");
      heroEl.classList.add("hero--paused");
      // removeCustomProperties()
    }

    let playStateToggle = function() {
      if (heroEl.classList.contains("hero--paused")) {
        playStatePlaying()
      } else {
        playStatePause()
      }
    };

    let handleSliderInput = function(e) {
      let axis = this.axis;
      let propertyPrefix = `--text-vf-${axis}`;
      playStatePause()
      heroAnimationEl.style.setProperty(`${propertyPrefix}-min`, e.detail.value);
      heroAnimationEl.style.setProperty(`${propertyPrefix}-max`, e.detail.value);
    };

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
      let slider = this.slider;
      let button = e.target;
      let isActive = true;

      setActive(axisName, true);

      let propertyPrefix = `--text-vf-${axisName}`;
      heroAnimationEl.style.setProperty(`${propertyPrefix}-min`, slider.min);
      heroAnimationEl.style.setProperty(`${propertyPrefix}-max`, slider.max);

      resetAxes(axisName);

      if (button) {
        let label = button.getAttribute("data-label");
        button.innerHTML = `${label} ${labels.on}`;

        button.classList.add("hero-button--active");

        playStatePlaying()

        if (!clicked) {
          removeLetterDelay(heroAnimationText, 0)
          clicked = true
        }
      }
    };

    let resetAxes = function(axisToSkip) {
      for (let k = 0; k < heroElButtons.length; k++) {
        let button = heroElButtons[k].children[0];
        let slider = heroElControlLabels[k].children[1];
        let axisName = button.getAttribute("data-axis");

        if (typeof axisToSkip === "undefined" || axisToSkip !== axisName) {
          let label = button.getAttribute("data-label");

          // Update label
          button.innerHTML = `${label} ${labels.off}`;

          // Set both axes to the min value
          let propertyPrefix = `--text-vf-${axisName}`;
          let valueNow = parseFloat(slider.getAttribute("aria-valuenow"), 10);
          heroAnimationEl.style.setProperty(`${propertyPrefix}-min`, valueNow);
          heroAnimationEl.style.setProperty(`${propertyPrefix}-max`, valueNow);

          button.classList.remove("hero-button--active");

          // Update the state in the parent data attributes
          setActive(axisName, false);
        }
      }
    };
    
    let removeCustomProperties = function () {
      for (let k = 0; k < heroElButtons.length; k++) {
        let button = heroElButtons[k].children[0];
        let axisName = button.getAttribute('data-axis')
        let propertyPrefix = `--text-vf-${axisName}`;
        heroAnimationEl.style.removeProperty(`${propertyPrefix}-min`);
        heroAnimationEl.style.removeProperty(`${propertyPrefix}-max`);
      }
    }

    let initHeroAnimation = function () {
      playStateToggle()
      createLetterDelay(heroAnimationText)
      heroPlayPauseButton.addEventListener("click", playStateToggle);

      for (let j = 0; j < heroElControlLabels.length; j++) {
        let slider = heroElControlLabels[j].children[1];
        let button = heroElButtons[j].children[0];
        let buttonLabel = button.getAttribute("data-label");
        let axisName = button.getAttribute("data-axis");
        let isActiveInitially = getActive(axisName);

        let mdcSlider = new MDCSlider(slider);

        mdcSlider.listen(
          "MDCSlider:input",
          handleSliderInput.bind({
            axis: axisName
          })
        );

        button.innerHTML = `${buttonLabel} ${isActiveInitially ? labels.onInitial : labels.offInitial}`;

        button.addEventListener(
          "click",
          handleClick.bind({
            axis: axisName,
            slider: mdcSlider
          })
        );
      }
    }

    document.addEventListener("DOMContentLoaded", initHeroAnimation, false);
  }
};

let heroEls = document.querySelectorAll(".js-hero");
initHero(heroEls);
