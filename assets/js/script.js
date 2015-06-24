$(document).on("ready", function(){
  
  $("#games").html(ajax({"script": "getGames"}));

  $(".game").on("click", function(){
    $("#stream-wrapper .image").css("background-image", "url(" + $(this).data("img") + ")");
    console.log("Set background image to " + $(this).data("img")); 
    $("#games").slideUp(600, function(){
      $("#stream-wrapper").slideDown(4000);
      getStreams();
    });
  });

  $(window).scroll(function(){
    var scrolled = $(window).scrollTop();
    $("#stream-wrapper .image").css("background-position", "center " + -(scrolled * 0.15) + "px");
  });

  function getStreams(){
    $("#streams").html(ajax({"script": "getStreams", "game": window.location.hash}));
    $("#streams").fadeIn(4000);
    $("body").animate({backgroundColor: "#000000"}, 1000);
  }

  function ajax(data){
    var ret;
    $.ajax({
      type: 'POST',
      url: 'assets/php/ajax.php',
      async: false,
      data: data,
      success: function(output){
        console.log(data["script"] + ": " + output);
        ret = output;
      },
      error: function(output){
        alert("An error occured.");
      }
    });
    return ret;
  }

});