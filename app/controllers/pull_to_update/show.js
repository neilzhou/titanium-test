var show = {
  insert: function(title, url, params){
    var importJs = require('import');
    importJs.insertButton($.containerView, title, url, params);
  },
  render: function(){
    show.insert('test pull scrollview widget', 'layouts/index', {bodyUrl: '/pull_to_update/pull_widget'});
    show.insert('test pull scrollview inline', 'layouts/index', {bodyUrl: '/pull_to_update/pull_inline'});
    show.insert('test pull tableview widget', 'layouts/index', {bodyUrl: '/pull_to_update/pull_tableview'});
    show.insert('test scrollto', 'layouts/index', {bodyUrl: '/pull_to_update/scroll_to'});
    show.insert('test tweetie_like', 'pull_to_update/tweetie_like');
    show.insert('test fokkezb like', 'layouts/index', {bodyUrl: '/pull_to_update/fokkezb'});
    show.insert('test android table header view', 'layouts/index', {bodyUrl: '/pull_to_update/table_headerview'});
    
    setTimeout(function(){
      $.trigger('render:finish', {});
    }, 1000);
    
  },
  initialize: function(){
    $.on('render:start', show.render);
  },
};

show.initialize();
