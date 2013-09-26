
$.xmlActivityIndicator.show();

var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'green',
  font: {
    fontFamily: 'Helvetica Neue',
    fontSize: 26,
    fontWeight: 'bold'
  },
  message: 'Loading... by controller create',
  style: Ti.UI.ActivityIndicatorStyle.DARK,
  top: 10,
  left: 10,
  height: Ti.UI.SIZE,
  width: Ti.UI.SIZE
});

$.win.add(activityIndicator);
activityIndicator.show();

$.win.open();
