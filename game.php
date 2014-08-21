<?php
if(!defined("AUTH")) {
  die("Not authorized");
}

/**
 * @author       Henry Raymond
 * @copyright    (c) Copyright 2014, Henry Raymond. All rights reserved.
 *
 */

?>
<!DOCTYPE html>
<html>
 <head>
  <title>My Game</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <link rel="stylesheet" type="text/css" href="css/main.css" />
  <script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
  <script type="text/javascript" src="js/soundmanager2.js"></script>
  <script type="text/javascript" src="js/tools.js"></script>
  <script type="text/javascript" src="js/resources.js"></script>
  <script type="text/javascript" src="js/img.js"></script>
  <script type="text/javascript" src="js/fonts.js"></script>
  <script type="text/javascript" src="js/sound.js"></script>
  <script type="text/javascript" src="js/timer.js"></script>
  <script type="text/javascript" src="js/mouse.js"></script>
  <script type="text/javascript" src="js/keyboard.js"></script>
  <script type="text/javascript" src="js/preloading_manager.js"></script>
  <script type="text/javascript" src="js/preloader.js"></script>
  <script type="text/javascript" src="js/performance_monitor.js"></script>
  <script type="text/javascript" src="js/ajax.js"></script>
  <script type="text/javascript" src="js/loading_screen.js"></script>
  <script type="text/javascript" src="js/login_screen.js"></script>
  <script type="text/javascript" src="js/text.js"></script>
  <script type="text/javascript" src="js/priority_queue.js"></script>
  <script type="text/javascript" src="js/path_finding.js"></script>
  <script type="text/javascript" src="js/particle_system.js"></script>
  <script type="text/javascript" src="js/particle.js"></script>
  <script type="text/javascript" src="js/shaking.js"></script>
  <script type="text/javascript" src="js/game.js"></script>
  <script type="text/javascript" src="js/main.js"></script>
 </head>
 <body>
  <div id="game_box">
   <canvas id="game" width="960" height="600">
    Your browser doesn't support the &lt;canvas&gt; tag. Please install the newest version of Mozilla Firefox, Google Chrome or Microsoft Internet Explorer.
   </canvas>
   <div id="online_overlay">
    <div id="login">
     <form action="?" method="get" id="login_form">
      <div class="title">Log In</div>
      <div class="login_input_box">
       <div class="input_box">
        <div class="error_message" id="error_login_failure">Sorry, incorrect username or password. Please try again.</div>
        <div class="error_message" id="error_login_username_empty">Please enter your username.</div>
        <label for="login_username">Username</label>
        <div class="input"><input type="text" name="username" id="login_username" /></div>
       </div>
       <div class="input_box">
        <div class="error_message" id="error_login_password_empty">Please enter your password.</div>
        <label for="login_password">Password</label>
        <div class="input"><input type="password" name="password" id="login_password" /></div>
       </div>
      </div>
      <div class="submit_box">
       <div id="login_submit">Log in</div>
      </div>
      <div class="hidden"><input type="submit" value="Log in" /></div>
     </form>
    </div>
    <div id="sign_up">
     <form action="?" method="get" id="sign_up_form">
      <div class="title">Sign Up</div>
      <div class="description">Haven't got an account? Sign up here:</div>
      <div class="input_box">
       <div class="error_message" id="error_sign_up_username_empty">Please enter a username.</div>
       <div class="error_message" id="error_sign_up_username_too_short">This username is too short.</div>
       <div class="error_message" id="error_sign_up_username_too_long">This username is too long.</div>
       <div class="error_message" id="error_sign_up_username_wrong_chars">Your username may only contain alphanumeric characters.</div>
       <div class="error_message" id="error_sign_up_username_already_taken">This username is already taken.</div>
       <label for="sign_up_username">Username</label>
       <div class="input"><input type="text" name="username" id="sign_up_username" /></div>
      </div>
      <div class="input_box">
       <div class="error_message" id="error_sign_up_password_empty">Please enter a password.</div>
       <div class="error_message" id="error_sign_up_password_not_equal">The two passwords don't match.</div>
       <label for="sign_up_password1">Password</label>
       <div class="input"><input type="password" name="password1" id="sign_up_password1" /></div>
       <label for="sign_up_password2">Retype password</label>
       <div class="input"><input type="password" name="password2" id="sign_up_password2" /></div>
      </div>
      <div class="submit_box">
       <div id="sign_up_submit">Sign up</div>
      </div>
      <div class="hidden"><input type="submit" value="Sign up" /></div>
     </form>
    </div>
   </div>
  </div>
 </body>
</html>