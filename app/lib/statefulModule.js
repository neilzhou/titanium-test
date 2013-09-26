var _stepVal = 5; // default
exports.setPointStep = function(value){
  _stepVal = value;
};

exports.getPointStep = function(){
  return _stepVal;
};

exports.stepVal = _stepVal;
