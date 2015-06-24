$(document).on("ready", function(){
  
  
  if(window.location.hash){
    if(window.location.hash.substring(1, 5) == "get-"){
      initialize();
      //TODO make this load game page
      //getStreams();
    }else{
      getVideo();
    }
  }else{
    initialize();
  }
  
  initialize();

  function initialize(){
    getGames();
  }

  $(window).scroll(function(){
    var scrolled = $(window).scrollTop();
    $("#stream-wrapper .image").css("background-position", "center " + -(scrolled * 0.15) + "px");
  });

  $(window).on("resize", function(){
    if($("#video").is(":visible")){
      $("iframe")[0].setAttribute("height", $(window).height());
      $("iframe")[0].setAttribute("width", $(window).width());
    }

  });

  $(document).on("click", ".game", function(){
    var t = this;
    $("#title").fadeOut(500, function(){
      $("#title").text($(t).data("title")).fadeIn(500);
    });
    $("#stream-wrapper .image").css("background-image", "url(" + $(this).data("img") + ")");
    console.log("Set background image to " + $(this).data("img")); 
    $("#games").slideUp(600, function(){
      $("#stream-wrapper").slideDown(1000);
      getStreams();
    });
  });

  $(document).on("click", ".stream", function(){
    console.log("clicked stream: " + $(this).attr("href"));
    $("#stream-wrapper").slideUp(600, function(){
      getVideo();
    });
  });

  function getGames(){
    $("#games").html(ajax({"script": "getGames"}));
  }

  function getStreams(){
    $("#streams").html(ajax({"script": "getStreams", "game": window.location.hash.substring(5)}));
    $("#streams").fadeIn(2500);
    $("body").animate({backgroundColor: "#000000"}, 1000);
  }

  function getVideo(){
    $("#games").hide();
    $("#header").slideUp(1000);
    $("#video").html(ajax({"script": "getVideo", "user": window.location.hash.substring(1)})).fadeIn(1000);
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