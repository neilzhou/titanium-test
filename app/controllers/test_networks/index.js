var book = Alloy.createModel('book', {author:'author1', title:'title1', id:'1'});
book.destroy({success: function(model, resp, options){
  Ti.API.info('success callback:' + JSON.stringify(model));
  Ti.API.info('success callback res:' + JSON.stringify(resp));
}, error: function(model, xhr, options){
  Ti.API.info('error callback:' + JSON.stringify(model));
  Ti.API.info('error callback xhr:' + JSON.stringify(xhr));
}});

Ti.API.info(" after fetch book:" + JSON.stringify(book));

setTimeout(function(){
  Ti.API.info(" timeout after fetch book:" + JSON.stringify(book));
}, 10000);

$.win.open();
