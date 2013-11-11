/**
 * @history 
 *   20131015: created by neil for collection for add/remove
 */
var options = {
  height: 65,
  refreshPercent: .25,
  scrollView: null
};

options = typeof arguments[0] == 'undefined' ? options : _.extend(options, arguments[0]);
options = _.omit(options, ['id', "__parentSymbol"]); // remove the default system add property.

var widget = {
  // element 
  pullView: $.pullView,
  arrow: $.arrowView,
  status: $.statusView,
  actInd: $.actInd,
  scrollView: null,
  
  // pulling variable usage.
  pulling: false,
  refresh: false,
  offset: 0,
  pullViewHeight: 65,
  
  initElement: function(context){
    
    widget.scrollView = context.scrollView;
    widget.pullViewHeight = context.height;
    
    context = _.omit(context, ['scrollView']); // remove the default system add property.
    
    // initilize options to object.
    for(var key in context){
      widget.pullView[key] = context[key];
    }
  },
  getPullViewHeight: function(){
    return 
  },
  initialize: function(op){
    widget.scrollView = widget.options.scrollView; 

    var pullViewHeight = parseFloat($.pullView.height);
    var refreshLimitOffset = pullViewHeight * .25;

    Ti.API.info('pull view height:' + pullViewHeight);
    Ti.API.info('refreshLimitOffset:' + refreshLimitOffset);
    $.pullView.visible = false;
    var init = setInterval(function(e){
       Ti.API.info('init offset:' + widget.offset);
        if (widget.offset != 0) {
          clearInterval(init);
        }
        widget.scrollView.scrollTo(0,pullViewHeight);

    },100);

    widget.scrollView.addEventListener('scroll', function (e) {

      // Ti.API.info('scroll e:' + JSON.stringify(e));
      if (e.y != null) {
        widget.offset = e.y;
      };
      
      // fix the section of pullview is blank when user just scroll from bottom to top because of pullview is not visible..
       if(widget.offset < pullViewHeight && $.pullView.visible == false){
         widget.scrollView.scrollTo(0, pullViewHeight);
       }
 
       // if pull view is not visible , it not need to do the codes below.
       if($.pullView.visible == 'false' || $.pullView.visible == false){
         return ;
       }
 
       if(widget.offset <= refreshLimitOffset && !widget.pulling && !widget.refresh){
         widget.pulling = true;
         var t = Ti.UI.create2DMatrix();
         t = t.rotate(-180);
         $.arrowView.animate({
           transform: t,
           duration: 180
         });
         $.statusLabel.text = '松开刷新';
       } else if(widget.pulling && (widget.offset > refreshLimitOffset && widget.offset < pullViewHeight) && !widget.refresh){
         widget.pulling = false;
         var t = Ti.UI.create2DMatrix();
         $.arrowView.animate({
           transform: t,
           duration: 180
         });
         $.statusLabel.text = '下拉刷新';
       }
    });

    var event0 = 'dragstart';
    if (OS_ANDROID) {
      event0 = 'touchstart';
    }
    widget.scrollView.addEventListener(event0, function (e) {
      Ti.API.info('scrollstart offset:' + widget.offset + ', e:' + JSON.stringify(e));
      $.pullView.visible = true;

    });

    var event1 = 'dragend';
    if (OS_ANDROID) {
      event1 = 'touchend';
    }

    widget.scrollView.addEventListener(event1, function(e){
      Ti.API.info('drag/touch end offset:' + widget.offset + ' e:' + JSON.stringify(e));
      if(widget.offset <= refreshLimitOffset){
        widget.refresh = true;
        widget.pulling = false;
        $.statusLabel.text = '正在刷新';
        
        setTimeout(function(){
          widget.refresh = false;
          if(widget.offset < pullViewHeight){
            $.pullView.visible = false;
            $.statusLabel.text = '下拉刷新';
            $.arrowView.transform = Ti.UI.create2DMatrix();
            widget.scrollView.scrollTo(0, pullViewHeight);
          }
        }, 2000);

      } else if(widget.offset < pullViewHeight){
        widget.scrollView.scrollTo(0, pullViewHeight);
      }

      if(widget.offset >= pullViewHeight && !widget.refresh){
        $.pullView.visible = false; // fix the pullview still visible when user just scroll from bottom to top.
      }

    });
  },
};