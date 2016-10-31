window.onload = function(){


function Anim(obj,x,fallback){
	 obj.removeClass().addClass(x + ' animated').css('opacity',1).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	  // $(this).removeClass(x + ' fll_mode animated');
	  // $(this).css('opacity',1);
	  if(fallback)fallback();
	});
};
Anim($('.welcome span'),'bounceInDown');

$('#container').fullpage({
	scrollingSpeed:800,
	// navigation: true,
	verticalCentered:true,
	css3:true,
	loopHorizontal:false,
	// 'navigation': true,
	anchors: ['page1', 'page2', 'page3'],
	menu: '#menu',
    afterLoad: function(anchorLink, index){
    	if(index == 1){
    		Anim($('.welcome span'),'bounceIn');
    	}
    	if(index == 2){
    		Anim($('.section2 .left span'),'flipInX',function(){
    			Anim($('.section2 .right>div'),'bounceInRight')
    		})
    	}
	},
	onLeave: function(index, direction){
		if(index == 1){
    		$('.welcome span').removeClass();
    	}
		if(index == 2){
			$('.section2 .left span,.section2 .right>div').removeClass().animate({'opacity':0},'300');
		}
		
	}
});


}
