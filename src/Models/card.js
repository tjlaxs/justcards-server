/* jshint strict:true */
/* global require, module */

(function() {
"use strict";

module.exports = function(sequelize, DataTypes) {
	var Card = sequelize.define('Card', {
			name: DataTypes.STRING,
			imageId: {
				type: DataTypes.NUMBER,
				field: 'image_id'
			}
		});
	return User;
};

})();
