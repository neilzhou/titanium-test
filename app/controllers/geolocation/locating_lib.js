var locating = require('/geolocating');

        
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
    if(locating.currentStatus == locating.status.NOT_STARTED){
      $.locationStatus.text = "location initialize...";
      locating.initialize({
        maxUpdateCount: 2,
        providerDisabledCallback: show.locationFailedCallback,
        locationErrorCallback:   show.locationFailedCallback,
        locationSuccessCallback: show.locationSuccessCallback
      });    
      if (locating.checkProviderEnabled())
      {
        alert('goto enable');
        locating.configureProvider().enable();
      }
      alert('change title');
      this.title = 'Disable location';
    } else if(locating.currentStatus == locating.status.DISABLED){
      $.locationStatus.text = "location enable...";
      if (locating.checkProviderEnabled())
      {
        locating.enable();
      }
      this.title = 'Disable location';
    } else {
      if (locating.checkProviderEnabled())
      {
        locating.disable();
      }
      this.title = 'Enable location';
      $.locationStatus.text = "location disabled!";
    }
  },
  render: function(){
    $.locationStatus.text = "location initialize...";
    alert('in the lib');
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
