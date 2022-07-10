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
// path module, which provides utilities for working with file and directory paths:
const path = require("path");
// app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(path.join(__dirname, "./public"))); //Serves resources from public folder 
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
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



const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

//import the client build folder to the server.
//renders the app in localhost5000 after running npm run build and creating the build directory  
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
/*
Step 2 will ensure that the routes defined with React Router are working once the application has been deployed.
 It handles any requests by redirecting them to index.html.
*/
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
