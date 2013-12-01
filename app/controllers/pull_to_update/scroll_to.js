var show = {
  render: function(){
    setTimeout(function(){
      $.scrollView.scrollTo(0, 120);
      $.trigger('render:finish', {});
    }, 1000);
  },
  initialize: function(){
    $.on('render:start', show.render);
  },
};

show.initialize();
