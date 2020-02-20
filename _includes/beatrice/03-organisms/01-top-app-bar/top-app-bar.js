import { MDCTopAppBar } from "@material/top-app-bar";

// Instantiation
const topAppBarElement = document.querySelector(".mdc-top-app-bar");
const topAppBar = new MDCTopAppBar(topAppBarElement);

const target = document.querySelector(".split-header ");
const className = "mdc-top-app-bar--blur";

if (!!window.IntersectionObserver && target) {
  let observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        console.log("ratio", entry);
        if (topAppBarElement.classList && entry.isIntersecting) {
          topAppBarElement.classList.add(className);
        } else {
          console.log('is not intersecting', entry)
          topAppBarElement.classList.remove(className);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(target);
}
