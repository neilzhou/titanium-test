var appStateful = require('statefulModule');

var _score = 0;

exports.pointsWon = function(){
  _score += appStateful.getPointStep();
};

exports.pointsLost = function(){
  _score -= appStateful.getPointStep();
  
};

exports.latestScore = function(){
  
  return _score;
};
