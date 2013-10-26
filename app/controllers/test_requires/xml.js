
var newJs = {
  initialize: function(){
    $.openNewButton.addEventListener('click', function(){
      Alloy.createController('test_requires/new');
    });
    // $.indicatorRequired.trigger('show', {});    
    $.win.open();
  },
};

newJs.initialize();
