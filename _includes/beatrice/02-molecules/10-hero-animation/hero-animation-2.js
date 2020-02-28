import { MDCSlider } from "@material/slider";

let initHero = function(heroEls) {
  for (let i = 0; i < heroEls.length; i++) {
    let heroEl = heroEls[i];
    let heroElButtons = heroEl.children[0].children;
    let heroMain = heroEl.children[1];
    let heroAnimationEl = heroMain.children[0];
    let heroElControlLabels = heroMain.children[1].children;
    let heroPlayPauseButton = heroAnimationEl.children[1];

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
      console.log("has class", heroEl.classList.contains("hero--paused"));
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
        button.innerHTML = `${label} On`;

        button.classList.add("hero-button--active");
        button.classList.add("mdc-button--raised");
        
        playStatePlaying()
      }
    };

    let resetAxes = function(axisToSkip) {
      for (let k = 0; k < heroElButtons.length; k++) {
        let button = heroElButtons[k];
        let slider = heroElControlLabels[k].children[1];
        let axisName = button.getAttribute("data-axis");

        if (typeof axisToSkip === "undefined" || axisToSkip !== axisName) {
          console.log("reset", axisName);
          let label = button.getAttribute("data-label");

          // Update label
          button.innerHTML = `${label} Off`;

          // Set both axes to the min value
          let propertyPrefix = `--text-vf-${axisName}`;
          let valueNow = parseFloat(slider.getAttribute("aria-valuenow"), 10);
          console.log('set value now', slider)
          heroAnimationEl.style.setProperty(`${propertyPrefix}-min`, valueNow);
          heroAnimationEl.style.setProperty(`${propertyPrefix}-max`, valueNow);

          button.classList.remove("hero-button--active");
          button.classList.remove("mdc-button--raised");

          // Update the state in the parent data attributes
          setActive(axisName, false);
        }
      }
    };
    
    let removeCustomProperties = function () {
      for (let k = 0; k < heroElButtons.length; k++) {
        let button = heroElButtons[k];
        let axisName = button.getAttribute('data-axis')
        let propertyPrefix = `--text-vf-${axisName}`;
        heroAnimationEl.style.removeProperty(`${propertyPrefix}-min`);
        heroAnimationEl.style.removeProperty(`${propertyPrefix}-max`);
      }
    }

    document.addEventListener("DOMContentLoaded", playStateToggle, false);
    heroPlayPauseButton.addEventListener("click", playStateToggle);

    for (let j = 0; j < heroElControlLabels.length; j++) {
      let slider = heroElControlLabels[j].children[1];
      let button = heroElButtons[j];
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

      button.innerHTML = `${buttonLabel} ${isActiveInitially ? "On" : "Off"}`;

      button.addEventListener(
        "click",
        handleClick.bind({
          axis: axisName,
          slider: mdcSlider
        })
      );
    }
  }
};

let heroEls = document.querySelectorAll(".js-hero");
initHero(heroEls);
