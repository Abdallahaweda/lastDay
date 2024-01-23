let mongoos = require("mongoose");
let express = require("express");
let session = require("express-session");
let app = express();
let port = 8080;
let userRoutes = require("./public/routes/UserRoutes");
let blogRoutes = require("./public/routes/BlogRoutes");
//!db connection
mongoos
  .connect("mongodb://localhost:27017/nodeJsFinal")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((e) => {
    console.log(e);
  });
//*startClean :)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//!Routes
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
//*session set up
app.use(
  session({
    secret: "aweda-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
//!listening on 8080
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
