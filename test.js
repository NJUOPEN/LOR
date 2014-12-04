//此脚本仅供测试效果用

var hero={
	pos_x:0,
	pos_y:0,
	setPosition:function(x,y)
	{
		pos_x=x;
		pos_y=y;
	},
	move:function(){
		mov_up(pos_x,pos_y);
		pos_y-=1;
		if (pos_y<1) return;
		document.getElementById('header').innerHTML='('+pos_x+','+pos_y+')';
	}
}

hero.setPosition(99,99);
setInterval(hero.move,1000);
