function displayTime(){
    let clock = document.querySelector("#clock");
    let now = new Date();
    let hour= 21-now.getHours() 
    let day = 23
    if(hour<0) {
      day=day-1
      hour=24+hour
    }
    clock.textContent = day-now.getDate() + " Days and " + hour + " Hours Until Next Episode"; //+ now.getHours();
  }
  displayTime()
  setInterval(displayTime, 1000);
  