const express = require("express");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require('./config/db')


// Load Config
dotenv.config();

const app = express();

connectDB();

// Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');


// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/api", require("./routes/api"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server has initialized"));
