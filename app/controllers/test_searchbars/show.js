var show = {
  insert: function(title, params){
    var importJs = require('import');
    importJs.insertButton($.containerView, title, 'layouts/index', params);
  },
  render: function(){
    
    setTimeout(function(){
      $.trigger('render:finish', {});
    }, 1000);
    
  },
  initialize: function(){
    $.on('render:start', show.render);
  },
};

show.initialize();
