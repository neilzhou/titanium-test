var insertBtn = function(title, url){
  var importJs = require('import');
  importJs.insertButton($.win, title, url);
};

var win = $.win;

insertBtn('Activity Indicator', 'ui/test_activity_indicator');
insertBtn('2D Matrix', 'ui/test_2dmatrix');

win.open();
