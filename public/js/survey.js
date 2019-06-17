$(document).ready(function(){
  $("#q1").val("1");
  $("#q2").val("2");
  $("#q3").val("3");
  $("#q4").val("4");
  $("#q5").val("5");
  $("#q6").val("1");
  $("#q7").val("1");
  $("#q8").val("1");
});

$("#submit-survey").on("click", function() {
  event.preventDefault();

  function validateForm() {
    var isValid = true;

    $(".form-control").each(function() {
      if ($(this).val === "") {
        isValid = false;
      }
    });
    return isValid;
  }

  if (validateForm() === true) {
    var ans1 = parseInt($("#q1").val());
    var ans2 = parseInt($("#q2").val());
    var ans3 = parseInt($("#q3").val());
    var ans4 = parseInt($("#q4").val());
    var ans5 = parseInt($("#q5").val());
    var ans6 = parseInt($("#q6").val());
    var ans7 = parseInt($("#q7").val());
    var ans8 = parseInt($("#q8").val());
// Below data will hold all of the animals.
// ===============================================================================

// var animal = [
//   {
//     routeName: "cat",
//     name: "Siamese",
//     role: "pet",
//     compatability: 0,
//     Excr: 1,
//     Loyalty: 3,
//     Affectionate: 5,
//     Backyard: 2,
//     Size: 1,
//     Energetic: 2,
//     match_score : 4
//   },
// {
//
//    match_score:7
//}
// ];

    for(var i=0; i<animal.length; i++){
      if(animal[i].Excr === ans1){
        animal[i].match_score++;
      }
      if(animal[i].Loyaltyr === ans2){
        animal[i].match_score++;
      }
      if(animal[i].Affectionate === ans3){
        animal[i].match_score++
      }
      if(animal[i].Backyard === ans4){
        animal[i].match_score++;
      }
      if(animal[i].Size === ans5){
        animal[i].match_score++;
      }
      if(animal[i].Energetic === ans6){
        animal[i].match_score++;
      }
      if(animal[i].Clean === ans7){
        animal[i].match_score++;
      }
      if(animal[i].CatorDog === ans8){
        animal[i].match_score++;
      }

    }
//check which match_score is the hightest and that is the one your pet

    var total_score = (ans1 + ans2 + ans3 + ans4 + ans5 + ans6 + ans7 + ans8) / 8;
    var userInfo = {
      //REMEMBER: need to change text, description field name from DB
      //replace with it
      text: "101",
      description: total_score
    };

    //console.log(userInfo);
    var currentURL = window.location.origin;
    console.log(currentURL);

    $.post(currentURL + "/api/examples", userInfo, function(data) {
      console.log(data);
      //$("#match-name").text(data.name);
      $("#match-score").text("src", total_score);
      //$("#result-modal").modal("toggle");
    });
  } else {
    alert("Please fill out all information before submitting.");
  }
  return false;
});
