// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var newperson = {
      name: $("#textarea1").val().trim(),
    };

    console.log("New person" +newperson);
    if(Error){
    $(".errorMsg").text('Please enter your name.');
    }

    // window.location = "/game#" +newperson;
     $.ajax("/api/game", {
       type: "POST",
       data: newperson
     }).then(
       function(res) {
         console.log("created new person");
         console.log(res);
         // Reload the page to get the updated list
        //  window.location = "/game";
        console.log(res.playerUUID);
        console.log(res.name);
        window.location.replace("/game?id=" +res.playerUUID+"&name="+res.name);

       }
     );
   });

   
   $("#again").on("click", function (event) {
    event.preventDefault();
    // return res.redirect("/");
    window.location.replace("/")
   });

   $("#textarea1").on("click", function(event){
    event.preventDefault();
    $(".errorMsg").text("");
  });
});
