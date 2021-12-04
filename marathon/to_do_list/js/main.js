const list = [];
const TODO = 'To Do';
const IN_PROGRESS = 'In Progress';
const DONE = 'Done'
const STATUSES = [TODO, IN_PROGRESS, DONE];
let ID = 0;

function addTask(task, priority = 'low') {
  list.push({
    id: ++ID,
    name: task,
    status: 'To Do',
    priority: priority,
  });
}

function changeStatus(ID, status) {
  list.find(task => task.id === ID).status = status;
}

function deleteTask(ID) {
  list.splice(list.findIndex(task => task.id === ID), 1);
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
