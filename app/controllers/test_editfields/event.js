var show = {
  onToggleButtonClicked: function(e){
    if($.tf1.visible == 'false' || $.tf1.visible == false){
      $.tf1.visible = true;
      $.tf2.visible = true;
      $.tf3.visible = true;
      this.title = 'Hide TextField';
    } else {
      $.tf1.visible = false;
      $.tf2.visible = false;
      $.tf3.visible = false;
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
