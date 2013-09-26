alert('network online:' + Ti.Network.online);
if(Ti.Network.online){
  Ti.Geolocation.Android.manualMode = true;
  
  var provider = Ti.Geolocation.Android.createLocationProvider({
    name: Ti.Geolocation.PROVIDER_NETWORK,
    minUpdateTime: 0,
    minUpdateDistance: 0.0
  });
  
  var rule = Ti.Geolocation.Android.createLocationRule({
    provider: Ti.Geolocation.PROVIDER_NETWORK,
    name: Ti.Geolocation.PROVIDER_NETWORK,
    accuracy: 1000, // 1000 meters
    maxAge: 1 * 60 * 1000, // 1min
    minAge: 1 * 1000 // 1 seconds
  });
  
  Ti.Geolocation.Android.addLocationProvider(provider);
  
  Ti.Geolocation.addEventListener('location', function(event){
    alert("network location:" + JSON.stringify(event));
  });
  
} else {
  alert('network is not enable, please.');
}
