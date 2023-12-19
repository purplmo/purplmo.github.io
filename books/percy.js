function displayTime(){
    let clock = document.querySelector("#clock");
    let now = new Date();
    clock.textContent = 20-now.getDate() + " Days Until Series Release"; //+ now.getHours();
  }
  displayTime()
  setInterval(displayTime, 1000);
  