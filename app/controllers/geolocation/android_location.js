/*
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
*/
var geo = require('/geo');
var show = {
  onToggleButtonClicked: function(e){
    if($.tf1.visible == 'false' || $.tf1.visible == false){
      $.tf1.visible = true;
      $.tf2.visible = true;
      $.tf3.visible = true;
      this.title = 'Hide TextField';
    } else {
      $.tf1.visible = false;
      $.tf2.visible = false;
      $.tf3.visible = false;
      this.title = 'Show TextField';
    }
  },
  locationFailedCallback: function(e){
    $.latitudeLabel.text = 'error:' + JSON.stringify(e.error);
    $.longitudeLabel.text = '';
    $.accuracyLabel.text = '';
    $.timestampLabel.text = '';
    $.locationStatus.text = "location failed!";
  },
  locationSuccessCallback: function(e){
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;

    //Titanium.Geolocation.distanceFilter = 100; //changed after first location event

    $.latitudeLabel.text = 'long:' + longitude;
    $.longitudeLabel.text = 'lat: '+ latitude;
    $.accuracyLabel.text = 'accuracy:' + accuracy;
    $.timestampLabel.text = 'timestamp:' +new Date(timestamp);

    $.latitudeLabel.color = 'red';
    $.longitudeLabel.color = 'red';
    $.accuracyLabel.color = 'red';
    $.timestampLabel.color = 'red';
    
    $.locationStatus.text = "location success!";
    
    setTimeout(function()
    {
      $.latitudeLabel.color = '#444';
      $.longitudeLabel.color = '#444';
      $.accuracyLabel.color = '#444';
      $.timestampLabel.color = '#444';
    },100);
    
    setTimeout(function(){
      $.locationStatus.text = "location pending...";
    }, 1000);
    
  },
  onToggleEnableButtonClicked: function(e){
    if(geo.enabled){
      geo.disable();
      this.title = 'Enable location';
      $.locationStatus.text = "location disabled!";
    } else if(geo.initialized){
      $.locationStatus.text = "location enable...";
      geo.enable();
      this.title = 'Disable location';
    } else {
      geo.initialize({
        locationFailedCallback: show.locationFailedCallback,
        locationSuccessCallback: show.locationSuccessCallback,
      });      
      geo.enable();
      this.title = 'Disable location';
    }
  },
  render: function(){
    $.locationStatus.text = "location enable...";
    $.toggleEnable.addEventListener('click', show.onToggleEnableButtonClicked);
    
    setTimeout(function(){
      $.trigger('render:finish', {});
    }, 1000);
    
  },
  initialize: function(){
    $.on('render:start', show.render);
  },
};

show.initialize();
