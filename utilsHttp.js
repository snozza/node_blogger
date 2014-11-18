var queryStr = require('querystring')
var fs = require('fs')
var ejs = require('ejs')
var path = require('path')
var utilsHttp = this;
var Chuck = require('./chuck')

// utilsHttp.chuckJoke = function () {
//   return new Chuck().random(function(err, joke) {
//     return alert(err ? err.message : joke)
//   });
// };

utilsHttp.defaultViews = path.join(__dirname, "views")

utilsHttp.renderHtml = function(view, res, options, viewsDir) {
  viewsDir = viewsDir || utilsHttp.defaultViews;
  var filepath = path.join(viewsDir, view);
  fs.readFile(filepath, 'utf8', function(error, view) {
    if(error) console.log(error);
    var html = ejs.render(view, options);
    res.writeHead(200, {'Content-type': 'text/html'})
    res.end(html);
  });
}

utilsHttp.parser = function(req, cBack) {
  var body = "";
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    cBack(queryStr.parse(body));
  });
}

// utilsHttp.addCSS = function(req, res) {
//   fs.readFile('public/css/style.css', function(error, data) {
//     if (error) console.log(error);
//     res.writeHead(200, {'Content-type': 'text/css'});
//     res.end(data);
//   });
// }

utilsHttp.error404 = function(res) {
  res.writeHead(404);
  res.end('Whoops...404 - page not found');
}

utilsHttp.redirect = function(url, response) {
  response.writeHead(302, {
    'Content-Type': 'text/html',
    'Location': url
  });
  response.end();
}

