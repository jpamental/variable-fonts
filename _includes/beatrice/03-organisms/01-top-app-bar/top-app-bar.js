import { MDCTopAppBar } from "@material/top-app-bar";

// Instantiation
const topAppBarElement = document.querySelector(".mdc-top-app-bar");
const topAppBar = new MDCTopAppBar(topAppBarElement);

const target = document.querySelector(".split-header");
const className = "mdc-top-app-bar--blur";

if (!!window.IntersectionObserver && target) {
  let observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio !== 1 && topAppBarElement.classList) {
          topAppBarElement.classList.toggle(className);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(target);
}
