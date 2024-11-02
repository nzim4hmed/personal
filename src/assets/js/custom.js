/*--------------------- Copyright (c) 2023 -----------------------
[Master Javascript]
-------------------------------------------------------------------*/
(function($) {
    "use strict";
    var herbalpure = {
        initialised: false,
        version: 1.0,
        mobile: false,
        init: function() {
            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }
            /*-------------- Design Functions Calling ---------------------------------------------------
            ------------------------------------------------------------------------------------------------*/
			this.RTL();
			this.categorieSlider();
			this.shopSingle();
			this.megnificPopup();
			this.testimonialSlider();
			this.productslider();
			this.Search_icon();
			this.Grid_List_view();
            this.loader();
            this.gztoggle();
            this.gzbottom_top();


        },

        /*-------------- Design Functions Calling ---------------------------------------------------
        --------------------------------------------------------------------------------------------------*/
		// rtl
		RTL: function () {
			// On Right-to-left(RTL) add class 
			var rtl_attr = $("html").attr('dir');
			if(rtl_attr){
				$('html').find('body').addClass("rtl");	
			}		
		},
		shopSingle: function () {
			var swiper = new Swiper(".mySwiper01", {
				loop: true,
				spaceBetween: 10,
				slidesPerView: 3,
				freeMode: true,
				watchSlidesProgress: true,
			  });
			  var swiper2 = new Swiper(".mySwiper02", {
				loop: true,
				spaceBetween: 10,
				navigation: {
				  nextEl: ".swiper-button-next",
				  prevEl: ".swiper-button-prev",
				},
				thumbs: {
				  swiper: swiper,
				},
			  });	
		},
		megnificPopup: function () {
			$('.hb_overlay_icon .zoom_icon').magnificPopup({
				type: 'image',
				gallery: {
					enabled: true
				}
			}); 
			$('.product-image-overlay .zoom_icon').magnificPopup({
				type: 'image',
				gallery: {
					enabled: true
				}
			}); 	
		},
		// categories slider
		categorieSlider: function(){
			var swiper = new Swiper(".mySwiper", {
				slidesPerView: 3,
                spaceBetween: 20,
                direction: 'horizontal',
                initialSlide: 0,
                autoplay: true,
                loop: true,
                watchSlidesVisibility: true,
				breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    575: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    767: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                },
				navigation: {
				  nextEl: ".swiper-button-next",
				  prevEl: ".swiper-button-prev",
				},
			  });
		},
		// testimonial slider
		testimonialSlider: function(){
			var swiper = new Swiper(".testimonialslider", {
				slidesPerView: 3,
                spaceBetween: 20,
				breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    575: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    767: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                },
				navigation: {
				  nextEl: ".swiper-button-next",
				  prevEl: ".swiper-button-prev",
				},
			  });
		},

		// product slider
		productslider: function(){
			var swiper = new Swiper(".productslider", {
				slidesPerView: 4,
                spaceBetween: 20,
				navigation: {
				  nextEl: ".swiper-button-next",
				  prevEl: ".swiper-button-prev",
				},
			  });
		},
		// search icon
		Search_icon: function() {
            $(".hb_search_icon").click(function() {
                $(".hb_search_wrapper").toggleClass('open_form');
            });
            $(".navbar-toggle").click(function() {
                $("body").toggleClass('open_menu');
            });
			$(".hb_menu_overlay").click(function() {
			$("body").removeClass('open_menu');
			});
			$(".cancle_searchbar").click(function() {
                $(".hb_search_wrapper").removeClass('open_form');
            });
        },
		// gris view list
		Grid_List_view:function(){
			if($('.hb_shop_view').length > 0){
				$('.hb_shop_view').on('click', 'li', function() {
					$('.hb_shop_view ul li.active').removeClass('active');
					$(this).addClass('active');
				});
				$('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
				$('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});
			}
		},
		// range slider
		
        // loader           
        loader: function() {
            jQuery(window).on('load', function() {
                $("#hb_preloader_box").fadeOut();
                $("#hb_preloader_wrapper").delay(500).fadeOut("slow");
            });
        },
        // loader

        //Toggle
        gztoggle: function() {
		
            $(".toggleClick").on('click', function(e) {
                e.stopPropagation();
                $("body").toggleClass("menu-open");
            });
        },

       

      
     
        // bottom to top
        gzbottom_top: function() {
            if ($('#button').length > 0) {

                var btn = $('#button');

                $(window).scroll(function() {
                    if ($(window).scrollTop() > 300) {
                        btn.addClass('show');
                    } else {
                        btn.removeClass('show');
                    }
                });

                btn.on('click', function(e) {
                    e.preventDefault();
                    $('html, body').animate({
                        scrollTop: 0
                    }, '300');
                });


            }
        },
        // Bottom To Top
    };
    herbalpure.init();

}(jQuery));





function checkRequire(formId , targetResp){
	targetResp.html('');
	var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
	var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
	var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
	var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
	var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
	var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
	var check = 0;
	$('#er_msg').remove();
	var target = (typeof formId == 'object')? $(formId):$('#'+formId);
	target.find('input , textarea , select').each(function(){
		if($(this).hasClass('require')){
			if($(this).val().trim() == ''){
				check = 1;
				$(this).focus();
				targetResp.html('You missed out some fields.');
				$(this).addClass('error');
				return false;
			}else{
				$(this).removeClass('error');
			}
		}
		if($(this).val().trim() != ''){
			var valid = $(this).attr('data-valid');
			if(typeof valid != 'undefined'){
				if(!eval(valid).test($(this).val().trim())){
					$(this).addClass('error');
					$(this).focus();
					check = 1;
					targetResp.html($(this).attr('data-error'));
					return false;
				}else{
					$(this).removeClass('error');
				}
			}
		}
	});
	return check;
}
$(".submitForm").on("click", function() {
	var _this = $(this);
	var targetForm = _this.closest('form');
	var errroTarget = targetForm.find('.response');
	var check = checkRequire(targetForm , errroTarget);
	if(check == 0){
		var formDetail = new FormData(targetForm[0]);
		formDetail.append('form_type' , _this.attr('form-type'));
		$.ajax({
			method : 'post',
			url : 'ajax.php',
			data:formDetail,
			cache:false,
			contentType: false,
			processData: false
		}).done(function(resp){
			if(resp == 1){
				targetForm.find('input').val('');
				targetForm.find('textarea').val('');
				errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
			}else{
				errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
			}
		});
	}
});

















