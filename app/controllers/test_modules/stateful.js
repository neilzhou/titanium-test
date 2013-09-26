var stateful = require('statefulModule');
var score = require('scoreModule');

var window = Ti.UI.createWindow({
  backgroundColor: 'white',
  fullscreen: false,
  title: 'Click window to score'
});

window.addEventListener('click', function(e){
  try{
    Ti.API.info('The latest score is ' + score.latestScore()); // will be 0
    Ti.API.info('Adding ' + stateful.getPointStep() + " points to score..."); // will be 5; 
    
    score.pointsWon(); // will score to 5;
    Ti.API.info('The latest score is ' + score.latestScore()); // will be: 5;
    Ti.API.info('Setting points per win to 10');
    stateful.setPointStep(10);   // set step = 10;
    Ti.API.info('Adding ' + stateful.getPointStep() + " points to score..."); // will be 10;
    score.pointsWon(); // will be 5 + 10;
    Ti.API.info('The latest score is ' + score.latestScore()); // will be 15.
    Ti.API.info('------------------- info -----------------');
    Ti.API.info('stateful.getPointStep() returns: ' + stateful.getPointStep()); // will be 10
    Ti.API.info('stateful.stepVal value is: ' + stateful.stepVal); // will always return default of 5;
    Ti.API.info('**********************************');
  } catch(e){
    alert('An error has occurred: ' + e);
  }
});

window.open();
