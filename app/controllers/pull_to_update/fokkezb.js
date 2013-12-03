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

function myLoader(e) {
  Ti.API.info('myLoader e is:' + JSON.stringify(e));
  setTimeout(function(){
    e.hide();
  }, 2000);
}

show.initialize();