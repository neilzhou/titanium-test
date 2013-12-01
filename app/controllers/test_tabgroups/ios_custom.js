var newIndex = {
  initialize: function(){
    return newIndex;
  },
  open: function(){
    Ti.include('overrideTabs.js');

    /*
     This is a typical new project -- a tab group with three tabs.
     */
     
    var tabGroup = Ti.UI.createTabGroup();

    // add button to back to previous window.
    var navBackButton = Ti.UI.createButton({
      title: 'Back'
    });
    navBackButton.addEventListener('click', function(){
      tabGroup.close();
    });
     
    /*
     Tab 1.
     */
    var win1 = Ti.UI.createWindow({ title: 'Tab 1', backgroundColor: '#fff' });
    // add left nav button for ios
    win1.setLeftNavButton(navBackButton);
    var tab1 = Ti.UI.createTab({
        backgroundImage: 'appicon.png',
        window: win1
    });
    var button1 = Ti.UI.createButton({
        title: 'Open Sub Window',
        width: 200, height: 40
    });
    button1.addEventListener('click', function (evt) {
        tab1.open(Ti.UI.createWindow({ title: 'Tab 1 Sub Window', backgroundColor: '#fff' }));
    });
    win1.add(button1);
    tabGroup.addTab(tab1);
     
    /*
     Tab 2.
     */
    tabGroup.addTab(Ti.UI.createTab({
        backgroundImage: 'appicon.jpg',
        window: Ti.UI.createWindow({ title: 'Tab 2', backgroundColor: '#fff' })
    }));
     
    /*
     Tab 3.
     */
    tabGroup.addTab(Ti.UI.createTab({
        backgroundImage: 'appicon.png',
        window: Ti.UI.createWindow({ title: 'Tab 3', backgroundColor: '#fff' })
    }));
     
    /*
     Now call the overrideTabs function, and we're done!
     */
    overrideTabs(
        tabGroup, // The tab group
        { backgroundColor: 'yellow' }, // View parameters for the background
        { backgroundColor: 'red', title: 'Button TItle', color: '#000', style: 0 }, // View parameters for selected tabs 
        { backgroundColor: 'blue', color: '#888', style: 0 } // View parameters for deselected tabs
    );
     
    tabGroup.open();
    return newIndex;
  },
};

newIndex.initialize().open();