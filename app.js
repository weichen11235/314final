//jQuery UI 
$( function() {
  $( "#joke-panel" ).tabs();
});

$( function() {
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
});

//joke panel toggle
$("#relax").click(function(){
  $("#joke-panel").toggle();
  if($("#relax").text() === "wanna relax?"){
    $("#relax").text("close");
  } else {
    $("#relax").text("wanna relax?");
  }
});