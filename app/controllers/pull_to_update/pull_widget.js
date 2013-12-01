
var show = {
  render: function(){
    $.pullToUpdate.initialize({scrollView: $.scrollView});
    
    setTimeout(function(){
      $.trigger('render:finish', {});
    }, 1000);
  },
  initialize: function(){
    $.on('render:start', show.render);
  },
};

show.initialize();
