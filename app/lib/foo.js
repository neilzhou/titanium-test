console.dir(Ti.UI.currentWindow);
alert(Ti.UI.currentWindow.myMessage);
alert(Ti.UI.currentWindow.test);

Ti.UI.currentWindow.add(Ti.UI.createLabel({text: Ti.UI.currentWindow.myMessage}));
Ti.UI.currentWindow.add(Ti.UI.createLabel({text: Ti.UI.currentWindow.test}));
