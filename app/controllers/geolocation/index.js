var importJs = require('import');

importJs.insertButton($.win, 'Android manual sample geolocation', 'geolocation/android_manual');
importJs.insertButton($.win, 'Android manual friendly geolocation', 'geolocation/android');
importJs.insertButton($.win, 'Android simple geolocation', 'geolocation/android_simple');
importJs.insertButton($.win, 'Android only network geolocation', 'geolocation/android_network');

$.win.open();
