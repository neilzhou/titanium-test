
    Ti.Network.httpURLFormatter = function(url) {
    	
        var m,
            loc = window.location,
            newPrefix = loc.protocol + "//" + loc.hostname,
            ports = {
                "www.neil-flinja.com": ":80" // leave blank for port 80
            };
         return 'http://www.neil-flinja.com:80/ajaxes/test_json';
 		alert("protocol:" + newPrefix);
        if (url.indexOf(newPrefix) == -1 && url.indexOf("://") != -1) {
            if (m = url.match(/(https?)\:\/\/([^\:\/]*):?(\d*)(.*)/)) {
                return newPrefix + ports[m[2]] + m[4];
            }
        }
    };

var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
        // function called in readyState DONE (4)
        alert('onload called, readyState = '+this.readyState);
        alert('onload:'+JSON.stringify(e));
        alert('onload response:' + this.responseText);
    },
    onerror: function(e) {
        // function called in readyState DONE (4)
        alert('onerror called, readyState = '+this.readyState);
        alert('error:'+e.error);
    },
    ondatastream: function(e) {
        // function called as data is downloaded
        alert('ondatastream called, readyState = '+this.readyState);
    },
    onsendstream: function(e) {
        // function called as data is uploaded
        alert('onsendstream called, readyState = '+this.readyState);
    },
    onreadystatechange: function(e) {
        switch(this.readyState) {
            case 0:
                // after HTTPClient declared, prior to open()
                // though Ti won't actually report on this readyState
                alert('case 0, readyState = '+this.readyState);
            break;
            case 1:
                // open() has been called, now is the time to set headers
                alert('case 1, readyState = '+this.readyState);
            break;
            case 2:
                // headers received, xhr.status should be available now
                alert('case 2, readyState = '+this.readyState);
            break;
            case 3:
                // data is being received, onsendstream/ondatastream being called now
                alert('case 3, readyState = '+this.readyState);
            break;
            case 4:
                // done, onload or onerror should be called now
                alert('case 4, readyState = '+this.readyState);
            break;
        }
    },
    timeout:5000  /* in milliseconds */
});


xhr.open("GET", 'http://www.neil-flinja.com/ajaxes/test_json');
xhr.send();  // request is actually sent with this statement