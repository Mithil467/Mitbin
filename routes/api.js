const express = require("express");
const router = express.Router();
const Paste = require("../models/Paste");
const isValidHttpUrl = require("../helper/calculations");
const cors = require("cors");

/**
 * @api {get} /paste Get Paste
 * @apiName GetPasteFromName
 * @apiGroup Paste
 * @apiDescription Get paste from name if it exists
 *
 * @apiSuccess (Success 200) {Array} paste Single paste object if it exists, else empty array
 * 
 * @apiParam {String} name Unique name of paste 
 * 
 * @apiSampleRequest /paste
 * 
 * @apiSuccessExample {js} Success-Response:
        HTTP/1.0 200 OK
        [
            {
                "name": "about",
                "language": "Plain Text",
                "content": "I am Mithil, a programming enthusiast. I am new to nodejs, and this is my first project! 😉\r\n\r\nDo tell me your feedback, I would be glad to hear from you!",
                "createdAt": "2020-09-09T11:23:10.105Z",
                "expiresAt": "2025-09-09T11:53:10.106Z"
            }
        ]
  * @apiVersion 0.1.0
 */
router.get("/paste", cors(), async (req, res) => {
  name = req.query.name;
  paste = await Paste.findOne({ name: name }, { _id: 0, __v: 0 }).catch(
    (err) => {
      throw err;
    }
  );
  if (paste) res.json([paste]);
  else res.json([]);
});

/**
 * @api {post} /paste Add a new paste
 * @apiName AddPaste
 * @apiGroup Paste
 * @apiDescription Add a new paste based on it's attributes
 *
 * @apiSuccess (Success 201) {Object} paste The created paste object
 * 
 * @apiParam {String} name Unique name of paste 
 * @apiParam {String} language Select one from : `["clike", "python", "json", "Plain Text"]`
 * @apiParam {String} content Content for paste
 * @apiParam {Number} expiresInMinutes Minutes in which paste should expire
 * 
 * @apiSampleRequest /paste
 * 
 * @apiSuccessExample {js} Success-Response:
        HTTP/1.0 201 Created
        {
            "name": "Example",
            "content": "This is an example",
            "language": "Plain Text",
            "createdAt": "2020-09-09T21:21:47.647Z",
            "expiresAt": "2020-09-09T21:31:47.649Z"
        }
  *
  * @apiError (403) Forbidden Incomplete or incompatible data
  * @apiErrorExample Name not unique
  *     HTTP/1.0  Not Found
  *     {
  *       "error": "Name already exists!"
  *     }
  * @apiErrorExample Paramaters are missing or wrong
  *     HTTP/1.0  Not Found
  *     {
  *       "error": "Please pass all the required parameters correctly!",
  *     }
  * @apiVersion 0.1.0
 */
router.post("/paste", cors(), async (req, res) => {
  const paste = new Paste(req.body);
  paste.expiresAt = new Date(
    new Date().getTime() + req.body.expiresInMinutes * 60000
  );

  await paste.save((err) => {
    if (err) {
      console.error(err.name);
      if (err.code === 11000) {
        return res.status(403).json({ error: "Name already exists!" });
      } else if (err.name === "ValidationError") {
        return res
          .status(403)
          .json({
            error: "Please pass all the required parameters correctly!",
          });
      } else {
        return res.status(403).json({ error: "Some error" });
      }
    } else {
      const showPaste = new Paste(paste).toObject();
      delete showPaste._id;
      delete showPaste.__v;
      res.status(201).json(showPaste);
    }
  });
});

module.exports = router;
