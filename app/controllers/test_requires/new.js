
var newJs = {
  initialize: function(){
    $.openButton.addEventListener('click', function(){
      Alloy.createController('test_requires/xml');
    });
    $.backButton.addEventListener('click', function(){
      $.win.close();
    });
    
    $.win.open();
  },
};

newJs.initialize();
