require("dotenv").config();

const express = require("express"),
  app = express(),
  { json } = require("body-parser"),
  port = process.env.PORT || 3005,
  session = require("express-session"),
  checkForSession = require("./middlewares/checkForSession"),
  { read } = require("./controllers/swagController"),
  {
    login,
    register,
    signout,
    getUser
  } = require("./controllers/authController"),
  { add, deleteitem, checkout } = require("./controllers/cartController"),
  { search } = require("./controllers/searchController");

app.use(json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 100000
    }
  })
);

app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

// swagController
app.get("/api/swag", read);

// authController
app.get("/api/user", getUser);
app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/signout", signout);

// cartController
app.post("/api/cart", add);
app.post("/api/checkout", checkout);
app.delete("/api/cart", deleteitem);

// seachController
app.get("/api/search", search);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
