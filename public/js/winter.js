var Winter = {

  changeThemeToWinter: function(){
    $("#goWinter.change-theme").click(function (e){
      e.preventDefault();

      $(".jspPane").addClass("winterTransition");

      setTimeout(function(){
        
        $(".join-hora").addClass("winter_buttons").removeClass("blue");
        $(".start-hora").addClass("winter_buttons").removeClass("red");
        
        $(".top").addClass("winter_buttons");
        $(".left").addClass("winter_buttons");

        $(".cl-effect-20").find("a").addClass("hover");

        $("#flaghoder").addClass("shadow-flagholder");

        $(".light_left").delay(2400).fadeIn(100);
        $(".light_center").delay(3000).fadeIn(100);
        $(".light_right").delay(3600).fadeIn(100);
      },700);

      $("#top-part").addClass("xmas-background");

      setTimeout(function(){
        $(".change-theme").addClass("changeToHora").removeClass("change-theme");
        $(".changeToHora").find("i").removeClass("ion-ios7-snowy").addClass("ion-android-system-back");
      }, 2000);

    });
  },

  changeThemeToHora: function() {
    $("#goWinter.changeToHora").click(function (e){
      e.preventDefault();

      alert("dsa");

      $(".light_left").fadeOut(100);
      $(".light_center").delay(400).fadeOut(100);
      $(".light_right").delay(800).fadeOut(100);

      $("#flaghoder").removeClass("shadow-flagholder");
      $("#top-part").removeClass("xmas-background");

      $(".join-hora").removeClass("winter_buttons").addClass("blue");
      $(".start-hora").removeClass("winter_buttons").addClass("red");
      
      $(".top").removeClass("winter_buttons");
      $(".left").removeClass("winter_buttons");

      setTimeout(function(){
        $(".change-theme").removeClass("changeToHora").addClass("change-theme");
        $(".changeToHora").find("i").addClass("ion-ios7-snowy").removeClass("ion-android-system-back");
      }, 1400);


    });
  }
  
}

$(function() {
  Winter.changeThemeToWinter();
  Winter.changeThemeToHora();
});


$(window).ready(function(){
  
});
