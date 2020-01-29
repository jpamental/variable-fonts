import {MDCSlider} from '@material/slider';

//const slider = new MDCSlider(document.querySelector('.mdc-slider'));
//slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));


var sliders = [].slice.call(document.querySelectorAll('.mdc-slider'));

sliders.forEach(function (slider) {
  const thisSlider = new MDCSlider(slider);

  thisSlider.listen('MDCSlider:input', () => document.querySelector(':root').style.setProperty(`--${slider.id}`, thisSlider.value));
  if (thisSlider.value < 1) {
    thisSlider.listen('MDCSlider:input', () => document.getElementById(slider.id).parentElement.querySelector('.value-current').value=thisSlider.value.toFixed(2) );
  } else {
    thisSlider.listen('MDCSlider:input', () => document.getElementById(slider.id).parentElement.querySelector('.value-current').value=thisSlider.value );
  }

});
