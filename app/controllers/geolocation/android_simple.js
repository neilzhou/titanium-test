
if(!Ti.Geolocation.locationServicesEnabled){
  alert('You service has geo turned off - turn it on.');
}
else{
  Ti.Geolocation.Android.manualMode = false;
  Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
  Titanium.Geolocation.addEventListener('location', function(event){
    alert(JSON.stringify(event));
    // alert('event error:' + JSON.stringify(event.error));
    // alert('event SUCCESS:' + JSON.stringify(event.success));
    // alert('event code :' + JSON.stringify(event.code));
    // alert('provider:' + JSON.stringify(event.provider));
    // alert('coords :' + JSON.stringify(event.coords));
  });
}
