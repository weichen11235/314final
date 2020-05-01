function writeToDom(taskObject) {
  let task, selectStatus;
  if(taskObject.status === "none") {
    selectStatus = `<select onchange="statusUpdate(this)">
    <option value="none" selected>status</option>
    <option value="pending">pending</option>
    <option value="in progress">in progress</option>
    <option value="done">done</option>
  </select>`;
  } else if(taskObject.status === "pending") {
    selectStatus = `<select onchange="statusUpdate(this)">
    <option value="none">status</option>
    <option value="pending" selected>pending</option>
    <option value="in progress">in progress</option>
    <option value="done">done</option>
  </select>`;
  } else if(taskObject.status === "in progress") {
    selectStatus = `<select onchange="statusUpdate(this)">
    <option value="none">status</option>
    <option value="pending">pending</option>
    <option value="in progress" selected>in progress</option>
    <option value="done">done</option>
  </select>`;
  } else {
    selectStatus = `<select onchange="statusUpdate(this)">
    <option value="none">status</option>
    <option value="pending">pending</option>
    <option value="in progress">in progress</option>
    <option value="done" selected>done</option>
  </select>`;
  }
  if(taskObject.reminder === ":00") {
    task = `<li class="ui-state-default task-card">
                <span class="ui-icon ui-icon-arrowthick-2-n-s"></span>
                <div class="content">
                  <p>${taskObject.name}</p>
                  <div class="li-task">
                    <button onclick="taskRename(this)">rename task</button>
                    <button onclick="timeModify(this)">modify time</button>
                    ${selectStatus}
                    <div class="modify-area"></div>
                  </div>
                  <div class="li-time">
                    <span>${taskObject.time}</span>
                    <button>start</button>
                    <button onclick="deleteTask(this)">delete</button>
                  </div>
                  <div class="li-remind">
                    <input type="number" placeholder="enter time in minutes">
                    <button onclick="addReminder(this)">add reminder</button>
                  </div>
                </div>
              </li>`;
  } 
  else {
    task = `<li class="ui-state-default task-card">
                <span class="ui-icon ui-icon-arrowthick-2-n-s"></span>
                <div class="content">
                  <p>${taskObject.name}</p>
                  <div class="li-task">
                    <button onclick="taskRename(this)">rename task</button>
                    <button onclick="timeModify(this)">modify time</button>
                    ${selectStatus}
                    <div class="modify-area"></div>
                  </div>
                  <div class="li-time">
                    <span>${taskObject.time}</span>
                    <button>start</button>
                    <button onclick="deleteTask(this)">delete</button>
                  </div>
                  <div class="li-remind">
                    <button>click to begin reminder</button>
                    <span>${taskObject.reminder}</span>
                    <button onclick="setReminder(this)">modify reminder</button>
                    <div class="modify-reminder"></div>
                  </div>
                </div>
              </li>`;
  }
  $('#sortable').append(task);
}