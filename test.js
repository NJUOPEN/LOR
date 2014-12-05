//此脚本仅供测试效果用

var hero={
	pos_x:0,
	pos_y:0,
	setPosition:function(x,y)
	{
		pos_x=x;
		pos_y=y;
	},
	move:function(x,y){
		var ti=0;
		if ((i != x) ||(j != y)) {
            if (g.thing[x][y] == 0 && g.ground[x][y] != 0) {
			    if(!ti)
				mov_up(pos_x,pos_y);
                else {mov_right(pos_x,pos_y);
			    ti++;
				}
		        if(ti){
			    ti=0;
		        }
			
            }
        }
		document.getElementById('header').innerHTML='('+pos_x+','+pos_y+')';
	}
}

hero.setPosition(99,99);
setInterval(hero.move,1000);
