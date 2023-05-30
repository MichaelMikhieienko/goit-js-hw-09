
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    var startButton = document.querySelector('[data-start]');
    var stopButton = document.querySelector('[data-stop]');
    var intervalId;
  
    startButton.addEventListener('click', function() {
      startButton.disabled = true; 
      intervalId = setInterval(function() {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
    });
  
    stopButton.addEventListener('click', function() {
      startButton.disabled = false; 
  
      clearInterval(intervalId); 
    });
  });
  
  

