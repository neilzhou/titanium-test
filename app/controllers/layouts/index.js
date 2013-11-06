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
    
    if(layout.bodyController){
      layout.bodyController.trigger('render:start', {});  
    }
    
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
    return layout;
  }
};

layout.initialize().open().render();
