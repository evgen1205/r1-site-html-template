$(document).ready(function(){
	if (window.innerWidth >= 650){
		$('.slider').show();
		var n=$('.slide_wrapper').children().size();
		for(var i=0; i < n; i++){
			$('.button_container').append('<a class="slider_button" id="'+i+'"></a>');
			}
		var sliderTimer;
		var slideWidth=600;

	$(function(){
		$('.slide_wrapper').width($('.slide_wrapper').children().size()*slideWidth);
		var initData=parseInt($('.slide_wrapper').data('current'));
		$('#'+initData).addClass('active');

		sliderTimer=setInterval(nextSlide,5000);
		$('.slider').hover(function(){
			clearInterval(sliderTimer);
		},function(){
			sliderTimer=setInterval(nextSlide,5000);
		});
		$('#next_slide').click(function(){
			nextSlide();
		});
		$('#prev_slide').click(function(){
			prevSlide();
		});

		$('.slider_button').click(function(){
			$('.slider_button').removeClass('active');
			var currentSlide=parseInt($(this).attr('id'));
			$('.slide_wrapper').animate({left: -currentSlide*slideWidth},0).data('current',currentSlide);
			$(this).addClass('active');
		})
	});

	function nextSlide(){
		var currentSlide=parseInt($('.slide_wrapper').data('current'));
		currentSlide++;
		if(currentSlide>=$('.slide_wrapper').children().size())
		{	currentSlide=0;
			$('.slide_wrapper').animate({left: -currentSlide*slideWidth},0).data('current',currentSlide);
		} else {
			$('.slide_wrapper').animate({left: -currentSlide*slideWidth},600).data('current',currentSlide);
		}
		$('.slider_button').removeClass('active');
		$('#'+currentSlide).addClass('active');
	}

	function prevSlide(){
		var currentSlide=parseInt($('.slide_wrapper').data('current'));
		currentSlide--;
		if(currentSlide<0)
		{	currentSlide=parseInt($('.slide_wrapper').children().size())-1;
			$('.slide_wrapper').animate({left: -currentSlide*slideWidth},0).data('current',currentSlide);
		} else{
			$('.slide_wrapper').animate({left: -currentSlide*slideWidth},600).data('current',currentSlide);
		}
		$('.slider_button').removeClass('active');
		$('#'+currentSlide).addClass('active');
		}
	}
});
