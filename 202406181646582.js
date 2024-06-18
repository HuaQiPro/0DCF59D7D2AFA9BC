$(function() {  
		
	
	$("[data-toggle='tooltip']").tooltip();
		
	$('.navscroller').navbarscroll();
		
	$('.screenlist').navbarscroll();
	
    var swiper = new Swiper('.indexslide', {
	    pagination: '.swiper-pagination',
	    paginationClickable: true,
	    autoplay: 3000,
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	});	 

	var backToTop = function () {
	    var $window = $(window);
	    $scrollTopLink = $( 'a.backtop' );
	    $window.scroll(function () {
	        if ($(this).scrollTop() > 500) {
	            $scrollTopLink.removeClass('hide');
	        } else {
	            $scrollTopLink.addClass('hide');
	        }
	    });
	    $scrollTopLink.on('click', function() {
	        $( 'html, body' ).animate({scrollTop:0}, 400);
	        return false;
	    } );	    	   
	}
	
	$('#opennav').click(function()
	{				
		$('.sheet').removeClass('right');
		$('.sheet').addClass('left');
		$('body').append('<div class="mask"></div>');
				
		$('.sheetcancel').click(function()
		{	
			$('.sheet').addClass('right');
			$('.sheet').removeClass('left');
			$('.mask').remove();
		});
		
		$('.mask').click(function()
		{	
			$('.sheet').addClass('right');
			$('.sheet').removeClass('left');
			$(this).remove();
		});
		
	});	
	
	backToTop();  
	
});



    