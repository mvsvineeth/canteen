const form = document.getElementById("form_1");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  check();
});
function check() {
  let x = document.getElementById("username").value;
  let y = document.getElementById("pwd").value;
  if (x == "admin" && y == "1234") {
    form.reset();
    window.location.replace("adminportal.html");
  } else {
    alert("incorrect password or username");
  }
}

const inputs = document.querySelectorAll(".input");

function addcl() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function remcl() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", addcl);
  input.addEventListener("blur", remcl);
});
