var express = require("express");

var router = express.Router();

var burger = require("../models/burger");

router.get("/", function (req, res) {
    burger.all(function (data) {
        var brgrObj = {
            burgers: data
        };
        console.log(brgrObj);
        res.render("index", brgrObj);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.create([
        "name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function (result) {
        res.json({ id: result.insertId })
    });
});

router.put("/api/burgers:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    burger.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  // Export routes for server.js to use.
  module.exports = router;