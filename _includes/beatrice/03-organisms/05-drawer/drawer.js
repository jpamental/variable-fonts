import {MDCDrawer} from "@material/drawer";
if (document.querySelector('.mdc-drawer')) {
  const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
}
import {MDCTopAppBar} from "@material/top-app-bar";
if (document.querySelector('.mdc-drawer')) {
  const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
  topAppBar.setScrollTarget(document.getElementById('main-content'));
  topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
  });
}
