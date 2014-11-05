	function starMove(obj,jsona,enfun){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bStop=true;
			for(var tagName in jsona){
				var curr;
				tagName == "opacity"?curr=Math.round(getStyle(obj,tagName)*100):curr=parseInt(getStyle(obj,tagName));
				if(curr != jsona[tagName])
					bStop = false;
				var speed = (jsona[tagName] - curr)/6;
				speed = speed > 0?Math.ceil(speed):Math.floor(speed);
				if(tagName != "opacity"){
					obj.style[tagName] = curr + speed +"px";
				}
				else{
					obj.style.opacity = (curr + speed)/100;
					obj.style.filter="alpha(opacity="+ (curr + speed) +")"
				}
				}
			if(bStop){
				clearInterval(obj.timer);
				if(enfun)enfun();
			}
		},20)
	}

function $(a){return document.getElementById(a)};
function getStyle(obj,tagName){
	return obj.currentStyle?obj.currentStyle[tagName]:getComputedStyle(obj,false)[tagName];
}

// nav 移动下标

function add_navicon(obj){ // 目前为id
	this.obj = obj;
	this.aLis = this.obj?this.obj.getElementsByTagName('li'):console.log('请输入有效节点');
}
add_navicon.prototype.init = function(){
	this.addHanles_li();
}
add_navicon.prototype.addHanles_li = function(){
	var _this = this;
	var icon =document.createElement('div');
	icon.className="lit_a";
	this.obj.insertBefore(icon,this.obj.firstChild);
	/*init style*/
	icon.style.left = this.aLis[0].offsetLeft + parseInt(this.aLis[0].clientWidth/2) -icon.offsetWidth/2+ "px";
	this.aLis[0].getElementsByTagName('a')[0].style.color = "#ffe40f";

	for (var i = 0; i < this.aLis.length; i++) {
		this.aLis[i].onmouseover=function(){
			starMove(icon,{left:this.offsetLeft + parseInt(this.clientWidth/2) -icon.offsetWidth/2});
			for(var o=0;o<_this.aLis.length;o++){
				_this.aLis[o].getElementsByTagName('a')[0].style.color = "#fff";
			}
			this.getElementsByTagName('a')[0].style.color = "#ffe40f";
		}
	};
}


// 添加 blind

function blindBtn(faParent,btn){
	var a = true;
	var oldw = faParent.offsetWidth;
	btn.onclick=function(){
		if(a){
			starMove(faParent,{width:this.offsetWidth})
			a = false;
			console.log(a)
		}
		else if(!a){
			starMove(faParent,{width:oldw})
			a = true;
		}
	}
}
