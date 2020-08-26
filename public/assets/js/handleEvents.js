// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  $(".devourIt").on("click", function(event) {
    event.preventDefault();
    var id = $(this).data("id");
    // var newDevour = $(this).data("newdevour");

    var newDevourState = {
      devoured : true
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState
    }).then(
      function() {
        console.log("changed to devoured", newDevourState);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#submitBtn").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
     name: $("#ca").val().trim(),
    };

  var burger = Object.keys(newBurger).map(k => newBurger[k])
  if(burger!=""){
    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  }else{
      $(".errorMsg").text("Please enter the burger Name");
  
  }
  });

  $("#ca").on("click", function(event){
    event.preventDefault();
    $(".errorMsg").text("");
  });

});
