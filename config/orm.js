// Import MySQL connection.
var connection = require("../config/connection");

// Object for all our SQL statement functions.
var orm = {
    getAll: function (cb) {
        connection.query("SELECT * FROM burgers;", function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    createOne: function (cols, vals, cb) {
        var queryString = `INSERT INTO burgers(burger_name, devoured) VALUES ("`;
        queryString += vals
        queryString += `", FALSE)`;

        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw (err);
            }
            cb(result);
        });
    },
    updateOne: function (objColVals, condition, cb) {

        var queryString = "UPDATE burgers SET ";
        queryString += objColVals;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw (err);
            }
            cb(result);
        });
    },
    delete: function(condition, cb) {
        var queryString = "DELETE FROM burgers WHERE ";
        queryString += condition;
    
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });
      }
};

// Export the orm object for the model.
module.exports = orm;
