var http = require('http');

var server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-type': 'text/plain'});
  response.end('Node Blogger')
});

server.listen(9292);
console.log("This guy is listening on http://127.0.0.1:9292");