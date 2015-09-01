var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./Northwind.sl3');

db.serialize(function (){
  //create table
  db.run("CREATE TABLE IF NOT EXISTS 'Category Favorites' ([FavoriteID] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [CategoryID] int NOT NULL)");
  //insert starting data
  db.run("INSERT INTO 'Category Favorites' (CategoryID) VALUES (2)");
  db.run("INSERT INTO 'Category Favorites' (CategoryID) VALUES (4)");
  db.run("INSERT INTO 'Category Favorites' (CategoryID) VALUES (6)");
  db.run("INSERT INTO 'Category Favorites' (CategoryID) VALUES (8)");
  //query table
  db.run('', function (){
    console.log('==========Category Favorites==========');
  });

  getCategoryFavorites();
  //update data
  updateFavorites();
  //query table again
  db.run('', function (){
    console.log('==========Category Favorites==========');
  });

  getCategoryFavorites();
  //delete some data
  deleteFavorites();
  //insert some more data
  db.run("INSERT INTO 'Category Favorites' (CategoryID) VALUES (1)");
  //query table again
  db.run('', function (){
    console.log('==========Category Favorites==========');
  });

  getCategoryFavorites();
  //drop table so as not to duplicate data every time the app runs
  db.run("DROP TABLE IF EXISTS 'Category Favorites' ");

  // db.run('', function (){
  //   console.log('==========Categories==========');
  // });

  // getCategories();

  // db.run('', function (){
  //   console.log('==========Products==========');
  // });

  // getProducts();

  // db.run('', function (){
  //   console.log('==========Employees==========');
  // });

  // getEmployeeSupers();

});

db.close();

function getCategories () {

  db.each('SELECT * FROM Categories', function (err, row){
    console.log(row.Description.toString());
  });
};

function getProducts () {

  db.each('SELECT * FROM Products INNER JOIN Categories ON Products.CategoryID LIMIT 10', function (err, row){
    console.log(row.ProductName + ' belongs to ' + row.CategoryName);
  });
};

function getEmployeeSupers () {

  //employee last name 's supervisor is supervisor last name
  db.each('SELECT Employees.LastName AS EmployeeLastName, Supervisors.LastName AS SupervisorLastName FROM Employees LEFT OUTER JOIN Employees AS Supervisors ON Employees.ReportsTo = Supervisors.EmployeeID', function (err, row){
    var supervisor = row.SupervisorLastName ? row.SupervisorLastName : 'no one.';
    console.log(row.EmployeeLastName + ' reports to ' + supervisor);
  });
};


function getCategoryFavorites () {
  db.each('SELECT "Category Favorites".FavoriteID, Categories.Description FROM "Category Favorites" LEFT OUTER JOIN Categories ON "Category Favorites".CategoryID = Categories.CategoryID', function (err, row) {
    console.log(row.FavoriteID + ' likes ' + row.Description.toString());
  });
};

function updateFavorites () {
  db.each('UPDATE "Category Favorites" SET CategoryID = 5 WHERE FavoriteID = 2');
}

function deleteFavorites () {
  db.each('DELETE FROM "Category Favorites" WHERE FavoriteID = 3');
}







