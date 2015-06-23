<?php
  ini_set("log_errors", 1);
  ini_set("error_log", "error.log");

  $http = "https://api.twitch.tv/kraken/games/top?limit=30";
  $req = file_get_contents($http);

  $HTML = "";
  $json = json_decode($req, true);
  $games = $json["top"];

  $classes = "columns large-3 medium-4 small-6 game";
  foreach($games as $game){
    $HTML .= "
      <div class='$classes'>
        <img src=" . $game["game"]["box"]["medium"] . "></img>
        <div class='gameInfo'>
          Viewers: " . $game["viewers"] . "<br/>
          Channels: " . $game["channels"] . "
        </div>
      </div>
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