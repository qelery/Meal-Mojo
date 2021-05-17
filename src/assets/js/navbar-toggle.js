$(document).ready(function () {

  if ($("#nav-toggle").length > 0) {
    $("#nav-toggle").click(function () {
      $(this).toggleClass("open");
      $(".nav-left.small").slideToggle(400);
    });
  }
})
