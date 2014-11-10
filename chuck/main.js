var http = require('http');

function Norris (firstName, lastName) {
  this.firstName = firstName || 'Chuck';
  this.lastName = lastName || 'Norris';
}

Norris.prototype.id = function(id, callBack) {
  return this.joke('jokes/' + id, cb);
};

Norris.prototype.random = function(num) {
  return this.joke('jokes/random', num);
};

Norris.prototype.joke = function(route, callBack) {
  return this._value(route, function(err, data) {
    if(err) {
      // return callBack(err);
      console.log(err)
    } else {
      return callBack(null, data.joke.replace(/&quot;/g, '"'));
    }
  });
};

Norris.prototype._value = function(route, callBack) {
  return this._req(route, function(err, data) {
    if (err) {
      // return callBack(err);
      console.log(err);
    } else {
      return callBack(null, data.value);
    }
  });
};

Norris.prototype._req = function(route, callBack) {
  var options = {
    path: '/' + route + '?firstName=' + this.firstName +
      '&lastName=' + this.lastName,
    host: 'api.icndb.com',
    port: 80
  };
  return http.get(options, function(res) {
    var data = "";
    res.on('data', (function() {
      return function(chunk) {
        return data += chunk;
      };
    })());
    return res.on('end', (function() {
      return function() {
        try {
          return callBack(null, JSON.parse(data));
        } catch(_error) {
          var err = _error;
          return callBack(new Error('Problem with parsing response'));
        }
      };
    })());
  });
};

chuck = new Norris()
chuck.random(function(err, joke) {
  return console.log(err ? err.message : joke);
});

module.export = Norris
