var bodyUrl = arguments[0] && arguments[0].bodyUrl ? arguments[0].bodyUrl : false;
var bodyParams = arguments[0] && arguments[0].bodyParams ? arguments[0].bodyParams : {};

var layout = {
  bodyController: null,
  onBodyFinished: function(e){
    $.overlay.hide();
    $.overlay.height = 0;
  },
  onAndroidbacked: function(e){
    layout.close();
  },
  render: function(){
    $.overlay.show();
    setTimeout(function(){
    	$.overlay.hide();
    }, 1000);
    return layout;
  },
  close: function(){
    $.index.close();
    
    if(layout.bodyController){
      layout.bodyController.trigger('destroy', {});
      layout.bodyController = null;
    }
    return layout;
  },
  open: function(){
    $.index.open();
    
    $.backButton.addEventListener('click', layout.close);
    $.index.addEventListener('androidback', layout.onAndroidbacked);
    return layout;
  },
  initialize: function(){
    if(bodyUrl){
      layout.bodyController = Alloy.createController(bodyUrl, bodyParams);
      $.bodyView.add(layout.bodyController.getView());
      
      layout.bodyController.on('render:finish', layout.onBodyFinished);
    }
    
    $.expandMenu.visible = false;
    $.expandMenu.height = 0;
    $.menuButton.addEventListener('click', function(e){
      if($.expandMenu.visible == 'false' || $.expandMenu.visible == false){
        $.expandMenu.visible = true;
        $.expandMenu.height = Ti.UI.SIZE;
      } else {
        $.expandMenu.visible = false;
        $.expandMenu.height = 0;
      }
    });
    return layout;
  }
};

layout.initialize().open().render();
