const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("home", { title: "MitBin"}));

router.get("/sample", (req, res) => res.render("sample", { title: "Sample - MitBin"}));

module.exports = router;
