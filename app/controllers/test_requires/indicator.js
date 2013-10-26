
var obj = {
  hide: function(){
    setTimeout(function(){
      $.indicatorView.hide();
    }, 2000);
  },
  initialize: function(){
    $.indicatorView.style = Ti.UI.ActivityIndicatorStyle.DARK;
    $.indicatorView.font = {fontSize: 14};
    
    $.showIndicator.addEventListener('click', function(e){
      $.indicatorView.show();
      require('/callback').callback(obj.hide);
    });
    
    $.hideIndicator.addEventListener('click', function(e){
      $.indicatorView.hide();
    });
    
    $.on('show', function(e){
      $.indicatorView.show();
      require('/callback').callback(obj.hide);
    });
  }
};

obj.initialize();
