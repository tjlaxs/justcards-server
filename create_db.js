var crypto = require('crypto');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('sqlite3.db');
var globalSalt="DippadapppaHobbabobbaLiulauloiasdfjotiantekstiivaase8";

function hashPassword(password, salt) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(salt);
    return hash.digest('hex');
};

db.serialize(function () {
    db.run("CREATE TABLE if not exists users (Id INTEGER PRIMARY KEY, Nickname TEXT, Password TEXT, Superuser INTEGER DEFAULT 0);");
    var stmt = db.prepare("INSERT INTO users(Nickname, Password, Superuser) VALUES (?, ?, ?)");
    stmt.run('Admin', hashPassword('Admin', globalSalt), 1);
    stmt.finalize();
    
    db.each("SELECT * from users", function (err, row) {
        console.log(row.Id + ": " + row.Nickname + "(" + row.Password + ")");
    });
});

db.close();
