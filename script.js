let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Add Task
function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() === "") return;

  tasks.push({ text: input.value, completed: false });
  input.value = "";
  saveAndRender();
}

// Render Tasks
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks
    .filter((task) => {
      if (currentFilter === "completed") return task.completed;
      if (currentFilter === "pending") return !task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span onclick="toggleTask(${index})" class="${task.completed ? "completed" : ""}">
          ${task.text}
        </span>
        <div>
          <button onclick="editTask(${index})">✏️</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      `;

      list.appendChild(li);
    });
}

// Toggle Complete
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

// Edit Task
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    saveAndRender();
  }
}

// Filter Tasks
function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

// Search
function searchTask() {
  const value = document.getElementById("search").value.toLowerCase();
  const listItems = document.querySelectorAll("li");

  listItems.forEach((li) => {
    li.style.display = li.innerText.toLowerCase().includes(value)
      ? "flex"
      : "none";
  });
}

// Save + Render
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Initial Load
renderTasks();
