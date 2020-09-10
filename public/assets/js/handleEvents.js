// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".errorMsg").text("");

  $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var newperson = {
      name: $("#textarea1").val().trim(),
    };


    if(Error){
     $(".errorMsg").text('Game is already in Progress. Please wait for 2 minutes. Thank you!!!');
    }else{
      $(".errorMsg").text("");
    }

    var person = Object.keys(newperson).map(k => newperson[k])
    if(person!=""){
      
        $.ajax("/api/game", {
          type: "POST",
          data: newperson
        }).then(
          function(res) {
            // console.log("created new person");
            // console.log(res);
            // console.log(res.playerUUID);
            // console.log(res.name);
            window.location.replace("/game?id=" +res.playerUUID+"&name="+res.name);

       }
     );
    }else{
      $(".errorMsg").text('Please enter your name...');
    }
   });

   
   $("#again").on("click", function (event) {
    event.preventDefault();
    window.location.replace("/")
   });

   $("#textarea1").on("click", function(event){
    event.preventDefault();
    $(".errorMsg").text("");
  });
});
