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

//JOKE API
$("#get-joke").click(function(){
  $.get("http://api.icndb.com/jokes/random", function(data, status){
    $("#sj-content").text(data.value.joke);
  });
});

$("#get-jokes").click(function(){
  let type = $("#category").val();
  let number = $("#joke-number").val();
  $.get(`http://api.icndb.com/jokes/random/${number}?limitTo=[${type}]`, function(data, status){
    let content = "";
    data.value.forEach(function(item){
      content += `<p>${item.joke}</p>`;
    })
    $("#mj-content").html(content);
  });
});