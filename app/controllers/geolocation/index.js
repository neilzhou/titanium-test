var importJs = require('import');

importJs.insertButton($.win, 'Test Android location event based on doc', 'layouts/index', {bodyUrl: 'geolocation/android_location'});
importJs.insertButton($.win, 'Test Android location event based on geolib', 'layouts/index', {bodyUrl: 'geolocation/locating_lib'});

importJs.insertButton($.win, 'Android manual sample geolocation', 'geolocation/android_manual');
importJs.insertButton($.win, 'Android manual friendly geolocation', 'geolocation/android');
importJs.insertButton($.win, 'Android simple geolocation', 'geolocation/android_simple');
importJs.insertButton($.win, 'Android only network geolocation', 'geolocation/android_network');

$.win.open();
