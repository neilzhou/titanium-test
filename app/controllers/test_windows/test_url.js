var w = Ti.UI.createWindow({
  url: 'foo.js',
  test: 'heelo',
  id: 'w1'
});

w.myMessage = 'The message is set in test url.js, and will be alert undefined in foo.js, because the url will be require firstly.';
w.open();
