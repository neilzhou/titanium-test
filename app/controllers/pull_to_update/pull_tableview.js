
var show = {
  render: function(){

    setTimeout(function(){
      $.trigger('render:finish', {});
    }, 1000);
  },
  initialize: function(){
    $.on('render:start', show.render);
    var widget = Alloy.createWidget('com.pullToUpdate.widget', {scrollView: $.tableView});
    if(OS_IOS){
      $.tableView.headerPullView = widget.getView();  
    } else {
      $.tableView.headerView = widget.getView();  
    }
    widget.initialize();
  },
};

show.initialize();
