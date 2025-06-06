const taskNameInput = document.getElementById("taskName");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const startMeridianSelect = document.getElementById("startMeridian");
const endMeridianSelect = document.getElementById("endMeridian");
const addBtn = document.querySelector("button[onclick='addTask()']");
const taskList = document.getElementById("taskList");
const currentDate = document.getElementById("currentDate");

let todayTasks = [];

function getFormattedDate() {
  const date = new Date();
  return date.toDateString();
}

function formatTimeManual(timeStr, meridian) {
  if (!timeStr) return "";
  const [hour, minute] = timeStr.split(":");
  const h = parseInt(hour) % 12 || 12; // 12-hour format
  return `${h}:${minute} ${meridian}`;
}

function updateAddButtonState() {
  if (taskNameInput.value.trim() && startTimeInput.value && endTimeInput.value) {
    addBtn.disabled = false;
  } else {
    addBtn.disabled = true;
  }
}

function addTask() {
  const name = taskNameInput.value.trim();
  const start = startTimeInput.value;
  const end = endTimeInput.value;
  const startMeridian = startMeridianSelect.value;
  const endMeridian = endMeridianSelect.value;

  if (!name || !start || !end) {
    alert("Please fill all fields.");
    return;
  }

  const startTimeFormatted = formatTimeManual(start, startMeridian);
  const endTimeFormatted = formatTimeManual(end, endMeridian);
  const fullTask = `${name} ${startTimeFormatted} to ${endTimeFormatted}`;

  todayTasks.push({ text: fullTask, completed: false });
  renderTasks();
  clearInputs();
}

function clearInputs() {
  taskNameInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";
  startMeridianSelect.value = "AM";
  endMeridianSelect.value = "AM";
  addBtn.disabled = true;
  taskNameInput.focus();
}

function toggleTaskCompletion(index) {
  todayTasks[index].completed = !todayTasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  const confirmed = confirm("Are you sure you want to delete this task?");
  if (!confirmed) return;
  todayTasks.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  currentDate.textContent = "Today: " + getFormattedDate();

  taskList.innerHTML = "";
  todayTasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleTaskCompletion(index);

    const span = document.createElement("span");
    span.className = "task-text" + (task.completed ? " completed" : "");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.title = "Delete task";
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.onclick = () => deleteTask(index);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";
    actionsDiv.appendChild(checkbox);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(actionsDiv);
    li.appendChild(span);

    taskList.appendChild(li);
  });
}

taskNameInput.addEventListener("input", updateAddButtonState);
startTimeInput.addEventListener("input", updateAddButtonState);
endTimeInput.addEventListener("input", updateAddButtonState);

window.onload = () => {
  currentDate.textContent = "Today: " + getFormattedDate();
  addBtn.disabled = true;
  taskNameInput.focus();
};
