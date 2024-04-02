const ul = document.querySelector("ul");
const li = document.createElement("li");
const inputTask = document.querySelector(".task");
let task = null;

const listeTache = [];

function addTask(task) {
  li.textContent = task;
  ul.append(li);
  console.log(task);
}

function getTasks() {
  const taskList = localStorage.getItem("listeTache");
}

document.querySelector("form").onsubmit = function (e) {
  e.preventDefault();

  task = document.querySelector(".form").elements["task"].value;
  addTask(task);
  this.reset();
};
