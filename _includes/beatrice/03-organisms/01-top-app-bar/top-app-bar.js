import { MDCTopAppBar } from "@material/top-app-bar";

// Instantiation
const topAppBarElement = document.querySelector(".mdc-top-app-bar");
const topAppBar = new MDCTopAppBar(topAppBarElement);

const target = document.querySelector(".js-top-app-bar--blur");
const className = "mdc-top-app-bar--blur";

if (!!window.IntersectionObserver && target) {
  let observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (topAppBarElement.classList && entry.isIntersecting) {
          topAppBarElement.classList.add(className);
        } else {
          topAppBarElement.classList.remove(className);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(target);
}
