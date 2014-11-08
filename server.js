var http = require('http');
var utils = require('util');
var utilsHttp = require('./utilsHttp');
var Router = require('./router');
var DataBase = require('./mockDB');

var blog = new DataBase();
var router = new Router();

router.get('^/posts/?$', function(req, res) {
  var options = {posts: blog.posts()};
  console.log(blog.posts())
  utilsHttp.renderHtml('posts/list.html', res, options)
});

router.get('^/posts/(\\d+)$', function(req, res, params) {
  var post = blog.get(params[0]);
  if (!post) utilsHttp.error404(res);
  var options = {locals: {post: post}};
  utilsHttp.renderHtml('posts/show.html', res, options);
})

router.get('^/posts/new/?$', function(req, res) {
  var options = {};
  utilsHttp.renderHtml('posts/new.html', res, options);
});

router.post('^/posts/?$', function(req, res) {
  utilsHttp.parser(req, function(body) {
    var post = {
        title: body.title,
        content: body.content
    }
    blog.add(post);
    utilsHttp.redirect('/posts', res);
  });
});

// DELETE
router.post('^/posts/(\\d+)/delete/?$', function(req, res, params) {
  var id = params[0];
  if (blog.get(id)) blog.remove(id);
  utilsHttp.redirect('/posts', res);
});


// UPDATE FORM
router.get('^/posts/(\\d+)/edit', function(req, res, params) {
  var post = blog.get(params[0]);
  if (!post) utilsHttp.error404(res);
  var options = {locals: {post: post}};
  utilsHttp.renderHtml('posts/edit.html', res, options);
});

router.post('^/posts/(\\d+)/edit', function(req, res, params) {
  var id = params[0];
  if (!blog.get(id)) utilsHttp.render404(res);

  utilsHttp.parser(req, function(body) {
    var post = {
      title: body.title,
      content: body.content
    };
    blog.update(id, post);
    utilsHttp.redirect('/posts', res);
  });
})

var server = http.createServer(function(req, res) {
  router.transmit(req, res);
}).listen(9292);

console.log("This guy is listening on http://127.0.0.1:9292");