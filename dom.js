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
                <button class="more" onclick="showMore(this)">more</button>
                <div class="content">
                  <div class="li-task">
                    <button onclick="taskRename(this)">rename task</button>
                    <button onclick="timeModify(this)">modify time</button>
                    ${selectStatus}
                    <div class="modify-area"></div>
                  </div>
                  <p>${taskObject.name}</p>
                  <div class="li-time">
                    <span>${taskObject.time}</span>
                    <button onclick="start(this)">start</button>
                    <button onclick="deleteTask(this)">delete task</button>
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
                <button class="more" onclick="showMore(this)">more</button>
                <div class="content">
                  <div class="li-task">
                    <button onclick="taskRename(this)">rename task</button>
                    <button onclick="timeModify(this)">modify time</button>
                    ${selectStatus}
                    <div class="modify-area"></div>
                  </div>
                  <p>${taskObject.name}</p>
                  <div class="li-time">
                    <span>${taskObject.time}</span>
                    <button onclick="start(this)">start</button>
                    <button onclick="deleteTask(this)">delete task</button>
                  </div>
                  <div class="li-remind">
                    <span>${taskObject.reminder}</span>
                    <button onclick="remindMe(this)">begin reminder</button>
                    <button onclick="setReminder(this)">modify reminder</button>
                    <div class="modify-reminder"></div>
                  </div>
                </div>
              </li>`;
  }
  $('#sortable').append(task);
}