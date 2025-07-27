// Using var, let, const, and async patterns

let tasks = [];
let currentPage = 1;
const tasksPerPage = 3;

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (!taskText) return alert("Enter a task!");

  tasks.push(taskText);
  input.value = '';
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newTask = prompt("Edit task:", tasks[index]);
  if (newTask !== null) {
    tasks[index] = newTask;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const start = (currentPage - 1) * tasksPerPage;
  const paginatedTasks = tasks.slice(start, start + tasksPerPage);

  paginatedTasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task}
      <button class="edit-btn" onclick="editTask(${start + i})">Edit</button>
      <button class="delete-btn" onclick="deleteTask(${start + i})">Delete</button>
    `;
    taskList.appendChild(li);
  });

  document.getElementById('pageInfo').textContent = currentPage;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTasks();
  }
}

function nextPage() {
  if ((currentPage * tasksPerPage) < tasks.length) {
    currentPage++;
    renderTasks();
  }
}

function saveTasks() {
  // Async simulation
  setTimeout(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, 100);
}

function loadTasks() {
  const stored = localStorage.getItem('todoTasks');
  if (stored) tasks = JSON.parse(stored);
  renderTasks();
}

// Initial load
loadTasks();
