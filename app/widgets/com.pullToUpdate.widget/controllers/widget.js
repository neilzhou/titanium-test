/**
 * @history 
 *   20131015: created by neil for collection for add/remove
 */
var options = {
  height: 65,
  refreshPercent: 0,
  scrollView: null,
  refreshCallback: null,
};

options = typeof arguments[0] == 'undefined' ? options : _.extend(options, arguments[0]);
options = _.omit(options, ['id', "__parentSymbol"]); // remove the default system add property.

var widget = {
  // element 
  pullView: $.pullView,
  arrowView: $.arrowView,
  statusLabel: $.statusLabel,
  actInd: $.actInd,
  scrollView: null,
  
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

      if (e.y != null) {
        widget.offset = e.y;
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