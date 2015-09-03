var pg = require('pg');
var async = require('async');

var conString = "postgres://localhost/Northwind";

var client = new pg.Client(conString);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }

  async.series([
    function (cb) {
      createTableAddData();
      cb(null, 'one');
    },
    function (cb) {
      getCategoryFavorites();
      cb(null, 'two');
    },
    function(cb){
      updateFavorites();
      cb(null, 'three');
    },
    function(cb){
      getCategoryFavorites();
      cb(null, 'four');
    },
    function(cb){
      deleteFavorites();
      cb(null, 'five');
    },
    function(cb){
      client.query('INSERT INTO CategoryFavorites ("CategoryID") VALUES (1)');
      cb(null, 'six');
    },
    function(cb){
      getCategoryFavorites();
      cb(null, 'seven');
    }
  ]);

});

function createTableAddData () {
  client.query("DROP TABLE IF EXISTS CategoryFavorites", function(err){
    if (err) {console.log(err)}
  })
  client.query('CREATE TABLE IF NOT EXISTS CategoryFavorites("FavoriteID" SERIAL NOT NULL PRIMARY KEY, "CategoryID" INTEGER NOT NULL)', function(err){
    if (err) console.log(err);
  });
  client.query('INSERT INTO CategoryFavorites ("CategoryID") VALUES (2)', function(err){
    if (err) console.log(err);
  });
  client.query('INSERT INTO CategoryFavorites ("CategoryID") VALUES (4)', function(err){
    if (err) console.log(err);
  });
  client.query('INSERT INTO CategoryFavorites ("CategoryID") VALUES (6)', function(err){
    if (err) console.log(err);
  });
  client.query('INSERT INTO CategoryFavorites ("CategoryID") VALUES (8)', function(err){
    if (err) console.log(err);
  });
}

function getCategoryFavorites () {
  client.query('SELECT CategoryFavorites."FavoriteID", Categories."Description" FROM CategoryFavorites LEFT OUTER JOIN Categories ON CategoryFavorites."CategoryID"=Categories."CategoryID"', function (err, result) {
    if (err) console.log(err);
    console.log(result.rows);
  });
};


function updateFavorites () {
  client.query('UPDATE CategoryFavorites SET "CategoryID" = 5 WHERE "FavoriteID" = 2', function(err){
    if (err) console.log(err);
  });
};

function deleteFavorites () {
  client.query('DELETE FROM CategoryFavorites WHERE "FavoriteID" = 3', function(err){
    if (err) console.log(err);
  });
};

      // client.query('SELECT * FROM Categories', function(err, result) {
      //   if(err) {
      //     return console.error('error running query', err);
      //   }
      //   result.rows.forEach(function (row) {
      //     for(key in row){
      //       console.log(key, ':', row[key]);
      //     }
      //     console.log('\n');
      //   });

      //   client.end();
      // });





