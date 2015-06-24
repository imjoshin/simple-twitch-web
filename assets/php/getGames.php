<?php
  ini_set("log_errors", 1);
  ini_set("error_log", "error.log");

  $http = "https://api.twitch.tv/kraken/games/top?limit=32";
  $req = file_get_contents($http);

  $HTML = "";
  $json = json_decode($req, true);
  $games = $json["top"];

  $sym      = array(" ", ":");
  $symEquiv = array("%20", "%3A");

  $classes = "columns large-3 medium-4 small-6";
  foreach($games as $game){
    $HTML .= "
      <a class='game' href='#" . str_replace($sym, $symEquiv, $game["game"]["name"]) . "' data-img='" . $game["game"]["box"]["large"] . "'>
      <div class='$classes'>
        <div class='gameInfo'>
          Viewers: " . $game["viewers"] . "<br/>
          Channels: " . $game["channels"] . "
        </div>
        <img class='shadow' src=" . $game["game"]["box"]["large"] . "></img>
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