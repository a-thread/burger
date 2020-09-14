var orm = require("../config/orm.js");

var burger = {
    all: function () {
        orm.all().then((result) => {
            console.log(result);
        });
    },
    create: function (cols, vals) {
        orm.create(cols, vals).then((result) => {
            console.log(result);
        });
    },
    update: function (condition) {
        orm.delete(condition).then((result) => {
            console.log(result);
        });
    }
};

module.exports = burger;