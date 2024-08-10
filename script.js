let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
    createdAt: new Date(),
    completedAt: null // Initialize completedAt as null
  };

  tasks.push(task);
  taskInput.value = '';

  renderTasks();
}

function completeTask(id) {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    if (tasks[taskIndex].completed) {
      tasks[taskIndex].completedAt = new Date(); // Record completion time
    } else {
      tasks[taskIndex].completedAt = null; // Reset completion time
    }
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function renderTasks() {
  const pendingTasksList = document.getElementById('pendingTasks');
  const completedTasksList = document.getElementById('completedTasks');
  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    if (task.completed) {
      listItem.classList.add('completed');
    }

    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.onclick = () => completeTask(task.id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task.id);

    listItem.textContent = task.text;
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    if (task.completed) {
      const completedTime = new Date(task.completedAt).toLocaleString();
      listItem.appendChild(document.createTextNode(` (Completed on ${completedTime})`));
      completedTasksList.appendChild(listItem);
    } else {
      const createdTime = new Date(task.createdAt).toLocaleString();
      listItem.appendChild(document.createTextNode(` (Created on ${createdTime})`));
      pendingTasksList.appendChild(listItem);
    }
  });
}

renderTasks();
