<?php
  ini_set("log_errors", 1);
  ini_set("error_log", "error.log");

  //stream embed 
  /*
  <iframe src="http://www.twitch.tv/trumpsc/embed" frameborder="0" scrolling="no" height="378" width="620"></iframe><a href="http://www.twitch.tv/trumpsc?tt_medium=live_embed&tt_content=text_link" style="padding:2px 0px 4px; display:block; width:345px; font-weight:normal; font-size:10px;text-decoration:underline;">Watch live video from TrumpSC on www.twitch.tv</a>
  */
  
  $HTML = "
  <iframe src='http://www.twitch.tv/" . $_POST["user"] . "/embed' frameborder='0' scrolling='no' height='378' width='620'></iframe>
  ";
  echo $HTML;
?>