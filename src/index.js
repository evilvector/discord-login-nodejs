const passport = require("./passport/passport");
const session = require("express-session");
const { join } = require("node:path");
const express = require("express");
const morgan = require("morgan");
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "logindiscord",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Static Files
app.use(express.static(join(__dirname, "public")));

// Routes
app.use(require("./routes/routes"));

// Listening
app.listen(app.get("port"), () => {
  console.log("Server on port:", app.get("port"));
});
