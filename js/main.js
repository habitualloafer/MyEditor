jQuery(document).ready(function($){
$(".site-nav-toggle").click(function(){
$(".site-nav").toggle();
});  

$('.main-nav > li ').click(function(){
$('.main-nav > li ').removeClass('current');
var css_class = $(this).attr("class");
$('.'+css_class.replace(/\ +/g,".") ).addClass('current');
});


// retina logo
if( window.devicePixelRatio > 1 ){
if($('.normal_logo').length && $('.retina_logo').length){
$('.normal_logo').hide();
$('.retina_logo').show();
}
//
$('.page-title-bar').addClass('page-title-bar-retina');

}
// responsive or not
if( metropoly_params.responsive == "no" ){
$('meta[name="viewport"]').prop('content', 'width='+metropoly_params.site_width.replace('px',''));
}
// parallax scrolling
$('.parallax-scrolling').each(function(){
$(this).parallax({speed : 0.15});
});

//video background
$('#metropoly-youtube-video').parent('.section').css({'min-height':$(window).height()});
var myPlayer;
jQuery(function () {
 myPlayer = jQuery("#metropoly-youtube-video").YTPlayer();
});

// scheme
 if( typeof metropoly_params.global_color !== 'undefined' && metropoly_params.global_color !== '' ){

 less.modifyVars({
        '@color-main': metropoly_params.global_color
    });
   }
// related posts
var related = $(".metropoly-related-posts");

related.owlCarousel({
loop:true,
margin:15,
navText: [" "," "],
responsiveClass:true,
responsive:{
0:{
items:1,
nav:true
},
600:{
items:2,
nav:false
},
1000:{
items:3,
nav:true,
loop:true
}
}
})

//fixed header
$(window).scroll(function(){
if( $('.fxd-header').length ){
if( $("body.admin-bar").length){
if( $(window).width() < 765) {
	stickyTop = 46;
	
} else {
	stickyTop = 32;
}
}
else{
stickyTop = 0;
}

var stickyTop2 = stickyTop;
if( $(".top-bar").length ){
stickyTop2 = stickyTop + $(".top-bar").outerHeight() ;		  
}
if( $('.slider-above-header .page-top-slider').length ){
stickyTop2 = stickyTop2 + $('.slider-above-header .page-top-slider').outerHeight() ;
}

////
if( !($(window).width() < 919 && metropoly_params.isMobile == 0 )) {

$('.fxd-header').css('top',stickyTop);
		var scrollTop = $(window).scrollTop(); 
	if ( scrollTop > stickyTop2  ) { 
	if( !$(".top-banner").length ){
		$('.main-header').hide();
	}
		$('.fxd-header').show();
		} else {
			if( !$(".top-banner").length ){
			$('.main-header').show(); 
			}
			$('.fxd-header').hide();
		}  
		
}
		
		////////////
		
   }
});

// nav menu search icon

if( metropoly_params.show_search_icon === 'yes' ){
$.ajax({type:"POST",dataType:"html",url:metropoly_params.ajaxurl,data:"action=metropoly_nav_searchform",
success:function(data){
$('header .main-header .main-nav').append('<li class="menu-item menu-item-search-icon"><a href="javascript:;"><i class="fa fa-search site-search-toggle"></i></a>'+data+'</li>');
},error:function(){}});
$('header').on('click','.site-search-toggle',function(){
$('.menu-item-search-icon .search-form').toggle();		  
});

}

// tool tip
$('[data-toggle="tooltip"]').tooltip(); 

// slider
if( $('.metropoly-carousel').length){
var interval = parseInt(metropoly_params.slideshow_speed);
if(metropoly_params.slider_autoplay != '1')
interval = false;

$('.metropoly-carousel').carousel({ interval: interval, cycle: true });
}



//masonry

// blog
$('.blog-grid').masonry({
// options
	itemSelector : '.entry-box-wrap'
});

$('.blog-timeline-wrap .entry-box-wrap').each(function(){
										   
var position   = $(this).offset();		
var left       = position.left;
var wrap_width = $(this).parents('.blog-timeline-wrap').innerWidth();
if( left/wrap_width > 0.5){
$(this).removeClass('timeline-left').addClass('timeline-right');
}else{
$(this).removeClass('timeline-right').addClass('timeline-left');	
}
});

//side header	
$('.side-header .site-nav .menu_column  .sub-menu').css({'width':$('.post-wrap').width()});

//nav arrow on mobiles
$('.site-nav ul li.menu-item-has-children').each(function(){
$(this).prepend('<i class="fa fa-caret-down menu-dropdown-icon"></i>');

})
$(document).on('click','.menu-dropdown-icon',function(){
var submenu = 	$(this).parent('li').find('>ul.sub-menu');								  
submenu.slideToggle();	
});

$(window).resize(function() { 
//side header		  
$('.side-header .site-nav .menu_column  .sub-menu').css({'width':$('.post-wrap').width()});
// blog timeline
$('.site-nav ul li .sub-menu').attr("style","");
$('.site-nav').attr("style","");
$('.blog-timeline-wrap .entry-box-wrap').each(function(){
var position   = $(this).offset();		
var left       = position.left;
var wrap_width = $(this).parents('.blog-timeline-wrap').innerWidth();
if( left/wrap_width > 0.5){
$(this).removeClass('timeline-left').addClass('timeline-right');
}else{
$(this).removeClass('timeline-right').addClass('timeline-left');	
}
});				  
			  
});


jQuery('header .site-nav').onePageNav({filter: 'ul li a[href^="#"]',scrollThreshold:0.2});	

var stickyTop = 0;
if( $("body.admin-bar").length){
if( $(window).width() < 765) {
	stickyTop = 46;
	
} else {
	stickyTop = 32;
}
}else{
	stickyTop = 0;
 }

var win_height = $(window).height()-stickyTop; 
$('.metropoly-home-section-banner').css({'min-height':win_height}); 
$(".section .fullheight").each(function(){ 
var section_height = $(this).height(); 
$(this).css({'height':section_height,'min-height':win_height}); 
});  

///// footer
if(metropoly_params.footer_sticky == '1'){
$('.fxd-footer').css({'margin-bottom':$('.fxd-footer .footer-info-area').outerHeight()});
}


// home page animation
$('.metropoly-animated').each(function(){
 if($(this).data('imageanimation')==="yes"){
	 $(this).find("img,i.fa").css("visibility","hidden");	
}
else{
   $(this).css("visibility","hidden");	
}		

});

if(jQuery().waypoint) {
$('.metropoly-animated').waypoint(function() {
								  
$(this).css({'visibility':'visible'});
$(this).find("img,i.fa").css({'visibility':'visible'});	


// this code is executed for each appeared element
var animation_type       = $(this).data('animationtype');
var animation_duration   = $(this).data('animationduration');
var image_animation      = $(this).data('imageanimation');
 if(image_animation === "yes"){
			 
$(this).find("img,i.fa").addClass("animated "+animation_type);

if(animation_duration) {
	$(this).find("img,i.fa").css('-moz-animation-duration', animation_duration+'s');
	$(this).find("img,i.fa").css('-webkit-animation-duration', animation_duration+'s');
	$(this).find("img,i.fa").css('-ms-animation-duration', animation_duration+'s');
	$(this).find("img,i.fa").css('-o-animation-duration', animation_duration+'s');
	$(this).find("img,i.fa").css('animation-duration', animation_duration+'s');
}

	 
 }else{
$(this).addClass("animated "+animation_type);

if(animation_duration) {
	$(this).css('-moz-animation-duration', animation_duration+'s');
	$(this).css('-webkit-animation-duration', animation_duration+'s');
	$(this).css('-ms-animation-duration', animation_duration+'s');
	$(this).css('-o-animation-duration', animation_duration+'s');
	$(this).css('animation-duration', animation_duration+'s');
}
 }

 
},{ triggerOnce: true, offset: '90%' });
}



$(".mp-carousel-testimonials").owlCarousel({
	loop:true,
	items: 1,
	itemsTablet: [768,1],
	itemsMobile: [479,1],
});

$(".mp-carousel-clients").owlCarousel({
	items: 4,
	itemsTablet: [768,3],
	itemsMobile: [479,2],
	pagination: false,
	nav:false,
	dots:false
});

// home page testimonial					
var owl_testimonial = $("#home-page-testimonial");
		owl_testimonial.owlCarousel({
			loop:true,
			margin:0,
			autoplay:true,
			autoplayTimeout:5000,
			autoplayHoverPause:true,
			items:1,
			responsiveClass:true,
			responsive:{
				0:{
					items:1,
					nav:false
				},
				600:{
					items:1,
					nav:true,
				},
				1000:{
					items:1,
					nav:true,
				}
			}
		});
		  owl_testimonial.parents(".magee-carousel").find(".carousel-next").click(function(){
		  owl_testimonial.trigger("next.owl.carousel");
		})
		  owl_testimonial.parents(".magee-carousel").find(".carousel-prev").click(function(){
		  owl_testimonial.trigger("prev.owl.carousel");
		});
		
// home page clients	
var owl_clients = $("#metropoly-home-style-2-clients");
		owl_clients.owlCarousel({
			loop:true,
			margin:10,
			autoplay:true,
			autoplayTimeout:5000,
			autoplayHoverPause:true,
			items:4,
			responsiveClass:true,
			responsive:{
				0:{
					items:1,
					nav:false
				},
				600:{
					items:2,
					nav:true,
				},
				1000:{
					items:4,
					nav:true,
				}
			}
		});
		 owl_clients.parents(".magee-carousel").find(".carousel-next").click(function(){
		  owl_clients.trigger("next.owl.carousel");
		})
		owl_clients.parents(".magee-carousel").find(".carousel-prev").click(function(){
		  owl_clients.trigger("prev.owl.carousel");
});
		
		
//featured box style 2

var s=$(".magee-feature-box.style2");
for(i=0;i<s.length;i++) {
	var t=$(s[i]).find(".icon-box").outerWidth();
	if($(s[i]).find("img.feature-box-icon").length){
	var t=$(s[i]).find("img.feature-box-icon").outerWidth();
	}
	t+=15;
	t+="px";
	$(s[i]).css({"padding-left":t});
}
var s=$(".magee-feature-box.style2.reverse");
for(i=0;i<s.length;i++) {
	var t=$(s[i]).find(".icon-box").outerWidth();
	if($(s[i]).find("img.feature-box-icon").length)
	var t=$(s[i]).find("img.feature-box-icon").outerWidth();
	
	t+=15;
	t+="px";
	$(s[i]).css({"padding-left":0,"padding-right":t});
}
var s=$(".magee-feature-box.style3");
for(i=0;i<s.length;i++) {
	var t=$(s[i]).find(".icon-box").outerWidth();
	if($(s[i]).find("img.feature-box-icon").length)
	var t=$(s[i]).find("img.feature-box-icon").outerWidth();
	t+="px";
	$(s[i]).find("h3").css({"line-height":t});
}
var s=$(".magee-feature-box.style4");
for(i=0;i<s.length;i++) {
	var t=$(s[i]).find(".icon-box").outerWidth();
	if($(s[i]).find("img.feature-box-icon").length)
	var t=$(s[i]).find("img.feature-box-icon").outerWidth();
	t=t/2;
	t1=-t;
	t+="px";
	t1+="px";
	$(s[i]).css({"padding-top":t,"margin-top":t});
	$(s[i]).find(".icon-box").css({"top":t1,"margin-left":t1});
	$(s[i]).find("img.feature-box-icon").css({"top":t1,"margin-left":t1});
}




if($('#homepage-carousel').length){

if($(window).width() <1200){
newPercentage = (($(window).width() / 1200) * 100) + "%";
$("#homepage-carousel .magee-heading .heading-inner").css({"font-size": newPercentage});
}
$(window).on("resize", function (){
if($(window).width() <1200){
newPercentage = (($(window).width() / 1200) * 100) + "%";
$("#homepage-carousel .magee-heading .heading-inner").css({"font-size": newPercentage});}});
}


var owl = $("#homepage-testimonial .owl-carousel");
		owl.owlCarousel({
			loop:true,
			margin:0,
			autoplay:true,
			autoplayTimeout:5000,
			autoplayHoverPause:true,
			items:1,
			responsiveClass:true,
			responsive:{
				0:{
					items:1,
					nav:false
				},
				600:{
					items:1,
					nav:true,
				},
				1000:{
					items:1,
					nav:true,
				}
			}
		});
		 owl.parents(".magee-carousel").find(".carousel-next").click(function(){
		  owl.trigger("next.owl.carousel");
		})
		owl.parents(".magee-carousel").find(".carousel-prev").click(function(){
		  owl.trigger("prev.owl.carousel");
		});

		
	// contact		
 $("form.mp-contact-form #submit").click(function(){						
	var obj = $(this).parents(".mp-contact-form");
	obj.find(".contact-failed").text("");		
	var receiver  = obj.find("input#receiver").val();
	var email     = obj.find("input#email").val();
	var name      = obj.find("input#name").val();
	var subject   = obj.find("input#subject").val();
	var message   = obj.find("textarea#message").val();
	

	obj.find(".contact-failed").append("<img alt='loading' class='loading' src='"+metropoly_params.themeurl+"/images/AjaxLoader.gif' />");
	
	 $.ajax({
				 type:"POST",
				 dataType:"json",
				 url:metropoly_params.ajaxurl,
				 data:"name="+name+"&email="+email+"&subject="+subject+"&receiver="+receiver+"&message="+message+"&action=metropoly_contact",
				 success:function(data){
					 if( data.error == 0 ){
						     obj.find(".contact-failed").addClass("notice-success");
					         obj.find(".contact-failed").html(data.msg);
							  $('.loading').remove();obj[0].reset(); 
						 }else{
							 obj.find(".contact-failed").removeClass("notice-success");
							 obj.find(".contact-failed").html(data.msg);	
							 }
		          
		           return false;
				   },error:function(){
					   obj.find(".contact-failed").html("Error.");
					   obj.find('.loading').remove();
					   return false;
					   }
			 });
	
	 return false;
	});
		
 $('#back-to-top, .back-to-top').click(function(){
     $('html, body').animate({scrollTop:0},'800');return false;
 });
 
  $(window).scroll(function() {
        if ($(window).scrollTop() > 200) {
            $("#back-to-top, .back-to-top").fadeIn(200);
        } else {
            $("#back-to-top, .back-to-top").fadeOut(200);
        }
       
    });
 
 
});

jQuery(window).on('load', function(){ 
					   
var $ = jQuery;
//masonry
// portfolio
$('.metropoly-masonry,.magee-masonry').masonry({
// options
	itemSelector : '.portfolio-box-wrap'
});
// blog
$('.blog-grid').masonry({
// options
	itemSelector : '.entry-box-wrap',
	animate: true
});
// home page slider
var autoplay = true;
if(metropoly_params.slider_autoplay != '1')
var autoplay = false;
var slideshow_speed;
slideshow_timeout = parseInt(metropoly_params.slideshow_timeout) ;
if( slideshow_timeout == 0 )
var slideshow_timeout = 3000;

$(".mp-slider").owlCarousel({
	items: 1,
	loop:true,
	itemsTablet: [768,1],
	itemsMobile: [479,1],
	autoplay:autoplay,
	//dots:false,
	autoplayTimeout:slideshow_timeout,
});

					   
});