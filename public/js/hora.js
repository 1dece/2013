$(window).ready(function(){

var w = $(window).width();
  $(".hora-container-mask").css("width", w);

  var chars = $(".hora-container").find("span").length,
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

      $('.start-hora').click(function(e){
        e.preventDefault();
        $('.start-hora').text("Pause hora").append('<i class="ion-ios7-pause"></i>').removeClass("start-hora").addClass("pause-hora");
        $(".hora-container").find(".participant:nth-of-type(2n)").addClass("danceDown");
        
        setTimeout(function(){
          $('.pause-hora').text("Start hora").append('<i class="ion-ios7-musical-note"></i>').removeClass("stop-hora").addClass("start-hora");
          $(".hora-container").find(".participant:nth-of-type(2n)").removeClass("danceDown");
        },2000)
      });


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



})
