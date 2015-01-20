Node_Blogger (with Chuck Norris API Wrapper)
========================

## Node_Blogger

### Introduction

This was a mini novelty project to make an incredibly basic node blogging platform. The goal was actually to learn about routing and related node server functionalities without using any framework. To spice up the project a little, I wrote a little API wrapper for the International Chuck Norris DataBase. This supplied a new chuck norris quote every 5 seconds via the use of the wrapper and an AJX request.

### Languages/Platforms/Tools

* Node.js
* JavaScript
* jQuery

### Learning Outcomes

I largely learned the intricacies of node.js sans frameworks like Express. This was quite beneficial for future projects. It was also quite fun to play around with a novelty database of quotes and set up the server to get a quote at set intervals.


### To-do List
- [ ] I don't plan to add much more to this project, it was purely for learning purposes

### Instructions

The live version of the site will be available soon

Clone the repository:

```
$ git clone git@github.com:snozza/node_blogger.git
```

Change into the directory and npm install the modules:

```
$ cd node_blogger
$ npm install
```

Run the tests: 

```
$ mocha
```

Start the node server and visit http://localhost:8080/

```
$ node server.js

