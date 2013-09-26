// console.dir(arguments);

// current item of collection.
// console.dir($model);

// should use get to find title 
Ti.API.info("view bind title:" + JSON.stringify($model.get('title')));

// always undefined
Ti.API.info("view bind title:" + JSON.stringify($model.title));
Ti.API.info("view bind custom:" + JSON.stringify($model.custom));

// only title and author, not transformed.
Ti.API.info("view bind:" + JSON.stringify($model));


