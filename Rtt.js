var ScreenWidth=400, ScreenHeight=300;	//定义屏幕的格子数，每个格子为2×2像素，则像素数为800×600
var g={ground:0,thing:0};
var inited=false;	//表示是否已经初始化
//全局变量：地图数组
//其中ground代表地面；thing代表站在该处的物体 1为有物体
//并且暂时只用一个像素点来表示可移动单位

function createMapArray() {
    //首先构建二维数组当做地面
    g.ground = new Array(ScreenWidth);
    g.thing = new Array(ScreenWidth)
    var count = 0;
    for (var i = 0; i <= ScreenWidth; i++) {
        g.ground[i] = new Array(ScreenHeight);
        g.thing[i] = new Array(ScreenHeight);
    }

    //规定：0为无法通过；1为道路；2为河流；3为基地；4为草丛; 5为防御塔
    //整个数组归零
    for (var i = 0; i < ScreenWidth; i++) {
        for (var j = 0; j < ScreenHeight; j++)
        {
            g.ground[i][j] = 1;
            g.thing[i][j] = 0;
        }
    }
d
    //TODO：在新的屏幕尺寸上绘制新的地图
    /*旧地图   
   //河道
       for (var i = 0; i < 100; i++) {
           for (var j = count; j < count + 7; j++)
               g.ground[i][j] = 2;
           count++;
       }
       //中路
       for (var k = 0; k < 4; k++) {
           var j = 0;
           for (var i = 99 - k; i >= 0; i--) {
               g.ground[i][j] = 1;
               j++;
           }
       }
       for (var k = 0; k < 4; k++) {
           var i = 99;
           for (var j = k; j < 100; j++) {
               g.ground[i][j] = 1;
               i--;
           }
       }
       //小路i=48--53
       for (var k = 0; k <= 6; k++) {
           var j = 0;
           for (var i = 48 + k; i < 100; i++) {
               g.ground[i][j] = 1;
               j++;
           }
       }
       //小路j=48-53
       for (var k = 0; k <= 6; k++) {
           var i = 0;
           for (var j = 48 + k; j < 100; j++) {
               g.ground[i][j] = 1;
               i++;
           }
       }
       //边路
       for (var i = 0; i <= 5; i++) {
           for (var j = 0; j <= 99; j++) {
               g.ground[i][j] = 1;
               g.ground[j][i] = 1;
           }
       }
       for (var i = 99; i >= 94; i--) {
           for (var j = 0; j <= 99; j++) {
               g.ground[i][j] = 1;
               g.ground[j][i] = 1;
           }
       }
       //基地
       for (var i = 99; i >= 93; i--) {
           for (var j = 0; j <= 6; j++) {
               g.ground[i][j] = 3;
               g.ground[j][i] = 3;
           }
       }
   
   */
    //新地图 一路
    //上三角
    var a = 50;
    for (var i = 0; a >= 0; i++) {
        for (var j = 200 - a; j <= 150 + a; j++)
            g.ground[j][i] = 0;
        a=a-3;
    }
    //左三角
    a = 30;
    for (var j = 0; a >= 0; j++) {
        for (var i = 170 - a; i <= 140 + a; i++)
            g.ground[j][i] = 0;
            a -= 1;
    }
    //下三角
    a = 80;
    for(var i=ScreenHeight-1;a>=0;i--)
    {
        for (var j = 205 - a; j <= 145 + a; j++)
            g.ground[j][i] = 0;
        a -= 3;
    }
    //右三角
    a = 60;
    for (var j = ScreenWidth - 1; a >= 0; j--) {
        for (var i = 170 - a; i <= 110 + a; i++)
            g.ground[j][i] = 0;
        a -= 1;
    }
    //基地左下
    var house_wide=20
    for(var i=ScreenHeight-1;i>=ScreenHeight-house_wide;i--)
    {
        for (var j = 0; j <= house_wide - 1; j++)
            g.ground[j][i] = 3;
    }
    //基地右上
    for (var j = ScreenWidth - 1; j >= ScreenWidth - house_wide; j--) {
        for (var i = 0; i <= house_wide - 1; i++)
            g.ground[j][i] = 3;
    }
    //草丛(先简陋的做成正方形)
    for(var i=120;i<=180;i++)
    {
        for (var j = 110; j <= 140; j++)
            g.ground[j][i] = 4;
    }
    for(var i=220;i<=280;i++)
    {
        for (var j = 160; j <= 190; j++)
            g.ground[j][i] = 4;
    }
}

//一下为所有物体通用的移动函数
    //单位在thing上面移动
//放置单位
function set(i, j, ID) {
    var a = i+3, b = j+3;
    for (; i < a; i++) {
        for (; j < b; j++)
            g.thing[i][j] = ID;
    }
}
//撤销一个单位
function del(i, j) {
    var a = i+3, b = j+3;
    for (; i < a; i++) {
        for (; j < b; j++)
            g.thing[i][j] = 0;
    }
}
//物体的基本移动
function mov_left(i, j) {
	var ID=g.thing[i][j];
    del(i,j);
if(j>0){
        set(i-1, j, ID);
        i=i-1;
}
}

function mov_right(i, j) {
	var ID=g.thing[i][j];
    del(i, j);
if (j < 99){
        set(i+1 , j, ID);
	    i=i+1;
}
	
}
function mov_up(i, j) {
	var ID=g.thing[i][j];
    del(i, j);
if (i > 0){
        set(i , j-1, ID);
        j=j-1
}
} 

function mov_down(i, j) {
	var ID=g.thing[i][j];
    del(i, j);
if (i < 99){
        set(i , j+1, ID);
	    j=j+1
}
}




//在屏幕上显示这个二维数组   
//供调试用
function printMap()
{
    for (var i = 0; i < ScreenHeight; i++)
    {
        for (var j = 0; j < ScreenWidth; j++)
            document.write(g.ground[i][j] );
        document.write("<br />");
    }
}

function loadMap() {
    createMapArray();
    showMap();
}

function showMap(){
	var map = document.getElementById('playground'); 	//获取视图区
    var table = document.createElement('div');	//新建一个表格，类型为div
    table.id = 'playArea';
    var cell, cellLine;
    var i, j;
    for (j = 0; j < ScreenHeight; j++) {
        cellLine = document.createElement('ul');	//新建一行，元素类型为ul
        cellLine.className = 'cellLine';
        for (i = 0; i < ScreenWidth; i++) {
            cell = document.createElement('li');	//新建一格，元素类型为li
            cell.posX=i;
            cell.posY=j;
            cell.className = 'cell';	//基础样式为cell
            switch (g.ground[i][j]) {
                case 0:
                    cell.className += ' cell_Blank';
                    break;
                case 1:
                    cell.className += ' cell_Road';
                    break;
                case 2:
                    cell.className += ' cell_River';
                    break;
                case 3:
                    cell.className += ' cell_Removable';
                    break;
                case 4:
                	cell.className += ' cell_Grass';
                	break;
                case 5:
                	cell.className += ' cell_Tower';
                	break;
            }
            cellLine.appendChild(cell);	//将新的一格追加到该行中
        }
        table.appendChild(cellLine);	//将完整的一行追加到整个表格中
    }
    map.appendChild(table);	//将完整的表格追加到视图区
}

/*function updateMap(){
	var table=document.getElementById('playArea');
	if (!table) return false;
	for (i = 0; i < 100; i++) {
		for (j = 0; j < 100; j++) {
			table.childNodes[i].childNodes[j].className='cell';
			switch (g.ground[i][j]) {
                case 0:
                    table.childNodes[i].childNodes[j].className += ' cell_Blank';
                    break;
                case 1:
                    table.childNodes[i].childNodes[j].className += ' cell_Road';
                    break;
                case 2:
                    table.childNodes[i].childNodes[j].className += ' cell_River';
                    break;
                case 3:
                    table.childNodes[i].childNodes[j].className += ' cell_Removable';
                    break;
			}
		}	
	}
}*/

var hero={

	ID:1,
	pos_x:0,
	pos_y:0,
	state:0,	//当前状态
	move_path:null,	//缓存的移动路径，以二维数组形式存储，记录每一步的坐标
	//如move_path[0][0]表示第一步的横坐标，move_path[4][1]表示第五步的纵坐标
	
	setPosition:function(x,y)
	{
		this.pos_x=x;
		this.pos_y=y;
		set(this.pos_x,this.pos_y,this.ID)
	},
	move:function(x,y){           //英雄路径算法（非最短）,计算后将坐标值填入move_path数组
		if (g.ground[x][y] == 0 || (g.thing[x][y] != 0 && g.thing[x][y] != this.ID )) {   //目的无效
			return false;
		}
		//return;
		var ti=0;
		
		this.move_path=new Array();
		var pos_x = this.pos_x, pos_y = this.pos_y;
		//请注意：此函数中的pos_x、pos_y与hero类中的pos_x、pos_y不同
		
		while ((pos_x != x) ||(pos_y != y)) {
				if(ti==0){
					if(y<pos_y){                                  //ti：0左右（交替）1上下（交替）2左右（直线）3上下（直线）
						if(g.ground[pos_x][pos_y-1] != 0){
							this.move_path.push(new Array(pos_x,--pos_y));
							//mov_up(pos_x,pos_y);
							ti++;
						}
						else
						ti=2;
						
					}
					else if(y>pos_y){
						if(g.ground[pos_x][pos_y+1] != 0){
							this.move_path.push(new Array(pos_x,++pos_y));
							//mov_down(pos_x,pos_y);
							ti++;}
						else 
						ti=2;
						
						
					}
					else
						ti=1;
				}
				
				else if(ti==1){                                 
					if(x>pos_x){
						if(g.ground[pos_x+1][pos_y] != 0)
						{
							this.move_path.push(new Array(++pos_x,pos_y));
							//mov_right(pos_x,pos_y);
							ti=0;
						}
						else ti=3;
						
					}
					else if(x<pos_x){
						if(g.ground[pos_x-1][pos_y] != 0){
							this.move_path.push(new Array(--pos_x,pos_y));
							//mov_left(pos_x,pos_y);
							ti=0;
						}
						else 
						ti=3;
						
					}
					else
						ti=0;
				}
				else if(ti==2){                          //直线行走至上下无阻挡
					if (x<pos_x){
						if(y<pos_y){
							this.move_path.push(new Array(--pos_x,pos_y));
							//mov_left(pos_x,pos_y);
							if(g.ground[pos_x][pos_y-1]==0)
							ti=2;
							else 
							ti=1;
							
						}
						if(y>pos_y){
							this.move_path.push(new Array(--pos_x,pos_y));
							//mov_left(pos_x,pos_y);
							if(g.ground[pos_x][pos_y+1]==0)
							ti=2;
							else 
							ti=1;
							
						}
						
						
					}
					if (x>pos_x){                    
						if(y<pos_y){
							this.move_path.push(new Array(++pos_x,pos_y));
							//mov_right(pos_x,pos_y);
							if(g.ground[pos_x][pos_y-1]==0)
							ti=2;
							else 
							ti=1;
							
						}
						if(y>pos_y){
							this.move_path.push(new Array(++pos_x,pos_y));
							//mov_right(pos_x,pos_y);
							if(g.ground[pos_x][pos_y+1]==0)
							ti=2;
							else 
							ti=1;
							
						}
						
						
					}
					
				}
				else if(ti==3){
					if (y<pos_y){
						if(x<pos_x){
							this.move_path.push(new Array(pos_x,++pos_y));
							//mov_up(pos_x,pos_y);
							if(g.ground[pos_x-1][pos_y]==0)
							ti=3;
							else 
							ti=0;
							
						}
						if(x>pos_x){
							this.move_path.push(new Array(pos_x,++pos_y));
							//mov_up(pos_x,pos_y);
							if(g.ground[pos_x+1][pos_y]==0)
							ti=3;
							else 
							ti=0;
							
						}
						
						
					}
					if (y>pos_y){
						if(x<pos_x){
							this.move_path.push(new Array(pos_x,--pos_y));
							//mov_down(pos_x,pos_y);
							if(g.ground[pos_x-1][pos_y]==0)
							ti=3;
							else 
							ti=0;
							
						}
						if(x>pos_x){
							this.move_path.push(new Array(pos_x,--pos_y));
							//mov_down(pos_x,pos_y);
							if(g.ground[pos_x+1][pos_y]==0)
							ti=3;
							else 
							ti=0;
							
						}
						
						
					}
			}
			//alert(this.move_path[this.move_path.length-1][0]+","+this.move_path[this.move_path.length-1][1]);
		}
		this.move_path.push(new Array(x,y));	//最后一步为目标坐标
	},
	tryNextStep:function(){
		if (!this.move_path || this.move_path.length<1)	//移动完成
		{
			this.state=0;
		}
		else
		{
			var nextStep=this.move_path[0];		//取得下一步的坐标
			if (g.ground[nextStep[0]][nextStep[1]] != 0 && (g.thing[nextStep[0]][nextStep[1]] == 0 || g.thing[nextStep[0]][nextStep[1]] == this.ID )) {   //目的有效
					this.setPosition(nextStep[0],nextStep[1]);
					this.move_path.splice(0,1);					
			}
			else{	//重新计算移动路径
				nextStep=this.move_path[this.move_path.length-1];
				this.move(nextStep[0],nextStep[1]);
			} 
		}
	},
	moveTo:function(x,y){
		this.move(x,y);
		this.state=1;
	},
	doEvent:function()
	{
		document.getElementById('header').innerHTML='英雄当前位置：('+this.pos_x+','+this.pos_y+')；状态：='+this.state;			
		switch (this.state)
		{
			case 0:		//无动作
				return;
			case 1:		//移动状态
				this.tryNextStep();
				return;
		}
	},
}

var littles={
	ID:2,
	
	setPosition:function(x,y)
	{
		this.pos_x=x;
		this.pos_y=y;
		set(this.pos_x,this.pos_y,this.ID)
	},
	doEvent:function(){
	
	}
}

function doEvent()	//总的事件处理函数；具体处理过程交给相关对象的doEvent函数
{
	hero.doEvent();
	littles.doEvent();
	//XXX.doEvent();
}

function findSomethingByID(ID)	//通过ID获取具体的对象
{
	switch (ID){
		case 1:
			return hero;
		case 2:
			return littles;
		default:
			return;
	}
}

function init()	//初始化
{
	loadMap();
	hero.setPosition(2,298);
	hero.moveTo(399,1);
	littles.setPosition(299,1);
	setInterval(doEvent,50);	//每隔0.05秒调用1次，相当于定时器	
}

document.onReady=init();
