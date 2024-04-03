let li;
const ul = document.querySelector("ul");
const resetButton = document.querySelector(".resetButton");
const inputTask = document.querySelector(".inputTask");
let taskList = [];

// Fonction qui ajoute une tâche.
function addTaskToLocalStorage(task) {
  try {
    taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    if (!Array.isArray(taskList)) {
      taskList = [];
    } else {
      taskList.push(task);
      localStorage.setItem("taskList", JSON.stringify(taskList));
      getTasks();
    }
  } catch (e) {
    console.log(e);
  }
}

// Récupère les données du formulaire et execute la fonction d'ajout de tâche.
document.querySelector("form").onsubmit = function (e) {
  e.preventDefault();

  let task = document.querySelector(".form").elements["task"].value;
  addTaskToLocalStorage(task);
  this.reset();
};

function getTasks() {
  ul.textContent = "";
  taskList = JSON.parse(localStorage.getItem("taskList"));
  taskList.forEach((task) => {
    addTaskToDom(task);
  });
}

function addTaskToDom(task) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.textContent = "X";
  button.className = "deleteButton";
  li.textContent = task;
  li.className = "listLi";
  li.append(button);
  ul.appendChild(li);
}

function handleResetButton() {
  localStorage.removeItem("taskList");
}

getTasks();
resetButton.addEventListener("click", () => {
  handleResetButton();
  getTasks();
});
