
$.refreshButton.addEventListener('click', function(e){
	$.win.open();
});

var book = Alloy.createModel('book', {title:'Test Model', author: 'Neil'});
Ti.API.info('book created:' + JSON.stringify(book));

book.save();
book.fetch();
book.destroy();

Ti.API.info('book after action:' + JSON.stringify(book));

