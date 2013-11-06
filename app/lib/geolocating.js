/**
 * @author: Bo.du
 * @history:
 *   20130922: modified by Neil.zhou, refactor the codes. 
 */
var successCount = 0; // success count of change listner without error
var failureCount = 0; // failed count of change listner with error
var enabled =      false;

// manual setting for android's geolocation
var androidNetworkProvider = null, androidNetworkRule = null, androidGPSProvider = null, androidGPSRule = null;

// set the current co-ordinary when called change listener of geolocation.
var currentCoords = null;

var maxOlderTime = 90 * 1000; // max allowed 2 min which, TODO: will compare location with current location.
var timeoutTime = 50 * 1000; // implement setTimeout to check whether locating is finished, if not neet to manually finish it.

// check whether the error is from GPS provider 
var checkGPSError = function(event){
   // gps is disabled/unavailable
   if(event.error && event.error.indexOf('gps ') == 0 /*&& event.error != 'gps is disabled'*/){
     return true;
   }
   return false;
};

var onLocationUpdated = function(event)
{
  
  // if is gps error, maybe gps is disabled, we will not listen to gps, and only acorrding to network. 
  if(checkGPSError(event)){
    return ;
  }
  if (!event.success || event.error)
  {
    successCount = 0;
    failureCount += 1;
    
    _.isFunction(config.locationErrorCallback) && config.locationErrorCallback(event);
    
  }
  else
  {
    // var moment = require('alloy/moment');
    // var curDay = moment(event.coords.timestamp);
    // alert('onLocationUpdated success current time:' + curDay.format());
    successCount += 1;
    failureCount = 0;
    
    // if previous coords's accuracy is less than event, then use event's coords.
    // currentCoords = currentCoords == null ? event.coords : 
      // (currentCoords.accuracy > event.coords.accuracy ? event.coords : currentCoords);
    
    currentCoords = event.coords;
      
   // note, locationSuccessCallback must not be undefined.
   _.isFunction(config.locationSuccessCallback) && config.locationSuccessCallback(event);
  }
};

var onAndroidActivityDestroyed = function(event)
{
  alert('android destroy.');
  locating.disable();
};

var onAndroidActivityPaused = function(event)
{
  alert('android pause.');
  locating.disable();
};

var onAndroidActivityResumed = function(event)
{
  alert('android resume.');
  locating.enable();
};

var isLocationProviderEnabled = function()
{
  // return Ti.Geolocation.locationServicesEnabled;
  // Ti.API.info('Geo locationServicesEnabled:' + Ti.Geolocation.locationServicesEnabled);
  return Ti.Geolocation.locationServicesEnabled;
};

var clearConfiguration = function(){
  // Ti.API.info('Geolocating clearConfiguration');
  removeAndroidProviderAndRule();
  
  currentCoords = null; // clear object.
  successCount = 0;
  failureCount = 0;
  locating.currentStatus = locating.status.NOT_STARTED;
  
  config = _.extend({}, defaultConfig); // reset config variables.
};
  
var addAndroidProviderAndRule = function(){
  // 20130918: add by neil for manual settings of android geolocation
  if(Alloy.CFG.android){
    if(config.androidManual){
      /* Manual model settings for android. */
      Ti.Geolocation.Android.manualMode = true;
      var provider = {
        minUpdateTime: 0,
        minUpdateDistance: 0
      };
      var rule = {
        accuracy: config.androidAccuracy, // updates will called if accuracy is less than 100m.
        maxAge: 60000, // updates will called if returned coords is not older than 1min.
        minAge: 0      // But  no more frequent than once per 0 seconds
      };
      
      // alert('manual android settings, rule:' + JSON.stringify(rule));
      
      androidNetworkProvider = Ti.Geolocation.Android.createLocationProvider(_.extend(provider, {name: Ti.Geolocation.PROVIDER_NETWORK}));
      androidNetworkRule = Ti.Geolocation.Android.createLocationRule(_.extend(rule, {provider: Ti.Geolocation.PROVIDER_NETWORK}));
      Ti.Geolocation.Android.addLocationProvider(androidNetworkProvider);
      Ti.Geolocation.Android.addLocationRule(androidNetworkRule);
      
      androidGPSProvider = Ti.Geolocation.Android.createLocationProvider(_.extend(provider, {name: Ti.Geolocation.PROVIDER_GPS}));
      androidGPSRule = Ti.Geolocation.Android.createLocationRule(_.extend(rule, {provider: Ti.Geolocation.PROVIDER_GPS}));
      Ti.Geolocation.Android.addLocationProvider(androidGPSProvider);
      Ti.Geolocation.Android.addLocationRule(androidGPSRule);
      
    } else {
      Ti.Geolocation.Android.manualMode = false;
      if(config.accuracy == locating.accuracy.HEIGH){
        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
      } else {
        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_LOW;
      }
    }
  }
};
  
var removeAndroidProviderAndRule = function(){
  // 20130918: add by neil for manual settings of android geolocation
  // alert('remove provider');
  if(Alloy.CFG.android){
    Ti.Geolocation.Android.manualMode = false;
    
    if (androidNetworkProvider != null) {
      Ti.Geolocation.Android.removeLocationProvider(androidNetworkProvider);
      androidNetworkProvider = null;
    }
    if (androidGPSProvider != null) {
      Ti.Geolocation.Android.removeLocationProvider(androidGPSProvider);
      androidGPSProvider = null;
    }
    if(androidNetworkRule != null){
      Ti.Geolocation.Android.removeLocationRule(androidNetworkRule);
      androidNetworkRule = null;
    }
    if(androidGPSRule != null){
      Ti.Geolocation.Android.removeLocationRule(androidGPSRule);
      androidGPSRule = null;
    }
  }
};

var locating = {
  accuracy: {HEIGH: 1, LOW: 2},
  status: {PENDING: 1, DISABLED: 2, NOT_STARTED: 0},
  currentStatus: 0,
  enable: function()
  {
    // Ti.API.info('enable locating:' + enabled);
     alert('enable');
    if (!enabled)
    {
      enabled = true;
      locating.currentStatus = locating.status.PENDING;
      
      Ti.Geolocation.addEventListener('location', onLocationUpdated);
      if (Alloy.CFG.android)
      {
        var activity = Ti.Android.currentActivity;
        activity.addEventListener('destroy', onAndroidActivityDestroyed);
        activity.addEventListener('pause',   onAndroidActivityPaused);
        activity.addEventListener('resume',  onAndroidActivityResumed);
      }
      
      // 20131015: created by neil to add timeout.
      setTimeout(function(){
        if(locating.currentStatus == locating.status.PENDING){
          _.isFunction(config.locationErrorCallback) && config.locationErrorCallback("定位超时。");          
          locating.clear();
        }
      }, timeoutTime);
    }
    return locating;
  },
  disable: function()
  {
    alert('disable');
    locating.currentStatus = locating.status.DISABLED;
    // Ti.API.info('disable locating:' + enabled);
    if (enabled)
    {
      enabled = false;
      Ti.Geolocation.removeEventListener('location', onLocationUpdated);
      // Ti.API.info('disable locating');
      if (Alloy.CFG.android)
      {
        var activity = Ti.Android.currentActivity;
        activity.removeEventListener('destroy', onAndroidActivityDestroyed);
        activity.removeEventListener('pause',   onAndroidActivityPaused);
        activity.removeEventListener('resume',  onAndroidActivityResumed);
      }
    }
    return locating;
  },
  clear: function(){
    locating.disable();
    clearConfiguration();
  },
  configureProvider: function()
  {
    if (Alloy.CFG.ios)
    {
      if(config.accuracy == locating.accuracy.HEIGH){
        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
      } else {
        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HUNDRED_METERS;
      }
    }
    else if (Alloy.CFG.mobileweb)
    {
      if(config.accuracy == locating.accuracy.HEIGH){
        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
      } else {
        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_LOW;
      }
      // Ti.Geolocation.MobileWeb.maximumLocationAge = 15000; // 15 seconds.
      Ti.Geolocation.MobileWeb.locationTimeout = config.mobileWebLocationTimeout; // 30 seconds.
    }
    else if(Alloy.CFG.android){
      // 20130918: added by neil for manual settings of android geolocation.
      addAndroidProviderAndRule();
    }
    
    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS; //Ti.Geolocation.PROVIDER_NETWORK;
    
    return locating;
  },
  initialize: function(options)
  {
    options = typeof options == 'undefined' || options == null ? {} : options;
    config = _.extend(config, options);
    options = {}; // clear options.
    if (Alloy.CFG.ios)
    {
      Ti.Geolocation.purpose = config.iosPurpose;
    }
    return locating;
  },
  checkProviderEnabled: function()
  {
    // 20130906: modified by neil, only providerEnabled = false, then alert.
    if (isLocationProviderEnabled())
    {
      return true;
    }
    
    _.isFunction(config.providerDisabledCallback) && config.providerDisabledCallback();
    return false;
  }
};


// default configuration.
var defaultConfig = {
  maxUpdateCount: 2, // max success count of change listener.
  iosPurpose: '利用GPS自动获取您所在的位置，节省您宝贵的时间。',
  androidManual: false, // whether use android manual/simple
  androidAccuracy: 200, // only use when androidManual = true, updates will called if accuracy is less than 100m.
  mobileWebLocationTimeout: 30000, // used for mobile web, timeout for geolocation,
  accuracy: locating.accuracy.LOW, // default to locating.accuracy.HEIGH if androidManual = true, this setting will be ignored.
  
  providerDisabledCallback: null, // callback function when provider service disabled. 
  locationErrorCallback: null, // error callback function when location listener fetch error.
  locationSuccessCallback: null   // success callback function when location listener fetch success.
};

var config = _.extend({}, defaultConfig);


module.exports = locating;
