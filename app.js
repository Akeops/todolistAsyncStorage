let li;
const taskUl = document.querySelector(".taskUl");
const divArchive = document.querySelector(".archiveList");
let archiveUl = document.querySelector(".archiveList");
const resetButton = document.querySelector(".resetButton");
//const inputTask = document.querySelector(".inputTask");
let taskList = [];
let archiveList = [];

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

function addTaskToArchiveLocalStorage(task) {
  try {
    archiveList = JSON.parse(localStorage.getItem("archiveList")) || [];
    if (!Array.isArray(taskList)) {
      archiveList = [];
    } else {
      archiveList.push(task);
      localStorage.setItem("archiveList", JSON.stringify(archiveList));
      getArchivesTasks();
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
  taskUl.textContent = "";
  taskList = JSON.parse(localStorage.getItem("taskList"));

  taskList.forEach((task, index) => {
    addTaskToDom(task, index);
  });
}

function getArchivesTasks() {
  archiveUl.textContent = "";
  const button = document.createElement("button");
  archiveList = JSON.parse(localStorage.getItem("archiveList"));

  button.className = "deleteButton";
  button.textContent = "Reset";

  archiveList.forEach((task, index) => {
    addTaskToArchiveDom(task, index);
  });
  divArchive.append(button);

  button.addEventListener("click", () => {
    handleResetArchiveList();
    getArchivesTasks();
  });
}

function addTaskToArchiveDom(task, index) {
  const archiveLi = document.createElement("li");
  const span = document.createElement("span");

  span.textContent = index;
  archiveLi.className = "archiveLi";
  console.log(task);

  archiveLi.append(span);
  archiveLi.append("  " + task);
  archiveUl.appendChild(archiveLi);
}

function addTaskToDom(task, index) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  const span = document.createElement("span");

  span.textContent = index;
  button.className = "deleteButton";
  button.textContent = "X";
  li.className = "listLi";

  li.append(span);
  li.append("  " + task);
  li.append(button);
  taskUl.appendChild(li);

  button.addEventListener("click", () => {
    addTaskToArchiveDom(task, index);
    addTaskToArchiveLocalStorage(task);
  });

  button.addEventListener("click", () => {
    deleteTask(index);
    li.remove();
  });
}

function handleResetButton() {
  localStorage.removeItem("taskList");
}

function handleResetArchiveList() {
  localStorage.removeItem("archiveList");
}

resetButton.addEventListener("click", () => {
  handleResetButton();
  getTasks();
});

function deleteTask(itemIndex) {
  let tasksJSON = localStorage.getItem("taskList");
  const tasks = JSON.parse(tasksJSON);
  tasks.splice(itemIndex, 1);

  localStorage.setItem("taskList", JSON.stringify(tasks));
  getTasks();
}

getTasks();
getArchivesTasks();
