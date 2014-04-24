function Ajax() {
  
  this.sessionId = "";
  
  
  this.setSessionId = function(sessionId) {
    this.sessionId = sessionId;
  };
  
  
  this.send = function(type, values, callback) {
    var valuesInJSON = this.encodeJSON(values);
    jQuery.post("index.php", { type : type, values : valuesInJSON, session : this.sessionId }, function(data) {
      if(data.charAt(0) != "{") {
        console.log("Ajax error: " + data);
      } else {
        var json = jQuery.parseJSON(data);
        if(json.type == "cannot_find_session") {
          alert("The connection to the server has been lost. Please reload the page.");
        } else {
          callback(json);
        }
      }
    }, "text");
  };
  
  
  this.encodeJSON = function(values) {
    var json = "{ ";
    var subvalues = [];
    for(var key in values) {
      var subvalue = "\"" + key + "\"";
      subvalue += " : ";
      subvalue += this.encodeJSONValue(values[key]);
      subvalues.push(subvalue);
    }
    json += subvalues.join(", ");
    return json + " }";
  };
  
  
  this.encodeJSONValue = function(value) {
    var type = typeof value;
    if(type == "string") {
      return "\"" + value + "\"";
    } else if(type == "boolean") {
      return (value ? "true" : "false");
    } else if(type == "number") {
      return value;
    } else if(type == "object") {
      type = Object.prototype.toString.call(value);
      if(type == "[object Array]") {
        return this.encodeJSONArray(value);
      } else if(type == "[object Object]") {
        return this.encodeJSON(value);
      } else {
        console.log("Could not parse: " + value);
      }
    } else {
      console.log("Could not parse: " + value);
    }
  };
  
  
  this.encodeJSONArray = function(values) {
    var json = "[";
    var subvalues = [];
    for(var key in values) {
      subvalues.push(this.encodeJSONValue(values[key]));
    }
    json += subvalues.join(", ");
    return json + "]";
  };
  
  
}