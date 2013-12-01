var show = {
  insert: function(title, url, params){
    var importJs = require('import');
    importJs.insertButton($.containerView, title, url, params);
  },
  render: function(){
    show.insert('test pulltoupdate widget', 'layouts/index', {bodyUrl: '/pull_to_update/pull_widget'});
    show.insert('test pulltoupdate inline', 'layouts/index', {bodyUrl: '/pull_to_update/pull_inline'});
    show.insert('test scrollto', 'layouts/index', {bodyUrl: '/pull_to_update/scroll_to'});
    
    setTimeout(function(){
      $.trigger('render:finish', {});
    }, 1000);
    
  },
  initialize: function(){
    $.on('render:start', show.render);
  },
};

show.initialize();
