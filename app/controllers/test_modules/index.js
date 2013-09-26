var importJs = require('import');

importJs.insertButton($.win, 'Module cache Test', 'test_modules/cache');
importJs.insertButton($.win, 'Module cache Test', 'test_modules/stateful');

$.win.open();