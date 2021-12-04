import { list, ID, addTask, deleteTask, changeStatus, TODO, IN_PROGRESS, DONE } from './main.js'

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
  const inputField = event.currentTarget.parentElement.firstElementChild;
  const taskName = inputField.value;
  const isNotEmptyInputField = (taskName.trim() !== '');
  if (isNotEmptyInputField) {
    inputField.value = '';
    const whereAddTask = event.currentTarget.parentElement.parentElement;
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
  event.currentTarget.parentElement.remove();
}

function checkboxTaskHandler(event) {
  const taskID = getTaskID(event);
  const task = event.currentTarget.parentElement;
  if (task.classList.contains(DONE)) {
    changeStatus(taskID, IN_PROGRESS);
    task.classList.remove(DONE);
  } else {
    changeStatus(taskID, DONE);
    task.classList.add(DONE);
  }
}

function getTaskID(event) {
  return +event.currentTarget.parentElement.id;
}