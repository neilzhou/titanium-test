var showCategory = {

  showCategoryButton:    null,
  editCategoryButton:    null,
  showSupplementButton:  null,
  indexCategoriesButton: null,

  onShowCategoryButtonClicked: function(event)
    {
      Alloy.createController('test_layout/index', {});
      $.win.close();
    }
};
$.listView.addEventListener('itemclick', showCategory.onShowCategoryButtonClicked);
 
$.win.open();
