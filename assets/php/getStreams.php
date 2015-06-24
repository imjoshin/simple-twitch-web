<?php
  ini_set("log_errors", 1);
  ini_set("error_log", "error.log");

  //stream embed 
  /*
  <iframe src="http://www.twitch.tv/trumpsc/embed" frameborder="0" scrolling="no" height="378" width="620"></iframe><a href="http://www.twitch.tv/trumpsc?tt_medium=live_embed&tt_content=text_link" style="padding:2px 0px 4px; display:block; width:345px; font-weight:normal; font-size:10px;text-decoration:underline;">Watch live video from TrumpSC on www.twitch.tv</a>
  */
  $http = "https://api.twitch.tv/kraken/streams?game=" . str_replace("#", "", $_POST["game"]);
  $req = file_get_contents($http);

  $HTML = "";
  $json = json_decode($req, true);
  $streams = $json["streams"];

  $sym      = array(" ", ":");
  $symEquiv = array("%20", "%3A");

  $classes = "columns large-4 medium-6 small-6";
  foreach($streams as $stream){
    $HTML .= "
      <a class='stream' href='#" . $stream["channel"]["name"] . "'>
      <div class='$classes'>
        <div class='streamInfo'>
          <b>" . $stream["channel"]["name"] . "</b><br/>
          Viewers: " . $stream["viewers"] . "<br/>
        </div>
        <img class='shadow' src=" . $stream["preview"]["large"] . "></img>
      </div>
      </a>
    ";
    /*
    $HTML .= "Game: " . $game["game"]["name"] . "<br/>";
    $HTML .= "Viewers: " . $game["viewers"] . "<br/>";
    $HTML .= "Channels: " . $game["channels"] . "<br/>";
    $HTML .= "<img src='" . $game["game"]["box"]["medium"] . "'></img>";
    $HTML .= "<br/><br/>";
    */
  }
  echo $HTML;
?>