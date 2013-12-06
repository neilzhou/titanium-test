
var show = {
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
