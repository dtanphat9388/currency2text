const convert = require('./index');

const result = document.getElementById("result");

const input = document.querySelector('input');
input.oninput = function(evt) {
  result.textContent = convert(+this.value);
}