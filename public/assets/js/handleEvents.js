// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var newperson = {
      name: $("#textarea1").val().trim(),
    };

    console.log("New person" +newperson);
    // window.location = "/game#" +newperson;
     $.ajax("/api/game", {
       type: "POST",
       data: newperson
     }).then(
       function() {
         console.log("created new person");
         // Reload the page to get the updated list
        //  window.location = "/game";
        window.location.replace("/game");
       }
     );
   });
   $("#again").on("click", function (event) {
    event.preventDefault();
    return res.redirect("/game");
    // window.location("/game")
   });
});



//   $("#ca").on("click", function (event) {});
// });


