const convert = require('./index');

const result = document.querySelector(".result");

const input = document.querySelector('.input')
const value = document.querySelector('.value')
console.log(input)
value.oninput = function(evt) {
  if (isNaN(this.textContent)) {
    return alert("chỉ được nhập số! ")
  }

  this.textContent !== "" ? input.classList.remove("empty")
                          : input.classList.add("empty")

  result.textContent = convert(+this.textContent);
}