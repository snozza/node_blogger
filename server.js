var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var querys = require('querystring');


function makeNewPostForm(req, res) {
  var filepath = 'views/posts/new.html';
  fs.readFile(filepath, 'utf8', function(error, view) {
    if (error) console.log(error);
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(view);
  });
}

function submitNewPost(req, res) {
  parser(req, function(data) {
    var post = {
      title: data.title,
      content: data.body
    }
  })
  response.end();
}

function postBase(req, res) {
  var filepath = 'views/posts/posts.html'
  fs.readFile(filepath, 'utf8', function(error, view) {
    if (error) console.log(error);
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(view);
  });
}

function parser(req, cBack) {
  var content = '';
  request.on('data', function(chunk) {
    body += chunk;
  });
  request.on('end', function() {
    cBack(querys.parse(body))
  });
}

function addCSS(req, res) {
  fs.readFile('public/css/style.css', function(error, data) {
    if (error) console.log(error);
    res.writeHead(200, {'Content-type': 'text/css'}); 
    res.end(data);
  });
}

function error404(req, res) { 
  res.writeHead(404);
  res.end('Whoops....404 - page not found');
}

var postFormPattern = /^\/posts\/new\/?$/;
var postPattern = /^\/posts\/?$/;

var server = http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname;
  if (postFormPattern.test(pathname)) {
    makeNewPostForm(req, res);
  } else if (postPattern.test(pathname)) { 
    postBase(req, res);
  } else if (req.url.indexOf('.css') != -1) {
    addCSS(req, res);
  } else {
    error404(req, res);
  }
}).listen(9292);

console.log("This guy is listening on http://127.0.0.1:9292");