// DEPENDENCIES
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");
const request = require("request");
const port = 3000;
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

const getStock = stock => {
  let endpoint =
    `https://www.alphavantage.co/query?apikey=S606HP5OS4LQW4TV&function=TIME_SERIES_DAILY_ADJUSTED&symbol=` +
    stock;
  // console.log("endpoint", endpoint);
  let rrr = "";
  request(endpoint, function(error, response, body, rrr) {
    console.log("statusCode: response.statusCode =>", response.statusCode);

    const responseAPI = JSON.parse(response.body);
    let lastClose = "";
    let tester = responseAPI.body;
    tester = responseAPI["Time Series (Daily)"];

    for (x in tester) {
      lastClose = tester[x]["4. close"];
      break;
    }
    // console.log("lastClose => ", lastClose);
    lastCloseR = lastClose;
  });
};

app.get("/", (req, res) => {
  Stock.find({}, (error, allStocks) => {
    let tempAllStocks = allStocks;
    for (x in tempAllStocks) {
      // console.log("Stock => ", x, allStocks[x].stock);

      tempStock = tempAllStocks[x].stock;
      // console.log("tempStock ", tempStock);
      console.log("Get stock return is ", getStock(tempStock));
      // tempAllStocks[x]["lastValue"] = getStock(tempAllStocks[x].stock);
      // console.log("ddd=>", tempAllStocks[x].lastValue);
    }
    // console.log("in app.get / allStocks =>", tempAllStocks);
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
app.listen(port, () => {
  console.log("listening on port: ", port);
});

mongoose.connect("mongodb://localhost:27017/stock");
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// const getStock = stock => {
//   let endpoint =
//     `https://www.alphavantage.co/query?apikey=S606HP5OS4LQW4TV&function=TIME_SERIES_DAILY_ADJUSTED&symbol=` +
//     stock;

//   request(endpoint, function(error, response, body) {
//     // console.log("error:", error); // Print the error if one occurred
//     // console.log("statusCode:", response && response.statusCode);
//     // console.log("statusCode: response.body =>", response.body);
//     console.log("statusCode: response.statusCode =>", response.statusCode);

//     const responseAPI = JSON.parse(response.body);
//     let lastClose = "";
//     let tester = responseAPI.body;
//     tester = responseAPI["Time Series (Daily)"];

//     for (x in tester) {
//       lastClose = tester[x]["4. close"];

//       break;
//     }
//     console.log("lastClose => ", lastClose);
//     return lastClose;
//   });
// };

// let endpoint = `https://www.alphavantage.co/query?apikey=S606HP5OS4LQW4TV&function=TIME_SERIES_DAILY_ADJUSTED&symbol=GE`;
// let endpoint =
//   `https://www.alphavantage.co/query?apikey=S606HP5OS4LQW4TV&function=TIME_SERIES_DAILY_ADJUSTED&symbol=` +
//   "GE";

// console.log("getStock => ", getStock("GE"));
