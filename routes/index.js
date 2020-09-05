const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("home", { title: "MitBin" }));

router.post("/", (req, res) => {
  // Add to db
  name = "smaple";
  res.redirect("/" + name);
});

router.get("/:id", (req, res) => {
  name = req.params.id;
  language = "clike";
  content = "Hi there";
  res.render("sample", {
    title: name + " - MitBin",
    name: name,
    language: language,
    content: content,
    createdOn: new Date(),
    expiresOn: new Date(new Date().getTime() + 1440*60000),
    helpers: {
      localeDate: function (foo) {
        return foo.toLocaleString();
      },
    },
  });
});

module.exports = router;
