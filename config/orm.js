// Import MySQL connection.
var connection = require("../config/connection");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
    all: function () {
        return new Promise((resolve, reject) => {
            var queryString = "SELECT * FROM burgers";
            connection.query(queryString, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    create: function (brgrName, vals) {
        return new Promise((resolve, reject) => {
            var queryString = "INSERT INTO burgers ? VALUES ?";

            console.log(queryString);

            connection.query(queryString, [brgrName.toString(), vals.length], function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    update: function (objColVals, condition) {
        return new Promise((resolve, reject) => {
            var queryString = "UPDATE burgers SET ? WHERE ?";

            console.log(queryString);
            connection.query(queryString, [objToSql(objColVals), condition], function (err, result) {
                if (err) reject(err);

                resolve(result);
            });
        });
    },
    delete: function (brgrId) {
        return new Promise((resolve, reject) => {
            var queryString = "DELETE FROM burger WHERE ?";

            connection.query(queryString, brgrId, function (err, result) {
                if (err) reject(err);

                resolve(result);
            });
        });
    }
};

// Export the orm object for the model.
module.exports = orm;
