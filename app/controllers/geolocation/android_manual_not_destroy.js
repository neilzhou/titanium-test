
var locating = {
  onLocationUpdated: function(e){
    Ti.API.info("after--------Received point: " + JSON.stringify(e));
    alert('after---received: ' + JSON.stringify(e));
  },
  disable: function(){
    Ti.Geolocation.removeEventListener('location', locating.onLocationUpdated);
    
    Ti.API.info('after---disable locating');
    alert('after---disable locating');
    
    var activity = Ti.Android.currentActivity;
    activity.removeEventListener('destroy', locating.onAndroidActivityDestroyed);
    activity.removeEventListener('pause',   locating.onAndroidActivityPaused);
    activity.removeEventListener('resume',  locating.onAndroidActivityResumed);
  },
  onAndroidActivityDestroyed: function(){
    locating.disable();
  },
  onAndroidActivityPaused: function(){
    locating.disable();
  },
  onAndroidActivityResumed: function(){
    alert('after---resumed');
    locating.enable();
  },
  enable: function(){
    alert('after---enable');
    Ti.Geolocation.addEventListener('location', locating.onLocationUpdated);
    
    var activity = Ti.Android.currentActivity;
    activity.addEventListener('destroy', locating.onAndroidActivityDestroyed);
    activity.addEventListener('pause',   locating.onAndroidActivityPaused);
    activity.addEventListener('resume',  locating.onAndroidActivityResumed);
  }
};

locating.enable();

$.backToManualSetting.addEventListener('click', function(e){
  locating.disable();
  
  $.win.close();
});

$.win.open();
