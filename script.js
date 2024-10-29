let tasks = [];

function addTask() {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDesc').value;
  const date = document.getElementById('taskDate').value;

  if (title === '' || date === '') {
    alert('Title and date are required.');
    return;
  }

  const newTask = {
    id: Date.now(),
    title: title,
    description: description,
    date: date,
    completed: false
  };

  tasks.push(newTask);
  displayTasks();
  clearInputFields();
}

function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = task.completed ? 'completed' : '';
    taskItem.innerHTML = `
      <span>
        <strong>${task.title}</strong> <br>
        <small>${task.description || 'No description'}</small><br>
        <small>${new Date(task.date).toLocaleString()}</small>
      </span>
      <div>
        <button class="complete" onclick="toggleComplete(${task.id})">Complete</button>
        <button class="edit" onclick="editTask(${task.id})">Edit</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);

  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskDesc').value = task.description;
  document.getElementById('taskDate').value = task.date;

  document.querySelector('.form button').innerText = 'Save Task';
  document.querySelector('.form button').onclick = function () {
    saveTask(id);
  };
}

function saveTask(id) {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDesc').value;
  const date = document.getElementById('taskDate').value;

  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, title: title, description: description, date: date }
      : task
  );

  document.querySelector('.form button').innerText = 'Add Task';
  document.querySelector('.form button').onclick = addTask;

  displayTasks();
  clearInputFields();
}

function clearInputFields() {
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDesc').value = '';
  document.getElementById('taskDate').value = '';
}
