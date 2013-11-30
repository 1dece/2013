var App = {
  handleLoginStatus: function(){
    FB.getLoginStatus(function(response) {
      App.handleSession(response);
    });
  },

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

  showEditor: function(response){
    if($('.hora-container .editor').length){
      return;
    }

    var internalShow = function(response){
      var user = App.current_user;
      if(user){
        var hora = $('.hora-container'),
            editor = $('.editor'),
            pane = $('.hora-container-mask');

        pane.jScrollPane();
        var api = pane.data('jsp'),
            place_after = Math.floor((api.getContentPositionX() + $(window).width() / 2) / editor.width());


        $('.user-'+response.authResponse.userID).remove();

        // calculate editor position
        var new_editor = editor.clone(),
        character = user && user.character ? user.character : 1;

        new_editor.find('.active-gender').removeClass('active-gender');
        new_editor.find('.gender-buttons').find('.ion-'+user.gender).addClass('active-gender');
        new_editor.removeClass('male').removeClass('female').addClass(user.gender).removeClass("marker");
        new_editor.addClass('user-'+response.authResponse.userID);
        new_editor.attr('data-character', character);

        hora.attr('style', 'width:'+hora.find('.participant').length * 54 + 300 + 'px');

        if (hora.find('.participant').length <= place_after){
          hora.append(new_editor);
        }else{
          hora.find('.participant:nth-child('+place_after+'n):first').after(new_editor);
        }
        new_editor.css({visibility: 'visible'});

        $(".jspHorizontalBar").css("visibility", "hidden");

        Hora.selGender();
        Hora.selCharacter();
        App.applyCharacter();
      }
    }

  if(response){
    if (response.status === 'connected') {
      internalShow(response);
    }
  }else{
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        internalShow(response);
      }
    });
  }
},

  tryShowEditor: function(){
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
          // remove current user from list
          var user = App.current_user;
          if(user){
            var user_participant = $('.user-'+response.authResponse.userID)
            if(user.character){ // already joined show marker
              user_participant.addClass("marker");
              $(".joined-hora").addClass("blue").text("Joined").append('<i class="ion-checkmark"></i>');
              Hora.joinedHover();
            }else{ // show editor
              App.showEditor(response);
            }
        }
      }
    });
  },

  applyCharacter: function() {
    $(".save-participant").unbind().bind("click", function(e){
      e.preventDefault();
      var parent = $(this).parent();
      App.current_user.gender = parent.find('.active-gender').attr('data-gender');
      App.current_user.character = parent.attr('data-character');


      $(this).fadeOut(200);
      $(this).prevAll(".arrows, .gender-buttons").fadeOut(200);
      $(this).parent().removeClass("editor").addClass("current-participant").addClass("newParticipant").addClass("marker");// .addClass("hidden-editor") should remove addClass hidden

      $(".jspHorizontalBar").css("visibility", "visible");


      App.saveCharacter(App.current_user, function(){
        setTimeout(function(){
          $(".joined-hora").addClass("blue").text("Joined").append('<i class="ion-checkmark"></i>');
          Hora.joinedHover();
        },400);

        setTimeout(function(){
          $(".participant").removeClass("newParticipant");
          parent.addClass("marker");
        },800);
      });

    });

  },

  saveCharacter: function(data, callback){
    $.ajax({
      url: '/character',
      type: 'POST',
      dataType: 'json',
      data: {
        fbid: App.uid,
        signed_request: App.signedRequest,
        user: data
      },
      error: function(){
        alert('Cannot save data. Try again later.')
      },
      success: function(user){
        if(typeof callback == 'function'){
          callback();
        }
      },
    })
  },

  saveData: function(data){
    $.ajax({
      url: '/save',
      type: 'POST',
      dataType: 'json',
      data: {
        fbid: App.uid,
        signed_request: App.signedRequest,
        user: data
      },
      error: function(){
        alert('Cannot save data. Try again later.')
      },
      success: function(user){
        App.current_user = user;
        App.tryShowEditor();
      },
    })
  },

  saveUserData: function(){
    var data = {};
    FB.api('/me', function(user) {
      data.fbid = user.id;
      data.name = user.first_name;
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
        App.uid           = response.authResponse.userID;
        App.accessToken   = response.authResponse.accessToken;
        App.signedRequest = response.authResponse.signedRequest;
        App.showDanceButton();
        App.saveUserData();
        FB.api(
          'me/firstdece_ro:dance',
          'post',
          {
            hora: "http://"+window.location.host
          },
          function(response) {
            // handle the response
          }
        );
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
      App.login();
    })
  },

  showDanceButton: function(){
    var $this = this;
    $('#status').empty().append('<a href="#" class="joined-hora"><i class="ion-checkmark"></i>You are in!</a><span class="button-spacer yellow">or</span><a id="dance" href="#" class="start-hora red"><i class="ion-ios7-musical-note"></i>Start Hora</a>');
    Hora.bindStartHora();
  }
};

