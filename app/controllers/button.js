var args = arguments[0] || {};
console.dir(args);
$.button.addEventListener('click', function(e){
	$.trigger('click', e);
});
