// Get references to page elements
//var expressValidator = require("express-validator");

var $name = $("#name");
var $phNumber = $("#ph-number");
var $zipCode = $("#zip-code");
var $exampleInputEmail1 = $("#exampleInputEmail1");
var $exampleInputPassword1 = $("#exampleInputPassword1");
var $exampleInputPassword2 = $("#exampleInputPassword2");
var $submitBtn = $("#signup");

// The API object contains methods for each kind of request we'll make
var API = {
  saveUsers: function (users) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(users)
    });
  },
  getUsers: function () {
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  deleteUsers: function (id) {
    return $.ajax({
      url: "api/users/" + id,
      type: "DELETE"
    });
  }
};

//refreshExamples gets new examples from the db and repopulates the list
// var refreshUsers = function() {
//   API.getUsers().then(function(data) {
//     var $user = data.map(function(users) {
//       var $a = $("<a>")
//         .text(user.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var users = {
    user_name: $name.val().trim(),
    phone_number: $phNumber.val().trim(),
    zip_code: $zipCode.val().trim(),
    email: $exampleInputEmail1.val().trim(),
    pswd: $exampleInputPassword1.val().trim(),
    pswd2: $exampleInputPassword2.val().trim()
  };
  console.log($name.val().trim());
  console.log($phNumber.val().trim());
  console.log($zipCode.val().trim());
  console.log($exampleInputEmail1.val().trim());
  console.log($exampleInputPassword1.val().trim());
  console.log($exampleInputPassword2.val().trim());
  if (
    !(
      users.user_name &&
      users.phone_number &&
      users.zip_code &&
      users.email &&
      users.pswd
    )
  ) {
    alert("You must enter all required fields!");
    return;
  }

  API.saveUsers(users).then(function () {
    //refreshUsers();
  });

  $name.val("");
  $phNumber.val("");
  $zipCode.val("");
  $exampleInputEmail1.val("");
  $exampleInputPassword1.val("");
  $exampleInputPassword2.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
//$exampleList.on("click", ".delete", handleDeleteBtnClick);
