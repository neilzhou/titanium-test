exports.insertButton = function(oParent, title, url, params){
	var button = Ti.UI.createButton({title: title});
	params = params ? params : {};
	// var button = Alloy.Controller.UI.create('Button', {title:title});
	button.addEventListener('click', function(e){
		Alloy.createController(url, params);
	});
	oParent.add(button);

};
