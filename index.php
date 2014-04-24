<?php

/**
 * @author       Henry Raymond
 * @copyright    (c) Copyright 2014, Henry Raymond. All rights reserved.
 *
 */

define("AUTH", true);

require_once("php/password_crypt.php");
require_once("php/user.php");
require_once("php/mysql.php");





function process_request($type, $values, $user) {

  if($type == "sync" && isset($values["holes"])) {
    foreach($values["holes"] as $value) {
      db_query("INSERT INTO holes SET x = '" . for_mysql($value["x"]) . "', y = '" . for_mysql($value["y"]) . "'");
    }
    $holes = array();
    $query = db_query("SELECT * FROM holes");
    while($hole = mysql_fetch_assoc($query)) {
      array_push($holes, array("x" => $hole["x"], "y" => $hole["y"]));
    }
    print_json("sync", array("holes" => $holes));

  } else {
    print_json("nothing");
  }

}



function print_json($type, $result = array()) {
  echo "{ \"type\" : \"" . $type . "\", \"result\" : ";
  echo json_encode($result);
  echo "}";
}





if(isset($_POST["type"]) && isset($_POST["values"]) && isset($_POST["session"])) {

  $type = $_POST["type"];
  $values = json_decode($_POST["values"], true);
  if($values == NULL) {
    die("Could not read JSON.");
  }


  if($type == "sign_up") {
    if(isset($values["username"]) && isset($values["password"])) {
      print_json("sign_up", User::sign_up($values["username"], $values["password"]));
    } else {
      print_json("nothing");
    }


  } else if($type == "login") {
    if(isset($values["username"]) && isset($values["password"])) {
      print_json("login", User::login($values["username"], $values["password"]));
    } else {
      print_json("nothing");
    }



  } else {
    $user = User::get_user($_POST["session"]);
    if($user !== false) {
      process_request($type, $values, $user);
    } else {
      print_json("cannot_find_session");
    }
  }

} else {
  include("game.php");
}

?>