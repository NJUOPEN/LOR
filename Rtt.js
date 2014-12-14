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
    var a = 50, b = 70;
    /*
    for (var i = 0; b >= 0; i++) {
        for (var j = 200 - b; j <= 150 + b; j++)
            g.ground[j][i] = 4;
        b = b - 3;
    }
    */
    for (var i = 0; a >= 0; i++) {
        for (var j = 200 - a; j <= 150 + a; j++)
            g.ground[j][i] = 0;
        a=a-3;
    }
    //左三角
    a = 30, b = 45;
    /*
    for (var j = 0; b >= 0; j++) {
        for (var i = 170 - b; i <= 140 + b; i++)
            g.ground[j][i] = 4;
        b -= 1;
    }
    */
    for (var j = 0; a >= 0; j++) {
        for (var i = 170 - a; i <= 140 + a; i++)
            g.ground[j][i] = 0;
            a -= 1;
    }
    //下三角
    a = 80, b = 100;
    /*
    for (var i = ScreenHeight - 1; b >= 0; i--) {
        for (var j = 205 - b; j <= 145 + b; j++)
            g.ground[j][i] = 4;
        b -= 3;
    }
    */
    for(var i=ScreenHeight-1;a>=0;i--)
    {
        for (var j = 205 - a; j <= 145 + a; j++)
            g.ground[j][i] = 0;
        a -= 3;
    }
    //右三角
    a = 60, b = 85;
    /*
    for (var j = ScreenWidth - 1; b >= 0; j--) {
        for (var i = 170 - b; i <= 110 + b; i++)
            g.ground[j][i] = 4;
        b -= 1;
    }
    */
    for (var j = ScreenWidth - 1; a >= 0; j--) {
        for (var i = 170 - a; i <= 110 + a; i++)
            g.ground[j][i] = 0;
        a -= 1;
    }
    //基地左下
    var house_wide=20;
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
    
    //草丛
    	
	//上草丛（方）
    for(var i=150,j=70;i>=90,j<=130;i=i-15,j=j+15)
    {
		   for(var a=i;a<=i+20;a++)
		   {
			  for(var b=j;b<=j+20;b++)
			  {
				  g.ground[a][b]=4;
		      }   
		   }	
    }
	
	//下草从（方）
	
    for(var i=220,j=220;i<=280,j>=160;i=i+15,j=j-15)
    {
		for(var a=i;a<=i+20;a++)
		{
       	   for(var b=j;b<=j+20;b++)
		   {
		      g.ground[a][b]=4;
		   } 
		}
    }
	
	//上草丛（圆）
	
    b=312;
    for(a=150;a<=200;a=a+12)
    {   
    	b=b-12;
		for(var i=a-10;i<=a+10;i++)
		{
	   		for(var j=b-10;j<=b+10;j++)
	   		{
		   		if(((i-a)*(i-a)+(j-b)*(j-b))<=100)
		        {		
			        g.ground[i][j]=4;
			        g.ground[400-i][j]=4;
		    	}   
	        }	
	    } 
	}
	
	//下草丛(圆)
	
	b=-12;
    for(a=150;a<=200;a=a+12)
    {   
    	b=b+12;
		for(var i=a-10;i<=a+10;i++)
		{
	   		for(var j=b-10;j<=b+10;j++)
	   		{
		   		if(((i-a)*(i-a)+(j-b)*(j-b))<=100)
		        {		
				    g.ground[i][j]=4;
			        g.ground[400-i][j]=4;
		    	}   
	        }	
	    } 
	}
	
	//左草从
	
	b=88;
	for(a=0;a<=50;a=a+12)
	{  
 		b=b+12;
		for(var i=a-10;i<=a+10;i++)
		{
	   		for(var j=b-10;j<=b+10;j++)
	   		{
				if(((i-a)*(i-a)+(j-b)*(j-b))<=100)
		        {	
				    if(i>=0)
					{		
				    	g.ground[i][j]=4;
			        	g.ground[i][300-j]=4;
					}
				}
		    	  
	        }	
	    }
	}
	
	//右草从
	
    b=88;
	for(a=400;a>=350;a=a-12)
	{  
 		b=b+12;
		for(var i=a-10;i<=a+10;i++)
		{
	   		for(var j=b-10;j<=b+10;j++)
	   		{
				if(((i-a)*(i-a)+(j-b)*(j-b))<=100)
		        {	if(i<=400)	
					{
				    	g.ground[i][j]=4;
			        	g.ground[i][300-j]=4;
					}
				}
		    	  
	        }	
	    }
	}

	//我方塔的位置
	a=100;
	b=200;
	for(var i=a-20;i<=a+20;i++)
	{
	   for(var j=b-20;j<=b+20;j++)
	   {
		   if(((i-a)*(i-a)+(j-b)*(j-b))<=400)
		   {
			  g.ground[i][j]=5;
		   }   
	   }	
	}  
	//敌方塔的位置	
	a=300;
	b=100;
	for(var i=a-20;i<=a+20;i++)
	{
	   for(var j=b-20;j<=b+20;j++)
	   {
		   if(((i-a)*(i-a)+(j-b)*(j-b))<=400)
		   {
			  g.ground[i][j]=5;
		   }   
	   }	
	}
}

//一下为所有物体通用的移动函数
    //单位在thing上面移动
//放置单位
function set(i, j, ID) {
    i=i-1;
    j=j-1;
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
    showMap();	//为了方便调试，如果不需要显示地图可以将本句注释，从而加快加载速度
}

function showMap(){
	var map = document.getElementById('playground'); 	//获取视图区
    var table = document.createElement('table');	//新建一个表格，元素类型为table
    table.id = 'playArea';
    var cell, cellLine, cellClass;
    var i, j;
    for (j = 0; j < ScreenHeight; j++) {
        cellLine = document.createElement('tr');	//新建一行，元素类型为tr
        cellLine.className = 'cellLine';
        for (i = 0; i < ScreenWidth; i++) {
            cell = document.createElement('th');	//新建一格，元素类型为th
            cell.posX=i;
            cell.posY=j;
            switch (g.ground[i][j]) {
                case 0:
                    cellClass = ' cell_Blank';
                    break;
                case 1:
                    cellClass = ' cell_Road';
                    break;
                case 2:
                    cellClass = ' cell_River';
                    break;
                case 3:
                    cellClass = ' cell_Removable';
                    break;
                case 4:
                	cellClass = ' cell_Grass';
                	break;
                case 5:
                	cellClass = ' cell_Tower';
                	break;
                default:
                	cellClass = '';
            }
            cell.className = 'cell' + cellClass ;	//格子的样式为基础样式（cell）+扩展样式（cell_XXX）
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
	tag_x:0,
	tag_y:0,  //目的地
	ti:0,	//上一次尝试的前进方向
	state: 0,	//当前状态
	hp: 0,//生命值
	hp_max:0,//生命值的最大值
	hp_re:0,//生命值的回复速度，每50ms的数值
	att: 0,//攻击力
	def:0,//防御力
    harm_in:0,//收到的伤害数值
    skill: new Array(),//技能数组,具体参考技能设定.txt
    //自动回血的函数
    basehp_re:function(){
        this.hp += this.hp_re;
    },

    //试试一个攻击间隔
    attack:function(ID){
        var time=1;
        if(time%5==1)
            findSomethingByID(ID).harm_in=this.att-findSomethingByID(ID).def;
        time++;
    },

    baseskill:function(ID){
        switch (ID) {
            case 1: baseskill_1(); break;
            case 2: baseskill_2(); break;
        };
    },

    baseskill_1: function () {
        var old_hp = this.hp;
        var time = 1;
        if (time % 140 == 1) this.hp_re = this.hp_re + this.hp_max * 0.01*0.05;//此处包含秒和基准刷新速度50ms的换算
    },
    //技能数组：1持续时间 2冷却时间（CD） 3作用范围 
    //4对移速的效果（有正负，百分数,改变而不是改变到） 
    //5对攻击力的效果（百分数） 6对攻击力的效果（数值） 7受到伤害（变到（百分比））  
    //8,造成伤害（数值） 
	creatskill:function(){
	    this.skill[1] = new array(5, 10, 0, 0.3, 0, 0, 0);
	    this.skill[2] = new array(7, 12, 0, 0, 0, 0, 0.7, 0);
	    this.skill[3] = new array(5, 15, 5, 0, 0, 0, 0, this.att * 1.15);
	    this.skill[4] = new array(0,30,5,0,0,0,0,500);
	},
	
	setPosition:function(x,y)
	{
		this.pos_x=x;
		this.pos_y=y;
		set(this.pos_x,this.pos_y,this.ID)
	},
	/*tryNextStep:function(){
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
	},*/
	doEvent:function()
	{
		var x=this.tag_x,y=this.tag_y;
		document.getElementById('header').innerHTML='英雄当前位置：('+this.pos_x+','+this.pos_y+')；状态：='+this.state;		
		move(x, y, this.ID);
		this.basehp_re();
		/*switch (this.state)
		{
			case 0:		//无动作
				return;
			case 1:		//移动状态
				this.tryNextStep();
				return;
		}*/
	},
}

var littles={
	littles1:{
		ID:2,
		pos_x:0,
	  pos_y:0,
	  tag_x:0,
	  tag_y:0,
	  
	  setPosition:function(x,y){
		  this.pos_x=x;
		  this.pos_y=y;
		  set(this.pos_x,this.pos_y,this.ID)
	  },
	  doEvent:function(){
		  var x=this.tag_x,y=this.tag_y;
	    move(x,y,this.ID);
	  }
  },
	littles2:{
		ID:3,
		pos_x:0,
	  pos_y:0,
	  tag_x:0,
	  tag_y:0,
	  
		setPosition:function(x,y){
		  this.pos_x=x;
		  this.pos_y=y;
		  set(this.pos_x,this.pos_y,this.ID)
	  },
	  doEvent:function(){
		  var x=this.tag_x,y=this.tag_y;
	    move(x,y,this.ID);
	  }
  },
	littles3:{
		ID:4,
		pos_x:0,
	  pos_y:0,
	  tag_x:0,
	  tag_y:0,
	  
		setPosition:function(x,y){
		  this.pos_x=x;
		  this.pos_y=y;
		  set(this.pos_x,this.pos_y,this.ID)
	  },
	  doEvent:function(){
		  var x=this.tag_x,y=this.tag_y;
	    move(x,y,this.ID);
	  }
	},
	littles4:{
		ID:5,
		pos_x:0,
	  pos_y:0,
	  tag_x:0,
	  tag_y:0,
	  
		setPosition:function(x,y){
		  this.pos_x=x;
		  this.pos_y=y;
		  set(this.pos_x,this.pos_y,this.ID)
	  },
	  doEvent:function(){
		  var x=this.tag_x,y=this.tag_y;
	    move(x,y,this.ID);
	  }
	},
	littles5:{
		ID:6,
		pos_x:0,
	  pos_y:0,
	  tag_x:0,
	  tag_y:0,
	  
		setPosition:function(x,y){
		  this.pos_x=x;
		  this.pos_y=y;
		  set(this.pos_x,this.pos_y,this.ID)
	  },
	  doEvent:function(){
		  var x=this.tag_x,y=this.tag_y;
	    move(x,y,this.ID);
	  }
	},
	


}



function move(x,y,id){       //重置移动函数，x，y为目的地，ID为移动对象ID
	if (g.ground[x][y] == 0 || (g.thing[x][y] != 0 && g.thing[x][y] != findSomethingByID(id).ID )) {   //目的无效
			return false;
		}
		//return;
		var obj=findSomethingByID(id);
		if (!obj) return;
		
		var pos_x = obj.pos_x, pos_y = obj.pos_y, ti=obj.ti;
		
		if ((pos_x != x) ||(pos_y != y)) {
				if(ti==0){
					if(y<pos_y){                                  //ti：0左右（交替）1上下（交替）2左右（直线）3上下（直线）
						if(g.ground[pos_x][pos_y-1] != 0){
							mov_up(pos_x,pos_y--);	//同步更新pos_x、pos_y，便于移动后将新坐标赋给obj；下同
							ti++;
						}
						else
						ti=2;
						
					}
					else if(y>pos_y){
						if(g.ground[pos_x][pos_y+1] != 0){
							mov_down(pos_x,pos_y++);
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
							mov_right(pos_x++,pos_y);
							ti=0;
						}
						else ti=3;
						
					}
					else if(x<pos_x){
						if(g.ground[pos_x-1][pos_y] != 0){
							mov_left(pos_x--,pos_y);
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
							mov_left(pos_x--,pos_y);
							if(g.ground[pos_x][pos_y-1]==0)
							ti=2;
							else 
							ti=1;
							
						}
						if(y>pos_y){
							mov_left(pos_x--,pos_y);
							if(g.ground[pos_x][pos_y+1]==0)
							ti=2;
							else 
							ti=1;
							
						}
						
						
					}
					if (x>pos_x){                    
						if(y<pos_y){
							mov_right(pos_x++,pos_y);
							if(g.ground[pos_x][pos_y-1]==0)
							ti=2;
							else 
							ti=1;
							
						}
						if(y>pos_y){
							mov_right(pos_x++,pos_y);
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
							mov_up(pos_x,pos_y--);
							if(g.ground[pos_x-1][pos_y]==0)
							ti=3;
							else 
							ti=0;
							
						}
						if(x>pos_x){
							mov_up(pos_x,pos_y--);
							if(g.ground[pos_x+1][pos_y]==0)
							ti=3;
							else 
							ti=0;
							
						}
						
						
					}
					if (y>pos_y){
						if(x<pos_x){
							mov_down(pos_x,pos_y++);
							if(g.ground[pos_x-1][pos_y]==0)
							ti=3;
							else 
							ti=0;
							
						}
						if(x>pos_x){
							mov_down(pos_x,pos_y++);
							if(g.ground[pos_x+1][pos_y]==0)
							ti=3;
							else 
							ti=0;
							
						}
						
						
					}
			}
			findSomethingByID(id).state=1;
		}
		else findSomethingByID(id).state=0;
		obj.pos_x=pos_x;
		obj.pos_y=pos_y;
		obj.ti=ti;
}

function moveTo(x,y,obj)
{
		//此处只设定人物状态，目标的有效性交给move函数判断
		obj.tag_x=x;
		obj.tag_y=y;
		obj.state=1;
}

function doEvent()	//总的事件处理函数；具体处理过程交给相关对象的doEvent函数
{
	hero.doEvent();
	littles.littles1.doEvent();
	littles.littles2.doEvent();
	littles.littles3.doEvent();
	littles.littles4.doEvent();
	littles.littles5.doEvent();
	//XXX.doEvent();
}

function findSomethingByID(ID)	//通过ID获取具体的对象
{
	switch (ID){
		case 1:
			return hero;
		case 2:
			return littles.littles1;
	  case 3:
			return littles.littles2;
	  case 4:
			return littles.littles3;
	  case 5:
			return littles.littles4;
	  case 6:
			return littles.littles5;									
		default:
			return;
	}
}
function SetTarget(x,y,obj){	
	obj.tag_x=x;
	obj.tag_y=y;
}

function init()	//初始化
{
	loadMap();
	hero.setPosition(2,298);
	moveTo(100,10,hero);
	setInterval(doEvent,50);	//每隔0.05秒调用1次，相当于定时器	
	setTimeout(littles.littles1.setPosition(2,298),1000);
	SetTarget(2,280,littles.littles1);
	setTimeout(littles.littles2.setPosition(2,298),2000);
	SetTarget(5,285,littles.littles2);
	setTimeout(littles.littles3.setPosition(2,298),3000);
	SetTarget(8,290,littles.littles3);
	setTimeout(littles.littles4.setPosition(2,298),4000);
	SetTarget(10,295,littles.littles4);
	setTimeout(littles.littles5.setPosition(2,298),5000);
	SetTarget(12,298,littles.littles5);
}

document.onReady=init();
