
var BASE_URL = 'http://www.neil-flinja.com/ajaxes/test_json/';
// var BASE_URL = 'http://127.0.0.1:8090/ajaxes/test_json';
module.exports.sync = function(method, model, options){
  var payload = model.toJSON();
  var error = null;
  
  // simple default callback function for HTTP request operations.
  var callback = function (success, response, error){
    Ti.API.info('rest callback res:' + JSON.stringify(response) );
    res = JSON.parse(response);
    Ti.API.info('rest callback after parse json res:' + JSON.stringify(res) );
    if(success){
       // Calls the default Backbone success callback
       // and invoke a custom callback if options.success was defined.
       // options.success(res, JSON.stringify(res), options);
       
       _.isFunction(options.success) && options.success(res, response, options);
        "read" === method && model.trigger("fetch");
    } else {
      // Calls the default Backbone error callback
      // and invoke acustom callback if options.error was defined.
      var err = res.error || error;
      Ti.API.error('ERROR: ' + err);
      options.error(model, JSON.stringify(res), options);
      model.trigger('error');
    }
    
  };
  
  switch(method){
    // This case is called by the Model.save and Collection.create methods
    // to a initialize model if the IDs are not set.
    case 'create':
      
      http_request('POST', BASE_URL, payload, callback);
      
      break;
    
    // This case is called by the model.fetch and Collection.fetch methods to retrieve data.
    case 'read':
      // Use the idAttribute property in case the Model ID is set to something else besides 'id'
      if(payload[model.idAttribute]){
        // if we have an ID, fetch only one document  
        // http_request('GET', BASE_URL + payload[model.idAttribute], payload, callback);
        http_request('GET', BASE_URL, payload, callback);
      } else {
        // if not set, fetch all documents.
        http_request('GET', BASE_URL, payload, callback);
      }
      break;
      
    // This case is called by the model.save and Collection.create methods
    // to update a model if they have the IDs set.
    case 'update':
      if(payload[model.idAttribute]){
        http_request('PUT', BASE_URL + payload[model.idAttribute], payload, callback);
      } else {
        error = 'ERROR: Model does not have an ID!';
      }
      
      break;
      
    // This case is called by the model.destroy to delete the model from storage.
    case 'delete':
      if(payload[model.idAttribute]){
        // http_request('DELETE', BASE_URL + payload[model.idAttribute], null, callback);
        http_request('GET', BASE_URL, null, callback);
      } else {
        error = 'ERROR: Model does not have an ID!';
      }
      break;
    default:
      error = 'ERROR: Sync method not recognized!';
  }
  
  if(error){
    options.error(model, error, options);
    Ti.API.error(error);
    model.trigger('error');
  }
  
};

// Helper function for creating an HTTP request
function http_request(method, url, payload, callback){
  
  Ti.API.info('http_request, method: ' + method + ' url:' + url + ', payload:' + JSON.stringify(payload));
  console.dir(callback);
  var client = Ti.Network.createHTTPClient({
    onload: function(e){
      Ti.API.info('onload response:' + this.responseText);
      if(callback) callback(true, this.responseText, null);
    },
    onerror: function(e){
      Ti.API.info('onload e.error:' + e.error);
      if(callback) callback(false, this.reponseText, e.error);
    },
    timeout: 5000
  });
  client.open(method, url);
  client.send(payload);
};

// executes code before creating Backbone.Model class
module.exports.beforeModelCreate = function(config, model_name){
  config = config || {};
  // if there is a base_url defined in the model file, use it.
  if(config.adapter.base_url){
    BASE_URL = config.adapter.base_url;
  }
  return config;
};

// executes code after creating Backbone.Model class
module.exports.afterModelCreate = function(model, model_name){
  // Nothing to do.
};
