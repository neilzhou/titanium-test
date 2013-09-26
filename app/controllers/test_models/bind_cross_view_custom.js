
var bindCrossView = {
  renderBook: function(e){
    var curModel = this;
    if(curModel.hasChanged('author')){
      $.authorLabel.text = curModel.get('author'); 
      Ti.API.info('render book changed author, changed:' + JSON.stringify(curModel.changed));
    }
    if(curModel.hasChanged('title')){
      $.titleLabel.text = curModel.get('title'); 
      Ti.API.info('render book changed title, changed:' + JSON.stringify(curModel.changed));
    }
    
    Ti.API.info('render book this:' + JSON.stringify(curModel));
  },
  
  onOpenWindowButtonClicked: function(e){
    bindCrossView.close();
    Alloy.createController('test_models/cross_view');
    
  },
  
  initialize: function(){
    Alloy.Globals.book = typeof Alloy.Globals.book == 'undefined' || Alloy.Globals.book == null 
      ? Alloy.createModel('book', {author:'author1', title:'title1'}) : Alloy.Globals.book;
    Alloy.Globals.book.on('change', this.renderBook, Alloy.Globals.book);
    
    Alloy.Globals.book.set({author:'author2'});
    Alloy.Globals.book.trigger('change');
    
    $.openWindowButton.addEventListener('click', this.onOpenWindowButtonClicked);
    $.win.addEventListener('close', function(e){
      Ti.API.info('destroy win');
      Alloy.Globals.book.off('change', this.renderBook);
    });
    
    return this;
  },
  open: function(){
    $.win.open();
    return this;
  },
  close: function(){
    $.win.close();
    return this;
  }
};

bindCrossView.initialize().open();