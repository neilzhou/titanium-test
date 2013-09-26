
$.headerRequire.on('click:back-home', function(e){
	Ti.API.info('header require click back home e:' + e);
	alert('header require click back home');
	Alloy.createController('index').getView().open();
	$.win.close();
});

var headerController = Alloy.createController('test_layout/header');
console.dir(headerController);
var headerView = headerController.getView();
console.dir(headerView);
$.win.add(headerView);

Alloy.Globals.controller = $;
// console.dir(Alloy.Globals.controller);
$.win.open();
