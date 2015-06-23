$(document).on("ready", function(){
  
  $("#games").html(ajax({"script": "getGames"}));

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