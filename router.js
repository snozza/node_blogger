var path = require('path');
var url = require('url');
var fs = require('fs');
var mime = require('mime');
var utilsHttp = require('./utilsHttp');

function Router() {
  this.routes = {}
  this.staticDir = path.join(__dirname, "public");
}

Router.prototype.addRoute = function(route, method, cBack) {
  this.routes[method] = this.routes[method] || [];
  if (typeof route === 'string') {
    route = new RegExp(route);
  }
  this.routes[method].push([route, cBack]);
};

Router.prototype.get = function(route, cBack) {
  this.addRoute(route, 'GET', cBack);
};

Router.prototype.post = function(route, cBack) {
  this.addRoute(route, 'POST', cBack);
};

Router.prototype.transmit = function(req, res) {
  var pathname = url.parse(req.url).pathname;
  // console.log(pathname)
  var method = req.method;
  var routes = this.routes[method] || [];
  for (var i = 0; i < routes.length; i++) {
    var route = routes[i][0];
    // console.log(route)
    var cBack = routes[i][1];
    // console.log(cBack.toString())
    var m = route.exec(pathname);
    // console.log(m);
    if (m) {
      // console.log(m.slice(1));
      cBack(req, res, m.slice(1));
      return;
    }
  }

  var filepath = path.join(this.staticDir, pathname);
  fs.readFile(filepath, function(error, data) {
    if (error) utilsHttp.error404(res);
    var type = mime.lookup(pathname);
    res.writeHead(200, {"Content-Type": type});
    res.end(data);
  });
};

module.exports = Router;