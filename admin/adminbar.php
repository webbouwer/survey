<?php
function getAdminbar(){
  $adminbar ='<ul id="adminmenu">
  <li class="home"><a href="index.php">Dashboard</a></li>
  <li class="data"><a href="data.php">Data</a></li>
  <li class="send"><a href="send.php">Send</a></li>
  <li class="config"><a href="config.php">Config</a></li>
  <li class="logout"><a href="../logout.php">Logout</a></li>
  </ul>';
  return $adminbar;
}
?>
