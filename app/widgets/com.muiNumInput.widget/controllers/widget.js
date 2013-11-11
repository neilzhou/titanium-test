/**
 * @history 
 *   20131015: created by neil for number management
 */
var options = {
  max: false,
  min: 1,
  top: '10'
};
options = typeof arguments[0] == 'undefined' ? options : _.extend(options, arguments[0]);
options = _.omit(options, ['id', "__parentSymbol"]); // remove the default system add property.
options.value = typeof options.value == 'undefined' ? options.min : options.value;
var mui = {
  numberText: null,
  decreaseButton: null,
  increaseButton: null,
  
  getNumberVal: function(){
    var original = parseInt(mui.numberText.getValue());
    return _.isNaN(original) ? options.min : original;
  },
  resetValue: function(value){
    value = _.isNaN(value) ? options.min : value;
    if(value < options.min){
      value = options.min;
    } else if(_.isNumber(options.max) && !_.isNaN(options.max) && value > options.max){
      value = options.max;
    }
    return value;
  },
  setNumberVal: function(value, notCheckEqual){
    var checkedValue = mui.resetValue(parseInt(value));
    notCheckEqual = notCheckEqual ? notCheckEqual : false;
    
    if(notCheckEqual || ! mui.isNumericStrEqual(checkedValue, value)){
      mui.numberText.setValue(checkedValue);
    }
  },
  isNumericStrEqual: function(object, other){
    return (object + '') === (other + '');
  },
  onNumberTextChanged: function(event){
    
    // Ti.API.info('----mui widget number changed:' + JSON.stringify(event));
    
    if(event.source.value === ''){
      return;
    }
    
    mui.setNumberVal(event.source.value);
    
    $.trigger('change', event);
  },
  onNumberTextBlured: function(event){
    // Ti.API.info('----mui widget number blur:' + JSON.stringify(event));
    mui.setNumberVal(event.source.value);
  },
  onDecreaseButtonClicked: function(event){
     var value = mui.getNumberVal();
     
     mui.setNumberVal(value - 1, true);
     
  },
  onIncreaseButtonClicked: function(event){
    var value = mui.getNumberVal();
     
     mui.setNumberVal(value + 1, true);
  },
  initialize: function(){
    mui.numberText = $.numberText;
    mui.decreaseButton = $.decreaseButton;
    mui.increaseButton = $.increaseButton;
    
    $.widgetView.top = options.top;
    
    if(Alloy.CFG.ios){
      // Flexible Space for Button bars
      var flexSpace = Ti.UI.createButton({
          systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
      });
      var doneBtn = Ti.UI.createButton({
        title: '完成',
        style: Ti.UI.iPhone.SystemButtonStyle.DONE,
      });
      
      doneBtn.addEventListener('click', function(e){
        mui.numberText.blur(e);
      });
      var toolbar = Ti.UI.iOS.createToolbar({
        items: [flexSpace, doneBtn],
        bottom: 0,
        borderTop: true,
        borderBottom: false,
        barColor: '#999',
        height: 40
      });
      mui.numberText.keyboardToolbar = toolbar;
      // mui.numberText.keyboardToolbar = [flexSpace, doneBtn];
      // mui.numberText.keyboardToolbarColor = '#999';
      // mui.numberText.keyboardToolbarHeight = 40;
      // mui.numberText.borderStyle = Titanium.UI.INPUT_BORDERSTYLE_ROUNDED;
      // mui.numberText.returnKeyType = Titanium.UI.RETURNKEY_DONE;
      // mui.numberText.enableReturnKey = true;
    }
    
    for(var key in options){
      if(key == 'value'){
        mui.numberText.setValue(options[key]);
        continue;
      }
      $.widgetView[key] = options[key];
    }
    mui.decreaseButton.addEventListener('click', mui.onDecreaseButtonClicked);
    mui.increaseButton.addEventListener('click', mui.onIncreaseButtonClicked);
    
    mui.numberText.addEventListener('change', mui.onNumberTextChanged);
    mui.numberText.addEventListener('blur', mui.onNumberTextBlured);
  }
};

mui.initialize();

$.value = function(value, properties){
  if(value){
    properties = properties ? properties : {};
    if(properties.silent){
      mui.numberText.removeEventListener('change', mui.onNumberTextChanged);
    }
    mui.numberText.setValue(value);
    if(properties.silent){
      setTimeout(function(){
        mui.numberText.addEventListener('change', mui.onNumberTextChanged);
      }, 500);
    }
    return;
  }
  return mui.numberText.getValue();
};

$.blur = function(e){
  // // Ti.API.info('------blur:' + JSON.stringify(e));
  var event = {source: mui.numberText};
  return mui.numberText.blur(event);
};
