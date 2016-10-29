window.onload = function(){

$('#container').fullpage({
	scrollingSpeed:800,
	navigation: true,
	css3:true,
	loopHorizontal:false,
	'navigation': true,
	anchors: ['page1', 'page2'],
	menu: '#menu',
    afterLoad: function(anchorLink, index){

	},
	onLeave: function(index, direction){
	}
});


}
