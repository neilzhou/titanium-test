// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Collections.book = Alloy.createCollection('book');
Alloy.Collections.book.reset([
	{title: 'Mark Twain book1', author: 'mark twain'},
	{title: 'Mark Twain book2', author: 'Mark Twain'},
	{title: 'Mark Twain book3', author: 'marn'},
	{title: 'Mark Twain book4', author: 'Mark Twain'},
]);

Alloy.Models.book = Alloy.createModel('book');
