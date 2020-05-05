//jQuery UI 
$( function() {
  $( "#joke-panel" ).tabs();
});

$( function() {
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
});

//joke panel toggle
$("#relax").click(function(){
  $("#joke-panel").toggle();
  if($("#relax").text() === "wanna relax?"){
    $("#relax").text("close");
  } else {
    $("#relax").text("wanna relax?");
  }
});

//show more features toggle
function showMore(id){
  let options = id.nextElementSibling.firstElementChild;
  $(options).toggle();
  if($(id).text() === "more"){
    $(id).text("close");
  } else {
    $(id).text("more");
  }
}

//JOKE API
$("#get-joke").click(function(){
  $.get("https://api.icndb.com/jokes/random", function(data, status){
    $("#sj-content").text(data.value.joke);
  });
});

$("#get-jokes").click(function(){
  let type = $("#category").val();
  let number = $("#joke-number").val();
  $.get(`https://api.icndb.com/jokes/random/${number}?limitTo=[${type}]`, function(data, status){
    let content = "";
    data.value.forEach(function(item){
      content += `<p>${item.joke}</p>`;
    })
    $("#mj-content").html(content);
  });
});

//cancel button
function cancel(id) {
  $(id).parent().empty();
}

//rename
function taskRename(id) {
  let container = id.nextElementSibling.nextElementSibling.nextElementSibling;
  container.innerHTML = `<input type="text" placeholder="enter the name">
                        <button onclick="rename(this)">modify</button>
                        <button onclick="cancel(this)">cancel</button>`;
}

function rename(id) {
  let name = id.parentElement.parentElement.nextElementSibling;
  let name2 = id.previousElementSibling;
  let taskArray = getFromLocal();
  taskArray.forEach(function(task) {
    if(task.name === name.innerText) {
      task.name = name2.value;
    }
  });
  localStorage.setItem('tasks', JSON.stringify(taskArray));
  name.innerText = name2.value;
  cancel(id);

}

//modify time
function timeModify(id) {
  let container = id.nextElementSibling.nextElementSibling;
  container.innerHTML = `<input type="number" placeholder="enter in min.">
                        <button onclick="newTime(this)">modify</button>
                        <button onclick="cancel(this)">cancel</button>`;
}

function newTime(id) {
  let taskName = id.parentElement.parentElement.nextElementSibling.innerText;
  let time = id.parentElement.parentElement.nextElementSibling.nextElementSibling.firstElementChild;
  let timeValue = formatTime(id.previousElementSibling.value);
  let taskArray = getFromLocal();
  taskArray.forEach(function(task) {
    if(task.name === taskName) {
      task.time = timeValue;
    }
  });
  localStorage.setItem('tasks', JSON.stringify(taskArray));
  time.innerText = timeValue;
  cancel(id);
}

function formatTime(time) {
  if(time.length === 1) {
    time = `0${time}:00`;
  } else {
    time = `${time}:00`;
  }
  return time;
}

//modify status and update the change to local storage
function statusUpdate(id) {
  let taskName = id.parentElement.nextElementSibling.innerText;
  let taskStatus = id.value;
  let taskArray = getFromLocal();
  taskArray.forEach(function(task) {
    if(task.name === taskName) {
      task.status = taskStatus;
    }
  });
  localStorage.setItem('tasks', JSON.stringify(taskArray));
}

//reminder
function setReminder(id) {
  let container = id.nextElementSibling;
  container.innerHTML = `<input type="number" placeholder="enter time in minutes">
                        <button onclick="set(this)" id="modify">modify</button>
                        <button onclick="cancel(this)">cancel</button>`;
}

function set(id) {
  let taskName = id.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText;
  let time = id.parentElement.previousElementSibling.previousElementSibling.previousElementSibling;
  let timeValue = id.previousElementSibling.value;
  let taskArray = getFromLocal();
  taskArray.forEach(function(task) {
    if(task.name === taskName) {
      task.reminder = formatTime(timeValue);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(taskArray));
  time.innerText = formatTime(timeValue);
  cancel(id);
}

function addReminder(id) {
  let taskName = id.parentElement.previousElementSibling.previousElementSibling.innerText;
  let timeValue = formatTime(id.previousElementSibling.value);
  let taskArray = getFromLocal();
  taskArray.forEach(function(task) {
    if(task.name === taskName) {
      task.reminder = timeValue;
    }
  });
  localStorage.setItem('tasks', JSON.stringify(taskArray));
  id.parentElement.innerHTML = `<span>${timeValue}</span>
                                <button onclick="remindMe(this)">
                                begin reminder</button>
                                <button onclick="setReminder(this)">modify reminder</button>
                                <div class="modify-reminder"></div>`;  
}

//add task
document.getElementById('add-task').addEventListener('click', addTask);
function addTask(e) {
  let taskName = e.target.previousElementSibling.previousElementSibling.previousElementSibling;
  let taskTime = e.target.previousElementSibling.previousElementSibling;
  let taskReminder = e.target.previousElementSibling;
  let taskObject = {name: taskName.value, time: formatTime(taskTime.value), reminder: formatTime(taskReminder.value), status: "none"};
  taskName.value = "";
  taskTime.value = "";
  taskReminder.value = "";
  taskName.setAttribute('placeholder', 'enter the task name');
  taskTime.setAttribute('placeholder', 'enter time you need in minutes');
  taskReminder.setAttribute('placeholder', 'set a reminder in minutes');
  
  writeToDom(taskObject);
  storeToLocal(taskObject);
  e.preventDefault();
}

//delete task
function deleteTask(id) {
  let taskName = id.parentElement.previousElementSibling.innerText;
  let taskArray = getFromLocal();
  taskArray.forEach(function(task, index) {
    if(task.name === taskName) {
      taskArray.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(taskArray));
  id.parentElement.parentElement.parentElement.remove();
}

//load tasks when refresh/ reopon the browser
function loadTasks() {
  let taskArray = getFromLocal();
  if(taskArray.length > 0) {
    taskArray.forEach(function(task) {
      writeToDom(task);
    });
  }
}

//clear all
document.getElementById('clear').addEventListener('click', clear);
function clear() {
  $('#sortable').empty();
  localStorage.clear();
}