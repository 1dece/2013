var App = {

  handleSession: function(session){
    if (session.status === 'connected') {
      // the user is logged in and has authenticated your
      // app, and session.authResponse supplies
      // the user's ID, a valid access token, a signed
      // request, and the time the access token
      // and signed request each expire
      App.uid = session.authResponse.userID;
      App.accessToken = session.authResponse.accessToken;
      App.signedRequest = session.authResponse.signedRequest;
      App.showDanceButton();
      App.saveUserData();
    } else {
      App.showLoginButton();
    }
  },

  showEditor: function(){
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        // remove current user from list
        var hora = $('.hora-container'),
            editor = $('.editor'),
            place_after = Math.floor($(window).width() / 2 / editor.width());
        // debugger;

        $('.user-'+response.authResponse.userID).remove();
        // calculate editor position
        if (hora.find('.participant').length <= place_after){
          hora.append(editor.clone().css({visibility: 'visible'}));
        }else{
          hora.find('.participant:nth-child('+place_after+'n):first').after(editor.clone());
        }


        Hora.selGender();
        Hora.selCharacter();

        // TODO: jScrollPane
        // var pane = $('.hora-container-mask'),
        //     api = pane.data('jsp');
        //     api.reinitialise();

      }
    });
  },

  saveData: function(data){
    console.log(data);
    $.ajax({
      url: '/save',
      type: 'POST',
      data: {
        fbid: App.uid,
        signed_request: App.signedRequest,
        user: data
      },
      error: function(){
        alert('Cannot save data. Try again later.')
      },
      success: function(){
        App.showEditor();
      },
    })
  },

  saveUserData: function(){
    var data = {};
    FB.api('/me', function(user) {
      data.fbid = user.id;
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
    $('#status').empty().append('<a id="connect" href="#" class="join-hora blue"><i class="ion-social-facebook"></i>Join Hora</a><span class="button-spacer yellow">or</span><a id="dance" href="#" class="start-hora red"><i class="ion-ios7-musical-note"></i>Start Hora</a>');
    Hora.bindStartHora();
    $('#connect').unbind().bind('click', function(e){
      e.preventDefault();
      $this.login();
    })
  },

  showDanceButton: function(){
    var $this = this;
    $('#status').empty().append('<a id="dance" href="#" class="start-hora red"><i class="ion-ios7-musical-note"></i>Start Hora</a>');

    Hora.bindStartHora();
    $('#dance').unbind().bind('click', function(e){
      e.preventDefault();
      Hora.startHora();
      return false;
    })
  },

  // editor: {
  //   bindGenderButtons: function(){
  //     $('.gender-buttons a').on('click', function(e){
  //       e.preventDefault();
  //       $('.gender-buttons a').removeClass('active');
  //       $(this).addClass('active');
  //     });
  //   }
  // }

};
// $(function(){
//   App.editor.bindGenderButtons();
// });
