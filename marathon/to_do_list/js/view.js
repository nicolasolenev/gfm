import { list, ID, addTask, deleteTask, changeStatus } from './main.js'

const taskTemplate = document.createElement('div');
taskTemplate.className = 'todo_list__task';
taskTemplate.insertAdjacentHTML('afterbegin', `
<input type="checkbox" class="todo_list__checkbox">
<span class="todo_list__input"></span>
<button class="todo_list__delete_button">
  <img class="todo_list__delete_button_icon" src="img/add-icon.svg">
</button>`);

const addTaskBtns = document.querySelectorAll('.todo_list__add_button');
for (let button of addTaskBtns) {
  button.addEventListener('click', addTaskHandler);
}

function addTaskHandler(event) {
  const whereAddTask = event.currentTarget.parentElement.parentElement;
  const taskName = event.currentTarget.parentElement.firstElementChild.value;
  const isNotEmptyField = (taskName.trim() !== '');
  if (isNotEmptyField) {
    event.currentTarget.parentElement.firstElementChild.value = null;
    const priority = event.currentTarget.parentElement.parentElement.firstElementChild.textContent;
    addTask(taskName, priority);
    const newTask = taskTemplate.cloneNode('deep');
    newTask.setAttribute('id', ID);
    newTask.querySelector('.todo_list__input').textContent = taskName;
    const deleteBtn = newTask.querySelector('.todo_list__delete_button');
    deleteBtn.addEventListener('click', deleteTaskHandler);
    const checkbox = newTask.querySelector('.todo_list__checkbox');
    checkbox.addEventListener('click', checkboxTaskHandler);
    whereAddTask.append(newTask);
  }
}



function deleteTaskHandler() {
  const taskID = +this.parentElement.id;
  deleteTask(taskID);
  this.parentElement.remove();
}

function checkboxTaskHandler() {
  const taskID = +this.parentElement.id;
  const task = this.parentElement;
  if (task.classList.contains('done')) {
    changeStatus(taskID, 'In Progress');
    task.classList.remove('done');
  } else {
    changeStatus(taskID, 'Done');
    task.classList.add('done');
  }
}

const inputs = document.querySelectorAll('.todo_list__input');
for (let input of inputs) {
  input.addEventListener('keydown', function (key) {
    const isEnterBtn = (key.keyCode === 13);
    if (isEnterBtn) {
      addTaskHandler(event);
    }
  });
}