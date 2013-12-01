
var show = {
  insert: function(title, params){
    var importJs = require('import');
    importJs.insertButton($.containerView, title, 'layouts/index', params);
  },
  render: function(){
  	var importJs = require('import');
    importJs.insertButton($.containerView, 'test height=Ti.UI.SIZE', 'test_mobilewebs/height');
    
    setTimeout(function(){
      $.trigger('render:finish', {});
    }, 1000);
    
  },
  initialize: function(){
    $.on('render:start', show.render);
  },
};

show.initialize();
