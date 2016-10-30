window.onload = function(){


function Anim(obj,x){
	obj.removeClass(x + ' animated').addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		console.log(1)
	  $(this).removeClass(x + ' animated');

	});
};
Anim($('.welcome'),'hinge');

$('#container').fullpage({
	scrollingSpeed:800,
	// navigation: true,
	verticalCentered:true,
	css3:true,
	loopHorizontal:false,
	// 'navigation': true,
	anchors: ['page1', 'page2'],
	menu: '#menu',
    afterLoad: function(anchorLink, index){
    	if(index == 1){
    		Anim($('.welcome'),'bounceIn')
    	}

	},
	onLeave: function(index, direction){
	}
});


}
