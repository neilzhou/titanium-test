exports.definition = {
	config: {
		columns: {
		    "id": "int",
		    "author": "string",
		    "title": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "book_sql"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};