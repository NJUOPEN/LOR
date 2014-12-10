//此脚本仅供测试效果用
var ti=0;
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
move:function(x,y){           //英雄路径算法（非最短）
		if ((pos_x != x) ||(pos_y != y)) {   //
			if (g.thing[x][y] == 0 && g.ground[x][y] != 0) {   //目的有效
				if(ti==0){
					if(y>pos_y){                                  //ti：0左右（交替）1上下（交替）2左右（直线）3上下（直线）
						if(g.ground[pos_x][pos_y-1] != 0){
							mov_up(pos_x,pos_y);
							ti++;
						}
						else
						ti=2;
						
					}
					else if(y<pos_y){
						if(g.ground[pos_x][pos_y+1] != 0){
							mov_down(pos_x,pos_y);
							ti++;}
						else 
						ti=2;
						
						
					}
				}
				
				else if(ti==1){                                 
					if(x>pos_x){
						if(g.ground[pos_x+1][pos_y] != 0)
						mov_right(pos_x,pos_y);
						ti=0;
						else ti=3;
						
					}
					else if(x<pos_x){
						if(g.ground[pos_x-1][pos_y] != 0){
							mov_left(pos_x,pos_y);
							ti=0;
						}
						else 
						ti=3;
						
					}
				}
				else if(ti==2){                          //直线行走至上下无阻挡
					if (x<pos_x){
						if(y<pos_y){
							mov_left(pos_x,pos_y);
							if(g.ground[pos_x,pos_y-1]==0)
							ti=2;
							else 
							ti=1;
							
						}
						if(y>pos_y){
							mov_left(pos_x,pos_y);
							if(g.ground[pos_x,pos_y+1]==0)
							ti=2;
							else 
							ti=1;
							
						}
						
						
					}
					if (x>pos_x){                    
						if(y<pos_y){
							mov_right(pos_x,pos_y);
							if(g.ground[pos_x,pos_y-1]==0)
							ti=2;
							else 
							ti=1;
							
						}
						if(y>pos_y){
							mov_right(pos_x,pos_y);
							if(g.ground[pos_x,pos_y+1]==0)
							ti=2;
							else 
							ti=1;
							
						}
						
						
					}
					
				}
				else if(ti==3){
					if (y<pos_y){
						if(x<pos_x){
							mov_up(pos_x,pos_y);
							if(g.ground[pos_x-1,pos_y]==0)
							ti=3;
							else 
							ti=0;
							
						}
						if(x>pos_x){
							mov_up(pos_x,pos_y);
							if(g.ground[pos_x+1,pos_y]==0)
							ti=3;
							else 
							ti=0;
							
						}
						
						
					}
					if (y>pos_y){
						if(x<pos_x){
							mov_down(pos_x,pos_y);
							if(g.ground[pos_x-1,pos_y]==0)
							ti=3;
							else 
							ti=0;
							
						}
						if(x>pos_x){
							mov_down(pos_x,pos_y);
							if(g.ground[pos_x+1,pos_y]==0)
							ti=3;
							else 
							ti=0;
							
						}
						
						
					}
					
				}
			}
			
		}
		document.getElementById('header').innerHTML='('+pos_x+','+pos_y+')';
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
