var importJs = require('import');

importJs.insertButton($.win, 'Basic Model Test', 'test_models/basic_model');
importJs.insertButton($.win, 'Bind Collection Test', 'test_models/bind_data');
importJs.insertButton($.win, 'Model sync', 'test_models/sync');
importJs.insertButton($.win, 'Model bind by controller cross view', 'test_models/bind_cross_view_custom');

$.win.open();
