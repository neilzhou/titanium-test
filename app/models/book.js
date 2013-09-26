exports.definition = {
	config: {
		// columns: {
		    // "title": "string",
		    // "author": "string",
		    // "description": "text",
		    // "created": "datetime",
		    // "modified": "datetime",
		    // "is_active": "boolean",
		    // "price": "decimal"
		// },
		// adapter: {
			// type: "properties",
			// collection_name: "book"
		// }
		adapter: {
		  type: 'rest',
		  collection_name: 'book',
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			url: '/documents',
			// extended functions and properties go here
			// Implement the validate method.
			validate: function(attrs){
				Ti.API.info('validate attrs is:' + JSON.stringify(attrs));
				
				for(var key in attrs){
					var value = attrs[key];
					if(key == 'title'){
						if(typeof value == 'undefined' ||  value.length <= 0){
							return 'Error: No title!';
						}
					}
					if(key == 'author'){
						if(typeof value == 'undefined' || value.length <= 0){
							return 'Error: No author!';
						}
					}
				}
				
			},
			customProperty: 'book',
			customFunction: function(){
				Ti.API.info('customFunction: I am a book model.');
			},
			validationError2: function(){
				var value = this.validationError;
				Ti.API.info("this.validationError:" + this.validationError);
				console.dir(Model);
				
				Ti.API.info("this.validationError:" + this.validationError);
				Ti.API.info("this.attributes:" + this.attributes);
				return this.validate(this.attributes);
			}
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			// Implement the comparator method
			comparator: function(book){
				return book.get('title');
			}
		});

		return Collection;
	}
};