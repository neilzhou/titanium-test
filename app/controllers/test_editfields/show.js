var show = {
  insert: function(title, params){
    var importJs = require('import');
    importJs.insertButton($.containerView, title, 'layouts/index', params);
  },
  render: function(){
    show.insert('test textfield focus/blur when showing/hiding', {bodyUrl: 'test_editfields/event'});
    show.insert('test number input textfield focus/blur when showing/hiding', {bodyUrl: 'test_editfields/num_input'});
    
    setTimeout(function(){
      $.trigger('render:finish', {});
    }, 1000);
    
  },
  initialize: function(){
    $.on('render:start', show.render);
  },
};

show.initialize();
