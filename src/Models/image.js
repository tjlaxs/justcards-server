/* jshint strict:true */
/* global require, module */

(function() {
"use strict";

module.exports = function(sequelize, DataTypes) {
	var Image = sequelize.define('Card', {
		name: DataTypes.STRING,
		id: DataTypes.NUMBER
	});
	return Image;
};

})();
