const divContent = document.querySelector(".content");
let li;
const taskUl = document.querySelector(".taskUl");
const divArchive = document.querySelector(".archiveList");
let archiveUl = document.querySelector(".archiveList");
const resetButton = document.querySelector("#resetButton");
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
  if (!task || task === "") {
    const p = document.createElement('p');
    p.className = "emptyFormP"
    p.textContent = "Ajoutez une tâche !";
    divContent.append(p);
    setTimeout(() => {
      p.remove();
    }, 3000); 
  } else {
    addTaskToLocalStorage(task);
	this.reset();
  }
};

// Permet d'afficher un message lorsque la liste est vide
function displayEmptyList(text, ulElement) {
	const p = document.createElement("p");
	p.textContent = text;
	ulElement.append(p);
}

function getTasks() {
  taskList = JSON.parse(localStorage.getItem("taskList"));
  taskUl.textContent = "";

  if (!taskList || taskList.length === 0) {
    displayEmptyList("Il n'y a pas de tâche pour le moment...", taskUl);
  } else {
    taskList.forEach((task, index) => {
		addTaskToDom(task, index);
	});
  }
}

function getArchivesTasks() {
  archiveList = JSON.parse(localStorage.getItem("archiveList"));
  archiveUl.textContent = "";
  const button = document.createElement("button");
  
  if (!archiveList || archiveList.length === 0) {
    displayEmptyList("Il n'y a pas de tâche archivée pour le moment...", archiveUl);
  } else {
    archiveList.forEach((task, index) => {
      addTaskToArchiveDom(task, index);
      });
      button.className = "deleteButton";
		  button.textContent = "Reset";

      divArchive.append(button);

      button.addEventListener("click", () => {
        handleResetArchiveList();
        getArchivesTasks();
      });
  }
}

function addTaskToArchiveDom(task, index) {
  const archiveLi = document.createElement("li");
  const p = document.createElement("p");

  p.textContent = index;
  archiveLi.className = "archiveLi";

  archiveLi.append(p);
  archiveLi.append("  " + task);
  archiveUl.appendChild(archiveLi);
}

function addTaskToDom(task, index) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  const p = document.createElement("p");

  p.textContent = index;
  button.className = "deleteButton";
  button.textContent = "X";
  li.className = "listLi";

  li.append(p);
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

function deleteTask(itemIndex) {
	let tasksJSON = localStorage.getItem("taskList");
	const tasks = JSON.parse(tasksJSON);
	tasks.splice(itemIndex, 1);

	localStorage.setItem("taskList", JSON.stringify(tasks));
	getTasks();
}

function handleResetArchiveList() {
  localStorage.removeItem("archiveList");
}


getTasks();
getArchivesTasks();
