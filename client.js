const convert = require('./index');

const result = document.querySelector(".result");

const input = document.querySelector('.input')
const value = document.querySelector('.value')

value.oninput = function() {
  if (isNaN(this.textContent)) {
    return alert("chỉ được nhập số! ")
  }

  this.textContent !== "" ? input.classList.remove("empty")
                          : input.classList.add("empty")

  result.textContent = convert(this.textContent);
}

value.onkeypress = function(evt) {
  if (evt.key === "Enter") evt.preventDefault();
}