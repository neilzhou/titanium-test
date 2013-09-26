var coords = $.coords;

var locating = {
  onLocationUpdated: function(e){
    Ti.API.info("Received point: " + JSON.stringify(e));
    alert('received: ' + JSON.stringify(e));
  },
  configureLocationProvider: function(){
    Ti.Geolocation.Android.manualMode = true;
    var gpsProvider = Ti.Geolocation.Android.createLocationProvider({
      name: Ti.Geolocation.PROVIDER_NETWORK,
      minUpdateTime: 0,
      minUpdateDistance: 0.0
    });
    Ti.Geolocation.Android.addLocationProvider(gpsProvider);
    
    var gpsRule = Ti.Geolocation.Android.createLocationRule({
      provider: Ti.Geolocation.PROVIDER_NETWORK,
      accuracy: 200,
      maxAge:300000,
      minAge:0,
    });
    
    Ti.Geolocation.Android.addLocationRule(gpsRule);
  },
  onAndroidActivityDestroyed: function(){
    locating.disable();
  },
  onAndroidActivityPaused: function(){
    locating.disable();
  },
  onAndroidActivityResumed: function(){
    alert('resumed');
    locating.enable();
  },
  disable: function(){
    Ti.Geolocation.removeEventListener('location', locating.onLocationUpdated);
    
    Ti.API.info('disable locating');
    alert('disable locating');
    
    var activity = Ti.Android.currentActivity;
    activity.removeEventListener('destroy', locating.onAndroidActivityDestroyed);
    activity.removeEventListener('pause',   locating.onAndroidActivityPaused);
    activity.removeEventListener('resume',  locating.onAndroidActivityResumed);
  },
  enable: function(){
    alert('enable');
    Ti.Geolocation.addEventListener('location', locating.onLocationUpdated);
    
    var activity = Ti.Android.currentActivity;
    activity.addEventListener('destroy', locating.onAndroidActivityDestroyed);
    activity.addEventListener('pause',   locating.onAndroidActivityPaused);
    activity.addEventListener('resume',  locating.onAndroidActivityResumed);
  }
};

if(!Ti.Geolocation.locationServicesEnabled){
  alert('You service has geo turned off - turn it on.');
}
else{
  Ti.Geolocation.Android.manualMode = true;
  var gpsProvider = Ti.Geolocation.Android.createLocationProvider({
    name: Ti.Geolocation.PROVIDER_NETWORK,
    minUpdateTime: 0,
    minUpdateDistance:0
  });
  Ti.Geolocation.Android.addLocationProvider(gpsProvider);
  
  Ti.Geolocation.addEventListener('location', function(e){
    alert('received 111: ' + JSON.stringify(e));
  });
  // locating.enable();
}

$.openButton.addEventListener('click', function(e){
  // locating.disable();
  Alloy.createController('geolocation/android_manual_not_destroy');
  
});

$.win.open();
