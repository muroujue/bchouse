var firework = function(w,l,ele){
	this.size = 40;
	this.speed = 0.15;
	this.expl(w,l,ele);
}
firework.prototype = {
	firecracker:function(l,ele){
		var b = document.createElement('div');
		b.style.color = '#ffffff';
		b.style.position = 'absolute';
		b.style.left = l+'px';
		ele.appendChild(b);
		return b;
	},
	expl:function(w,l,ele){
		var o = this.firecracker(l,ele);
		var speed = this.speed;
		var e = this.expl;
		var s = this.size;
		// var k = n;
		o.style.top = 100+'px';
		// e(o,n,s,speed);
		var R = w/3;
		var Ri = w/6;
		var r = 0;
		var ri = 0;
		for(var i=0;i<s;i++){
			var span = document.createElement('span');
			var p = document.createElement('p');
			span.style.position = 'absolute';
			span.style.left = 0;
			span.style.top = 0;
			span.innerHTML = '*';
			p.style.position = 'absolute';
			p.style.left = 0;
			p.style.top = 0;
			p.innerHTML = '+';
			o.appendChild(span);
			o.appendChild(p);
		}
		function spr(){
			r += R*speed;
			ri+= Ri*speed/2;
			var sp = o.getElementsByTagName('span');
			var p = o.getElementsByTagName('p');
			for(var i=0; i<sp.length;i++){
				sp[i].style.left=r*Math.cos(360/s*i)+'px';
				sp[i].style.top=r*Math.sin(360/s*i)+'px';
				p[i].style.left=ri*Math.cos(360/s*i)+'px';
				p[i].style.top=ri*Math.sin(360/s*i)+'px';
			}
			R-=R*speed;
			if(R<2){
				clearInterval(clearI);
				o.parentNode.removeChild(o);
			}
		}
		var clearI = setInterval(spr,50);
	}
}

export default firework