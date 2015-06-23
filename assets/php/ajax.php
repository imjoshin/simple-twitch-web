<?php

echo getOutput($_POST["script"] . ".php");

function getOutput($script){
  ob_start();
  include($script);
  $output = ob_get_contents();
  ob_end_clean();
  return $output;
}
?>