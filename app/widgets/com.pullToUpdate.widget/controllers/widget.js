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
  releaseMessage: '下拉可以刷新...',
  refreshMessage: '加载中...',
  scrollView: null
};

options = typeof arguments[0] == 'undefined' ? options : _.extend(options, arguments[0]);
options = _.omit(options, ['id', "__parentSymbol"]); // remove the default system add property.

if(options.scrollView == null){
  options.scrollView = __parentSymbol;
}

var ScrollViewHeader = {
  show: function(){},
  hide: function(){},
};

var iOSTableViewHeader = {
  isArrivalAtRefresh: function(offset){
    return offset <= (options.refreshOffset - options.height);
  },
  isArrivalAtNotice: function(offset){
    return ((!iOSTableViewHeader.isArrivalAtRefresh(offset)) && offset < options.refreshOffset)
  },
  showHeader: function(){
    if(OS_IOS){
      // when you're done, just reset
      options.scrollView.setContentInsets({top:options.height},{animated:true});
    } else {
      options.scrollView.animate({
        top: 0 - options.height,
        duration: 250
      });
    }
  },
  hideHeader: function(){
    if(OS_IOS){
      options.scrollView.setContentInsets({top:0},{animated:true});
    } else {
      options.scrollView.animate({
        top: 0,
        duration: 250
      });
    }
  },
};

if(OS_IOS && options.scrollStrategy == 'table'){
  var scrollStrategy = iOSTableViewHeader;
} else {
  var scrollStrategy = ScrollViewHeader;
}

var pullHandler = {
  offset: 0,
  pulling: false,
  reloading: false,
  pullView: $.pullView,
  arrow: $.arrowView,
  statusLabel: $.statusLabel,
  actInd: $.actInd,
  initElement: function(context){
    
    context = _.omit(context, ['scrollView']); // remove the default system added property.
    
    // initilize options to object.
    for(var key in context){
      pullHandler.pullView[key] = context[key];
    }

    pullHandler.statusLabel.text = options.pullMessage;

    return pullHandler;
  },
  hidePullView: function(){
    // when you're done, just reset
    scrollStrategy.hideHeader();
    
    pullHandler.reloading = false;
    //lastUpdatedLabel.text = "Last Updated: "+formatDate();
    pullHandler.statusLabel.text = options.pullMessage;
    pullHandler.actInd.hide();
    pullHandler.arrow.show();
  },
  onScrolled: function(e){
    // if(e.y == null){
    //   return;
    // }
    pullHandler.offset = e.contentOffset.y;

    Ti.API.info('offset:' + pullHandler.offset + ", is arrival at refresh:" + scrollStrategy.isArrivalAtRefresh(pullHandler.offset) + ", is notice:" + scrollStrategy.isArrivalAtNotice(pullHandler.offset) + ", pulling: " + pullHandler.pulling + ", reloading:" + pullHandler.reloading);
    if (scrollStrategy.isArrivalAtRefresh(pullHandler.offset) && !pullHandler.pulling && !pullHandler.reloading)
    {
      var t = Ti.UI.create2DMatrix();
      t = t.rotate(-180);
      pullHandler.pulling = true;
      pullHandler.arrow.animate({transform:t,duration:180});
      pullHandler.statusLabel.text = options.releaseMessage;
    }
    else if (pullHandler.pulling && scrollStrategy.isArrivalAtNotice(pullHandler.offset) && !pullHandler.reloading )
    {
      pullHandler.pulling = false;
      var t = Ti.UI.create2DMatrix();
      pullHandler.arrow.animate({transform:t,duration:180});
      pullHandler.statusLabel.text = options.pullMessage;
    }
  },
  onDragended: function(e){
    if (pullHandler.pulling && !pullHandler.reloading)
    {
      pullHandler.reloading = true;
      pullHandler.pulling = false;
      pullHandler.arrow.hide();
      pullHandler.actInd.show();
      pullHandler.statusLabel.text = options.refreshMessage;

      pullHandler.arrow.transform=Ti.UI.create2DMatrix();
      scrollStrategy.showHeader();

      setTimeout(function(){pullHandler.hidePullView()}, 2000);
    }
  },
  addListener: function(){
    if(OS_IOS){
      var event1 = 'dragEnd';
      if (Ti.version >= '3.0.0') {
        event1 = 'dragend';
      }  
    } else {
      var event1 = 'touchend';
    }
    
    options.scrollView.addEventListener(event1, pullHandler.onDragended);
    options.scrollView.addEventListener('scroll', pullHandler.onScrolled);
  },
  initialize: function(){
    
  }
};
pullHandler.initElement(options).addListener();
$.initialize = pullHandler.initialize;
// ----------------------old-----------------------
/*
var widget = {
  // element 
  pullView: $.pullView,
  arrowView: $.arrowView,
  statusLabel: $.statusLabel,
  actInd: $.actInd,
  scrollView: __parentSymbol, // __parentSymbol is the parent view.
  
  // pulling variable usage.
  pulling: false,
  refresh: false,
  offset: 0,
  isResetingScrolling: false, // if reset scrollView to over pull view, add this to void reset scroll very slow on ios
  
  initElement: function(context){
    
    widget.scrollView = context.scrollView;
    
    context = _.omit(context, ['scrollView']); // remove the default system added property.
    
    // initilize options to object.
    for(var key in context){
      widget.pullView[key] = context[key];
    }
  },
  getPullViewHeight: function(){
    return parseFloat(widget.pullView.height);
  },
  getRefreshLimitOffset: function(){
    return widget.getPullViewHeight() * options.refreshPercent;
  },
  hidePullViewFirstly: function(){
    widget.resetPullView();
    // var init = setInterval(function(e){
    //    Ti.API.info('init offset:' + widget.offset);
    //     if (widget.offset != 0) {
    //       clearInterval(init);
    //     }
        // widget.scrollView.scrollTo(0,widget.getPullViewHeight());
    // },100);
  },
  isPullViewHidden: function(){
    return widget.pullView.visible == false || widget.pullView.visible == 'false';
  },
  isArrivalAtPulling: function(){
    return widget.offset <= widget.getRefreshLimitOffset();
  },
  isArrivalAtNoticing: function(){
    return !widget.isArrivalAtPulling() && widget.isArrivalAtPullView();
  },
  isArrivalAtPullView: function(){
    return widget.offset < widget.getPullViewHeight();
  },
  // whether show pulling information, if user press up, then will cause refresh
  canShowPulling: function(){
    return !widget.pulling && !widget.refresh && widget.isArrivalAtPulling();
  },
  // whether show pull notice infomation, but this will not cause refresh.
  canShowNoticing: function(){ 
    return widget.pulling && !widget.refresh && widget.isArrivalAtNoticing();
  },
  canShowRefreshing: function(){
    return widget.pulling && !widget.refresh && widget.isArrivalAtPulling();
  },
  onScrollViewScrolled: function(e){
      // Ti.API.info('scroll e:' + JSON.stringify(e));
      var pullViewHeight = widget.getPullViewHeight();

      if (typeof e.contentOffset != 'undefined' && e.contentOffset.y != null) {
        widget.offset = e.contentOffset.y;
        if(widget.offset >= pullViewHeight){
          widget.isResetingScrolling = false;
        }
      }

      // fix the section of pullview is blank when user just scroll from bottom to top because of pullview is not visible..
      if(widget.offset < pullViewHeight && !widget.isResetingScrolling && widget.isPullViewHidden()){
        widget.isResetingScrolling = true;
        widget.scrollView.scrollTo(0, pullViewHeight);
      }

      // if pull view is not visible , it not need to do the codes below.
      if(widget.isPullViewHidden()){
        return ;
      }
 
       if(widget.canShowPulling()){
         widget.pulling = true;
         var t = Ti.UI.create2DMatrix();
         t = t.rotate(-180);
         widget.arrowView.animate({
           transform: t,
           duration: 180
         });
         widget.statusLabel.text = '松开刷新';
       } else if(widget.canShowNoticing()){
         widget.pulling = false;
         var t = Ti.UI.create2DMatrix();
         widget.arrowView.animate({
           transform: t,
           duration: 180
         });
         widget.statusLabel.text = '下拉刷新';
       }
  },
  // make pullview visible when dragstart.
  onDragstarted: function(e){
    Ti.API.info('scrollstart offset:' + widget.offset + ', e:' + JSON.stringify(e));
    widget.pullView.visible = true;
    if(OS_MOBILEWEB){
      widget.pullView.height = options.height;
    }
  },
  onDragended: function(e){
    Ti.API.info('drag/touch end widget:' + JSON.stringify(widget) + ' e:' + JSON.stringify(e));
    var pullViewHeight = widget.getPullViewHeight();
    Ti.API.info('drag/touch end height:' + pullViewHeight + ", isatpullview:" + JSON.stringify(widget.isArrivalAtPullView()));
    if(widget.canShowRefreshing()){
      widget.refresh = true;
      widget.pulling = false;
      widget.statusLabel.text = '正在刷新';
      
      // TODO need to refresh the function.
      if(_.isFunction(options.refreshCallback)){
        options.refreshCallback(e, widget.resetPullView);
      } else {
        setTimeout(function(){
          widget.resetPullView();
        }, 2000);
      }

    } else if(!widget.refresh && widget.isArrivalAtPullView()){
      // if not refresh and can see pullview currently in the screen, should set pullview back.
      widget.scrollView.scrollTo(0, pullViewHeight);
    } else if(!widget.refresh && !widget.isArrivalAtPullView()){
      // fix the pullview still visible when user just scroll from bottom to top.
      widget.resetPullView();
    }
  },
  resetPullView: function(){
    widget.refresh = false;
    widget.pullView.visible = false;
    widget.statusLabel.text = '下拉刷新';
    if(OS_MOBILEWEB){
      widget.pullView.height = 0;
    } else {
      widget.arrowView.transform = Ti.UI.create2DMatrix();
      widget.scrollView.scrollTo(0, widget.getPullViewHeight());  
    }
    
  },
  addListenerEvent: function(){
    widget.scrollView.addEventListener('scroll', widget.onScrollViewScrolled);

    var event0 = 'dragstart';
    if (OS_ANDROID) {
      event0 = 'touchstart';
    }
    widget.scrollView.addEventListener(event0, widget.onDragstarted);

    var event1 = 'dragend';
    if (OS_ANDROID) {
      event1 = 'touchend';
    }

    widget.scrollView.addEventListener(event1, widget.onDragended);
  },
  initialize: function(op){
    Ti.API.info('mobileweb:' + JSON.stringify(OS_MOBILEWEB));
    if(typeof op != 'undefined'){
      options = _.extend(options,op);
    }
    widget.initElement(options);
    widget.hidePullViewFirstly();
    widget.addListenerEvent();
  },
};

$.initialize = widget.initialize;
*/