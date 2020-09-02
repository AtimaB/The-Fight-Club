// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {


  $("#start").on("click", function(event){
    event.preventDefault();

    var newperson = {
     name: $("#person-name").val().trim(),
    };

    $.ajax("/game", {
      type: "GET",
      // data: newperson
    }).then(
      function() {
        console.log("created new person");
        // Reload the page to get the updated list
        // location.reload();
      }
    );
  });

  $("#submitBtn").on("click", function(event) {
   
  });

  $("#ca").on("click", function(event){
   

});
});
