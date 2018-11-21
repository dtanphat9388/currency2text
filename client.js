const convert = require('./index');

const result = document.querySelector(".result");

const input = document.querySelector('.input')
const value = document.querySelector('.value')

value.oninput = function(e) {
  this.value !== 0
    ? input.classList.remove("empty")
    : input.classList.add("empty")
  
  let rawValue = this.value.replace(/,/g, "")
  
  if (rawValue.length > 18) {
    rawValue = rawValue.slice(0, 18)
  }

  result.textContent = convert(rawValue);

  if (rawValue.length > 3) {
    return this.value = formated(rawValue)
  }
}

value.onkeypress = function(evt) {
  if (evt.key === "Enter") evt.preventDefault();
}

function formated(rawValue) {
  const separator = rawValue.replace(/(\d{3})+$/g, ',$&');
  let [left, right] = separator.split(',');
  right = right.match(/\d{3}/g)
  if (rawValue.length % 3 === 0 && right.length > 1) {
    return _.join(right, ',')
  }
  return `${left},${_.join(right, ",")}`
}