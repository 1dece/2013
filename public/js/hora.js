var Hora = {
  startHora: function(){
    $('.start-hora').text("Stop hora").append('<i class="ion-stop"></i>').removeClass("start-hora").addClass("pause-hora");
    $(".hora-container").find(".participant:nth-of-type(2n)").addClass("danceDown");
    $(".hora-container").find(".participant:even").addClass("danceUp");

    // var dance1 = setTimeout(function(){
    //   // $('.pause-hora').text("Start hora").append('<i class="ion-ios7-musical-note"></i>').removeClass("stop-hora").addClass("start-hora");
    //   $(".hora-container").find(".participant").removeClass("danceDown").removeClass("danceUp");
    //   $(".hora-container").find(".participant:nth-of-type(2n)").addClass("danceDown2");
    //   $(".hora-container").find(".participant:even").addClass("danceUp2");
    // },8000);

    // var dance2 = setTimeout(function(){
    //   $('.pause-hora').text("Start hora").append('<i class="ion-ios7-musical-note"></i>').addClass("start-hora").removeClass("pause-hora");
    //   $(".hora-container").find(".participant").removeClass("danceDown2").removeClass("danceUp2");
    // },15000);
  },

  bindStartHora: function(){
    $('.red.start-hora').off().on("click", function(e){
      e.preventDefault();
      Hora.startHora();
      Hora.stopHora();
    });
  },

  selGender: function() {
    $(".gender-buttons").find("a").unbind().bind("click", function(e){
      e.preventDefault();

      if ((".active-gender").length) {
        $(".gender-select").removeClass("active-gender");
        $(this).addClass("active-gender");
      } else {
        $(this).addClass("active-gender");
      }

      if ($(".active-gender.ion-male").length){
        $(this).parent().parent().removeClass("female").addClass("male");
      } else {
        $(this).parent().parent().removeClass("male").addClass("female");
      }

    });
  },

  selCharacter: function() {
    var charNumberNext = 1;
    $(".next-char").unbind().bind("click", function(e){
      e.preventDefault();
      if (charNumberNext == 3) {
        charNumberNext = 1;
        $(this).parent().attr("data-character", charNumberNext);
      } else {
        charNumberNext++
          $(this).parent().attr("data-character", charNumberNext);
      }
    });

    $(".prev-char").unbind().bind("click", function(e){
      e.preventDefault();
      var currentPos = $(this).parent().attr("data-character");

      if (currentPos == 1) {
        currentPos = 3;
        $(this).parent().attr("data-character", currentPos);
      } else {
        currentPos--
          $(this).parent().attr("data-character", currentPos);
      }
    });
  },

  leftSidebar: function(){
    $(".left, .close-leftSidebar").unbind().bind("click", function(){
      $('a, button').bind("click", function() { return false; });
        if ($(".slideTop").length) { 
          $("#main").removeClass("slideTop");
          $("#top-sidebar").removeClass("moveTopSidebar").addClass("initialTopSidebar");
        }
      if (!$(".slideLeft").length) {
        $("#main").addClass("slideLeft");
        $("#left-sidebar").removeClass("initialLeftSidebar").addClass("moveLeftSidebar");
      } else {
        $("#main").removeClass("slideLeft");
        $("#left-sidebar").removeClass("moveLeftSidebar").addClass("initialLeftSidebar");
      }
    });
  },

  topSidebar: function(){
    $(".top, .close-topSidebar").unbind().bind("click", function(){
      if ($(".slideLeft").length) {
        $("#main").removeClass("slideLeft");
        $("#left-sidebar").removeClass("moveLeftSidebar").addClass("initialLeftSidebar");
      }
      if (!$(".slideTop").length) {
        $("#main").addClass("slideTop");
        $("#top-sidebar").removeClass("initialTopSidebar").addClass("moveTopSidebar");
      } else {
        $("#main").removeClass("slideTop");
        $("#top-sidebar").removeClass("moveTopSidebar").addClass("initialTopSidebar");
      }
    });
  },

  stopHora: function() {
      $('.red.pause-hora').unbind().bind("click", function(e){
        e.preventDefault();
        $('.pause-hora').text("Start hora").append('<i class="ion-ios7-musical-note"></i>').removeClass("pause-hora").addClass("start-hora");
        $(".hora-container").find(".participant").removeClass("danceDown").removeClass("danceUp").removeClass("danceDown2").removeClass("danceUp2");
        Hora.bindStartHora();
      });
  }
}

$(function(){
  Hora.selGender();
  Hora.selCharacter();
  Hora.leftSidebar();
  Hora.topSidebar();
  Hora.bindStartHora();
  Hora.stopHora();
});


$(window).ready(function(){

  var w = $(window).width();
  $(".hora-container-mask").css("width", w);

  var chars = $(".hora-container").find("div").length,
  containerW = chars * 54;
  $(".hora-container").css("width", containerW);

  $(function() {
    var pane = $('.hora-container-mask');

    // pane.bind('jsp-scroll-x',function(event, scrollPositionX) {
    //   var elLeft = (parseInt($(".hora-container").css("width")) - parseInt($(".hora-container-mask").css("width")));

    //   if (elLeft == scrollPositionX) {
    //     $('.pause-hora').text("Start hora").append('<i class="ion-ios7-musical-note"></i>').removeClass("pause-hora").addClass("start-hora");
    //     $(".hora-container").find(".participant:nth-of-type(2n)").removeClass("danceDown");
    //   }

    // }).jScrollPane({
    //   animateScroll: true,
    //   animateDuration: 3000,
    //   animateEase: "linear"
    // });
    pane.jScrollPane();
    var api = pane.data('jsp');

  });
});
