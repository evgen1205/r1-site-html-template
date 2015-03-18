$(document).ready(function(){
	if (window.innerWidth >= 650){
		$('.slider').show();
		var n=$('.slidewrapper').children().size();
		for(var i=0; i < n; i++){
			$('.buttonContainer').append('<a class="sliderButton" id="'+i+'"></a>');
			}
		var sliderTimer;
		var slideWidth=600;

	$(function(){
		$('.slidewrapper').width($('.slidewrapper').children().size()*slideWidth);
		var initData=parseInt($('.slidewrapper').data('current'));
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

		$('.sliderButton').click(function(){
			$('.sliderButton').removeClass('active');
			var currentSlide=parseInt($(this).attr('id'));
			$('.slidewrapper').animate({left: -currentSlide*slideWidth},0).data('current',currentSlide);
			$(this).addClass('active');
		})
	});

	function nextSlide(){
		var currentSlide=parseInt($('.slidewrapper').data('current'));
		currentSlide++;
		if(currentSlide>=$('.slidewrapper').children().size())
		{	currentSlide=0;
			$('.slidewrapper').animate({left: -currentSlide*slideWidth},0).data('current',currentSlide);
		} else {
			$('.slidewrapper').animate({left: -currentSlide*slideWidth},600).data('current',currentSlide);
		}
		$('.sliderButton').removeClass('active');
		$('#'+currentSlide).addClass('active');
	}

	function prevSlide(){
		var currentSlide=parseInt($('.slidewrapper').data('current'));
		currentSlide--;
		if(currentSlide<0)
		{	currentSlide=parseInt($('.slidewrapper').children().size())-1;
			$('.slidewrapper').animate({left: -currentSlide*slideWidth},0).data('current',currentSlide);
		} else{
			$('.slidewrapper').animate({left: -currentSlide*slideWidth},600).data('current',currentSlide);
		}
		$('.sliderButton').removeClass('active');
		$('#'+currentSlide).addClass('active');
		}
	}
});
