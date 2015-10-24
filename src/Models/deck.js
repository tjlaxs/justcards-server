/* jshint strict:true */
/* global require, module */

(function() {
"use strict";

module.exports = function(sequelize, DataTypes) {
	var Deck = sequelize.define('Deck', {
			name: DataTypes.STRING
		},
		{
			associate: function(models) {
				Deck.belongsTo(models.User);
				Deck.hasMany(models.Card);
			}
		});
	return User;
};

})();
