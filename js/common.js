/*
 * Common functions used in many places.
 */

crypto = require('crypto');

/* hashData - returns sha256 digest
    notes:
        - if no salt is provided datetime is used
*/
exports.hashData = function (data, salt) {
    var slt;
    if(salt == undefined) {
        slt = new Date().toUTCString();
    } else {
        slt = salt;
    }
    var hash = crypto.createHash('sha256');
    hash.update(data);
    hash.update(slt);
    return hash.digest('hex');
};
