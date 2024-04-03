const ul = document.querySelector("ul");
const li = document.createElement("li");
const resetButton = document.querySelector(".resetButton");
const inputTask = document.querySelector(".task");
let task = null;
let taskList = [];

function addTaskToLocalStorage(task) {
  taskList.push(task);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  li.textContent = task;
  ul.append(li);
}

function getTasks() {
  taskList = JSON.parse(localStorage.getItem("taskList"));
  taskList.forEach((task) => {
    li.textContent = task;
    ul.append(li);
  });
}

function handleResetButton() {
  localStorage.clear();
}

document.querySelector("form").onsubmit = function (e) {
  e.preventDefault();

  task = document.querySelector(".form").elements["task"].value;
  addTaskToLocalStorage(task);
  this.reset();
};

resetButton.addEventListener("click", handleResetButton);
