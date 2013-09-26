exports.insertButton = function(oParent, title, url){
	var button = Ti.UI.createButton({title: title});
	// var button = Alloy.Controller.UI.create('Button', {title:title});
	button.addEventListener('click', function(e){
		Alloy.createController(url);
	});
	oParent.add(button);

};
