import { list, STATUSES, ID, addTask, deleteTask } from './main.js'

const newTaskTemplate = document.createElement('div');
newTaskTemplate.className = 'todo_list__task';
newTaskTemplate.insertAdjacentHTML('afterbegin', '<input type="checkbox" class="todo_list__checkbox"><input type = "text" class= "todo_list__input"><button class="todo_list__delete_button"><img class="todo_list__delete_button_icon" src="img/add-icon.svg"></button>');

const addTaskButtons = document.querySelectorAll('.todo_list__add_button');
console.log(addTaskButtons);
for (let button of addTaskButtons) {
  button.addEventListener('click', addTaskButtonHendler);
}

function addTaskButtonHendler() {
  console.log(this);
  const thisList = this.parentElement.parentElement;
  console.log(thisList);
  const task = this.parentElement.firstElementChild.value;
  const priority = this.parentElement.parentElement.firstElementChild.textContent;
  addTask(task, priority);
  this.parentElement.firstElementChild.value = null;
  console.log(list);
  const newTask = newTaskTemplate.cloneNode('deep');
  newTask.setAttribute('id', ID);
  newTask.querySelector('.todo_list__input').value = task;
  newTask.querySelector('.todo_list__delete_button').addEventListener('click', deleteTaskButtonHendler);
  newTask.querySelector('.todo_list__checkbox').addEventListener('click', checkboxTaskHendler);


  console.log(newTask.querySelector('.todo_list__input'));
  thisList.append(newTask);
}

function deleteTaskButtonHendler() {
  this.parentElement.remove();
}

function checkboxTaskHendler() {
  this.parentElement.classList.toggle('done');
}

// const inputs = document.querySelectorAll('.todo_list__input');
// for (let input of inputs) {
//   input.addEventListener('keydown', e => e.keyCode === 13 ? addTaskButtonHendler() : 0);
// }