$(document).ready(function (){
 $(".product-thumb-anchar").on('click', function () {
        var img_src = $(this).find("img").attr("src");
        $(".panzoom .owl-item.active").find("img").attr("src", img_src);
    });
	$('.image-display img').on('click',function (){
		$(this).toggleClass('open');
	});
	$(".ui-image-editor .dropdown-submenu").click(function (event) {
	   // stop bootstrap.js to hide the parents
	   event.stopPropagation();
	   // hide the open children
	   $(this).find(".dropdown-submenu").removeClass('open');
	   // add 'open' class to all parents with class 'dropdown-submenu'
	   $(this).parents(".dropdown-menu").addClass('open');
	   // this is also open (or was)
	   $(this).toggleClass('open');
	});
    $('.js-hide-text').on('click',function (event){
        $('.add-your-text').removeClass('open');
    });
	// $(".panzoom").hover(function () {
	// 	$(this).next().toggleClass("open");
	// });
	$(".img-flip-button").hover(function () {
		$(this).toggleClass("open");
	});
	$('.js-add-text > a').on('click',function (){
		$('.add-your-text').toggleClass('open');
	});
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-hover="tooltip"]').tooltip();
	$('#Opacity-slider').val(10).change();
	$('#Rotate-slider').val(10).change();
	$('#Size-slider').val(10).change();
	$('#Curve-slider').val(10).change();
	$(window).on("load resize" ,function (){
		$(".image-display").height($(window).height());
		$(".image-gallery .owl-carousel .owl-stage-outer").height($(window).height());
		$(".image-display").width($(window).width());
	});
	// ZOOM EFFECT
	var $section = $('.image-gallery').first();
	// $section.find('.panzoom').panzoom({
	// 	$zoomIn: $section.find(".zoom-in"),
	// 	$zoomOut: $section.find(".zoom-out"),
	// 	panOnlyWhenZoomed: true,
	// 	minScale: 1
	// });
	// END ZOOM EFFECT

    // START RIGHT-SIDE MENU
    $("#decoration .ui-button a").click(function (event){
        $("#history").removeClass('active');
        $("#layers").removeClass('active');
        if($(".ui-button").parent().hasClass('active')){
            $(this).parent().parent().removeClass('active');
        }
        else{
            $(this).parent().parent().toggleClass('active');
        }
    });
    $("#history .ui-button a").click(function (){
        $(".multicolor-listbox").fadeOut();
         $('.color-swatches-box').fadeOut();
        $("#decoration").removeClass('active');
        $("#layers").removeClass('active');
        if($(".ui-button").parent().hasClass('active')){
            $(this).parent().parent().removeClass('active');
        }
        else{
            $(this).parent().parent().toggleClass('active');
        }
    });
    $("#layers .ui-button a").click(function (){
        $(".multicolor-listbox").fadeOut();
         $('.color-swatches-box').fadeOut();
        $("#history").removeClass('active');
        $("#decoration").removeClass('active');
        if($(".ui-button").parent().hasClass('active')){
            $(this).parent().parent().removeClass('active');
        }
        else{
            $(this).parent().parent().toggleClass('active');
        }
    });
    // END RIGHT-SIDE MENU

    //START IMAGE GALLERY SLIDER
	$('#image-gallery').owlCarousel({
        loop:false,
        nav:true,
        touchDrag:false,
				mouseDrag:false,
				animateOut: 'fadeOut',
        dots:false,
				responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
    // $('#gallery-thumbnails').owlCarousel({
    //     loop:false,
    //     margin:10,
    //     nav:false,
    //     touchDrag:false,
		//     mouseDrag:false,
    //     dots:false,
    //     responsiveClass:true,
    //     responsive:{
    //         0:{
    //             items:1
    //         },
    //         400:{
    //             items:3
    //         },
    //         600:{
    //             items:4
    //         },
    //         991:{
    //             items:4
    //         },
    //         1000:{
    //             items:4
    //         }
    //     }
    // });

    // START MULTICOLOR TEXT


    $('.colorbox-open').click(function() {
        $('.multicolor-listbox').fadeIn(100);
        $('#decoration .ui-button').css('z-index','-1');
        $('.color-swatches-box').fadeOut();
    });


    $('.swatch-box-open li, .customSeachSwatch').click(function() {
         $('.multicolor-listbox').fadeOut();
        $('.color-swatches-box').fadeIn(100);
        $('#decoration .ui-button').css('z-index','-1');
    });
		$('.customSeachSwatch').keyup(function(e) {
			if(e.keyCode == 13)
	 			{
					$('.multicolor-listbox').fadeOut();
					$('.color-swatches-box').fadeIn(100);
					$('#decoration .ui-button').css('z-index','-1');
				}
		});
		$('.close-multicolorbox').click(function() {
         $('.multicolor-listbox').fadeOut();
     });
    $('.close-swatchesbox').click(function() {

        $('.color-swatches-box').fadeOut();

    });

    // Drag and Drop javascript
    $("#draglayer").fsortable({
        connectWith: ".fs",
        tolerance: "pointer",
        size: 5
    }).disableSelection();

//    $('body').click(function() {
//        event.preventDefault() ;
//        $('.ui-right-panel').removeClass('active');
//    });

$('#obv-editor ul > li > a').click(function(){
 		if ($(this).parent().hasClass('openadd')) {
			  $(this).parent().removeClass('openadd');
    }else{
				$('#obv-editor ul > li').removeClass('openadd');
				$(this).parent().addClass('openadd');
		}
});
$(document).click(function() {
    $('#obv-editor ul > li').removeClass('openadd');
});
$('.dropdown-menu').click(function(event) {
 		$(this).parent().parent().addClass('openadd')
		  event.stopPropagation();
});
$('#cancelCrop,#confirmCrop').click(function() {
     $('#obv-editor ul > li').removeClass('openadd open');
});

});
