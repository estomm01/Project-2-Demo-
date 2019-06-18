var db = require("../models");
// This data source holds an array of information on pet compatibility data.
// var animal = require("../public/js/PetData.js");
const { check, validationResult } = require('express-validator/check');

module.exports = function (app) {
  // Get all examples
  app.get("/api/match", function (req, res) {
    db.Match.findAll({}).then(function (petHappydb) {
      res.json(petHappydb);
    });
  });


  app.post("/api/users", [
    //  check('user_name', 'Username field cannot be empty.').isLength(4),
    check('user_name', 'Username must be between 4-15 characters long.').isLength(4, 15),
    check('email', 'The email you entered is invalid, please try again.').isEmail(),
    check('email', 'Email address must be between 4-100 characters long, please trisN again.').isLength(4, 100),
    check('pswd', 'Password must be between 8-100 characters long.').isLength(8, 100),
    check("pswd", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
    check('pswd', 'Password must be between 8-100 characters long.').isLength(8, 100),
    check('pswd2', 'Passwords do not match, please try again.').equals('pswd')
  ], function (req, res) {
    console.log("req._validationErrors");
    console.log(req._validationErrors);
    console.log("req.body");
    console.log(req.body);

    let newUser = {
      user_name: req.body.user_name,
      phone_number: req.body.phone_number,
      zip_code: req.body.zip_code,
      email: req.body.email,
      pswd: req.body.pswd
    };
    db.User.create(newUser).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (petHappydb) {
      res.json(petHappydb);
    });
  });

  // var userTotal = userResults.reduce((a, b) => a + b);
  // console.log(userTotal);
  // console.log(userInput);
  // db.Example.create(req.body).then(function (petHappydb) {
  //   res.json(petHappydb);
  // });

  // res.json({
  //   fakeValue:'Just some fake values'
  app.post("/api/new", function (req, res) {
    //console.log(req.body);
    var userInput = JSON.parse(JSON.stringify(req.body, null, 2))['userQuizValues[]'];
    //console.log(userInput);
    var userResults = [];
    userInput.forEach(element => {
      userResults.push(Number(element));
    });

    var userTotal = userResults.reduce((a, b) => a + b);
    console.log(userTotal);
    const x = closestMatch(userTotal, animal);
    console.log('line 89 Final Index is', x);

    db.Example.create(req.body).then(function (petHappydb) {
      res.json(petHappydb);
    });

  });
  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      petHappydb
    ) {
      res.json(petHappydb);
    });
  });

  function closestMatch(userScore, petData) {
    var matchIndex;
    petData.forEach((element, i) => {
      if (element.matchScore === userScore) {
        matchIndex = i;
      }
      if ((element.matchScore + 1) === userScore) {
        matchIndex = i;
      }
      if ((element.matchScore - 1) === userScore) {
        matchIndex = i;
      }
    });
    return matchIndex;
    return petData;
  }


};
