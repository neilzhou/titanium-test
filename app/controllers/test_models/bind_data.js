
// Enable the title attribute in square brackets.
function transformCallback(model){
	// Need to convert the model to JSON object.	
	var transform = model.toJSON();
	transform.title = '[' + transform.title + ']';
	// example of creating a custom attribute, reference in the view using {custom}
	transform.custom = transform.title + ' by ' + transform.author;
	
	Ti.API.info('transform:' + JSON.stringify(transform));
	
	Ti.API.info('transformCallback $model library:'+JSON.stringify($model));
	
	return transform;
}

// Show only book models by Mark Twain
function filterCallback(collection){
	Ti.API.info('filter:' + JSON.stringify(collection.where({author:'Mark Twain'})));
	Ti.API.info('filterCallback $model library:'+JSON.stringify($model));
	return collection.where({author:'Mark Twain'});
}

// ------------------------------Note Start:---------------------------
// init the library data. if we use add, then the bind view will refresh some times, eg, here is refresh 4 times
// so here we create singleton collection in the alloy.js, but we need trigger change to tell

// Trigger the synchronization
var library = Alloy.Collections.book;
// library.trigger('change');

$.cBook.on('change',  function(model, options){
	console.dir(model);
	console.dir(options);
	Ti.API.info('change model:' + JSON.stringify(model));
	Ti.API.info('change options:' + JSON.stringify(options));
}, $.cBook);

$.cBook.reset([{title: 'Mark Twain book1', author: 'mark twain'},
	{title: 'Mark Twain book2', author: 'Mark Twain'},
	{title: 'Mark Twain book3', author: 'marn'},
	{title: 'Mark Twain book4', author: 'Mark Twain'}]);
	
// $.cBook.at(1).set({author:'Neil zhou'});
Ti.API.info('after change index[1] object, cbook is:' + JSON.stringify($.cBook));
// library.add([
	// {title: 'Mark Twain book1', author: 'mark twain'},
	// {title: 'Mark Twain book2', author: 'Mark Twain'},
	// {title: 'Mark Twain book3', author: 'marn'},
	// {title: 'Mark Twain book4', author: 'Mark Twain'},
// ]);

// Note END--------------------------

Ti.API.info('instance library:'+JSON.stringify(library));
Ti.API.info('singleton library:'+JSON.stringify(Alloy.Collections.book));
Ti.API.info('$model library:'+JSON.stringify($model));

// $.vBind.dataCollection = Alloy.createCollection('book', [{title: 'Mark Twain book1', author: 'mark twain'},
	// {title: 'Mark Twain book2', author: 'Mark Twain'},
	// {title: 'Mark Twain book3', author: 'marn'},
	// {title: 'Mark Twain book4', author: 'Mark Twain'}]);
// $.vBind.dataTransform = transformCallback;
$.dBook = Alloy.createCollection('book', [{title: 'Mark Twain book1', author: 'mark twain'},
	{title: 'Mark Twain book2', author: 'Mark Twain'},
	{title: 'Mark Twain book3', author: 'marn'},
	{title: 'Mark Twain book4', author: 'Mark Twain'}]);

Alloy.Models.book.set({title: 'Mark model singlton book', author: 'Neil.zhou'});

$.book2.set({title: 'Mark model instance book', author: 'Neil.zhou22'});

$.win.open();
// $.cBook.trigger('change');

$.cBook.on('change fetch add remove', function(e){
	// insert TableViewRow to $.table.
	renderTable();
});

function renderTable(){
	$.cBook.each(function(model){
		var row = Ti.UI.createTableViewRow({
			height: 10
		});
		row.add(Ti.UI.createLabel({
			text: model.get('title'),
		}))
	});
}
