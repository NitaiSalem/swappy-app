const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();
const users = require("./routes/api/users");
const editImages = require("./routes/api/edit-images");
const user = require("./routes/api/user");
const userEditDetails = require("./routes/api/user-edit-details");
const search = require("./routes/api/search");
const path = require("path");
// app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/user-edit-images", editImages);
app.use("/api/user-edit-details", userEditDetails);
app.use("/api/user", user);
app.use("/api/search", search);

app.use("/public", express.static(path.join(__dirname, "./public"))); //Serves resources from public folder this worked!

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

//this renders the old ui from guide, server side rendering?
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
