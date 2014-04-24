<?php
if(!defined("AUTH")) {
  die("Not authorized");
}

/**
 * @author       Henry Raymond
 * @copyright    (c) Copyright 2014, Henry Raymond. All rights reserved.
 *
 */


class PasswordCrypt {


  public static function hash($password) {
    if(defined("CRYPT_SHA512") && CRYPT_SHA512 == 1) {
      $cost = "rounds=5000";
      $salt = "";
      for($i = 0; $i < 16; $i++) {
        $salt .= substr("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", mt_rand(0, 61), 1);
      }
      $hash = crypt($password, "$" . "6" . "$" . $cost . "$" . $salt);
    } else if(defined("CRYPT_BLOWFISH") && CRYPT_BLOWFISH == 1) {
      $cost = "07";
      $salt = "";
      for($i = 0; $i < 22; $i++) {
        $salt .= substr("./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", mt_rand(0, 63), 1);
      }
      $hash = crypt($password, "$" . "2a" . "$" . $cost . "$" . $salt);
    } else {
      $salt = "";
      for($i = 0; $i < 32; $i++) {
        $salt .= substr("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", mt_rand(0, 61), 1);
      }
      $hash = md5($password . $salt);
      for($i = 0; $i < 100; $i++) {
        $hash = md5($hash . $salt);
      }
      $hash = $salt . $hash;
    }
    return $hash;
  }


  public static function check($password, $hash_check) {
    if(substr($hash_check, 0, 2) === "$6") {
      $salt = substr($hash_check, 0, 31);
      $hash = crypt($password, $salt);
    } else if(substr($hash_check, 0, 3) === "$2a") {
      $salt = substr($hash_check, 0, 29);
      $hash = crypt($password, $salt);
    } else {
      $salt = substr($hash_check, 0, 32);
      $hash = md5($password . $salt);
      for($i = 0; $i < 100; $i++) {
        $hash = md5($hash . $salt);
      }
      $hash = $salt . $hash;
    }
    return $hash_check == $hash;
  }

}


?>