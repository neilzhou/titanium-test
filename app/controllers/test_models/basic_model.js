var book = Alloy.createModel('book',{title:'Computer Design', author:'Neil.zhou'});
var title = book.get('title');
var author = book.get('author');

// Label Object in the view with id="label"
$.label.text = title + ' by ' + author;

var status = book.set({author:'', validate:false});
book.validationError2();
console.dir(book);

if(status === false){
	Ti.API.info('book set failed!');
}else{
	// Since set or save(attribute) is not being called, we can call isValid to validate the model object.
	if(book.isValid() && book.customProperty == 'book'){
		book.customFunction();
		// save the data to persistent storage.
		book.save();
	}else{
		Ti.API.info('Model validate failed!');
		book.destroy();
	}
}

var liberary = Alloy.createCollection('book');
liberary.add({title:'book3', author:'book3 author'});
liberary.add({title:'book1', author:'book1 author'});
liberary.add({title:'book2', author:'book2 author'});

Ti.API.info("liberary: "+ JSON.stringify(liberary));
var data = [];
liberary.map(function(book){
	// The book argument is an individual model object in the collection.
	var title = book.get('title');
	var author = book.get('author');
	var row = Ti.UI.createTableViewRow({'title': title});
	data.push(row);
	book.set({title: title+' map'});
});
Ti.API.info("liberary: "+ JSON.stringify(liberary));
$.table.setData(data);

function event_callback (context) {
	var output = context || 'change is bad.';
    Ti.API.info(output);
};
// Bind the callback to the change event of the collection.
liberary.on('change', event_callback);
// Trigger the change event and pass context to the handler.
liberary.trigger('change', 'change is good.');
// Passing no parameters to the off method unbinds all event callbacks to the object.
liberary.off();
// This trigger does not have a response.
liberary.trigger('change');

$.win.open();
