
	// var num=0;
	// $('.nav_a ul li').each(function(){
	// 	$(this).click(function(){
	// 		event.preventDefault();
	// 		if($(this).index() != num){
	// 			num = $(this).index();
	// 			$('.nav_b .nav_b_section').slideUp();
	// 			$('.nav_b .nav_b_section').eq(num).slideDown();
	// 			$('.cont_in_section').hide();
	// 			$('.cont_in_section').eq(num).fadeIn();
	// 		}
	// 	})
	// })

	//增加删除 编辑按钮
	$(document).ready(function(ev){
		var a = $('.edit_b').clone().html();
		var b = $('.edit_a').clone().html();
		$('.cont_in_1 tr').each(function(){
			$(this).find('td').eq(-1).html(a);
			$(this).find('td').eq(-2).html(b)
		})
	})

	// edit 下拉
	$('.show_list').live('click',function(){
		var a = $('.editc_t').html();
		// console.log($('.editc_t').html())
		// console.log($(this).parents('td').append('a'))
		$('table .edit_c').fadeOut(function(){
			$(this).remove()
		});

		$(this).parents('td').append(a);
	})

	//点击取消某功能的展现
	$(document).click(function(ev){
		var oEvent = ev || window.event;
		var srcEle = oEvent.srcElement || oEvent.target;

		if(!$(srcEle).hasClass('show_list') && !$(srcEle).parents('.edit_c').get(0)){
			$('table .edit_c').fadeOut();
		}

		if(!$(srcEle).parents('.select').get(0)){
			$('.select_list').slideUp('fast');
		}

	})

	//下拉框
	$('.select_show').click(function(){
		$('.select').css({position:''})
		$(this).parents('.select').css({position:'relative'})
		$('.select_list').slideUp('fast');
		$(this).parents('.select').find('.select_list').slideToggle('fast');	
	})

	$('.select_list a').click(function(){
		var _this=$(this);
		$(this).parents('.select').find('.select_show span').text($(this).text());
		_this.parents('.select').find('.select_list').slideUp()	

	})
	// 项目状态点击选择日期

	$('.select_datapicker').datetimepicker({
			lang:'ch',
			timepicker:false,
			format:'Y.m.d'
		});

	$('.allow').click(function(){
		$('.select_data .allow').removeClass('active');
		$(this).addClass('active');

		$(this).find('.select_datapicker').datetimepicker({
			lang:'ch',
			timepicker:false,
			format:'Y.m.d'
		});
	})

	// 点击空内容
	$('.focu_emp').bind('click',function(){
		var a = $(this).attr('data-clickfirst');

		if(!a){
			$(this).val('');
			$(this).attr('data-clickfirst','ok')
		}

	})


// 日历 

$('.datetimepicker9').datetimepicker({
	lang:'ch',
	timepicker:false,
	format:'Y.m.d'
});

// 弹出框 
	$('.cont_in_1 .fa_trash').live('click',function(){
		var _this = $(this);
        // var elem = $(this).closest('.item');
        $.confirm({
            'title'     : '删除提示',
            'message'   : '确定要删除项目吗？删除项目将无法恢复。',
            'buttons'   : {
                '提交项目'   : {
                    'class' : 'blue',
                    'action': function(){
                        // elem.slideUp();
                        _this.parents('tr').fadeOut('600',function(){$(this).remove()})

                    }
                },
                '取消'    : {
                    'class' : 'gray',
                    'action': function(){
                    	alert("我是取消")
                    }  // Nothing to do in this case. You can as well omit the action property.

                }
            }
        });
        
    });

    // 新增

   $('.add_btn1').click(function(){
   	// console.log($(this).parent().find('table').find('tr').eq(-1));
   	var a = $(this).parent().find('table tr').eq(-1).clone().removeClass('last_tr');
   	
   	$(this).parent().find('table').append(a)
   });

   $('.fa_close').live('click',function(){
   	if(!$(this).parents('tr').hasClass('last_tr')){

   		$(this).parents('tr').fadeOut(function(){
   			$(this).remove();
   		})
   	}
   })