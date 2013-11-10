var geo = {
  enabled: false,
  initialized: false,
  locationFailedCallback: null,
  locationSuccessCallback: null,
  locationCallback: function(e){
    if (!e.success || e.error)
    {
      _.isFunction(geo.locationFailedCallback) && geo.locationFailedCallback(e);
      return;
    }

    _.isFunction(geo.locationSuccessCallback) && geo.locationSuccessCallback(e);
  },
  disable: function(){
    if(geo.enabled){
      geo.enabled = false;
      Titanium.Geolocation.removeEventListener('location', geo.locationCallback);  
    }
  },
  enable: function(){
    if(! geo.enabled){
      geo.enabled = true;
      Titanium.Geolocation.addEventListener('location', geo.locationCallback);  
    }
    
  },
  initialize: function(op){
    geo.initialized = true;
    Titanium.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
    if(Ti.Platform.osname == 'ios'){
      Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    } else {
      Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HIGH;
      alert('android accuracy is high');
    }
    Titanium.Geolocation.distanceFilter = 0;
    
    geo.locationFailedCallback = op.locationFailedCallback ? op.locationFailedCallback : null;
    geo.locationSuccessCallback = op.locationSuccessCallback ? op.locationSuccessCallback : null;  
  }
};

module.exports = geo;