let execute = -1;
function start(id) {
  //start the timer
  if(execute === -1) {
    id.innerText = "pause";
    let timer = id.previousElementSibling;
    let time = id.previousElementSibling.innerText;
    let totalMinutes, totalSeconds;
    totalMinutes = Number(time.substr(0, 2));
    extraSeconds = Number(time.substr(3, 2));
    totalSeconds = (totalMinutes * 60) + extraSeconds;
    execute = setInterval(function() {
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      if(minutes.toString().length === 1) {
        timer.innerText = `0${minutes}:${seconds}`;
      } else {
        timer.innerText = `${minutes}:${seconds}`;
      }
      
      if(timer.innerText === "00:00"){
        clearInterval(execute);
      }
      totalSeconds--;
    }, 1000);
  }
  //pause the timer
  else {
    id.innerText = "start";
    clearInterval(execute);
    execute = -1;
  }
}

function remindMe(id) {
  let timer = id.nextElementSibling;
  let time = id.nextElementSibling.innerText;
  let totalMinutes, totalSeconds;
  totalMinutes = Number(time.substr(0, 2));
  totalSeconds = totalMinutes * 60;

  let countDown = setInterval(function() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    if(minutes.toString().length === 1) {
      timer.innerText = `0${minutes}:${seconds}`;
    } else {
      timer.innerText = `${minutes}:${seconds}`;
    }

    if(timer.innerText === "00:00") {
      clearInterval(countDown);
      let taskName = id.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
      $('body').prepend(`<p class="scream">${taskName}: ${totalMinutes} minutes pass</p>`);
      setTimeout(function(){
        document.body.firstElementChild.remove();
      }, 10000);
    }
    totalSeconds--;
  }, 1000);
}