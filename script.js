let date = document.querySelector(".date");
let todayDate = new Date();
date.innerText += todayDate.toLocaleDateString("en-GB");

let save = document.querySelector(".save");
let input = document.querySelector("input");
let ol = document.querySelector("ol");

let todos = [];
let keyCounter = 0;

window.addEventListener("DOMContentLoaded", () => {
  const oldtodos = localStorage.getItem("todos");
  if (oldtodos) {
    todos = JSON.parse(oldtodos);
    keyCounter = todos.length;
    todos.map((todo) => {
      let li = document.createElement("li");
      let btn1 = document.createElement("button");
      let btn2 = document.createElement("button");
      btn1.innerHTML = "&#x2714;";
      btn2.innerHTML = "&#x2716;";
      btn1.setAttribute("class", "right");
      btn2.setAttribute("class", "cross");
      if (todo.completed) {
        li.classList.toggle('green')
      }
      li.innerText = todo.task;
      li.todoKey = todo.key;
      li.appendChild(btn2);
      li.appendChild(btn1);
      ol.appendChild(li);
    });
  }
});

save.addEventListener("click", function (event) {
  if (input.value.length > 0) {
    let li = document.createElement("li");
    let btn1 = document.createElement("button");
    let btn2 = document.createElement("button");
    btn1.innerHTML = "&#x2714;";
    btn2.innerHTML = "&#x2716;";
    btn1.setAttribute("class", "right");
    btn2.setAttribute("class", "cross");
    li.innerText = input.value;
    keyCounter += 1;
    todos.push({
      key: keyCounter,
      task: input.value,
      completed: false,
    });
    li.todoKey = keyCounter;
    localStorage.setItem("todos", JSON.stringify(todos));

    li.appendChild(btn2);
    li.appendChild(btn1);
    ol.appendChild(li);
    input.value = "";
  } else {
    input.placeholder = "please fill the text.";
  }
});

ol.addEventListener("click", function (event) {
  let tclass = event.target.getAttribute("class");
  if (tclass == "right") {
    event.target.parentNode.classList.toggle("green");
    const todoKey = event.target.parentNode.todoKey;
    const todoIndex = todos.findIndex((todo) => todo.key == todoKey);
    todos[todoIndex].completed = !todos[todoIndex].completed;
    localStorage.setItem("todos", JSON.stringify(todos));
  } else if (tclass == "cross") {
    event.target.parentNode.remove();
    const todoKey = event.target.parentNode.todoKey;
    const todoIndex = todos.findIndex((todo) => todo.key == todoKey);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});
