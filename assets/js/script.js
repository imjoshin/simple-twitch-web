$(document).on("ready", function(){
  
  load();

  function load(){
    if(window.location.hash){
      if(window.location.hash.substring(1, 3) == "g-"){
        $("#games").hide();
        $("#stream-wrapper").show();
        $("#video").hide();
        getStreams();
      }else if(window.location.hash.substring(1, 3) == "u-"){
        $("#games").hide();
        $("#stream-wrapper").hide();
        $("#video").show();
        getVideo();
      }
    }else{
      $("#games").show();
      $("#stream-wrapper").hide();
      $("#video").hide();
      getGames();
    }
  }

  $(window).on('hashchange', load);

  $(window).scroll(function(){
    var scrolled = $(window).scrollTop();
    $("#stream-wrapper .image").css("background-position", "center " + -(scrolled * 0.15) + "px");
  });

  $(window).on("resize", function(){
    $("#cover").css({"height" : $(window).height() - 27 + "px", "width" : $(window).width() - 120 + "px"});
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
      //getStreams();
    });
  });

  $(document).on("click", ".stream", function(){
    console.log("clicked stream: " + $(this).attr("href"));
    $("#stream-wrapper").slideUp(600, function(){
      $("#video").slideDown(1000);
      //getVideo();
    });
  });

  function getGames(){
    $("#games").html(ajax({"script": "getGames"}));
  }

  function getStreams(){
    $("#streams").html(ajax({"script": "getStreams", "game": window.location.hash.substring(3)}));
    $("#streams").fadeIn(2500);
    $("body").animate({backgroundColor: "#000000"}, 1000);
  }

  function getVideo(){
    $("#games").hide();
    $("#header").slideUp(1000);
    $("#player").html(ajax({"script": "getVideo", "user": window.location.hash.substring(3)})).fadeIn(1000);
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