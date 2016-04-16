$(document).ready(function() {
  $("#angelspit_list").hide();
  $("#solo_list").hide();
  $("button").click(function(){
    $(this).addClass("animated shake");
  });
  $("#angelspit").click(function(){
    $("#angelspit_list").toggle("slow");
  });
  $("#solo").click(function(){
    $("#solo_list").toggle("slow");
  });
});
