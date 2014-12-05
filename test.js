//此脚本仅供测试效果用

var hero={
	ID=1;
	pos_x:0,
	pos_y:0,
	state:0;	//当前状态
	move_path:[][][];	//缓存的移动路径，以三维数组形式存储
	setPosition:function(x,y)
	{
		pos_x=x;
		pos_y=y;
	},
	move:function(x,y){
		var ti=0;
		if ((i != x) ||(j != y)) {
            if (g.thing[x][y] == 0 && g.ground[x][y] != 0) {
			    if(!ti){
				    mov_up(pos_x,pos_y);
			        ti++;
				}
                else {
				mov_right(pos_x,pos_y);
			    ti=0;
				}
			
		        
			
            }
        }
		document.getElementById('header').innerHTML='('+pos_x+','+pos_y+')';
	}
	doEvent:function()
	{
		if (state=='moving')
		{
		
		}
		
		
	}
}

function doEvent()	//总的事件处理函数；具体处理过程交给相关对象的doEvent函数
{
	hero.doEvent();
	littles.doEvent();
	//XXX.doEvent();
}

function findSomethingByID(ID)
{
	if (ID==1)	return hero;
}

hero.setPosition(99,0);
setInterval(doEvent,1000);	//每隔1秒调用1次，相当于定时器
