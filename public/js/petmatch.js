
//etMatch / public / assets / src / petMatch / petMatch.js;
console.log("-===================");
//etMatch / public / assets / src / petMatch / petMatch.js


// etMatch / public / assets / src / petMatch / petMatch.js;

console.log("-===================");
//etMatch / public / assets / src / petMatch / petMatch.js


var count = 0;
//Create variable to hold the user's choice/answer.
var userChoice;
//Create variable for choice button so that we can create it using jQuery.
var choiceBtn;
//Create variable for View Quiz Results button so that we can create it using jQuery.
var resultsBtn;
//Create an array that will hold all of the user's scores.
var scoresArray = [];
//Create variable to hold user quiz values.
var userQuizValues = [];
var findMatchPets;
//Construct query URL to get pet data from petfinder API to return matching pets.
// var queryURL = "https://api.petfinder.com/pet.find?";
//Create variable for LIKE button so that we can create it using jQuery.
var likeBtn;
//Create variable to hold all questions.
var questionSet = {

  questionArray: [
    {
      question:
        "I would prefer a pet that is good around other animals and other people.",
      choices: ["1 (STRONGLY DISAGREE)", "2", "3", "4", "5 (STRONGLY AGREE)"],
      values: ["1", "2", "3", "4", "5"]
    },
    {
      question:
        "I would like to have a pet that would like exercising with me.",
      choices: ["1 (STRONGLY DISAGREE)", "2", "3", "4", "5 (STRONGLY AGREE)"],
      values: ["1", "2", "3", "4", "5"]
    },
    {
      question: "I would like a pet that is loyal.",
      choices: ["1 (STRONGLY DISAGREE)", "2", "3", "4", "5 (STRONGLY AGREE)"],
      values: ["1", "2", "3", "4", "5"]
    },
    {
      question: "I consider myself to be an affectionate.",
      choices: ["1 (STRONGLY DISAGREE)", "2", "3", "4", "5 (STRONGLY AGREE)"],
      values: ["1", "2", "3", "4", "5"]
    },
    {
      question: "I prefer a pet that likes to stay inside.",
      choices: ["1 (STRONGLY DISAGREE)", "2", "3", "4", "5 (STRONGLY AGREE)"],
      values: ["1", "2", "3", "4", "5"]
    },
    {
      question: "I would prefer a pet that likes being outdoors.",
      choices: ["YES", "NO"],
      values: ["1", "0"]
    },
    {
      question: "What size pet are you looking for?",
      choices: ["SMALL", "MEDIUM", "LARGE"],
      values: ["0", "1", "2"]
    },
    {
      question:
        "I don't mind a pet that is always willing to give me affection and is very energetic.",
      choices: ["1 (STRONGLY DISAGREE)", "2", "3", "4", "5 (STRONGLY AGREE)"],
      values: ["1", "2", "3", "4", "5"]
    }


  ]

}


//Hide question-div at start of quiz.

$("#question-div").hide();

//Hide progress bar at start of quiz.

$("#quiz-progress-bar").hide();

//When start quiz button is clicked, start quiz.


$("#start-quiz-btn").on("click", function () {

  $(".start-quiz-btn").on("click", function () {

    $("#start-quiz-btn").on("click", function () {

      start();
      // $(".start-quiz-btn").on("click", function () {

      //


      //create some post and get functions
      $("#view-results-btn").on("click", function () {

        $("#match-results-modal").modal('show');
        console.log(scoresArray);
        $("#match-results-modal").modal({
          closable: true
        });
        console.log("button clicked");
        //When user submits scores...
        userQuizValues = [
          {
            question1: scoresArray[0],
            question2: scoresArray[1],
            question3: scoresArray[2],
            question4: scoresArray[3],
            question5: scoresArray[4],
            question6: scoresArray[5],
            question7: scoresArray[6],
            question8: scoresArray[7],

          }
        ]



        // // $.post("/api/new", userQuizValues)
        // $.post("/api/new", { scoresArray }).then(function (data) {

        //   console.log(data);
        //   alert("Adding info...");
        // });

        // $.get("/api/", function (data) {
        //   console.log("This is your Data: " + data + "is the best match");

        //   if (data) {
        //     // $("#stats").show();
        //     $("#thePet").text(data);
        //     $("#thePet").attr("data-match", data);
        //     // $("#displaypic").text(data);


        //   }
        //   else {
        //     $("#match-results-modal").text(
        //       "sorry, no match has been found, you will continue to be lonely"
        //     )
        //   };

        // });

      });

    });
    $(document).on("click", "#view-results-btn", function () {
      // Database call:
      // Sending results to the database:
      console.log('do CRUD here');
      console.log('Line 284', userQuizValues);
      $.post("/api/new", { userQuizValues }).then(function (data) {

        console.log(data);
        alert("Adding info...");
      });

    });



    //Start quiz function
    function start() {

      // need to update the dom



      $("#question-div")
        .show()
        .html("<h1>" + "Your results are ready!" + "</h1>");
      $("#start-quiz-btn").hide();
      $("#quiz-instructions").hide();
      //Show progress bar when quiz is started.
      $("#quiz-progress-bar").show();
      //Show the question-div at the start of the quiz. Display question and choices based on the current count. Count starts at 0.
      $("#question-div").show().html("<h1> " + questionSet.questionArray[count].question + "</h1>");
      //Loop through the number of choices. For each choice that the user can guess...
      for (var i = 0; i < questionSet.questionArray[count].choices.length; i++) {
        var choiceBtn = $("<button>");
        //Add semantic UI styling to the button to make the button look cool.
        choiceBtn.addClass("ui fluid blue button choiceBtn");
        //Give each button an id.
        choiceBtn.attr("id", "question-" + (count + 1) + "-" + questionSet.questionArray[count].values[i]);
        //Give each button a data attribute called data-value.
        choiceBtn.attr("value", questionSet.questionArray[count].values[i]);
        choiceBtn.text(questionSet.questionArray[count].choices[i]);
        //Append choiceBtn to question-div so that it appears right below the question.
        $("#view-quiz-results-div").show().append(choiceBtn);
        //When user clicks the choiceBtn, push value to user's scores array and go to next question.
        $(choiceBtn).on("click", function () {
          //console.log($(this).val());
          scoresArray.push($(this).val());
          // console.log(scoresArray);
          //Go to the next question in the quiz.
          nextQuestion();
        });
      }
    }

    //When user answers a quiz question, go to the next question.
    function nextQuestion() {
      // Increment the quiz question count by 1
      count++
      //Remove previous question from HTML before going onto the next question in the quiz.
      $("#question-div").hide();
      //Remove choice buttons from previous question from HTML.
      $("#view-quiz-results-div").empty();
      //Increment progress bar by 10 for each question.
      // $('#quiz-progress-bar')
      // .progress('increment', 10);
      //If the count is the same as the length of the questionSet.questionArray array, find match.
      if (count === questionSet.questionArray.length) {
        findMatch();
      }

      //else, if there are still questions left, go to next question.
      else {
        start();
      }
    }

    function findMatch() {
      $("#question-div").show().html("<h1>" + "Your results are ready!" + "</h1>");
      //Create a button to view the quiz results (resultsBtn).
      resultsBtn = $("<button>");
      resultsBtn.html("<h2>" + "view result" + "</h2>");
      resultsBtn.addClass("ui fluid blue button");
      resultsBtn.attr("id", "view-results-btn");
      //Append the resultsBtn so it shows up in the HTML.
      $("#view-quiz-results-div").append(resultsBtn);
      //When the user clicks the view results button, show match.


      $("#view-results-btn").on("click", function () {
        $("#match-results-modal").modal("show");

        $("#match-results-modal").modal({
          closable: true
        });
      });

      console.log("button clicked");

      //When user submits scores...

      userQuizValues = [
        {
          question1: scoresArray[0],

          question2: scoresArray[1],

          question3: scoresArray[2],

          question4: scoresArray[3],

          question5: scoresArray[4],

          question6: scoresArray[5],

          question7: scoresArray[6],

          question8: scoresArray[7],

          question9: scoresArray[8],

          question10: scoresArray[9]
        }
      ];
    }
    console.log(userQuizValues);
    //create some post and get functions

    $("#view-results-btn").on("click", function () {

      // $("#match-results-modal").modal('show');
      console.log(scoresArray);
      // $("#match-results-modal").modal({
      // closable: true
      // });
      console.log("button clicked");
      //When user submits scores...
      userQuizValues = [
        {
          question1: scoresArray[0],
          question2: scoresArray[1],
          question3: scoresArray[2],
          question4: scoresArray[3],
          question5: scoresArray[4],
          question6: scoresArray[5],
          question7: scoresArray[6],
          question8: scoresArray[7],

        }
      ]

      console.log(userQuizValues);

      // $.post("/api/new", userQuizValues)
      $.post("/api/new", { scoresArray }).then(function (data) {

        console.log("this is your data!!!!    " + data);
        alert("Adding info...");
      });

      $.get("/api/", function (data) {
        console.log("This is your Data: " + data + "is the best match");

        if (data) {
          // $("#stats").show();
          $("#thePet").text(data);
          $("#thePet").attr("data-match", data);
          // $("#displaypic").text(data);


        }
        else {
          $("#match-results-modal").text(
            "sorry, no match has been found, you will continue to be lonely"
          )
        };

      });

    });

  });

  //When user submits scores...

  userQuizValues = [
    Number(scoresArray[0]),
    Number(scoresArray[1]),
    Number(scoresArray[2]),
    Number(scoresArray[3]),
    Number(scoresArray[4]),
    Number(scoresArray[5]),
    Number(scoresArray[6]),
    Number(scoresArray[7])
  ];


  // userQuizValues = [
  //   {
  //     question1: scoresArray[0],

  //     question2: scoresArray[1],

  //     question3: scoresArray[2],

  //     question4: scoresArray[3],

  //     question5: scoresArray[4],

  //     question6: scoresArray[5],

  //     question7: scoresArray[6],

  //     question8: scoresArray[7]

  //   }
  // ];


}
