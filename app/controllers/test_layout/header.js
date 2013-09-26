
$.backButton.addEventListener('click', function(e){
	$.trigger('click:back-home', e);
	
});

$.goRequireViewButton.addEventListener('click', function(e){
	// console.log('click goRequireViewButton');
	alert('click go require view button in header view');
	// console.dir(Alloy.Globals.controller);
	Alloy.createController('requires/require_view').getView().open();
	Alloy.Globals.controller.getView().close();
	// $.trigger('click:go-require-view', e);
	
});

// console.dir(Alloy.Globals.controller);
