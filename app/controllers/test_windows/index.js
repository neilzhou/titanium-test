var insertBtn = function(title, url){
  var importJs = require('import');
  importJs.insertButton($.win, title, url);
};

var win = $.win;

insertBtn('Window url usage', 'test_windows/test_url');

win.open();
