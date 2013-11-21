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
      App.saveUserData();
      App.showEditor();
    } else {
      App.showLoginButton();
    }
  },

  showEditor: function(){
    alert('Success');
  },

  saveData: function(data){
    console.log(data);
    // ajax, store user id
    $.ajax({
      url: '/save',
      type: 'POST',
      data: data,
      error: function(){
        alert('Cannot save data. Try again later.')
      },
      succes: function(){
        this.showEditor();
      },
    })
  },

  saveUserData: function(){
    var data = {};
    FB.api('/me', function(user) {
      data.id = user.id;
      data.name = user.name;
      data.gender = user.gender;
      if(user.location) {
        data.location = user.location.name;
        FB.api(user.location.id, function(location) {
          data.longitude = location.location.longitude;
          data.latitude = location.location.latitude;
          App.saveData(data);
        })
      } else {
        // without location
        App.saveData(data);
      }
    });
  },

  login: function(){
    FB.login(function(response) {
      if (response.authResponse) {
          App.saveUserData();
      } else {
        // User cancelled login or did not fully authorize.
      }
    }, {scope: 'user_location'});
  },

  dance: function(){
    alert("Look ma I'm dancing!");
  },

  showLoginButton: function(){
    var $this = this;
    $('#status').empty().append('<a id="connect" href="#" class="join-hora red">Join Hora</a><span class="button-spacer yellow">or</span><a id="dance" href="#" class="start-hora blue">Start Hora</a>');
    $('#connect').unbind().bind('click', function(e){
      e.preventDefault();
      $this.login();
      return false;
    })
  },

  showDanceButton: function(){
    var $this = this;
    $('#status').empty().append('<a id="dance" href="#" class="start-hora blue">Start Hora</a>');
    $('#dance').unbind().bind('click', function(e){
      e.preventDefault();
      $this.dance();
      return false;
    })
  }

};

