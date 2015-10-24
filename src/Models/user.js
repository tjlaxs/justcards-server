/* jshint strict:true */
/* global require, module */

(function() {
"use strict";

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
			username: DataTypes.STRING,
			password: DataTypes.STRING
		},
		{
			associate: function(models) {
				User.hasMany(models.Deck);
			}
		});
	return User;
};

})();
