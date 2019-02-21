$(window).scroll(function() {
   parallax();
})


function parallax () {

   var wScroll = $(window).scrollTop();
   
   $('#about .side_img .img').css({
      "background-position" : "center calc( 30% - " + (wScroll * 0.10) + "px)"
   })
   
}




var numItems = $('section').length;
console.log(numItems);
//$('.test').append($('#navigation .dot_wrap'));
//$('.dots2').clone().appendTo($('.test2'));
//$('#navigation .dot_wrap').clone().appendTo($('.test .dots'));


/*$.each($('section'),function(index,element){
   $('#navigation .dots').clone().appendTo($('#navigation .dot_wrap'));
})*/


var place = $('#navigation .dot_wrap');
var item = $('#navigation .dots');
for (i = 1; i < numItems; i++){
   item.clone().appendTo(place);
}

/*$( '.dots' ).click(function() {
   $('#about .text').hide();
   $('#about .text').slideDown();
 });
*/

$("#navigation .dots").click(function(event){
   
   var index = $("#navigation .dots").index(this);

   $('html, body').animate({
         scrollTop: $("section").eq(index).offset().top
   }, 1000);
   
   //$(this).children('a').attr("href", "#work")[0].click();
   //$("#navigation .dots a")[0].click();
});






// Hovering Dots changing color 

 $('.dots')
    .on("mouseenter", function(){
      
      
      
      var index = $("#navigation .dots").index(this);

      console.log(index);
      console.log($('section').eq(index).find('h2').text());
      
      if (index){
        $(this).append("<div class='text'>" + $('section').eq(index).find('h2').text() + "</div>");
      } else {
        $(this).append("<div class='text'>Welcome</div>");
      }
      
        

      console.log($(this).find('text').width() + " width ");
      $(this).find(".text" ).animate({ "left": "0px" }, 1100 );
    
      

      //console.log(index);
      //console.log($('section').eq(index).clone()); 


      $(this).find('.text').css({
        "color" : "white",
        "padding-left" : "5px" 
     });
   })
   .on( "mouseleave", function(){
      
      $(this).find('.text').remove();

   });





















/***  Inserts Img to Art Slider  ***/

function setSlider (folder, title){
    

    //Convert title to usable class name
    for(var i = 0; i < title.length; i++) {
       var title2 = title.replace(/ /g, '_');
    }
        
   $('#art').append('<div class="slider slider_' + title2 + '" position="0"><h3 class="slider_title">' + title + '</h3><div class="slider_controls"><button class="previous"></button><button class="next"></button></div><div class="wraper"><ul class="slider_list">   </ul></div></div>')
   
   //hide prev button
   $('#art .slider .slider_controls .previous').hide();


   $.ajax({
      url : folder,
      success: function (data) {
         $(data).find("a").attr("href", function (i, val) {
               if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                  $("#art .slider_" + title2 + " .slider_list").append("<li class='slider_img'> <img src='" + val +"'> </li>" );               
               } 
         });
      }
   });

}

setSlider("img/tattoo/galery_1", "I became MadMeow");
setSlider("img/tattoo/galery_2", "Purge Theme");
   
/***********************/


/*** Control buttons ***/


//On resize reset slider position to start.

$(window).resize(function(){

    $('#art .slider_list').css({
        "transform" : ""
     });


     //button configuration - set default;
     $('#art .slider').attr('position', '1');
     $('#art .slider .slider_controls .previous').hide();
     $('#art .slider .slider_controls .next').show();
     
    
})



// Slider Previous Control Button

$('#art').on('click', '.slider_controls .previous', function(event){
   
    if ($(this).parents('.slider').hasClass('popUpSlider')){
        var movementCount = 1;
        var slider_pic_count = 1;
    } else {
        var movementCount = 2;
        var slider_pic_count = 3;
    }


    //Show prev button
    $(this).parents('.slider').find('.slider_controls .next').show();
    
   var xCord = 0;

   //Find at whitch position/img in a row 
   var position = $(this).parents('.slider').attr('position');
   position = parseInt(position)  - movementCount;

   console.log(movementCount + " - movementCount");

    //Slider length
   var slider_length = $(this).parents('.slider').find('.slider_list li').length;
    
   //Slider ones pic width depending on pic count
   var slider_one_pic_width = ($('#art .slider .slider_list').width() / slider_pic_count);

    //checks if theres still images left
   if (position <= 0){
        position = 0;
        $(this).parents('.slider').find('.slider_controls .previous').hide();
    }

    console.log(slider_length * slider_one_pic_width * -1);
    console.log($(this).parents('.slider').find('.slider_list li').length);



   console.log(position + " - position");
   xCord -= slider_one_pic_width * position;
   $(this).parents('.slider').find('.slider_list').css({
      "transform" : "translate3d(" + xCord + "px,0,0)"
   });
   console.log(xCord + " - xCord");
   console.log("------------")


   $(this).parents('.slider').attr('position', ' ' + parseInt(position) + ' ');
});



// Slider Next Control Button

$('#art').on('click', '.slider_controls .next', function(event){
   
    if ($(this).parents('.slider').hasClass('popUpSlider')){
        var movementCount = 1;
        var slider_pic_count = 1;
    } else {
        var movementCount = 2;
        var slider_pic_count = 3;
    }


    //Show prev button
    $(this).parents('.slider').find('.slider_controls .previous').show();
    
   var xCord = 0;

   //Find at whitch position/img in a row 
   var position = $(this).parents('.slider').attr('position');
   position = parseInt(position)  + movementCount;

   console.log(movementCount + " - movementCount");

    //Slider length
   var slider_length = $(this).parents('.slider').find('.slider_list li').length;
    
   //Slider ones pic width depending on pic count
   var slider_one_pic_width = ($('#art .slider .slider_list').width() / slider_pic_count);

    //checks if theres still images left
   if (position >= slider_length - slider_pic_count){
        position = slider_length - slider_pic_count;
        $(this).parents('.slider').find('.slider_controls .next').hide();
    }

    console.log($(this).parents('.slider').find('.slider_list li').length);



   console.log(position + " - position");
   xCord -= slider_one_pic_width * position;
   $(this).parents('.slider').find('.slider_list').css({
      "transform" : "translate3d(" + xCord + "px,0,0)"
   });
   console.log(xCord + " - xCord");
   console.log("------------")



   $(this).parents('.slider').attr('position', ' ' + parseInt(position) + ' ');

});








/**  Creats Slider Pop Up  **/


$('#art .slider_list ').on('click','.slider_img', function(event){

    var popUpSlider = $(this).parents('.slider').clone();
    


    $(popUpSlider).addClass("popUpSlider");
    $('.slider_title',popUpSlider).remove();    


    $(".slider_controls").css({
        "visibility" : "hidden"
    });


    //Set up position and transtale3d
    
    var index = $(this).index();
    var position = index;
    var slider_one_pic_width = $('#art .slider .slider_list').width();

    console.log(index + " - index");
    console.log(position + " - position");

    if (position > 0){
        console.log(" index > 0 ");
        $(popUpSlider).attr('position', position);
        $('.slider_list', popUpSlider).css({
            "transform" : "translate3d(" + position * slider_one_pic_width * -1 + "px,0,0)"
         });
         $('.slider_controls .previous',popUpSlider).show();
    }

    $('.slider_controls .next:before').css({
        "background-color" : "black",
    });

    //Add to HTML
    $(this).parents('#art').append(popUpSlider);

});

/**  Closes Pop Up  **/

$('#art').on('click','.popUpSlider img', function(event){

    console.log("fcking Works");
    $(this).parents('.popUpSlider').remove();
    $(".slider_controls").css({
        "visibility" : "visible"
    });

});








/** Insta Feed ************************/

var userFeed = new Instafeed({
   get: 'user',
   userId: '517761100',
   limit: 4,
   resolution: 'standard_resolution',
   accessToken: '517761100.2e34eff.f56d0ee56ce74f599545a46cc9fd4760',
   sortBy: 'most-recent',
   template: '<div class="instaimg"><a href="{{image}}" title="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="img-fluid"/></a></div>',
});


userFeed.run();














/* Instert all Images in folder
var folder = "img/tattoo";

$.ajax({
    url : folder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                $("body").append( "<img src='" + val +"'>" );
                console.log("<img src='"+ folder + val +"'>");
            } 
        });
    }
});
*/ 