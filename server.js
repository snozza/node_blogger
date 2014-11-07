var http = require('http');
var utils = require('util');
var utilsHttp = require('utilsHttp');
var Router = require('./router');
var DataBase = require('./mockDB');

var blog = new DB();
var router = new Router();

router.get('^posts/?$', function(req res) {
  var options = {posts: blog.posts()};
  utilsHttp.renderHtml('post/list.html', res, options)
});

router.get('^/posts/(\\d+)$', function(req, res, params) {
  var post = blog.get(params[0]);
  if (!post) utilsHttp.render404(res);
  var options = {locals: {post: post}};
  utilsHttp.renderHTML('posts/show.html', res, options);
})

router.get('^/posts/new/?$', function(req, res) {
  var options = {};
  utilsHttp.renderHtml('post/new.html'), res, options);
});

router.post('^/posts/?$', function(req, res) {
  utilsHttp.parser(req, function(body) {
    var post = {
        title: body.title,
        content: body.content
    }
    blog.add(post)
    utilsHttp.redirect('/posts', res);
  });
});

// DELETE
router.post('^/posts/(\\d+)/edit', function(req, res, params) {
  var id = params[0];
  if (!blog.get(id)) blog.remove(id);
  utilsHttp.redirect('/posts', res);
});


// UPDATE FORM
router.get('^/posts/(\\d+)/edit', function(req, res, params) {
  var post = blog.get(params[0]);
  if (!post) utilsHttp.render404(res);
  var options = {locals: {post: post}};
  utilsHttp.renderHtml('post/edit.html', res, options);
});

router.post('^/posts/(\\d+)/edit', function(req, res, params) {
  var id = params[0];
  if (!blog.get(id)) utilsHttp.render404(res);

  utilsHttp








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