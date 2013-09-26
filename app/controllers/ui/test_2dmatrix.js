var matrix = Ti.UI.create2DMatrix({
});
alert('matrix invert:' + JSON.stringify(matrix.invert()));
// Ti.API.info('2d matrix:' + matrix);
// console.dir(matrix);

$.rotateButton.addEventListener('click', function(e){
  if(OS_ANDROID){
    // matrix = matrix.rotate(0, 90); // 顺时针 0->90 度动画。
    matrix = matrix.rotate(45, 90); // 起始位置从45 -> 90 度变化。
  } else {
    matrix = matrix.rotate(45);
  }
  var a1 = Ti.UI.createAnimation();
  a1.transform = matrix;
  a1.duration = 800;
  $.effectLabel.animate(a1, function(e){alert('complete the animate.');});
});

$.win.open();

