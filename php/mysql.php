<?php
if(!defined("AUTH")) {
  die("Not authorized");
}

/**
 * @author       Henry Raymond
 * @copyright    (c) Copyright 2014, Henry Raymond. All rights reserved.
 *
 */


define("DB_HOST", "localhost");
define("DB_USER", "");
define("DB_PASS", "");
define("DB_NAME", "my_game");

if(!@mysql_connect(DB_HOST, DB_USER, DB_PASS)) {
  die("Error while connecting with MySQL: " . mysql_error());
}

if(!@mysql_select_db(DB_NAME)) {
  die("Error while selecting newly created MySQL database: " . mysql_error());
}


function for_mysql($string) {
  return mysql_real_escape_string(stripslashes($string));
}

function db_query($query_string) {
  $query = mysql_query($query_string);
  if($query === false) {
    die("Error in MySQL query: " . mysql_error());
  }
  return $query;
}

