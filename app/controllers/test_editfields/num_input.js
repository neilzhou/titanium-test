var show = {
  onToggleButtonClicked: function(e){
    if($.widget1.visible == 'false' || $.tf1.visible == false){
      $.widget1.visible = true;
      $.widget2.visible = true;
      $.widget3.visible = true;
      this.title = 'Hide TextField';
    } else {
      $.widget1.visible = false;
      $.widget2.visible = false;
      $.widget3.visible = false;
      this.title = 'Show TextField';
    }
  },
  render: function(){
    $.toggleButton.addEventListener('click', show.onToggleButtonClicked);
    setTimeout(function(){
      $.trigger('render:finish', {});
    }, 1000);
    
  },
  initialize: function(){
    $.on('render:start', show.render);
  },
};

show.initialize();
