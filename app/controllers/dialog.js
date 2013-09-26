function doClick(e){
	$.win.close();
}

args = arguments[0] || {};
console.dir(args);
if(args.button) {
	var style = $.createStyle({
		classes: args.button,
		apiName: 'Button',
		color: 'blue'
	});
	$.button.applyProperties(style);
}

if(args.win){
	var style = $.createStyle({
		classes: args.win,
		apiName: 'Window',
		backgroundColor: 'white'
	});
	$.win.applyProperties(style);
}

if(args.label){
	args.label.top = 10;
	var label = $.UI.create('Label', args.label);
	$.win.add(label);
}
