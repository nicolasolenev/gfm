import { taskHtmlElementTemplate, deleteTaskBtnHandler, checkboxTaskHandler } from './view.js'

let list = [];
const TODO = 'To Do';
const IN_PROGRESS = 'In Progress';
const DONE = 'Done'
const STATUSES = [TODO, IN_PROGRESS, DONE];
let ID = 0;

renderList();

// localStorage.clear();

if (localStorage.getItem('list')) {
  list = JSON.parse(localStorage.getItem('list'));
} else {
  localStorage.setItem('list', '[]');
}

if (localStorage.getItem('ID')) {
  ID = JSON.parse(localStorage.getItem('ID'));
} else {
  localStorage.setItem('ID', '0');
}

function saveToLocalStorage(task) {
  let list = JSON.parse(localStorage.getItem('list'));
  list.push(task);
  localStorage.setItem('list', JSON.stringify(list));
  localStorage.setItem('ID', ID);
}

function deleteFromLocalStorage(ID) {
  let list = JSON.parse(localStorage.getItem('list'));
  let map = new Map(list.map(item => [item.id, item]));
  map.delete(ID);
  localStorage.setItem('list', JSON.stringify([...map.values()]));
}

function renderList() {
  let list = JSON.parse(localStorage.getItem('list'));
  for (let task of list) {
    const whereAddTask = document.getElementById(task.priority);
    const newTaskHtmlElement = taskHtmlElementTemplate.cloneNode('deep');
    newTaskHtmlElement.setAttribute('id', task.id);
    const taskNameTextElement = newTaskHtmlElement.querySelector('.todo_list__input');
    taskNameTextElement.textContent = task.name;
    const deleteBtnElement = newTaskHtmlElement.querySelector('.todo_list__delete_button');
    deleteBtnElement.addEventListener('click', deleteTaskBtnHandler);
    const checkboxElement = newTaskHtmlElement.querySelector('.todo_list__checkbox');
    checkboxElement.addEventListener('click', checkboxTaskHandler);

    if (task.check) {
      newTaskHtmlElement.classList.add('Done');
      checkboxElement.previousElementSibling.classList.remove('display_none');
    }
    whereAddTask.append(newTaskHtmlElement);
  }
}

function Task(task, priority) {
  this.id = ++ID;
  this.name = task;
  this.status = 'To Do';
  this.priority = priority;
  this.check = false;
}

function addTask(task, priority = 'low') {
  let newTask = new Task(task, priority);
  list.push(newTask);
  saveToLocalStorage(newTask);
}

function changeStatus(ID, status) {
  let list = JSON.parse(localStorage.getItem('list'));
  let task = list.find(item => item.id === ID);
  task.check = task.check ? false : true;
  list[list.findIndex(item => item.id === ID)] = task;
  localStorage.setItem('list', JSON.stringify(list));
}

function deleteTask(ID) {
  list.splice(list.findIndex(task => task.id === ID), 1);
  deleteFromLocalStorage(ID);
}

function showList() {
  const sortedList = {};
  STATUSES.forEach(status => sortedList[status] = []);
  for (let task of list) {
    sortedList[task.status].push(`id:${task.id} "${task.name}"`);
  }
  for (let status in sortedList) {
    const isEmptyTaskList = !sortedList[status].length;
    if (isEmptyTaskList) sortedList[status].push('-');
    console.log(`${status}:\n ${sortedList[status].join('\n ')}`);
  }
}

export { list, ID, addTask, deleteTask, changeStatus, TODO, IN_PROGRESS, DONE };

export const UI_ELEMENTS = {
  ADD_TASK: document.querySelectorAll('.todo__add-icon'),
  CHECKED: document.querySelectorAll('.todo__checkbox'),
  TASK_CLONE: document.querySelector('.todo__task'),
  INPUT: document.querySelectorAll('.todo__add'),
};
