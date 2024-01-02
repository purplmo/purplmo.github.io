function displayTime(){
    let clock = document.querySelector("#clock");
    let now = new Date();
    let hour= 21-now.getHours() 
    clock.textContent = 2-now.getDate() + " Days and " + hour + " Hours Until Next Episode"; //+ now.getHours();
  }
  displayTime()
  setInterval(displayTime, 1000);
  