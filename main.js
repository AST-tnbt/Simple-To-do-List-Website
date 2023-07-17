const addForm = document.getElementById('addForm');
const inputItem = document.getElementById('inputItem');
const searchItem = document.getElementById('searchItem');
const taskList = document.getElementById('taskList');
let tasks = [];

//add task section
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var taskText = inputItem.value.trim();
    if (taskText !== '') {
        var task = {
            id: Date.now(),
            data: taskText,
        }
        tasks.push(task);
        inputItem.value = '';
        // console.log(task);
        displayTasks();
    }
});

//display task function
function displayTasks(listOfTask = tasks) {
    taskList.innerHTML = '';
    listOfTask.forEach((task) => {
        var item = document.createElement('li');
        item.setAttribute('data-id', task.id);
        item.classList.add("taskItem");

        var taskItem = document.createElement('input');
        taskItem.type = 'text';
        taskItem.value = task.data;
        taskItem.classList.add("inputBar");

        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add("btn");
        deleteBtn.classList.add("del-btn");

        item.appendChild(taskItem);
        item.appendChild(deleteBtn);
        taskList.appendChild(item);
    });
}

//delete task section
taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        var idItem = e.target.parentElement.getAttribute('data-id');
        tasks = tasks.filter((task) => task.id != idItem);
        displayTasks();
    }
});

//edit task section
taskList.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT') {
        var idItem = e.target.parentElement.getAttribute('data-id');
        var newText = e.target.value.trim();
        tasks.forEach((task) => {
            if (task.id == idItem) {
                task.data = newText;
            }
        });
    }
});

//search task section
searchItem.addEventListener('input', () => {
    var taskSearch = searchItem.value.trim().toLowerCase();
    var listTaskSearch = tasks.filter((task) => task.data.toLowerCase().includes(taskSearch));
    displayTasks(listTaskSearch);
});
