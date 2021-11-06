const list = {
  "create a task": "In Progress",
  "make a bed": "Done",
  "write a post": "To Do",
}

function changeStatus(task, status) {
  return list[task] = status;
}

function addTask(task) {
  return list[task] = 'To Do';
}

function deleteTask(task) {
  return delete list[task];
}

function showList() {
  const listByStatus = {
    'To Do': '-',
    'In Progress': '-',
    'Done': '-',
  }
  for (let key in listByStatus) {
    let counter = 0;
    console.log(`${key}:`);
    for (let task in list) {
      if (list[task] === key) {
        counter++;
        console.log(` "${task}"`);
      }
    }
    if (!counter) {
      console.log(`-`);
    }
  }
}

changeStatus("write a post", "Done")
addTask('have a walk')
addTask('have a rest')
deleteTask('write a post')
deleteTask('make a bed')
changeStatus("have a walk", "Done")
changeStatus("create a task", "Done")
changeStatus("have a rest", "In Progress")
showList();