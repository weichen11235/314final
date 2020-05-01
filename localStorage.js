function storeToLocal(taskObject) {
  let taskArray;
  if(localStorage.getItem('tasks') === null) {
    taskArray = [];
  }
  else {
    taskArray = JSON.parse(localStorage.getItem('tasks'));
  }
  taskArray.push(taskObject);
  localStorage.setItem('tasks', JSON.stringify(taskArray));
}

function getFromLocal() {
  let taskArray;
  if(localStorage.getItem('tasks') === null) {
    taskArray = [];
  }
  else {
    taskArray = JSON.parse(localStorage.getItem('tasks'));
  }
  return taskArray;
}
