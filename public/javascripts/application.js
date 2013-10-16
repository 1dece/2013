var App = {

  handleSession: function(session){
    if (session.status === 'connected') {
      // the user is logged in and has authenticated your
      // app, and session.authResponse supplies
      // the user's ID, a valid access token, a signed
      // request, and the time the access token
      // and signed request each expire
      var uid = session.authResponse.userID;
      var accessToken = session.authResponse.accessToken;
      App.showDanceButton();
    } else {
      App.showLoginButton();
    }
  },

  login: function(){
    FB.login(function(response) {
      if (response.authResponse) {
        FB.api('/me', function(response) {
          // ajax, store user id
        });
      } else {
        // User cancelled login or did not fully authorize.
      }
    });
  },

  dance: function(){
    alert("Look ma I'm dancing!");
  },

  showLoginButton: function(){
    var $this = this;
    $('#status').empty().append('<button id="connect">Connect with facebook!</button>');
    $('#connect').unbind().bind('click', function(e){
      e.preventDefault();
      $this.login();
      return false;
    })
  },

  showDanceButton: function(){
    var $this = this;
    $('#status').empty().append('<button id="dance">Dance!</button>');
    $('#dance').unbind().bind('click', function(e){
      e.preventDefault();
      $this.dance();
      return false;
    })
  }

};

