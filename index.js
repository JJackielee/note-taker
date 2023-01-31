const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static("public"));

//uses the notescontroller.js file whenever /api/notes path is called. 
const notesRoute = require("./controllers/notescontroller")
app.use("/api/notes",notesRoute)


//directs/opens user to the landing page (index.heml) when the root directory/path is opened
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//direct/opens the users to notes.html when they go to the path /notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//express js function that listens to the port
app.listen(port, function () {
  console.log("listenin on port" + port);
});
