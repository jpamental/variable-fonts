import { MDCSlider } from "@material/slider";

let getProperty = function(axis) {
  return;
};

let initHero = function(heroEls) {
  for (let i = 0; i < heroEls.length; i++) {
    let heroEl = heroEls[i];
    let heroElButtons = heroEl.children[0].children;
    let heroElStyle = heroEl.children[1];
    let heroElControlLabels = heroEl.children[2].children;
    let heroAnimationEl = heroEl.children[3];

    let handleClick = function(e) {
      e.preventDefault();
      let axisName = this.axis;
      let slider = this.slider;
      let button = e.target;

      let attrName = "data-" + axisName + "-active";
      let attrValue = heroEl.getAttribute(attrName) === "false" ? false : true;
      let isActive = !attrValue;

      if (heroEl) {
        heroEl.setAttribute(attrName, isActive);
        let heroElStyle = heroEl.children[1];
        // let style = createAnimationCss(["wght"]);
        // console.log("style", style);
        // heroElStyle.innerHTML = style;
        // console.log("heroElStyle", heroElStyle);
        console.log("active", isActive);
        if (!isActive) {
          heroAnimationEl.style.setProperty(
            `--text-vf-${axisName}-min`,
            slider.min
          );
          heroAnimationEl.style.setProperty(
            `--text-vf-${axisName}-max`,
            slider.min
          );
        } else {
          heroAnimationEl.style.removeProperty(`--text-vf-${axisName}-min`, 0);
          heroAnimationEl.style.removeProperty(`--text-vf-${axisName}-max`, 0);
        }
      }
      if (button) {
        button.setAttribute("data-active", isActive);
        button.innerHTML = isActive ? "On" : "Off";
      }
    };

    for (let j = 0; j < heroElControlLabels.length; j++) {
      let slider = heroElControlLabels[j].children[1];
      let button = heroElButtons[j];
      let axis = button.getAttribute("data-axis");

      let mdcSlider = new MDCSlider(slider);
      let property = `--text-vf-${axis}-min`;

      mdcSlider.listen("MDCSlider:input", e => {
        return heroAnimationEl.style.setProperty(property, mdcSlider.value);
      });

      button.addEventListener(
        "click",
        handleClick.bind({
          axis: axis,
          slider: mdcSlider
        })
      );
    }
  }
};

let heroEls = document.querySelectorAll(".js-hero");
initHero(heroEls);
