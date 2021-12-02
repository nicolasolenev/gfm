import { list, STATUSES, ID, addTask, deleteTask } from './main.js'

const newTaskTemplate = document.createElement('div');
newTaskTemplate.className = 'todo_list__task';
newTaskTemplate.insertAdjacentHTML('afterbegin', `
<input type="checkbox" class="todo_list__checkbox">
<span class="todo_list__input"></span>
<button class="todo_list__delete_button">
  <img class="todo_list__delete_button_icon" src="img/add-icon.svg">
</button>`);

const addTaskButtons = document.querySelectorAll('.todo_list__add_button');
for (let button of addTaskButtons) {
  button.addEventListener('click', addTaskHendler);
}

function addTaskHendler() {
  const thisList = this.parentElement.parentElement;
  const task = this.parentElement.firstElementChild.value;
  const priority = this.parentElement.parentElement.firstElementChild.textContent;
  addTask(task, priority);
  this.parentElement.firstElementChild.value = null;
  const newTask = newTaskTemplate.cloneNode('deep');
  newTask.setAttribute('id', ID);
  newTask.querySelector('.todo_list__input').textContent = task;
  newTask.querySelector('.todo_list__delete_button').addEventListener('click', deleteTaskHendler);
  newTask.querySelector('.todo_list__checkbox').addEventListener('click', checkboxTaskHendler);
  thisList.append(newTask);
}

function deleteTaskHendler() {
  this.parentElement.remove();
}

function checkboxTaskHendler() {
  this.parentElement.classList.toggle('done');
}

const inputs = document.querySelectorAll('.todo_list__input');
for (let input of inputs) {
  input.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      const thisList = this.parentElement.parentElement;
      const task = this.parentElement.firstElementChild.value;
      const priority = this.parentElement.parentElement.firstElementChild.textContent;
      addTask(task, priority);
      this.parentElement.firstElementChild.value = null;
      const newTask = newTaskTemplate.cloneNode('deep');
      newTask.setAttribute('id', ID);
      newTask.querySelector('.todo_list__input').textContent = task;
      newTask.querySelector('.todo_list__delete_button').addEventListener('click', deleteTaskHendler);
      newTask.querySelector('.todo_list__checkbox').addEventListener('click', checkboxTaskHendler);
      thisList.append(newTask);
    }
  });
}