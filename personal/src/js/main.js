window.onload = function(){


function Anim(obj,x,fallback){
	 obj.removeClass().addClass(x + ' animated').css('opacity',1).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	  // $(this).removeClass(x + ' fll_mode animated');
	  // $(this).css('opacity',1);
	  if(fallback)fallback();
	});
};
Anim($('.welcome span'),'hinge');

$('#container').fullpage({
	scrollingSpeed:800,
	// navigation: true,
	verticalCentered:true,
	css3:true,
	loopHorizontal:false,
	// 'navigation': true,
	anchors: ['page1', 'page2', 'page3', 'page4'],
	menu: '#menu',
    afterLoad: function(anchorLink, index){
    	
    	if(index == 2){
    		Anim($('.section2 .left span'),'flipInX',function(){
    			Anim($('.section2 .right>div'),'bounceInRight')
    		})
    	}
    	if(index == 3){
    		Anim($('.section3 .fp-tableCell>div'),'bounceInUp')
    	}
	},
	onLeave: function(index, direction){
		
		if(index == 2){
			$('.section2 .left span,.section2 .right>div').removeClass().animate({'opacity':0},'300');
		}
		if(index == 2){
			$('.section3 .fp-tableCell>div').removeClass().animate({'opacity':0},'300');
		}
		
	}
});

 var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    speed:800
});

 //load
    $(function(){
        var aImgs = document.querySelectorAll('body img'),
        mx_length = Math.ceil(aImgs.length*0.6);

        function loadnext(num){
            aImgs[num].setAttribute('src',aImgs[num].getAttribute('data-src'));
            aImgs[num].onload=function(){
                if(num + 1 < aImgs.length){
                    loadnext(num+1);
                    this.removeAttribute('data-src');
                    if(num+1 == mx_length){
                        $('#load').remove();
                    }
                }else{
                    loadnext = null;
                }
                $('.myloadText font').width(Math.round((num+1)/mx_length*100)+'%');
            }
        }
        loadnext(0)
    })


}
