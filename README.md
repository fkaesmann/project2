# project2

GA project 2

GA project 2, called stockTracker, is a strock tracking application that is password protected with session keys. stockTracker allows users to create new user ID's and add new stock tickers to track.

Functionality inlcudes full CRUD with index listing, create new persons and stocks, update stocks, and delete stocks. Update persons and delete persons is not included.

### Developer

Fred Kaesmann
Nov. 2019

## URL to site

xxx

## Mockuup WireFrame

![](https://user-images.githubusercontent.com/35512164/68419092-93bb3400-0167-11ea-9de7-373e2d953999.png)

## Screen Shot

![](https://user-images.githubusercontent.com/35512164/68419495-560adb00-0168-11ea-87e4-ab60c9cb2418.png)

## Features

```
1. Home page encourages users to create an account
2. Ability to create a new user account
3. Ability to create new stock holding, edit them, and delete them
4. Main feature is to protect the home page with a session key

```

## Key Technologies

```
- JavaScript
- HTML
- CSS
- flexbox
- Bootstrap
- Mongo
- Mongoose

import
```

### Node

npm init -y
npm i express ejs
npm install method-override
npm install express-session
npm install bcrypt --save
npm install request --save
npm install request-promise --save

### Mongo

npm install mongoose
echo DBQuery.prototype.\_prettyShell = true >> ~/.mongorc.js

## Key Code Functions

```
* Reading encryped password and comparing them to login password
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.redirect("/");
    } else {
      res.send("wrong password");
    }
  });

```

## Credits

```
1. w3schools.com https://www.w3schools.com/
2. News API https://newsapi.org/
3. stack overflow https://stackoverflow.com/
4. surge https://surge.sh/
```

## Authors and acknowledgment

The General Assembly instructors were key resouces in developing this site
