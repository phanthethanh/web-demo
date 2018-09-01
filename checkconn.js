var express = require('express');
var mongodb = require('mongodb');
var app = express();

var MongoClient = require('mongodb').MongoClient;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/shoes", function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

