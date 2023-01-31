const express = require('express');
const router = express.Router();
const fs = require("fs");
const randId = require('generate-unique-id');


//router that handles get request. reads the json file in our db folder. then returns that the data into the page
router.get("/", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const notesData = JSON.parse(data);
        res.json(notesData);
      }
    });
});


//router that handles post request that takes in some data in the body of the post request.
//it reads the db.json file and converts it into an array of objects. it then adds a new object into that array with the
//information we got from the body of our post request. then we overwrite our db.json file with the added data.
// we are also using a new npm packat that generates a random ID to add into this new object
router.post("/", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("oh no!");
      throw err;
    } else {
      const notesData = JSON.parse(data);
      const newData = {
        title: req.body.title,
        text: req.body.text,
        id: randId()
      }
      notesData.push(newData);
      fs.writeFile("./db/db.json", JSON.stringify(notesData, null, 4), (err) => {
        if (err) {
          res.status(500).send("oh no!");
          throw err;
        } else {
          res.send("data added!");
        }
      });
    }
  });
});


//router that handles delete request that takes in a parameter of an ID corresponding to the note the user wants to delete
//we read db.json file in our directory and parse it and change it into an object
//we then use the filter method to find the ID that was passed in parameter to find it in the array of object. if it matches then the filter method
// will not include it in the new array. 
//it will then overwrite our db.json file with the new array of objects. 
router.delete("/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("oh no!");
      throw err;
    } else {
      let notesData = JSON.parse(data);
      notesData = notesData.filter((note) => {
        if (note.id == req.params.id) {
          return false
        } else {
          return true;
        }
      });
      fs.writeFile("./db/db.json", JSON.stringify(notesData, null, 4), (err) => {
        if (err) {
          res.status(500).send("oh no!");
          throw err;
        } else {
          res.send("data updated!");
        }
      });
    }
  });
});
  

module.exports = router;