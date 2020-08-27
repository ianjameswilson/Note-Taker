const router = require("express").Router();
const db = require("../db/db.json");
const { v4: uuidv4 } = require('uuid');

// Display Notes
router.get("/notes", function(req, res) {
    res.json(db);
});

// Create New Note - takes in JSON input
router.post("/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let id = {id: uuidv4()};
    var newNote = Object.assign(req.body, id);

    console.log(newNote);
    db.push(newNote);

    res.json(newNote);
});

// Delete Previous Note
router.delete("/notes/:id", function(req, res) {
   const noteID = req.params.id;
   for (let i = 0; i < db.length; i++) {
    let obj = db[i];
    if (noteID.indexOf(obj.id) !== -1) {
      db.splice(i, 1);
      i--;
    }
    }
    return res.json(db);
});

module.exports = router;