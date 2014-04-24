<?php
if(!defined("AUTH")) {
  die("Not authorized");
}

/**
 * @author       Henry Raymond
 * @copyright    (c) Copyright 2014, Henry Raymond. All rights reserved.
 *
 */


class User {


  public static function sign_up($username, $password) {

    $result = array();

    if($username === "") {
      $result["username_error"] = "empty";

    } else if(strlen($username) < 3) {
      $result["username_error"] = "too_short";

    } else if(strlen($username) > 32) {
      $result["username_error"] = "too_long";

    } else if(!preg_match("/^[A-Za-z0-9-_]+$/", $username)) {
      $result["username_error"] = "wrong_chars";
    }

    if($password === "") {
      $result["password_error"] = "empty";
    }

    if(count($result) == 0) {

      if(mysql_num_rows(db_query("SELECT * FROM users WHERE username = '" . $username . "'")) > 0) {
        $result["username_error"] = "already_taken";
      } else {
        $username = for_mysql($username);
        $password = PasswordCrypt::hash($password);
        $session = md5(uniqid(rand(), true));
        db_query("INSERT INTO users SET username = '" . $username . "', password = '" . $password . "', session = '" . $session . "', last_login = '" . date("Y-m-d H:i:s") . "', login_count = '1'");
        $result["result"] = "success";
        $result["session_id"] = $session;
      }
    }
    return $result;
  }


  public static function login($username, $password) {

    $result = array();

    if($username === "") {
      $result["username_error"] = "empty";
    }
    if($password === "") {
      $result["password_error"] = "empty";
    }

    if(count($result) == 0) {
      $username = for_mysql($username);
      if(($user = mysql_fetch_assoc(db_query("SELECT * FROM users WHERE username = '" . $username . "'"))) === false) {
        $result["result"] = "failure";
      } else {
        if(!PasswordCrypt::check($password, $user["password"])) {
          $result["result"] = "failure";
        } else {
          $session = md5(uniqid(rand(), true));
          db_query("UPDATE users SET session = '" . $session . "', last_login = '" . date("Y-m-d H:i:s") . "', login_count = '" . ($user["login_count"] + 1) . "' WHERE id = '" . $user["id"] . "'");
          $result["result"] = "success";
          $result["session_id"] = $session;
        }
      }
    }
    return $result;
  }


  public static function get_user($session) {
    $session = for_mysql($session);
    return mysql_fetch_assoc(db_query("SELECT * FROM users WHERE session = '" . $session . "'"));
  }

}


?>