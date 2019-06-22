
var db = require("../models");
var animal = require("../public/js/PetData.js");
var myPet = [];
var newMan = [];
var counter = 0;
var absoluteArray = [];
module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (
      petHappydb
    ) {
      res.render("example", {
        example: petHappydb
      });
    });
  });

  app.get("/signin", function (req, res) {
    res.render("signin");
  });

  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.get("/forgot", function (req, res) {
    res.render("forgot");
  });

  app.get("/survey", function (req, res) {
    res.render("survey");
  });

  app.get("/quiz", function (req, res) {
    res.render("quiz");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
  //HTML route for pet search page.
  app.get("/petsearch", function (req, res) {
    res.render("search");
  });

  app.post("/api/new", function (req, res) {
    var userQuizValues = req.body;
    console.log("here is your scores array " + JSON.stringify(userQuizValues));
    pushTolist(userQuizValues);
  });

};

function grabInfo() {
  if (counter <= 19) {
    myPet = [];

    dummy = [];
    dummy.push(animal[counter].Excr, animal[counter].Loyalty, animal[counter].Affectionate, animal[counter].Backyard, animal[counter].Size, animal[counter].Energetic, animal[counter].Clean)
    // console.log("this is the dummy array "+dummy);
    getAbsolute();
  } else {
    console.log("this is the end");
    counter = 0;
  }
}

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

// const x = closestMatch(28, animal);
// console.log('line 89 Final Index is', x);
