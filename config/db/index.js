"use strict";

var mysql = require("mysql2");
var fs = require("fs");
require("dotenv").config();
var myCon = mysql.createConnection({
  host: process.env.HOST_NAME || "localhost",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
});

fs.readFile("dump_file.sql", "utf8", function (err, data) {
  if (err) {
    console.log(err);
    return;
  }

  var queries = data.split(";");

  queries.forEach(function (query) {
    myCon.query(query, function (err, sets, fields) {
      if (err) console.log(err);
    });
  });

  console.log("Finished");
  myCon.end();
});
