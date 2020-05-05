document.getElementById('sort').addEventListener('change', sortByStatus);
function sortByStatus(e) {
  if(e.target.value === "no-sort") {
    $('#sortable').empty();
    let taskArray = getFromLocal();
    taskArray.forEach(function(task) {
      writeToDom(task);
    });
  }
  else{
    $('#sortable').empty();
    let statusArray = [];
    let taskArray = getFromLocal();
    taskArray.forEach(function(task) {
      if(task.status === e.target.value){
        statusArray.push(task);
      }
    });
    statusArray.forEach(function(task) {
      writeToDom(task);
    });
  }
}

document.getElementById('filter').addEventListener('keyup', filter);
function filter(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.task-card').forEach(function(task) {
    taskName = task.children[2].children[1].textContent;
    if(taskName.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}