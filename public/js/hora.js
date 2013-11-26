function startHora(){
    $('.start-hora').text("Pause hora").append('<i class="ion-ios7-pause"></i>').removeClass("start-hora").addClass("pause-hora");
    $(".hora-container").find(".participant:nth-of-type(2n)").addClass("danceDown");

    setTimeout(function(){
      $('.pause-hora').text("Start hora").append('<i class="ion-ios7-musical-note"></i>').removeClass("stop-hora").addClass("start-hora");
      $(".hora-container").find(".participant:nth-of-type(2n)").removeClass("danceDown");
    },2000)
};
function bindStartHora(){
  $('.start-hora').click(function(e){
    e.preventDefault();
    startHora();
  });
};

$(window).ready(function(){


  var w = $(window).width();
  $(".hora-container-mask").css("width", w);

  var chars = $(".hora-container").find("div").length,
      containerW = chars * 54;
  $(".hora-container").css("width", containerW);

  $(function() {
    var pane = $('.hora-container-mask');

    pane.bind('jsp-scroll-x',function(event, scrollPositionX) {
      var elLeft = (parseInt($(".hora-container").css("width")) - parseInt($(".hora-container-mask").css("width")));

      if (elLeft == scrollPositionX) {
        $('.pause-hora').text("Start hora").append('<i class="ion-ios7-musical-note"></i>').removeClass("pause-hora").addClass("start-hora");
        $(".hora-container").find(".participant:nth-of-type(2n)").removeClass("danceDown");
      }

      }).jScrollPane({
        animateScroll: true,
        animateDuration: 3000,
        animateEase: "linear"
    });

      var api = pane.data('jsp');

      // $('.start-hora').click(function(e){
      //   e.preventDefault();
      //   //api.scrollToX(0, false);
      //   $('.start-hora').text("Pause hora").append('<i class="ion-ios7-pause"></i>').removeClass("start-hora").addClass("pause-hora");
      //   //api.scrollToX(parseInt(containerW), true);
      //   $(".hora-container").find(".participant:nth-of-type(2n)").addClass("danceDown");
      // });

      // $('.pause-hora').click(function(e){
      //   e.preventDefault();
      //   alert(e.target.nodeName );
      //   $('.jspPane, .jspDrag').stop();
      //   $('.pause-hora').text("Start hora").append('<i class="ion-ios7-musical-note"></i>').removeClass("stop-hora").addClass("start-hora");
      //   api.scrollToX(0, false);
      // });

      bindStartHora();

  });

  $(".left, .close-leftSidebar").unbind().bind("click", function(){
    $('a, button').bind("click", function() { return false; });
    if (!$(".slideLeft").length) {
      $("#main").addClass("slideLeft");
      $("#left-sidebar").removeClass("initialLeftSidebar").addClass("moveLeftSidebar");
    } else {
      $("#main").removeClass("slideLeft");
      $("#left-sidebar").removeClass("moveLeftSidebar").addClass("initialLeftSidebar");
    }
  });

  $(".top, .close-topSidebar").unbind().bind("click", function(){

    if (!$(".slideTop").length) {
      $("#main").addClass("slideTop");
      $("#top-sidebar").removeClass("initialTopSidebar").addClass("moveTopSidebar");
    } else {
      $("#main").removeClass("slideTop");
      $("#top-sidebar").removeClass("moveTopSidebar").addClass("initialTopSidebar");
    }

  });

  function selGender() {
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
  }
  selGender();

  function selCharacter() {
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
  }
  selCharacter();

  function applyCharacter() {
    $(".save-participant").unbind().bind("click", function(e){
      e.preventDefault();
      $(this).fadeOut(200);
      $(this).prevAll(".arrows, .gender-buttons").fadeOut(200);
      $(this).parent().removeClass("editor").addClass("current-participant").addClass("newParticipant");

          setTimeout(function(){
      $(".participant").removeClass("newParticipant");
    },800);
    });

  }

  applyCharacter();


})




//

// var sliderCount = 0;

//   jQuery('#add_slider_image').click(function() {

//     if (sliderCount == 5) {
//       alert('Limit reached');
//     } else {
//        sliderCount++;
//        jQuery('.form-table').append('<tr><td><input type="text" value="" name="slider[]" /><input type="button" name="sliderbut" value="Upload" rel="'+ sliderCount +'" /></td><tr>');
//     }

//   });
