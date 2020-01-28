import {MDCSlider} from '@material/slider';

//const slider = new MDCSlider(document.querySelector('.mdc-slider'));
//slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));


var sliders = [].slice.call(document.querySelectorAll('.mdc-slider'));

sliders.forEach(function (slider) {
  const thisSlider = new MDCSlider(slider);

  thisSlider.listen('MDCSlider:input', () => document.querySelector(':root').style.setProperty(`--${slider.id}`, thisSlider.value));
  thisSlider.listen('MDCSlider:input', () => document.getElementById(slider.id).parentElement.querySelector('.current-value').textContent=thisSlider.value.toFixed(2) );

});
