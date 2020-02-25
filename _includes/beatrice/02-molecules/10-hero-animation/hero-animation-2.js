let initHero = function(heroEls) {
  let handleClick = function(e) {
    e.preventDefault();
    let axisName = this.axis;
    let heroElIndex = this.heroElIndex || 0;
    let button = e.target;
    let heroEl = heroEls[heroElIndex];

    let attrName = "data-" + axisName + "-active";
    let attrValue =
      heroEls[heroElIndex].getAttribute(attrName) === "false" ? false : true;
    let result = !attrValue;

    if (heroEl) {
      heroEl.setAttribute(attrName, result);
      let heroElStyle = heroEl.children[1];
      // let style = createAnimationCss(["wght"]);
      // console.log("style", style);
      // heroElStyle.innerHTML = style;
      // console.log("heroElStyle", heroElStyle);
      if (!result) {
        document.querySelector('.hero-animation').style.setProperty(`--text-vf-${{ axisName }}-min`, 0);
        document.querySelector('.hero-animation').style.setProperty(`--text-vf-${{ axisName }}-min`, 0);
      } else {
        document.querySelector('.hero-animation').style.removeProperty(`--text-vf-${{ axisName }}-min`);
        document.querySelector('.hero-animation').style.removeProperty(`--text-vf-${{ axisName }}-max`);
      }
    }
    if (button) {
      button.setAttribute("data-active", result);
      button.innerHTML = result ? "On" : "Off";
    }
  };

  // let createAnimationCss = function(heroAxes) {
  //   let keyframes = [{ name: "min", value: 0 }, { name: "max", value: 100 }];
  //   let style = `
  //   @keyframes breath {
  //     ${keyframes
  //       .map(function(obj) {
  //         return `${obj.value}% {
  //         font-weight: var(--text-vf-wght-${obj.name});
  //         font-variation-settings:
  //           ${heroAxes
  //             .map(function(axisName) {
  //               return `'${axisName}' var(--text-vf-${axisName}-${obj.name})`;
  //             })
  //             .join(", ")};
  //       }`;
  //       })
  //       .join("\n\n")}
  //   }
  //   `;
  // 
  //   return style;
  // };

  for (let i = 0; i < heroEls.length; i++) {
    let heroEl = heroEls[i];
    let heroElButtons = heroEl.children[0].children;
    let heroElStyle = heroEl.children[1];
    let heroAxes = [];

    for (let j = 0; j < heroElButtons.length; j++) {
      let button = heroElButtons[j];
      // console.log('button', button)
      let axis = button.getAttribute("data-axis");
      heroAxes.push(axis);
      let active = button.addEventListener(
        "click",
        handleClick.bind({
          axis: axis,
          heroElIndex: i
        })
      );
    }

    // let style = createAnimationCss(heroAxes);
    // heroElStyle.innerHTML = style;
    // console.log(style);
  }
};

let heroEls = document.querySelectorAll(".js-hero");
initHero(heroEls);
