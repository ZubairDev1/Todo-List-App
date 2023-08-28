// Load tasks from Local Storage when the page loads
window.addEventListener('load', () => {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
    addTask(task);
    });
    });
    document.getElementById('add-task').addEventListener('click', () => {
    const newTaskText = document.getElementById('new-task').value;
    if (newTaskText.trim() !== '') {
    addTask(newTaskText);
    document.getElementById('new-task').value = '';
    // Save updated tasks to Local Storage
    const tasks = Array.from(document.querySelectorAll('#task-list li span')).map(span => span.textContent);
    saveTasksToLocalStorage(tasks);
    }
    });
    function addTask(taskText) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-task">Delete</button>
    `;
    taskList.appendChild(li);
    li.querySelector('.delete-task').addEventListener('click', () => {
    taskList.removeChild(li);
    // Update and save tasks after deleting
    const tasks = Array.from(document.querySelectorAll('#task-list li span')).map(span => span.textContent);
    saveTasksToLocalStorage(tasks);
    });
    }
    // Save tasks to Local Storage
    function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    // Retrieve tasks from Local Storage
    function getTasksFromLocalStorage() {
    const tasksString = localStorage.getItem('tasks');
    return JSON.parse(tasksString) || [];
    }