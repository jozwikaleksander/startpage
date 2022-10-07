// If color is given in HEX format, convert it to RGB
const hexToRgb = (hex) => {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16)] : null;
  }
// Decide which color to use
const colorTweaking = (color) => {
    // if (red*0.299 + green*0.587 + blue*0.114) > 186 use #000000 else use #ffffff
    if(color[0]*0.299 + color[1]*0.587 + color[2]*0.114 > 186){
        return 'light';
    } else{
        return 'dark';
    }
}
const updateInput = (input) => {
    let color = hexToRgb(input.value);
    let tagClasses = [...input.classList];

    if(tagClasses.includes('light')){
        if(colorTweaking(color) == 'dark'){
            input.classList.remove('light');
            input.classList.add('dark');
        }
    } else if(tagClasses.includes('dark')){
        if(colorTweaking(color) == 'light'){
            input.classList.remove('dark');
            input.classList.add('light');
        }
    } else {
        input.classList.add(colorTweaking(color));
    }
}
// onChange event for color inputs
const colorInputs = document.querySelectorAll('input[type="color"]');
[...colorInputs].map(input => {
    input.addEventListener('change',(e) => {
        updateInput(e.target);
    });
});