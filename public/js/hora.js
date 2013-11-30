var Hora = {
  dance2: null,
  dance1: null,

  startHora: function(){
    Hora.hideEditor();
    $('.start-hora').text("Stop hora").append('<i class="ion-stop"></i>').removeClass("start-hora").addClass("pause-hora");
    $(".hora-container").find(".participant:nth-of-type(2n)").addClass("danceOne");
    $(".hora-container").find(".participant:even").addClass("danceTwo");
    $(".startsong").trigger("click");

    Hora.dance1 = setTimeout(function(){
      $(".hora-container").find(".participant:nth-of-type(2n)").removeClass("danceOne").addClass("danceThree");
      $(".hora-container").find(".participant:even").removeClass("danceTwo").addClass("danceFour");
    },7500);

    Hora.dance2 = setTimeout(function(){
      $('.pause-hora').text("Start hora").append('<i class="ion-ios7-musical-note"></i>').addClass("start-hora").removeClass("pause-hora");
      $(".hora-container").find(".participant").removeClass("danceFour").removeClass("danceThree");
      $(".stopsong").trigger("click");
      Hora.showEditor();
      Hora.bindStartHora();
    },20500);
  },

  bindStartHora: function(){
    $('.red.start-hora').off().on("click", function(e){
      e.preventDefault();
      Hora.startHora();
      Hora.stopHora();
    });
  },

  hideEditor: function(){
    var editor = $('.hora-container .editor');
    if(editor.length){
      editor.find(".save-participant").fadeOut(200);
      editor.find(".arrows, .gender-buttons").fadeOut(200);
      editor.removeClass("editor").addClass("current-participant").addClass("newParticipant").addClass("hidden-editor");
      setTimeout(function(){
        editor.removeClass("newParticipant");
      },800);
    }
  },

  showEditor: function(){
    var editor = $('.hora-container .hidden-editor');

    if(editor.length){
      editor.addClass("editor").removeClass("current-participant").removeClass("newParticipant");
      editor.find(".save-participant").fadeIn(200);
      editor.find(".arrows, .gender-buttons").fadeIn(200);
    }
  },

  joinedHover: function(){
      $(".joined-hora.blue").off().on("mouseenter", function(){
        $(this).find("i").removeClass("ion-checkmark").addClass("ion-ios7-personadd");

        $(this).click(function(e){
          e.preventDefault();
          App.showEditor();
        });

      }).on("mouseleave", function(){
        $(this).find("i").removeClass("ion-ios7-personadd").addClass("ion-checkmark");
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
        $(".stopsong").trigger("click");
        $('.pause-hora').text("Start hora").append('<i class="ion-ios7-musical-note"></i>').removeClass("pause-hora").addClass("start-hora");
        $(".hora-container").find(".participant").removeClass("danceOne").removeClass("danceTwo").removeClass("danceThree").removeClass("danceFour");
        clearTimeout(Hora.dance2);
        Hora.showEditor();
        Hora.bindStartHora();
      });
  },

  soundStart: function() {
    var source = "http://"+window.location.host+"/audio/horamare.mp3",
        audio = document.createElement("audio");
    audio.setAttribute("class", "audiohora");
    audio.src = source;
    audio.volume = 0.3;

    $(".startsong").click(function(){
      audio.play();
    });

    $(".stopsong").click(function(){
      audio.pause();
      audio.currentTime = 0;
    });

  }
}

$(function() {
  Hora.selGender();
  Hora.selCharacter();
  Hora.leftSidebar();
  Hora.topSidebar();
  Hora.bindStartHora();
  Hora.stopHora();
  Hora.soundStart();
  Hora.joinedHover();
});


$(window).ready(function(){
  var w = $(window).width();
  $(".hora-container-mask").css("width", w);

  var chars = $(".hora-container").find("div").length,
  containerW = chars * 54;
  $(".hora-container").css("width", containerW);

  $(function() {
    var pane = $('.hora-container-mask');
    pane.jScrollPane();
    var api = pane.data('jsp');

  });
});
