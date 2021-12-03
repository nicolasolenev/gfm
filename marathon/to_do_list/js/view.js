import { list, ID, addTask, deleteTask, changeStatus } from './main.js'

const taskHtmlElementTemplate = document.createElement('div');
taskHtmlElementTemplate.className = 'todo_list__task';
taskHtmlElementTemplate.insertAdjacentHTML('afterbegin', `
<input type="checkbox" class="todo_list__checkbox">
<span class="todo_list__input"></span>
<button class="todo_list__delete_button">
  <img class="todo_list__delete_button_icon" src="img/add-icon.svg">
</button>`);

const addNewTaskBtns = document.querySelectorAll('.todo_list__add_button');
for (let addNewTaskBtn of addNewTaskBtns) {
  addNewTaskBtn.addEventListener('click', addNewTaskBtnHandler);
}

function addNewTaskBtnHandler(event) {
  const whereAddTask = event.currentTarget.parentElement.parentElement;
  const inputField = event.currentTarget.parentElement.firstElementChild;
  const taskName = inputField.value;
  const isNotEmptyInputField = (taskName.trim() !== '');
  if (isNotEmptyInputField) {
    inputField.value = null;
    const priority = whereAddTask.firstElementChild.textContent;
    addTask(taskName, priority);
    const newTaskHtmlElement = taskHtmlElementTemplate.cloneNode('deep');
    newTaskHtmlElement.setAttribute('id', ID);
    const taskNameTextElement = newTaskHtmlElement.querySelector('.todo_list__input');
    taskNameTextElement.textContent = taskName;
    const deleteBtnElement = newTaskHtmlElement.querySelector('.todo_list__delete_button');
    deleteBtnElement.addEventListener('click', deleteTaskBtnHandler);
    const checkboxElement = newTaskHtmlElement.querySelector('.todo_list__checkbox');
    checkboxElement.addEventListener('click', checkboxTaskHandler);
    whereAddTask.append(newTaskHtmlElement);
  }
}

function deleteTaskBtnHandler(event) {
  const taskID = getTaskID(event);
  deleteTask(taskID);
  this.parentElement.remove();
}

function checkboxTaskHandler(event) {
  const taskID = getTaskID(event);
  const task = event.currentTarget.parentElement;
  if (task.classList.contains('done')) {
    changeStatus(taskID, 'In Progress');
    task.classList.remove('done');
  } else {
    changeStatus(taskID, 'Done');
    task.classList.add('done');
  }
}

function getTaskID(event) {
  return +event.currentTarget.parentElement.id;
}