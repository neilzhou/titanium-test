Ti.Geolocation.Android.manualMode = true;


alert('Geo locationServicesEnabled:' + Ti.Geolocation.locationServicesEnabled);
alert('network online:' + Ti.Network.online);


var gpsProvider = Ti.Geolocation.Android.createLocationProvider({
  name: Ti.Geolocation.PROVIDER_GPS,
  minUpdateTime: 0,
  minUpdateDistance:0
});
Ti.Geolocation.Android.addLocationProvider(gpsProvider);


// var networkProvider = Ti.Geolocation.Android.createLocationProvider({
  // name: Ti.Geolocation.PROVIDER_NETWORK,
  // minUpdateTime: 0,
  // minUpdateDistance:0
// });
// Ti.Geolocation.Android.addLocationProvider(networkProvider);


Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;


Ti.Geolocation.addEventListener('location', function(e){
  alert('received 111: ' + JSON.stringify(e));
});