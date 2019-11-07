// DEPENDENCIES
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");
const request = require("request");
const rp = require("request-promise");
// const port = 3000;
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
lastCloseR = "";

// MIDDLEWARE
// body parser middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride("_method"));
// static files middleware
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "fredmeseymour", //some random string
    resave: false,
    saveUninitialized: false
  })
);

// CONTROLLERS
// fitting room three
const showController = require("./controllers/show.js");
const usersController = require("./controllers/users.js");
const sessionsController = require("./controllers/sessions.js");

app.use("/show", showController);
app.use("/users", usersController);
app.use("/sessions", sessionsController);
handleDataTest = "";

const getStock = stock => {
  let endpoint =
    `https://www.alphavantage.co/query?apikey=S606HP5OS4LQW4TV&function=TIME_SERIES_DAILY_ADJUSTED&symbol=` +
    stock;
  // console.log("endpoint", endpoint);
  let lastClose = "";

  // const handleData = htmlString => {
  //   const responseAPI = JSON.parse(htmlString);
  //   timeSeries = responseAPI["Time Series (Daily)"];
  //   for (days in timeSeries) {
  //     lastClose = timeSeries[days]["4. close"];
  //     break;
  //   }
  //   handleDataTest = lastClose;
  //   lastClose = "abcdefg";
  //   return lastClose;
  // };

  // rp(endpoint)
  //   .then(function(htmlString) {
  //     return handleData(htmlString);
  //   })
  //   .catch(function(err) {
  //     // Crawling failed...
  //   });
  console.log("lastClose", lastClose);
  console.log("handleDataTest", handleDataTest);
  return handleDataTest;

  // console.log("after rp call", lastClose);
  // request(endpoint, function(error, response, body) {
  //   // console.log("statusCode: response.statusCode =>", response.statusCode);
  //   const responseAPI = JSON.parse(response.body);
  //   // console.log("responseAPI", responseAPI);
  //   timeSeries = responseAPI["Time Series (Daily)"];
  //   // console.log("timeSeries", timeSeries);
  //   for (days in timeSeries) {
  //     lastClose = timeSeries[days]["4. close"];
  //     // console.log("lastClose", lastClose);
  //     break;
  //   }
  //   // return lastClose;
  //   lastClose = lastClose;
};

app.get("/", (req, res) => {
  Stock.find({}, (error, allStocks) => {
    let tempAllStocks = allStocks;
    for (x in allStocks) {
      tempStock = allStocks[x].stock;
    }

    // console.log("allStocks =>", allStocks);
    if (error) {
      res.send(error);
    } else {
      res.render("index.ejs", {
        stocks: allStocks,
        currentUser: req.session.currentUser
      });
    }
  });
});
// SEED ROUTE
// NOTE: Do NOT run this route until AFTER you have a create user route up and running, as well as encryption working!
const seedStocks = require("./models/seedStock.js");
const Stock = require("./models/stockSchema.js");
const User = require("./models/usersSchema.js");
const seedUsers = require("./models/seedUsers.js");

app.get("/seedUser", (req, res) => {
  // encrypts the given seed passwords
  seedUsers.forEach(user => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });
  // seeds the data
  User.create(seedUsers, (err, createdUsers) => {
    // logs created users
    console.log(createdUsers);
    // redirects to index
    res.redirect("/");
  });
});
app.get("/seedStock", (req, res) => {
  // seeds the data
  Stock.create(seedStocks, (err, createdStocks) => {
    // logs created users
    console.log(createdStocks);
    // redirects to index
    res.redirect("/");
  });
});

//put this above your show.ejs file
app.get("/new", (req, res) => {
  console.log("In display new page");
  res.render("new.ejs");
});

// CONNECTIONS
app.listen(PORT, () => {
  console.log("listening on PORT: ", PORT);
});

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/stock";

// mongoose.connect("mongodb://localhost:27017/stock");
// Connect to Mongo
mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, () => {
  console.log("connected to mongo database");
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
