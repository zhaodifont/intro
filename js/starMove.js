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