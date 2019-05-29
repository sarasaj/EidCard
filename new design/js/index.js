//Strict whole script
   'use strict';

   $( document ).ready(function() {
    console.log( "ready!" );
});


// ************************ Start
  var elementClicked;
  $('#eid').click(function(){
     elementClicked = true;
  });
  $('#ramadan').click(function(){
     elementClicked = true;
  });

  if( elementClicked != true ) {
    for (var i = 1; i <= 3; i++) {
      $('#backgrounds').append('<img onclick="changeIt(this)" class="bg img-responsive" src="eid designs/eid_backgrounds/'+i+'.jpg" />');
    }
      console.log(" eid");

  }
  else {
    for (var i = 1; i <= 16; i++) {
      $('#backgrounds').append('<img onclick="changeIt(this)" class="bg img-responsive" src="eid designs/backgrounds/'+i+'.jpg" />');
    }
      console.log(" ramadan");
  }
// end ************************
