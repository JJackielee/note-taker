const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const notesRoute = require("./controllers/notescontroller")
app.use("/api/notes",notesRoute)



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


app.listen(port, function () {
  console.log("listenin on port" + port);
});
