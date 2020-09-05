const express = require("express");
const router = express.Router();
const Paste = require("../models/Paste");

router.get("/", (req, res) => res.render("home", { title: "MitBin" }));

router.post("/", async (req, res) => {
  const paste = new Paste(req.body);

  paste.expiresAt = new Date(
    new Date().getTime() + req.body.expires * 1440 * 60000
  );

  paste.save((err) => {
    if (err) return handleError(err);
  });

  name = req.body.name;
  res.redirect("/" + name);
});

router.get("/:name", async (req, res) => {
  name = req.params.name;
  paste = await Paste.findOne({ name: name }).catch((err) => {
    throw err;
  });
  if(paste === null)
  {
    res.redirect('/');
  }
  
  res.render("sample", {
    title: name + " - MitBin",
    name: name,
    language: paste.language,
    content: escape(paste.content),
    createdAt: paste.createdAt,
    expiresAt: paste.expiresAt,
    timestamps: name !== "about",
    helpers: {
      localeDate: function (date) {
        return date.toLocaleString();
      },
    },
  });
});

const escape = (s) => {
    s = s.replace('<', '&lt;');
    s = s.replace('>', '&gt;');
    return s;
}

router.get("/api/paste", async (req, res) => {
  name = req.query.name;
  paste = await Paste.findOne({ name: name }).catch((err) => {
    throw err;
  });
  res.json({"exist": paste===null});
});

module.exports = router;
