var PullToUpdate = {

  options: {},

  target: null,

  initialize: function(op){

    PullToUpdate.options = _.extend(PullToUpdate.options, op);

    PullToUpdate.scrollView = PullToUpdate.options.scrollView; 

     

    var offset = 0;

    var pulling = false;

    var refresh = false;
    
    var pullViewHeight = parseFloat($.pullView.height);
    var refreshLimitOffset = pullViewHeight * .25;

    
    $.pullView.visible = false;
    var init = setInterval(function(e){

       // Ti.API.info('init offset:' + offset);

        if (offset != 0) {

            clearInterval(init);

        }

        PullToUpdate.scrollView.scrollTo(0,pullViewHeight);

    },100);

    


    PullToUpdate.scrollView.addEventListener('scroll', function (e) {

      // Ti.API.info('scroll e:' + JSON.stringify(e));

      if (e.y != null) {

        offset = e.y;

      };
      
     
      // fix the section of pullview is blank when user just scroll from bottom to top because of pullview is not visible..
     
           if(offset < pullViewHeight && $.pullView.visible == false){
     
             PullToUpdate.scrollView.scrollTo(0, pullViewHeight);
     
           }
     
           // if pull view is not visible , it not need to do the codes below.
           if($.pullView.visible == 'false' || $.pullView.visible == false){
             return ;
           }
     
           if(offset <= refreshLimitOffset && !pulling && !refresh){
     
             pulling = true;
     
             
     
             var t = Ti.UI.create2DMatrix();
     
             t = t.rotate(-180);
     
             $.arrowView.animate({
     
               transform: t,
     
               duration: 180
     
             });
     
             $.statusLabel.text = '松开刷新';
     
           } else if(pulling && (offset > refreshLimitOffset && offset < pullViewHeight) && !refresh){
     
             pulling = false;
     
             var t = Ti.UI.create2DMatrix();
     
             $.arrowView.animate({
     
               transform: t,
     
               duration: 180
     
             });
     
             $.statusLabel.text = '下拉刷新';
     
           }
     
      

    });

    
    PullToUpdate.scrollView.addEventListener('touchstart', function (e) {

      // Ti.API.info('scrollstart offset:' + offset + ', e:' + JSON.stringify(e));

      $.pullView.visible = true;

    });

    

    

    PullToUpdate.scrollView.addEventListener('scrollend', function (e) {

      // Ti.API.info('scrollend offset:' + offset + ', e:' + JSON.stringify(e));

     if(offset < pullViewHeight && !refresh){

       PullToUpdate.scrollView.scrollTo(0, pullViewHeight);

       $.pullView.visible = false; 

     }

    });

    

    var event1 = 'touchend';

    if (Ti.version >= '3.0.0') {

      event1 = 'touchend';

    }

    

    PullToUpdate.scrollView.addEventListener(event1, function(e){

      // Ti.API.info('drag end offset:' + offset + ' e:' + JSON.stringify(e));

      if(offset <= refreshLimitOffset){

        refresh = true;

        pulling = false;

        

        $.statusLabel.text = '正在刷新';

        

        setTimeout(function(){

          refresh = false;

          if(offset < pullViewHeight){
            $.pullView.visible = false;
            $.statusLabel.text = '下拉刷新';
            $.arrowView.transform = Ti.UI.create2DMatrix();

            PullToUpdate.scrollView.scrollTo(0, pullViewHeight);

          }

        }, 2000);

        

      } else if(offset < pullViewHeight){

        PullToUpdate.scrollView.scrollTo(0, pullViewHeight);

      }

      if(offset >= pullViewHeight && !refresh){

        $.pullView.visible = false; // fix the pullview still visible when user just scroll from bottom to top.

      }

    });


  },

};

(function(){

  PullToUpdate.initialize({scrollView: $.scrollView});

})();

$.index.open();