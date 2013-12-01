var show = {
  insert: function(title, url){
    var importJs = require('import');
    importJs.insertButton($.containerView, title, url);
  },
  render: function(){
    show.insert('test ios custom tabgroup', '/test_tabgroups/ios_custom');
    show.insert('test dianlike style ios tabgroup', 'test_tabgroups/dianlikestyle');
    
    setTimeout(function(){
      $.trigger('render:finish', {});
    }, 1000);
    
  },
  initialize: function(){
    $.on('render:start', show.render);
  },
};

show.initialize();
