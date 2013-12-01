/**
 * Override a tab group's tab bar on iOS.
 *
 * NOTE: Call this function on a tabGroup AFTER you have added all of your tabs to it! We'll look at the tabs that exist
 * to generate the overriding tab bar view. If your tabs change, call this function again and we'll update the display.
 *
 * @param tabGroup The tab group to override
 * @param backgroundOptions The options for the background view; use properties like backgroundColor, or backgroundImage.
 * @param selectedOptions The options for a selected tab button.
 * @param deselectedOptions The options for a deselected tab button.
 * @param background The background view overrideing tab bar, if not pass, create new view.
 */
function overrideTabs(tabGroup, backgroundOptions, selectedOptions, deselectedOptions, background) {
    // a bunch of our options need to default to 0 for everything to position correctly; we'll do it en mass:
    deselectedOptions.top = deselectedOptions.bottom
        = selectedOptions.top = selectedOptions.bottom
        = backgroundOptions.left = backgroundOptions.right = backgroundOptions.bottom = 0;
 
    // create the overriding tab bar using the passed in background options
    backgroundOptions.height = 50;
    
    // 20131128: modified by neil to control background view in the controller.
    if(background){
        background.applyProperties(backgroundOptions);
    } else {
        background = Ti.UI.createView(backgroundOptions);
    }
 
    // pass all touch events through to the tabs beneath our background
    background.touchEnabled = false;
 
    // create our individual tab buttons
    var increment = 100 / tabGroup.tabs.length;
    deselectedOptions.width = selectedOptions.width = increment + '%';
    for (var i = 0, l = tabGroup.tabs.length; i < l; i++) {
        var tab = tabGroup.tabs[i];
 
        // position our views over the tab.
        selectedOptions.left = deselectedOptions.left = increment * i + '%';
 
        // customize the selected and deselected based on properties in the tab.
        selectedOptions.title = deselectedOptions.title = tab.title;
        if (tab.backgroundImage) {
            selectedOptions.backgroundImage = deselectedOptions.backgroundImage = tab.backgroundImage;
        }
        if (tab.selectedBackgroundImage) {
            selectedOptions.backgroundImage = tab.selectedBackgroundImage;
        }
        if (tab.deselectedBackgroundImage) {
            deselectedOptions.backgroundImage = tab.deselectedBackgroundImage;
        }
        selectedOptions.visible = false;

        if(tab.deselected){
            tab.deselected.applyProperties(deselectedOptions);    
        } else {
            tab.deselected = Ti.UI.createButton(deselectedOptions);
        }

        if(tab.selected){
            tab.selected.applyProperties(selectedOptions);    
        } else {
            tab.selected = Ti.UI.createButton(selectedOptions);
        }

        background.add(tab.deselected);
        background.add(tab.selected);
    }
 
    // update the tab group, removing any old overrides
    if (tabGroup.overrideTabs) {
        tabGroup.remove(tabGroup.overrideTabs);
    }
    else {
        tabGroup.addEventListener('focus', overrideFocusTab);
    }
 
    tabGroup.add(background);
    tabGroup.overrideTabs = background;
}
 
function overrideFocusTab(evt) {
    if (evt.previousIndex >= 0) {
        evt.source.tabs[evt.previousIndex].selected.visible = false;
    }
    evt.tab.selected.visible = true;
}