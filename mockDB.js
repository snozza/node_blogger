function DB() {
  this.db = {};
}

var id = 0;

DB.prototype.add = function(object) {
  object.id = ++id;
  this.db[id] = object;
};

DB.prototype.update = function(id, object) {
  object.id = id;
  this.db[id] = object;
};

DB.prototype.remove = function(id) {
  delete this.db[id];
};

DB.prototype.get = function(id) {
  return this.db[id];
};

DB.prototype.posts = function() {
  var posts = [];
  for (var id in this.db) {
    posts.push(this.db[id]);
  }
  return posts.sort(function(a, b) { return a.id - b.id });
};

module.exports = DB;