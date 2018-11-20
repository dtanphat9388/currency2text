const convert = require('./index');

const result = document.querySelector(".result");

const input = document.querySelector('.input')
const value = document.querySelector('.value')

value.oninput = function(e) {
  this.value !== 0 ? input.classList.remove("empty")
  : input.classList.add("empty")
  
  let rawValue = this.value.replace(/,/g, "")
  
  if (rawValue.length > 18) {
    rawValue = rawValue.slice(0, 18)
  }
                    
  result.textContent = convert(rawValue);

  const thousand = (+rawValue).toLocaleString('vn')
  this.value = thousand
}

value.onkeypress = function(evt) {
  if (evt.key === "Enter") evt.preventDefault();
}