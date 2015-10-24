/* jshint strict:true */
/* global require, module */

(function() {
"use strict";

var Sequelize = require("sequelize");

/* Models */
var User = require("./models/user");

var Database = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	storage: './database.sqlite'
});

module.exports = Database;

})();
