var crossView = {
  onChangeCustomModelButtonClicked: function(){
    Alloy.Globals.book.set({author:'author3', title:'title3'});
  },
  open: function(){
    $.win.open();
    return this;
  },
  initialize: function(){
    $.changeCustomModelButton.addEventListener('click', this.onChangeCustomModelButtonClicked);
    return this;
  }
};

crossView.initialize().open();
