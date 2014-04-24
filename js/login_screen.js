function LoginScreen() {
  
  
  this.init = function() {
    jQuery("#online_overlay").show();
    jQuery("#login_submit, #sign_up_submit, label, .error_message, .title, .description")
      .attr("unselectable", "on").css("user-select", "none").on("selectstart", false);
    
    jQuery("#login_form").submit(function(e) {
      e.preventDefault();
      game.loginScreen.processLoginForm();
    });
    
    jQuery("#login_submit").click(function() {
      game.loginScreen.processLoginForm();
    });
    
    jQuery("#sign_up_form").submit(function(e) {
      e.preventDefault();
      game.loginScreen.processSignUpForm();
    });
    
    jQuery("#sign_up_submit").click(function() {
      game.loginScreen.processSignUpForm();
    });
  };
  
  
  this.processLoginForm = function() {
    jQuery(".error_message").hide();
    jQuery(".error_box").removeClass("error_box");

    var username = jQuery("#login_username").val();
    var password = jQuery("#login_password").val();
    
    if(username.length == 0) {
      jQuery("#error_login_username_empty").show().parent().addClass("error_box");
    }
    if(password.length == 0) {
      jQuery("#error_login_password_empty").show().parent().addClass("error_box");
    }
    if(username.length > 0 && password.length > 0) {
      var values = { username : username, password : password };
      ajax.send("login", values, function(data) {
        
        if(data.type == "login") {
          if(data.result.hasOwnProperty("username_error")) {
            jQuery("#error_login_username_empty").show().parent().addClass("error_box");
          }
          if(data.result.hasOwnProperty("password_error")) {
            jQuery("#error_login_password_empty").show().parent().addClass("error_box");
          }
          if(data.result.hasOwnProperty("result")) {
            if(data.result.result == "failure") {
              jQuery("#error_login_failure").show().parent().parent().addClass("error_box");
            }
            if(data.result.result == "success" && data.result.hasOwnProperty("session_id")) {
              ajax.setSessionId(data.result.session_id);
              game.setState(Game.INGAME_STATE);
              jQuery("#online_overlay").remove();
            }
          }
        }
      });
    }
  };
  
  
  this.processSignUpForm = function() {
    jQuery(".error_message").hide();
    jQuery(".error_box").removeClass("error_box");
    
    var username = jQuery("#sign_up_username").val();
    var password1 = jQuery("#sign_up_password1").val();
    var password2 = jQuery("#sign_up_password2").val();
    
    if(username.length == 0) {
      jQuery("#error_sign_up_username_empty").show().parent().addClass("error_box");
    }
    if(password1.length == 0 && password2.length == 0) {
      jQuery("#error_sign_up_password_empty").show().parent().addClass("error_box");
    } else if(password1.length == 0 || password2.length == 0) {
      jQuery("#error_sign_up_password_not_equal").show().parent().addClass("error_box");
    } else if(password1 !== password2) {
      jQuery("#error_sign_up_password_not_equal").show().parent().addClass("error_box");
      
    } else if(username.length > 0) {
      var values = { username : username, password : password1 };
      ajax.send("sign_up", values, function(data) {
        
        if(data.type == "sign_up") {
          if(data.result.hasOwnProperty("username_error")) {
            if(data.result.username_error == "empty") {
              jQuery("#error_sign_up_username_empty").show().parent().addClass("error_box");
            } else if(data.result.username_error == "too_short") {
              jQuery("#error_sign_up_username_too_short").show().parent().addClass("error_box");
            } else if(data.result.username_error == "too_long") {
              jQuery("#error_sign_up_username_too_long").show().parent().addClass("error_box");
            } else if(data.result.username_error == "wrong_chars") {
              jQuery("#error_sign_up_username_wrong_chars").show().parent().addClass("error_box");
            } else if(data.result.username_error == "already_taken") {
              jQuery("#error_sign_up_username_already_taken").show().parent().addClass("error_box");
            } 
          }
          if(data.result.hasOwnProperty("password_error")) {
            jQuery("#error_sign_up_password_empty").show().parent().addClass("error_box");
          }
          if(data.result.hasOwnProperty("result") && data.result.result == "success") {
            if(data.result.hasOwnProperty("session_id")) {
              ajax.setSessionId(data.result.session_id);
              game.setState(Game.INGAME_STATE);
              jQuery("#online_overlay").remove();
            }
          }
        }
      });
    }
  };
  
  
  this.draw = function() {
    c.fillStyle = "#666";
    c.fillRect(0, 0, game.WIDTH, game.HEIGHT);
  };
  
  
}