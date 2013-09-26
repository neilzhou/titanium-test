
function processData(books){
   var data = [];
   alert("books:"+ JSON.stringify(tableView));
   books.forEach(function(book){
       var label = book.title + ' by ' + book.authors;
       var row = Ti.UI.createTableViewRow({title:label});
       data.push(row);
   });
   // tableView is a Ti.UI.TableView object in the view
   $.tableView.setData(data);
}
// $.sfb.setHandlers({
   // success: processData
// });


var c = Alloy.createController('requires/sample');
console.dir(c);
console.dir(c.getView());

// $.win.add(c.getView());
// $.win.add(c.getView('sample2'));
$.win.open();
