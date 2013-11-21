$(window).ready(function(){

    var w = $(window).width();
    $(".hora-container-mask").css("width", w);

    var width = 0;
    $('.hora-container img').each(function() {
        width += $(this).outerWidth( true );
    });

    $(".hora-container").css('width', width);


  $(".left, .close-leftSidebar").unbind().bind("click", function(){
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

  // $(".hora-container img").mouseenter( function(){
  //   $(this).parent().append("<div class='color-overlay'><span>Bogdan Ferariu<span></div>");
  // }).mouseleave(function(){
  //   $(this).parent().find(".color-overlay").remove();
  // });



})
