
var index = {
  initialize: function(){

    Ti.include('overrideTabs.js');
    /*
     Now call the overrideTabs function, and we're done!
     */
    overrideTabs(
        $.tabGroup, // The tab group
        { backgroundColor: '#333' }, // View parameters for the background
        { backgroundColor: 'fff', color: '#333', style: 0 }, // View parameters for selected tabs 
        { color: '#fff', style: 0 } // View parameters for deselected tabs
    );

    // add button to back to previous window.
    var navBackButton = Ti.UI.createButton({
      title: 'Back'
    });
    navBackButton.addEventListener('click', function(){
      $.tabGroup.close();
    });

    $.win1.setLeftNavButton(navBackButton);

    return index;
  },
  open: function(){
    
    $.tabGroup.open();
    return index;
  },
};

index.initialize().open();