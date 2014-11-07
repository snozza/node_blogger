var querys = require('querystring')
var fs = require('fs')
var ejs = require('ejs')
var path = require('path')
var utilsHttp = this;

utilsHttp.defaultViews = path.join(__dirname, "views")

utilsHttp.makeNewPostForm = function(view, res, options, viewsDir) {
  viewsDir = viewsDir || utilsHttp.defaultViews;
  var filepath = path.join(viewsDir, view);
  fs.readFile(filepath, 'utf8', function(error, view) {
    if(error) console.log(error);
    var html = ejs.render(view, options);
    res.writeHead(200, {'Content-type': 'text/html'})
    res.end(html);
  });
}

utilsHttp.submitNewPost = function(req, res) {
  parser(req, function(data) {
    var post = {
      title: data.title,
      content: data.body
    }
  })
  response.end();
}

utilsHttp.postBase = function(req, res) {
  var filepath = 'views/posts/post.html'
  fs.readFile(filepath, 'utf8', function(error, view) {
    if (error) console.log(error);
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(view);
  });
}

utilsHttp.parser = function(req, cBack) {
  var content = '';
  request.on('data', function(chunk) {
    body += chunk;
  });
}

// utilsHttp.addCSS = function(req, res) {
//   fs.readFile('public/css/style.css', function(error, data) {
//     if (error) console.log(error);
//     res.writeHead(200, {'Content-type': 'text/css'});
//     res.end(data);
//   });
// }

utilsHttp.error404 = function(req, res) {
  res.writeHead(404);
  res.end('Whoops...404 - page not found');
}

utilsHttp.redirect = function(url, response) {
  response.writeHead(302, {
    'Content-Type': 'text/html'
    'Location': url
  });
}

