/* Notice: requires hashData(pw,salt) function */

function JCcreateDB() {
    var common = require('./js/common.js');
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('sqlite3.db');
    var globalSalt="DippadapppaHobbabobbaLiulauloiasdfjotiantekstiivaase8";

    db.serialize(function () {
        /* Users */
        db.run("CREATE TABLE if not exists User (Id INTEGER PRIMARY KEY, Nickname TEXT, Password TEXT, Superuser INTEGER DEFAULT 0);");
        var stmt = db.prepare("INSERT INTO User(Nickname, Password, SuperUser) VALUES (?, ?, ?);");
        stmt.run('Admin', common.hashData('Admin', globalSalt), 1);
        stmt.finalize();
        
        /* Images */
        db.run("CREATE TABLE if not exists Image (Id INTEGER PRIMARY KEY, Name TEXT, Path TEXT, Owner INTEGER, FOREIGN KEY(Owner) REFERENCES User(Id));");
        
        /* Decks */
        db.run("CREATE TABLE if not exists Deck (Id INTEGER PRIMARY KEY, AddTime TEXT, Name TEXT, CardBack INTEGER, Owner INTEGER, FOREIGN KEY(CardBack) REFERENCES Image(Id), FOREIGN KEY(Owner) REFERENCES User(Id));");
        
        /* Cards */
        db.run("CREATE TABLE if not exists Card (Id INTEGER PRIMARY KEY, CardFace INTEGER, FOREIGN KEY(CardFace) REFERENCES Image(Id));");
        
        /* Events */
        db.run("CREATE TABLE if not exists Event (Id INTEGER PRIMARY KEY, Time TEXT, Owner INTEGER);");
        db.run("CREATE TABLE if not exists AddCardEvent (Id INTEGER PRIMARY KEY, Image INTEGER, User INTEGER, FOREIGN KEY(Image) REFERENCES Image(Id), FOREIGN KEY (User) REFERENCES User(Id));");

        /* Tell what we have done */
        db.each("SELECT * from User", function (err, row) {
            console.log("User " + row.Id + ": " + row.Nickname + "(" + row.Password + ")");
        });
        var i = 1;
        db.each("SELECT name FROM sqlite_master WHERE type IN ('table', 'view') AND name NOT LIKE 'sqlite_%';", function (err, row) {
            console.log("Table " + i++ + ": " + row.name);
        });
    });

    db.close();
}

JCcreateDB();
