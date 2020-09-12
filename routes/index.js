const express = require("express");
const router = express.Router();
const moment = require('moment');
const Paste = require("../models/Paste");
const isValidHttpUrl = require("../helper/calculations");

router.get("/", (req, res) => res.render("home", { title: "MitBin" }));

router.post("/", async (req, res) => {
  const paste = new Paste(req.body);

  paste.expiresAt = new Date(
    new Date().getTime() + req.body.expires * 1440 * 60000
  );

  paste.save((err) => {
    if (err) {
      console.error(err);
    }
  });

  res.redirect("/" + paste.name);
});

router.get("/:name", async (req, res) => {
  name = req.params.name;
  paste = await Paste.findOne({ name: name }).catch((err) => {
    throw err;
  });
  if (paste === null) {
    return res.redirect("/");
  }
  if (isValidHttpUrl(paste.content)) {
    return res.redirect(paste.content);
  }

  res.render("sample", {
    title: name + " - MitBin",
    name: name,
    language: "language-" + paste.language,
    content: paste.content,
    createdAt: moment.duration(new moment().diff(paste.createdAt)).humanize(),
    expiresAt: moment.duration(new moment(paste.expiresAt).diff(new moment())).humanize(),
    timestamps: name !== "about",
  });
});

module.exports = router;
