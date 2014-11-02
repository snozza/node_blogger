var http = require('http');
var url = require('url');

function makeNewPost(request, response) {
  response.writeHead(200, {'Content-type': 'text/plain'});
  response.end('Node Blogger - Make a new post');
}

function error404(request, response) { 
  response.writeHead(404);
  response.end('Whoops....404 - page not found');
}


var server = http.createServer(function(request, response) {
  var postFormPattern = /^\/posts\/new\/?$/
  var pathname = url.parse(request.url).pathname;
  if (postFormPattern.test(pathname)) {
    makeNewPost(request, response);
  } else {
    error404(request, response);
  }
});

server.listen(9292);
console.log("This guy is listening on http://127.0.0.1:9292");