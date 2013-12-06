/*
 * @history 
 *   20131015: created by neil for collection for add/remove
 */
var options = {
  height: 65,
  refreshOffset: 0,
  refreshCallback: null,
  scrollStrategy: 'table',
  pullMessage: '下拉可以刷新...',
  releaseMessage: '松开可以刷新...',
  refreshMessage: '加载中...',
  scrollView: null,
  refreshCallback: null,
};

options = typeof arguments[0] == 'undefined' ? options : _.extend(options, arguments[0]);
options = _.omit(options, ['id', "__parentSymbol"]); // remove the default system add property.

if(options.scrollView == null){
  options.scrollView = __parentSymbol;
}

var callRefresh = function(e){
  if(_.isFunction(options.refreshCallback)){
    options.refreshCallback(e, scrollStrategy.hidePullView);
  } else {
    setTimeout(function(){scrollStrategy.hidePullView()}, 2000);
  }
};

var ScrollViewHeader = {
  offset: 0,
  heightPX: 0,
  dragging: false,
  isTableView: function(){
    return options.scrollStrategy == 'table';
  },
  isArrivalAtRefresh: function(){
    return ScrollViewHeader.offset <= options.refreshOffset;
  },
  isArrivalAtNotice: function(){
    return !ScrollViewHeader.isArrivalAtRefresh() && ScrollViewHeader.offset < options.height;
  },
  showHeader: function(){

  },
  hidePullView: function(){

    StatusController.finishRefresh();

    UIController.hidePullView();

    var offset = ScrollViewHeader.offset;
    if(offset >= options.height){
      UIController.pullView.height = 0;
      options.scrollView.contentOffset = {x:0, y:(offset - ScrollViewHeader.heightPX)};
    } else {
      UIController.pullView.height = 0;
      if(ScrollViewHeader.isTableView()){
        options.scrollView.scrollToTop(0);
      } else {
        // options.scrollView.scrollTo(0, 0);
         options.scrollView.contentOffset = {x:0, y:0};
      }
    }

  },
  onScrolled: function(e){
    // Ti.API.info('event:' + JSON.stringify(e));
    if(e.y === null){
      return;
    }
    ScrollViewHeader.offset = e.y; 
    
    // Ti.API.info('height:' + UIController.pullView.height + ", options height: " + options.height + ", isin:" + (UIController.pullView.height == 0 && ScrollViewHeader.offset < -5) + ", offset:" + ScrollViewHeader.offset);
    if(UIController.pullView.height == 0 && ScrollViewHeader.offset < -5 && ScrollViewHeader.dragging){
      UIController.pullView.height = options.height;
      // 20131203: added by neil to reset the scrollview offset.
      // options.scrollView.contentOffset = {x:0, y:(ScrollViewHeader.offset + ScrollViewHeader.heightPX)};
      // options.scrollView.scrollTo(0, UIController.pullView.height);
      return;
    }
    if(UIController.pullView.height == 0){
      return ; // if not visible, not pull & refresh.
    }

    // Ti.API.info('offset:' + ScrollViewHeader.offset + ", is arrival at refresh:" + ScrollViewHeader.isArrivalAtRefresh() + ", is notice:" + ScrollViewHeader.isArrivalAtNotice() + ", pulling: " + StatusController.pulling + ", reloading:" + StatusController.reloading);
    if (StatusController.isNotPullingAndRefresh() && ScrollViewHeader.isArrivalAtRefresh())
    {
      StatusController.setPulling();
      UIController.showRelease();
    }
    else if (StatusController.isPulling() && ScrollViewHeader.isArrivalAtNotice())
    {
      StatusController.setNoticing();
      UIController.showPull();
    }
  },
  onDragended: function(e){
    // Ti.API.info('drag end e:' + JSON.stringify(e));
    ScrollViewHeader.dragging = false;
    if (StatusController.isPulling())
    {
      StatusController.setRefreshing();
      
      UIController.showRefresh();
      // ScrollViewHeader.showHeader();

      callRefresh(e);
    } else if(UIController.pullView.height != 0 && ! StatusController.isRefreshing()) {
      ScrollViewHeader.hidePullView();
    }
  },
  onDragstarted: function(e){
    ScrollViewHeader.dragging = true;
    if(UIController.pullView.height == 0 &&  ScrollViewHeader.dragging){
      var offset = ScrollViewHeader.offset;
      UIController.pullView.height = options.height;
      // 20131203: added by neil to reset the scrollview offset.
      options.scrollView.contentOffset = {x:0, y:(offset + ScrollViewHeader.heightPX)};
      // options.scrollView.scrollTo(0, UIController.pullView.height);
      return;
    }
  },
  addListener: function(){
    // if(options.scrollStrategy == 'table'){
    //   var event0 = 'scrollend';
    //   options.scrollView.addEventListener(event0, ScrollViewHeader.onDragended);
    // }

    if(OS_IOS){
      var event1 = 'dragEnd';
      var event2 = 'dragStart';
      if (Ti.version >= '3.0.0') {
        event1 = 'dragend';
        event2 = 'dragstart';
      }    
    } else {
      var event1 = 'touchend';
      var event2 = 'touchstart';
    }  
    options.scrollView.addEventListener(event1, ScrollViewHeader.onDragended);
    options.scrollView.addEventListener(event2, ScrollViewHeader.onDragstarted);
    options.scrollView.addEventListener('scroll', ScrollViewHeader.onScrolled);
  },
  initialize: function(){
    // var tmp = _.extend(options, {height: 0});
    UIController.init(options);
    UIController.pullView.height = 0;
    ScrollViewHeader.addListener();

    // options.scrollView.scrollTo(0, UIController.pullView.height);
    ScrollViewHeader.heightPX = require('alloy/measurement').dpToPX(options.height);
    // options.scrollView.contentOffset = {x:0, y: ScrollViewHeader.heightPX};
      
  }
};

// because user experience of setting contentOffset is very bad, so use another resolution.
var iOSScrollViewHeader = {
  offset: 0,
  dragging: false,
  resetingScroll: false,
  isArrivalAtRefresh: function(){
    return iOSScrollViewHeader.offset <= options.refreshOffset;
  },
  isArrivalAtNotice: function(){
    return !iOSScrollViewHeader.isArrivalAtRefresh() && iOSScrollViewHeader.offset < options.height;
  },
  showHeader: function(){

  },
  hidePullView: function(){

    StatusController.finishRefresh();

    UIController.hidePullView();
    // only when pull view is viewed, need to scroll to not visible.
    if(iOSScrollViewHeader.offset < options.height){
      iOSScrollViewHeader.resetingScroll = true;
      options.scrollView.scrollTo(0, options.height);
    }
  },
  onScrolled: function(e){
    // Ti.API.info('event:' + JSON.stringify(e));
    if(e.y === null){
      return;
    }
    iOSScrollViewHeader.offset = e.y; 
    
    // if not reseting and not draging and not refresh, then reset.
    if(iOSScrollViewHeader.dragging == false && iOSScrollViewHeader.resetingScroll == false && !StatusController.isRefreshing()){
      iOSScrollViewHeader.hidePullView();
      return;
    } else if (StatusController.isNotPullingAndRefresh() && iOSScrollViewHeader.isArrivalAtRefresh())
    {
      StatusController.setPulling();
      UIController.showRelease();
    }
    else if (StatusController.isPulling() && iOSScrollViewHeader.isArrivalAtNotice())
    {
      StatusController.setNoticing();
      UIController.showPull();
    }
  },
  onDragended: function(e){
    // Ti.API.info('drag end e:' + JSON.stringify(e));
    iOSScrollViewHeader.dragging = false;
    if (StatusController.isPulling())
    {
      StatusController.setRefreshing();
      
      UIController.showRefresh();

      callRefresh(e);
    } else if(! StatusController.isRefreshing()) {
      iOSScrollViewHeader.hidePullView();
    }
  },
  onDragstarted: function(e){
    iOSScrollViewHeader.dragging = true;
    iOSScrollViewHeader.resetingScroll = false;
  },
  addListener: function(){
    var event1 = 'dragEnd';
    var event2 = 'dragStart';
    if (Ti.version >= '3.0.0') {
      event1 = 'dragend';
      event2 = 'dragstart';
    }    
    options.scrollView.addEventListener(event1, iOSScrollViewHeader.onDragended);
    options.scrollView.addEventListener(event2, iOSScrollViewHeader.onDragstarted);
    options.scrollView.addEventListener('scroll', iOSScrollViewHeader.onScrolled);
  },
  initialize: function(){
    UIController.init(options);
    iOSScrollViewHeader.addListener();
    
    iOSScrollViewHeader.offset = options.height;
    // because eight setContentOffset or scrollTo not work when init just after appending, so need to add a interval.
    var time1 = setInterval(function(){
      if(iOSScrollViewHeader.offset < options.height){
        clearInterval(time1);
      } else {
        options.scrollView.setContentOffset({x:0, y: options.height}, {animated: false });
      }
    }, 100);
  }
};

var iOSTableViewHeader = {
  offset: 0,
  isArrivalAtRefresh: function(){
    return iOSTableViewHeader.offset <= (options.refreshOffset - options.height);
  },
  isArrivalAtNotice: function(){
    return ((!iOSTableViewHeader.isArrivalAtRefresh()) && iOSTableViewHeader.offset < 0)
  },
  showHeader: function(){
    // when you're done, just reset
    options.scrollView.setContentInsets({top:options.height},{animated:true});
  },
  hideHeader: function(){
    options.scrollView.setContentInsets({top:0},{animated:true});
  },
  hidePullView: function(){
    // when you're done, just reset
    iOSTableViewHeader.hideHeader();
    
    StatusController.finishRefresh();

    UIController.hidePullView();
  },
  onScrolled: function(e){
    // if(e.y == null){
    //   return;
    // }
    iOSTableViewHeader.offset = e.contentOffset.y;

    // Ti.API.info('offset:' + iOSTableViewHeader.offset + ", is arrival at refresh:" + iOSTableViewHeader.isArrivalAtRefresh(pullHandler.offset) + ", is notice:" + iOSTableViewHeader.isArrivalAtNotice(pullHandler.offset) + ", pulling: " + StatusController.pulling + ", reloading:" + StatusController.reloading);
    if (StatusController.isNotPullingAndRefresh() && iOSTableViewHeader.isArrivalAtRefresh())
    {
      StatusController.setPulling();
      UIController.showRelease();
    }
    else if (StatusController.isPulling() && iOSTableViewHeader.isArrivalAtNotice())
    {
      StatusController.setNoticing();
      UIController.showPull();
    }
  },
  onDragended: function(e){
    if (StatusController.isPulling())
    {
      StatusController.setRefreshing();
      
      UIController.showRefresh();
      iOSTableViewHeader.showHeader();

      callRefresh(e);
    }
  },
  addListener: function(){
    var event1 = 'dragEnd';
    if (Ti.version >= '3.0.0') {
      event1 = 'dragend';
    }  
    
    options.scrollView.addEventListener(event1, iOSTableViewHeader.onDragended);
    options.scrollView.addEventListener('scroll', iOSTableViewHeader.onScrolled);
  },
  initialize: function(){
    UIController.init(options);
    iOSTableViewHeader.addListener();
  }
};

if(OS_IOS && options.scrollStrategy == 'table'){
  var scrollStrategy = iOSTableViewHeader;
} else if(OS_IOS){
  var scrollStrategy = iOSScrollViewHeader;
} else {
  var scrollStrategy = ScrollViewHeader;
}

var UIController = {
  pullView: $.pullView,
  arrow: $.arrowView,
  statusLabel: $.statusLabel,
  actInd: $.actInd,
  init: function(context){
    context = _.omit(context, ['scrollView']); // remove the default system added property.
    
    // initilize options to object.
    for(var key in context){
      UIController.pullView[key] = context[key];
    }
    UIController.statusLabel.text = options.pullMessage;
    if(OS_IOS){
      UIController.actInd.style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
    } else {
      UIController.actInd.style = Ti.UI.ActivityIndicatorStyle.DARK;
    }

  },
  hidePullView: function(){
    //lastUpdatedLabel.text = "Last Updated: "+formatDate();
    UIController.statusLabel.text = options.pullMessage;
    UIController.actInd.hide();
    UIController.arrow.height = Ti.UI.SIZE;
    UIController.arrow.transform=Ti.UI.create2DMatrix();
  },
  showRelease: function(){
    var t = Ti.UI.create2DMatrix();
    t = t.rotate(-180);
    UIController.arrow.animate({transform:t,duration:180});
    UIController.statusLabel.text = options.releaseMessage;
  },
  showPull: function(){
    var t = Ti.UI.create2DMatrix();
    UIController.arrow.animate({transform:t,duration:180});
    UIController.statusLabel.text = options.pullMessage;
  },
  showRefresh: function(){
    UIController.arrow.height = 0;
    UIController.actInd.show();
    UIController.statusLabel.text = options.refreshMessage;
  }
};

var StatusController = {
  pulling: false,
  reloading: false,
  setRefreshing: function(){
    StatusController.reloading = true;
    StatusController.pulling = false;
  },
  finishRefresh: function(){
    StatusController.reloading = false;
  },
  setPulling: function(){ // the status when notice user release to update
    StatusController.pulling = true;
  },
  setNoticing: function(){ // the status when notice user pull to update
    StatusController.pulling = false;
  },
  isNotPullingAndRefresh: function(){ // whether can set pulling status
    return !StatusController.pulling && !StatusController.reloading;
  },
  isPulling: function(){ // whether can set notice & refresh status
    return StatusController.pulling && !StatusController.reloading;
  },
  isRefreshing: function(){
    return StatusController.reloading;
  }
};

scrollStrategy.initialize();
