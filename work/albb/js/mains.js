require.config({
	 baseUrl: 'js/',
	 paths:{
	 	zepto:'zepto',
	 	swiper:'idangerous.swiper-2.0.min'
	 }
})

require(['zepto','swiper'],function(){
	
	


	//初始
		
	Zepto(function(){

		// 设置字体
		var fontsize=Math.round($('.bod_cent').width()/32) + "px";
		$('.ahtml').css({fontSize:fontsize});

		//load img
		$(function(){
			
		})

		//飞机
		$('.plane').css({
			left:-$('.plane').width()/2,
			bottom:-$('.plane').height()/2
		})
	})
	

	// alert()
	$('.logo').fadeIn(400,function(){
		$('.ear_span').addClass('spans').delay(600,function(){
			$('.san1').addClass('san1a');
			$('.san2').addClass('san2a');
			setTimeout(function(){
				$('.san2_p,.san1_p').addClass('animatea');
				$('.plane').addClass('planea')
				setTimeout(function(){
					$('.earth').addClass('earth_a');
					$('.section1_tit').fadeIn('1000');
					$('.slide_sort').show();
				},2200)
			},600)
		})
	})
	


	//swiper
	var mySwiper = new Swiper('.swiper-container-parent',{
		mode: 'vertical',
		speed:600,
		noSwiping:true,
		followFinger:true,
		noSwiping:true,
		onSlideChangeStart:function(){
			$('.logo').hide();
			if(mySwiper.activeIndex == 4){
				$('.share').show();
				$('.share').tap(function(){
					$(this).hide()
				})
			}

		},
		onSlideChangeEnd:function(){
			$('.logo').fadeIn();
			// alert(mySwiper.activeIndex)
			if(mySwiper.activeIndex==1){
				$('.section2_txt').animate({
					top:'9.4%',
					opacity:1
				},500,'ease-out',function(){
					$('.section2_text').animate({top:'25%',opacity:1},400,'ease-out',function(){
						setTimeout(function(){
							$('.section2 .section2_san').addClass('animate')
						},400)
					})
				})
			};
			if(mySwiper.activeIndex==2){
				$('.section3_tit').animate({
					top:'12%',
					opacity:1
				},300,'ease-out',function(){
					$('.hangzhou').animate({top:0,opacity:1},300,'ease-out',function(){
						$('.bali').animate({marginTop:'5rem',opacity:1},300,'ease',function(){
							$(this).find('.set3_plane').addClass('animate');
							setTimeout(function(){
								$('.newy').animate({marginTop:'3rem',opacity:1},300,'ease-out',function(){
									$(this).find('.set3a_plane').addClass('animate');
									$('.bali').fadeOut(2000,function(){
										$('.mosk').animate({marginTop:'2.5rem',opacity:1})
									});
									setTimeout(function(){
										$('.set3b_plane').addClass('animate');
										$('.newy').fadeOut(2000,function(){
											$('.kailuo').animate({marginTop:'5.5rem',opacity:1})
										});
										setTimeout(function(){
											$('.set3c_plane').addClass('animate');
										},3000)
									},3000)
								})
							},3000)
						})
					})
				})

		

			};
		

			if(mySwiper.activeIndex==3){
				$('.tester').animate({
					top:'12%',
					opacity:1
				},300,'ease',function(){
					$('.section4_text').animate({
						top:'20%',
						opacity:'1'
					},300,'ease',function(){
						$('.section4_txt').animate({
							bottom:'8%',
							opacity:1
						});
						$('.section4 .section2_san').addClass('animate')
					})
				})
			}


			if(mySwiper.activeIndex==4){

				$('.section6_tit').animate({
					top:'10%',
					opacity:1
				},400,'ease',function(){
					$('.swiper6_parent').animate({
						left:'4%',
						opacity:1
					});
					$('.section6_txt').animate({
						bottom:'3%',
						opacity:1
					})
				})

			}



		}

	})


	//section6
	var mySwiper6 = new Swiper('.swiper-container-6',{
		speed:600,
		slidesPerView: 3,
		autoResize:true
	})

	$('.swiper6_parent .slide_l').on('click', function(e){
		e.preventDefault()
		mySwiper6.swipePrev()
	})
	$('.swiper6_parent .slide_r').on('click', function(e){
		e.preventDefault()
		mySwiper6.swipeNext()
	})



			// 摇一摇
if(window.DeviceMotionEvent) {  
    var speed = 25;  
    var x = y = z = lastX = lastY = lastZ = 0;  
    window.addEventListener('devicemotion', function(){  
        var acceleration =event.accelerationIncludingGravity;  
        x = acceleration.x;  
        y = acceleration.y;  
        if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {  
            alert(0) 
        }  
        lastX = x;  
        lastY = y;  
    }, false);  
}
		


})
































