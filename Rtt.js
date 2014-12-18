var ScreenWidth=300, ScreenHeight=200;	//定义屏幕的格子数，每个格子为2×2像素，则像素数为600×400
var g={ground:0,thing:0};
//var groundX,groundY;//绘图区在整个页面的绝对坐标
var inited=false;	//表示是否已经初始化
//全局变量：地图数组
//其中ground代表地面；thing代表站在该处的物体 1—5为己方英雄6—10为对方英雄11—15为小兵21和22是防御塔
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
        for (var j = 0; j < ScreenHeight; j++){
            g.ground[i][j] = 1;
            g.thing[i][j] = 0;
        }
    }

    //TODO：在新的屏幕尺寸上绘制新的地图
	//缩小版新地图
	           //新地图
    //上三角
    	for(var j=0;j<33;j++)
    	{
	    for(var i=117+j;i<183-j;i++)
	    {
		   g.ground[i][j]=0;
	    }
	}
    //左三角
	for(var i=0;i<37.5;i++)
	{
	    for(var j=62.5+i;j<=137.5-i;j++)
		{
		    g.ground[i][j]=0;
	    }	
    	}

    //下三角
	for(var j=167;j<200;j++)
    	{
	    for(var i=317-j;i<j-17;i++)
	    {
		   g.ground[i][j]=0;
	    }
	}
	
    //右三角


    	for(var i=267;i<300;i++)
	{
	    for(var j=367-i;j<=i-167;j++)
		{
		    g.ground[i][j]=0;
	    }	
    	}

    
    //基地左下
    	var house_wide=10;
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
    	for(var i=100,j=50;i>=60,j<=85;i=i-8,j=j+6)
    	{
		   for(var a=i;a<=i+10;a++)
		   {
			  for(var b=j;b<=j+8;b++)
			  {
				  g.ground[a][b]=4;
		      }   
		   }	
    	}
	
	//下草从（方）
	
    for(var i=200,j=150;i<=240,j>=115;i=i+8,j=j-6)
    {
		for(var a=i;a<=i+10;a++)
		{
       	   for(var b=j;b<=j+8;b++)
		   {
		      g.ground[a][b]=4;
		   } 
		}
    }
	
	//下草丛（圆）
	
    b=206;
    for(a=112;a<=150;a=a+9)
    {   
    	b=b-9;
		for(var i=a-8;i<=a+8;i++)
		{
	   		for(var j=b-8;j<=b+8;j++)
	   		{
 		   		if(((i-a)*(i-a)+(j-b)*(j-b))<=68)
		        {		
			        g.ground[i][j]=4;
			        g.ground[300-i][j]=4;
		    	}  
	        }	
	    } 
	}
	
  //上草丛(圆)
	
	b=-6;
    for(a=112;a<=150;a=a+9)
    {   
    	b=b+9;
		for(var i=a-8;i<=a+8;i++)
		{
	   		for(var j=b-8;j<=b+8;j++)
	   		{
		   		if(((i-a)*(i-a)+(j-b)*(j-b))<=68)
		        {		
				    g.ground[i][j]=4;
			        g.ground[300-i][j]=4;
		    	}   
	        }	
	    } 
	}
	
	//左草从
	
	b=59;
	for(a=0;a<=38;a=a+9)
	{  
 		b=b+8;
		for(var i=a-7;i<=a+7;i++)
		{
	   		for(var j=b-7;j<=b+7;j++)
	   		{
				if(((i-a)*(i-a)+(j-b)*(j-b))<=53)
		        {	
				    if(i>=0)
					{		
				    	g.ground[i][j]=4;
			        	g.ground[i][200-j]=4;
					}
				}
		    	  
	        }	
	    }
	}
	
	//右草从


    b=59;
	for(a=300;a>=263;a=a-9)
	{  
 		b=b+8;
		for(var i=a-7;i<=a+7;i++)
		{
	   		for(var j=b-7;j<=b+7;j++)
	   		{
				if(((i-a)*(i-a)+(j-b)*(j-b))<=53)
		        {	if(i<=300)	
					{
				    	g.ground[i][j]=4;
			        	g.ground[i][200-j]=4;
					}
				}
		    	  
	        }	
	    }
	}
	

	//我方塔的位置
	a=100;
	b=134;
	for(var i=a-12;i<=a+12;i++)
	{
	   for(var j=b-12;j<=b+12;j++)
	   {
		   if(((i-a)*(i-a)+(j-b)*(j-b))<=149)
		   {
		       g.ground[i][j] = 5;
		       g.thing[i][j] = 21;
		   }   
	   }	
	}  
	//敌方塔的位置

		
	a=200;
	b=66;
	for(var i=a-12;i<=a+12;i++)
	{
	   for(var j=b-12;j<=b+12;j++)
	   {
		   if(((i-a)*(i-a)+(j-b)*(j-b))<=149)
		   {
		       g.ground[i][j] = 5;
		       g.thing[i][j] = 22;
		   }   
	   }	
	}
	
}

//以下为所有物体通用的移动函数
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
    //setImage(i,j,ID,1);
    
}
//撤销一个单位
function del(i, j) {
    i=i-1;
    j=j-1;
    var a = i+3, b = j+3;
    for (; i < a; i++) {
        for (; j < b; j++)
            g.thing[i][j] = 0;
    }
    //setImage(i,j,0);
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
    
    //载入背景图片
	var bgImage=document.createElement('img');
    bgImage.id='bgImage';
    bgImage.src='./image/background.gif';
    bgImage.style.top=map.offsetTop;
	bgImage.style.left=map.offsetLeft;
	table.appendChild(bgImage);
	
	//载入网格
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
            //cell.className = 'cell' + cellClass ;	//格子的样式为基础样式（cell）+扩展样式（cell_XXX）
            cellLine.appendChild(cell);	//将新的一格追加到该行中
        }
        table.appendChild(cellLine);	//将完整的一行追加到整个表格中
    }
    map.appendChild(table);	//将完整的表格追加到视图区
    //groundX=table.offsetLeft;
    //groundY=table.offsetTop;
}


//创建技能区
function showSkillArea(obj){
	var skill=document.createElement('div');
	skill.id='skillArea';
	//skill.innerHTML='技能区';
	for (var i=1;i<=4;i++)
	{
		var skillCell=document.createElement('div');
		skillCell.className='skillButton';
		skillCell.skillNum=i;
		skillCell.id="skillCell_"+i;
		//skillCell.innerHTML='技能'+i;
		var image=document.createElement('img');
		image.className='skillButtonImage';
		image.src='./image/skill1-'+i+'.png';
		skillCell.appendChild(image);
		skill.appendChild(skillCell);
	}
	obj.appendChild(skill);
}

// 创建状态栏
function showStateArea(obj){
	var state=document.createElement('div');
	state.id='stateArea';
	state.innerHTML='HP:0';
	obj.appendChild(state);
}

// 创建切换按钮
function showSwitchButton(obj){
	var button1=document.createElement('div');
	button1.id='switchButton1';
	var img=document.createElement('img');
	img.src='./image/control1.png';
	button1.appendChild(img);
	obj.appendChild(button1);
}

//创建控制区
function showControlLayer(){
	var map=document.getElementById('playground');
	//area=document.createElement('div');
	//area.id='controlArea';
	showSkillArea(map);
	showStateArea(map);
	showSwitchButton(map);
	//map.insertBefore(area,document.getElementById('playArea'));	
	//map.appendChild(area);
}

var time=0;

var hero={              //1至9为英雄（可能）
	inited:false,		//对象是否已经初始化
	ID:1,
	pos_x:0,
	pos_y:0,
	tag_x:0,
	tag_y:0,  //目的地
	ti:0,	//上一次尝试的前进方向
	state: 0,	//当前状态
	image_state:0,	//显示状态，与image的编号对应
	image: null,
	hp: 0,//生命值
	hp_max:0,//生命值的最大值
	hp_re:0,//生命值的回复速度，每50ms的数值
	att: 0,//攻击力
	def:0,//防御力
    harm_in:0,//收到的伤害数值
    skill: new Array(),//技能数组,具体参考技能设定.txt
    skill_current:0,//当前释放的技能ID
    skill_lasting_time:0,//该技能已经维持的时间；
    attack_range:4,
    //自动攻击距离为attack_range以内的对方英雄或小兵或防御塔
    attack_range:function(){
        for(var i=this.pos_x-this.attack_range;i<=this.pos_x+this.attack_range;i++)
            for (var j = this.pos_y - this.attack_range; j <= this.pos_y + this.attack_range; j++) {
                if ((i - this.pos_x) * (i - this.pos_x) + (j - this.pos_y) * (j - this.pos_y) <= this.attack_range) {
                    if (g.thing[i][j] >= 6 && g.thing[i][j] <= 10 || g.thing[i][j] >= 16 && g.thing[i][j] != 21) this.attack(g.thing[i][j]);
                }
            }
    },
    //自动回血的函数
    basehp_re: function () {
        this.hp += this.hp_re;
    },

    //攻击
    attack:function(ID){
        if(ID!=0)
            findSomethingByID(ID).harm_in=this.att-findSomethingByID(ID).def;
    },
    //被动基本技能
    baseskill:function(){
        //switch (ID) {
           // case 1: baseskill_1(); break;
        //case 2: baseskill_2(); break;
        this.baseskill_1();
        //this.baseskill_2();
    },

    baseskill_1: function () {
    	this.skill_current=1;
    	this.image_state=2;
        var old_hp = this.hp;
        //var time = 1;
        //if (time % 140 == 1) this.hp_re = this.hp_re + this.hp_max * 0.01*0.05;//此处包含秒和基准刷新速度50ms的换算
        //没想好
    },
    //技能数组：1持续时间 2冷却时间（CD） 3作用范围 
    //4对移速的效果（有正负，百分数,改变而不是改变到） 
    //5对攻击力的效果（百分数） 6对攻击力的效果（数值） 7受到伤害（变到（百分比））  
    //8,造成伤害（数值） 
	createskill:function(){
	    this.skill[1] = new Array(5, 10, 0, 0.3, 0, 0, 0);
	    this.skill[2] = new Array(7, 12, 0, 0, 0, 0, 0.7, 0);
	    this.skill[3] = new Array(5, 15, 5, 0, 0, 0, 0, this.att * 1.15);
	    this.skill[4] = new Array(0,30,5,0,0,0,0,500);
	},
    //处理输入的伤害值
	deal_harm:function(){
	    if (this.harm_in >= this.hp) this.hp = 0;
	    else this.hp -= this.harm_in;
	},

    //血量观察函数
	def_hp:function(){
	    if (this.hp == 0) del(this.pos_x, this.pos_y);
	},

	setPosition:function(x,y)
	{
		if (!this.inited) this.init();
		this.pos_x=x;
		this.pos_y=y;
		set(this.pos_x,this.pos_y,this.ID);
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
		this.basehp_re();
		//this.baseskill();
		switch (this.state)
		{
			case 0:		//无动作
				return;
			case 1:		//移动状态
				move(x, y, this.ID);
		}
		if (this.skill_current>0)
		{
			this.skill_lasting_time++;
			if (this.skill_lasting_time > this.skill[this.skill_current][0])
			{
				this.skill_current=0;
				this.skill_lasting_time=0;
				this.image_state=0;				
			}
		}
		this.deal_harm();
		this.def_hp();
		this.attack_range();
	},
	init:function(){	//初始化工作
		this.createskill();
		this.inited=true;
	}
}

var littles={              //11至15为小兵
	littles11:{
		ID:11,
		pos_x:0,
	  pos_y:0,
	  tag_x:0,
	  tag_y: 0,
	  ti:0,	//上一次尝试的前进方向
	  state: 0,	//当前状态
	  image_state:0,
	  hp: 0,//生命值
	  hp_max: 0,//生命值的最大值
	  hp_re: 0,//生命值的回复速度，每50ms的数值
	  att: 0,//攻击力
	  def: 0,//防御力
	  harm_in: 0,//收到的伤害数值
	  attack_range: 4,
	    //自动攻击距离为attack_range以内的对方英雄或小兵或防御塔
	  attack_range: function () {
	      for (var i = this.pos_x - this.attack_range; i <= this.pos_x + this.attack_range; i++)
	          for (var j = this.pos_y - this.attack_range; j <= this.pos_y + this.attack_range; j++) {
	              if ((i - this.pos_x) * (i - this.pos_x) + (j - this.pos_y) * (j - this.pos_y) <= this.attack_range) {
	                  if (g.thing[i][j] >= 6 && g.thing[i][j] <= 10 || g.thing[i][j] >= 16 && g.thing[i][j] != 21) this.attack(g.thing[i][j]);
	              }
	          }
	  },
	    //处理输入的伤害值
	  deal_harm: function () {
	      if (this.harm_in >= this.hp) this.hp = 0;
	      else this.hp -= this.harm_in;
	  },

	    //血量观察函数
	  def_hp: function () {
	      if (this.hp == 0) del(this.pos_x, this.pos_y);
	  },
	    //自动回血的函数
	  basehp_re: function () {
	      this.hp += this.hp_re;
	  },

	    //攻击
	  attack: function (ID) {
	      if (ID != 0)
	          findSomethingByID(ID).harm_in = this.att - findSomethingByID(ID).def;
	  },
	  
	  setPosition:function(x,y){
		  this.pos_x=x;
		  this.pos_y=y;
		  set(this.pos_x,this.pos_y,this.ID)
	  },
	  doEvent:function(){
		  var x=this.tag_x,y=this.tag_y;
		  if (Math.random()<0.8) move(x, y, this.ID);
		  this.basehp_re();
		  this.deal_harm();
		  this.def_hp();
		  this.attack_range();
	  }
  },
	littles12:{
		ID:12,
		pos_x:0,
	  pos_y:0,
	  tag_x:0,
	  tag_y: 0,
	  ti:0,	//上一次尝试的前进方向
	  state: 0,	//当前状态
	  image_state:0,
	  hp: 0,//生命值
	  hp_max: 0,//生命值的最大值
	  hp_re: 0,//生命值的回复速度，每50ms的数值
	  att: 0,//攻击力
	  def: 0,//防御力
	  harm_in: 0,//收到的伤害数值
	  attack_range: 4,
	    //自动攻击距离为attack_range以内的对方英雄或小兵或防御塔
	  attack_range: function () {
	      for (var i = this.pos_x - this.attack_range; i <= this.pos_x + this.attack_range; i++)
	          for (var j = this.pos_y - this.attack_range; j <= this.pos_y + this.attack_range; j++) {
	              if ((i - this.pos_x) * (i - this.pos_x) + (j - this.pos_y) * (j - this.pos_y) <= this.attack_range) {
	                  if (g.thing[i][j] >= 6 && g.thing[i][j] <= 10 || g.thing[i][j] >= 16 && g.thing[i][j] != 21) this.attack(g.thing[i][j]);
	              }
	          }
	  },
	    //处理输入的伤害值
	  deal_harm: function () {
	      if (this.harm_in >= this.hp) this.hp = 0;
	      else this.hp -= this.harm_in;
	  },

	    //血量观察函数
	  def_hp: function () {
	      if (this.hp == 0) del(this.pos_x, this.pos_y);
	  },
	    //自动回血的函数
	  basehp_re: function () {
	      this.hp += this.hp_re;
	  },
	    //攻击
	  attack: function (ID) {
	      if (ID != 0)
	          findSomethingByID(ID).harm_in = this.att - findSomethingByID(ID).def;
	  },
	  
		setPosition:function(x,y){
		  this.pos_x=x;
		  this.pos_y=y;
		  set(this.pos_x,this.pos_y,this.ID)
	  },
	  doEvent:function(){
		  var x=this.tag_x,y=this.tag_y;
		  if (Math.random()<0.8) move(x, y, this.ID);
		  this.basehp_re();
		  this.deal_harm();
		  this.def_hp();
		  this.attack_range();
	  }
  },
	littles13:{
		ID:13,
		pos_x:0,
	  pos_y:0,
	  tag_x:0,
	  tag_y: 0,
	  ti:0,	//上一次尝试的前进方向
	  state: 0,	//当前状态
	  image_state:0,
	  hp: 0,//生命值
	  hp_max: 0,//生命值的最大值
	  hp_re: 0,//生命值的回复速度，每50ms的数值
	  att: 0,//攻击力
	  def: 0,//防御力
	  harm_in: 0,//收到的伤害数值
	  attack_range: 4,
	    //自动攻击距离为attack_range以内的对方英雄或小兵或防御塔
	  attack_range: function () {
	      for (var i = this.pos_x - this.attack_range; i <= this.pos_x + this.attack_range; i++)
	          for (var j = this.pos_y - this.attack_range; j <= this.pos_y + this.attack_range; j++) {
	              if ((i - this.pos_x) * (i - this.pos_x) + (j - this.pos_y) * (j - this.pos_y) <= this.attack_range) {
	                  if (g.thing[i][j] >= 6 && g.thing[i][j] <= 10 || g.thing[i][j] >= 16 && g.thing[i][j] != 21) this.attack(g.thing[i][j]);
	              }
	          }
	  },
	    //处理输入的伤害值
	  deal_harm: function () {
	      if (this.harm_in >= this.hp) this.hp = 0;
	      else this.hp -= this.harm_in;
	  },

	    //血量观察函数
	  def_hp: function () {
	      if (this.hp == 0) del(this.pos_x, this.pos_y);
	  },
	    //自动回血的函数
	  basehp_re: function () {
	      this.hp += this.hp_re;
	  },
	    //攻击
	  attack: function (ID) {
	      if (ID != 0)
	          findSomethingByID(ID).harm_in = this.att - findSomethingByID(ID).def;
	  },
	  
		setPosition:function(x,y){
		  this.pos_x=x;
		  this.pos_y=y;
		  set(this.pos_x,this.pos_y,this.ID)
	  },
	  doEvent:function(){
		  var x=this.tag_x,y=this.tag_y;
		  if (Math.random()<0.8) move(x, y, this.ID);
		  this.basehp_re();
		  this.deal_harm();
		  this.def_hp();
		  this.attack_range();
	  }
	},
	littles14:{
		ID:14,
		pos_x:0,
	  pos_y:0,
	  tag_x:0,
	  tag_y: 0,
	  ti:0,	//上一次尝试的前进方向
	  state: 0,	//当前状态
	  image_state:0,
	  hp: 0,//生命值
	  hp_max: 0,//生命值的最大值
	  hp_re: 0,//生命值的回复速度，每50ms的数值
	  att: 0,//攻击力
	  def: 0,//防御力
	  harm_in: 0,//收到的伤害数值
	  attack_range: 4,
	    //自动攻击距离为attack_range以内的对方英雄或小兵或防御塔
	  attack_range: function () {
	      for (var i = this.pos_x - this.attack_range; i <= this.pos_x + this.attack_range; i++)
	          for (var j = this.pos_y - this.attack_range; j <= this.pos_y + this.attack_range; j++) {
	              if ((i - this.pos_x) * (i - this.pos_x) + (j - this.pos_y) * (j - this.pos_y) <= this.attack_range) {
	                  if (g.thing[i][j] >= 6 && g.thing[i][j] <= 10 || g.thing[i][j] >= 16 && g.thing[i][j] != 21) this.attack(g.thing[i][j]);
	              }
	          }
	  },
	    //处理输入的伤害值
	  deal_harm: function () {
	      if (this.harm_in >= this.hp) this.hp = 0;
	      else this.hp -= this.harm_in;
	  },

	    //血量观察函数
	  def_hp: function () {
	      if (this.hp == 0) del(this.pos_x, this.pos_y);
	  },
	    //自动回血的函数
	  basehp_re: function () {
	      this.hp += this.hp_re;
	  },
	    //攻击
	  attack: function (ID) {
	      if (ID != 0)
	          findSomethingByID(ID).harm_in = this.att - findSomethingByID(ID).def;
	  },
	  
		setPosition:function(x,y){
		  this.pos_x=x;
		  this.pos_y=y;
		  set(this.pos_x,this.pos_y,this.ID)
	  },
	  doEvent:function(){
		  var x=this.tag_x,y=this.tag_y;
		  if (Math.random()<0.8) move(x, y, this.ID);
		  this.basehp_re();
		  this.deal_harm();
		  this.def_hp();
		  this.attack_range();
	  }
	},
	littles15:{
		ID:15,
		pos_x:0,
	  pos_y:0,
	  tag_x:0,
	  tag_y: 0,
	  ti:0,	//上一次尝试的前进方向
	  state: 0,	//当前状态
	  image_state:0,
	  hp: 0,//生命值
	  hp_max: 0,//生命值的最大值
	  hp_re: 0,//生命值的回复速度，每50ms的数值
	  att: 0,//攻击力
	  def: 0,//防御力
	  harm_in: 0,//收到的伤害数值
	  attack_range: 4,
	    //自动攻击距离为attack_range以内的对方英雄或小兵或防御塔
	  attack_range: function () {
	      for (var i = this.pos_x - this.attack_range; i <= this.pos_x + this.attack_range; i++)
	          for (var j = this.pos_y - this.attack_range; j <= this.pos_y + this.attack_range; j++) {
	              if ((i - this.pos_x) * (i - this.pos_x) + (j - this.pos_y) * (j - this.pos_y) <= this.attack_range) {
	                  if (g.thing[i][j] >= 6 && g.thing[i][j] <= 10 || g.thing[i][j] >= 16&&g.thing[i][j]!=21) this.attack(g.thing[i][j]);
	              }
	          }
	  },
	    //处理输入的伤害值
	  deal_harm: function () {
	      if (this.harm_in >= this.hp) this.hp = 0;
	      else this.hp -= this.harm_in;
	  },

	    //血量观察函数
	  def_hp: function () {
	      if (this.hp == 0) del(this.pos_x, this.pos_y);
	  },
	    //自动回血的函数
	  basehp_re: function () {
	      this.hp += this.hp_re;
	  },
	    //攻击
	  attack: function (ID) {
	      if (ID != 0)
	          findSomethingByID(ID).harm_in = this.att - findSomethingByID(ID).def;
	  },
	  
		setPosition:function(x,y){
		  this.pos_x=x;
		  this.pos_y=y;
		  set(this.pos_x,this.pos_y,this.ID)
	  },
	  doEvent:function(){
		  var x=this.tag_x,y=this.tag_y;
		  if (Math.random()<0.8) move(x, y, this.ID);
		  this.basehp_re();
		  this.deal_harm();
		  this.def_hp();
		  this.attack_range();
	  }
	},

littles16:{
        ID:16,
        pos_x:0,
        pos_y:0,
        tag_x:0,
        tag_y: 0,
        hp: 0,//生命值
        hp_max: 0,//生命值的最大值
        hp_re: 0,//生命值的回复速度，每50ms的数值
        att: 0,//攻击力
        def: 0,//防御力
        harm_in: 0,//收到的伤害数值
        attack_range: 4,
    //自动攻击距离为attack_range以内的对方英雄或小兵或防御塔
        attack_range: function () {
            for (var i = this.pos_x - this.attack_range; i <= this.pos_x + this.attack_range; i++)
                for (var j = this.pos_y - this.attack_range; j <= this.pos_y + this.attack_range; j++) {
                    if ((i - this.pos_x) * (i - this.pos_x) + (j - this.pos_y) * (j - this.pos_y) <= this.attack_range) {
                        if (g.thing[i][j] <= 5 && g.thing[i][j] > 0 || g.thing[i][j] >= 11 && g.thing[i][j] <= 15 || g.thing[i][j] == 21) this.attack(g.thing[i][j]);
                    }
                }
        },
    //处理输入的伤害值
        deal_harm: function () {
            if (this.harm_in >= this.hp) this.hp = 0;
            else this.hp -= this.harm_in;
        },

    //血量观察函数
        def_hp: function () {
            if (this.hp == 0) del(this.pos_x, this.pos_y);
        },
    //自动回血的函数
        basehp_re: function () {
            this.hp += this.hp_re;
        },
    //攻击
        attack: function (ID) {
            if (ID != 0)
                findSomethingByID(ID).harm_in = this.att - findSomethingByID(ID).def;
        },
	  
        setPosition:function(x,y){
            this.pos_x=x;
            this.pos_y=y;
            set(this.pos_x,this.pos_y,this.ID)
        },
        doEvent:function(){
            var x=this.tag_x,y=this.tag_y;
            move(x, y, this.ID);
            this.basehp_re();
            this.deal_harm();
            this.def_hp();
            this.attack_range();
        }
},
littles17: {
    ID: 17,
    pos_x: 0,
    pos_y: 0,
    tag_x: 0,
    tag_y: 0,
    hp: 0,//生命值
    hp_max: 0,//生命值的最大值
    hp_re: 0,//生命值的回复速度，每50ms的数值
    att: 0,//攻击力
    def: 0,//防御力
    harm_in: 0,//收到的伤害数值
    attack_range: 4,
    //自动攻击距离为attack_range以内的对方英雄或小兵或防御塔
    attack_range: function () {
        for (var i = this.pos_x - this.attack_range; i <= this.pos_x + this.attack_range; i++)
            for (var j = this.pos_y - this.attack_range; j <= this.pos_y + this.attack_range; j++) {
                if ((i - this.pos_x) * (i - this.pos_x) + (j - this.pos_y) * (j - this.pos_y) <= this.attack_range) {
                    if (g.thing[i][j] <= 5 && g.thing[i][j] > 0 || g.thing[i][j] >= 11 && g.thing[i][j] <= 15|| g.thing[i][j] == 21) this.attack(g.thing[i][j]);
                }
            }
    },
    //处理输入的伤害值
    deal_harm: function () {
        if (this.harm_in >= this.hp) this.hp = 0;
        else this.hp -= this.harm_in;
    },

    //血量观察函数
    def_hp: function () {
        if (this.hp == 0) del(this.pos_x, this.pos_y);
    },
    //自动回血的函数
    basehp_re: function () {
        this.hp += this.hp_re;
    },
    //攻击
    attack: function (ID) {
        if (ID != 0)
            findSomethingByID(ID).harm_in = this.att - findSomethingByID(ID).def;
    },

    setPosition: function (x, y) {
        this.pos_x = x;
        this.pos_y = y;
        set(this.pos_x, this.pos_y, this.ID)
    },
    doEvent: function () {
        var x = this.tag_x, y = this.tag_y;
        move(x, y, this.ID);
        this.basehp_re();
        this.deal_harm();
        this.def_hp();
        this.attack_range();
    }
},
littles18: {
    ID: 18,
    pos_x: 0,
    pos_y: 0,
    tag_x: 0,
    tag_y: 0,
    hp: 0,//生命值
    hp_max: 0,//生命值的最大值
    hp_re: 0,//生命值的回复速度，每50ms的数值
    att: 0,//攻击力
    def: 0,//防御力
    harm_in: 0,//收到的伤害数值
    attack_range: 4,
    //自动攻击距离为attack_range以内的对方英雄或小兵或防御塔
    attack_range: function () {
        for (var i = this.pos_x - this.attack_range; i <= this.pos_x + this.attack_range; i++)
            for (var j = this.pos_y - this.attack_range; j <= this.pos_y + this.attack_range; j++) {
                if ((i - this.pos_x) * (i - this.pos_x) + (j - this.pos_y) * (j - this.pos_y) <= this.attack_range) {
                    if (g.thing[i][j] <= 5 && g.thing[i][j] > 0 || g.thing[i][j] >= 11 && g.thing[i][j] <= 15 || g.thing[i][j] == 21) this.attack(g.thing[i][j]);
                }
            }
    },
    //处理输入的伤害值
    deal_harm: function () {
        if (this.harm_in >= this.hp) this.hp = 0;
        else this.hp -= this.harm_in;
    },

    //血量观察函数
    def_hp: function () {
        if (this.hp == 0) del(this.pos_x, this.pos_y);
    },
    //自动回血的函数
    basehp_re: function () {
        this.hp += this.hp_re;
    },
    //攻击
    attack: function (ID) {
        if (ID != 0)
            findSomethingByID(ID).harm_in = this.att - findSomethingByID(ID).def;
    },

    setPosition: function (x, y) {
        this.pos_x = x;
        this.pos_y = y;
        set(this.pos_x, this.pos_y, this.ID)
    },
    doEvent: function () {
        var x = this.tag_x, y = this.tag_y;
        move(x, y, this.ID);
        this.basehp_re();
        this.deal_harm();
        this.def_hp();
        this.attack_range();
    }
},
littles19: {
    ID: 19,
    pos_x: 0,
    pos_y: 0,
    tag_x: 0,
    tag_y: 0,
    hp: 0,//生命值
    hp_max: 0,//生命值的最大值
    hp_re: 0,//生命值的回复速度，每50ms的数值
    att: 0,//攻击力
    def: 0,//防御力
    harm_in: 0,//收到的伤害数值
    attack_range: 4,
    //自动攻击距离为attack_range以内的对方英雄或小兵或防御塔
    attack_range: function () {
        for (var i = this.pos_x - this.attack_range; i <= this.pos_x + this.attack_range; i++)
            for (var j = this.pos_y - this.attack_range; j <= this.pos_y + this.attack_range; j++) {
                if ((i - this.pos_x) * (i - this.pos_x) + (j - this.pos_y) * (j - this.pos_y) <= this.attack_range) {
                    if (g.thing[i][j] <= 5 && g.thing[i][j] > 0 || g.thing[i][j] >= 11 && g.thing[i][j] <= 15 || g.thing[i][j] == 21) this.attack(g.thing[i][j]);
                }
            }
    },
    //处理输入的伤害值
    deal_harm: function () {
        if (this.harm_in >= this.hp) this.hp = 0;
        else this.hp -= this.harm_in;
    },

    //血量观察函数
    def_hp: function () {
        if (this.hp == 0) del(this.pos_x, this.pos_y);
    },
    //自动回血的函数
    basehp_re: function () {
        this.hp += this.hp_re;
    },
    //攻击
    attack: function (ID) {
        if (ID != 0)
            findSomethingByID(ID).harm_in = this.att - findSomethingByID(ID).def;
    },

    setPosition: function (x, y) {
        this.pos_x = x;
        this.pos_y = y;
        set(this.pos_x, this.pos_y, this.ID)
    },
    doEvent: function () {
        var x = this.tag_x, y = this.tag_y;
        move(x, y, this.ID);
        this.basehp_re();
        this.deal_harm();
        this.def_hp();
        this.attack_range();
    }
},
littles20: {
    ID: 20,
    pos_x: 0,
    pos_y: 0,
    tag_x: 0,
    tag_y: 0,
    hp: 0,//生命值
    hp_max: 0,//生命值的最大值
    hp_re: 0,//生命值的回复速度，每50ms的数值
    att: 0,//攻击力
    def: 0,//防御力
    harm_in: 0,//收到的伤害数值
    attack_range: 4,
    //自动攻击距离为attack_range以内的对方英雄或小兵或防御塔
    attack_range: function () {
        for (var i = this.pos_x - this.attack_range; i <= this.pos_x + this.attack_range; i++)
            for (var j = this.pos_y - this.attack_range; j <= this.pos_y + this.attack_range; j++) {
                if ((i - this.pos_x) * (i - this.pos_x) + (j - this.pos_y) * (j - this.pos_y) <= this.attack_range) {
                    if (g.thing[i][j] <= 5 && g.thing[i][j] > 0 || g.thing[i][j] >= 11 && g.thing[i][j] <= 15 || g.thing[i][j] == 21) this.attack(g.thing[i][j]);
                }
            }
    },
    //处理输入的伤害值
    deal_harm: function () {
        if (this.harm_in >= this.hp) this.hp = 0;
        else this.hp -= this.harm_in;
    },

    //血量观察函数
    def_hp: function () {
        if (this.hp == 0) del(this.pos_x, this.pos_y);
    },
    //自动回血的函数
    basehp_re: function () {
        this.hp += this.hp_re;
    },
    //攻击
    attack: function (ID) {
        if (ID != 0)
            findSomethingByID(ID).harm_in = this.att - findSomethingByID(ID).def;
    },

    setPosition: function (x, y) {
        this.pos_x = x;
        this.pos_y = y;
        set(this.pos_x, this.pos_y, this.ID)
    },
    doEvent: function () {
        var x = this.tag_x, y = this.tag_y;
        move(x, y, this.ID);
        this.basehp_re();
        this.deal_harm();
        this.def_hp();
        this.attack_range();
    }
},
}

var tower1 = {
    ID: 21,
    pos_x: 92,
    pos_y: 115,
    hp: 0,//生命值
    hp_max: 0,//生命值的最大值
    hp_re: 0,//生命值的回复速度，每50ms的数值
    att: 0,//攻击力
    def: 0,//防御力
    harm_in: 0,//收到的伤害数值
    attack_range: 4,
    //自动攻击距离为attack_range以内的对方英雄或小兵或防御塔
    attack_range: function () {
        for (var i = this.pos_x - this.attack_range; i <= this.pos_x + this.attack_range; i++)
            for (var j = this.pos_y - this.attack_range; j <= this.pos_y + this.attack_range; j++) {
                if ((i - this.pos_x) * (i - this.pos_x) + (j - this.pos_y) * (j - this.pos_y) <= this.attack_range) {
                    if (g.thing[i][j] >= 6 && g.thing[i][j] <= 10 || g.thing[i][j] >= 16) this.attack(g.thing[i][j]);
                }
            }
    },
    //处理输入的伤害值
    deal_harm: function () {
        if (this.harm_in >= this.hp) this.hp = 0;
        else this.hp -= this.harm_in;
    },

    //血量观察函数
    def_hp: function () {
        if (this.hp == 0) del(this.pos_x, this.pos_y);
    },
    //自动回血的函数
    basehp_re: function () {
        this.hp += this.hp_re;
    },
    //攻击
    attack: function (ID) {
        if (ID != 0)
            findSomethingByID(ID).harm_in = this.att - findSomethingByID(ID).def;
    },
    doEvent: function () {
        this.basehp_re();
        this.deal_harm();
        this.def_hp();
        this.attack_range();
    },
}

var tower2 = {
    ID: 22,
    pos_x: 192,
    pos_y: 45,
    hp: 0,//生命值
    hp_max: 0,//生命值的最大值
    hp_re: 0,//生命值的回复速度，每50ms的数值
    att: 0,//攻击力
    def: 0,//防御力
    harm_in: 0,//收到的伤害数值
    attack_range: 4,
    //自动攻击距离为attack_range以内的对方英雄或小兵或防御塔
    attack_range: function () {
        for (var i = this.pos_x - this.attack_range; i <= this.pos_x + this.attack_range; i++)
            for (var j = this.pos_y - this.attack_range; j <= this.pos_y + this.attack_range; j++) {
                if ((i - this.pos_x) * (i - this.pos_x) + (j - this.pos_y) * (j - this.pos_y) <= this.attack_range) {
                    if (g.thing[i][j] <=5 && g.thing[i][j] > 0 || g.thing[i][j] >= 11&&g.thing[i][j] <=15) this.attack(g.thing[i][j]);
                }
            }
    },
    //处理输入的伤害值
    deal_harm: function () {
        if (this.harm_in >= this.hp) this.hp = 0;
        else this.hp -= this.harm_in;
    },

    //血量观察函数
    def_hp: function () {
        if (this.hp == 0) del(this.pos_x, this.pos_y);
    },
    //自动回血的函数
    basehp_re: function () {
        this.hp += this.hp_re;
    },
    //攻击
    attack: function (ID) {
        if (ID != 0)
            findSomethingByID(ID).harm_in = this.att - findSomethingByID(ID).def;
    },
    doEvent: function () {
        this.basehp_re();
        this.deal_harm();
        this.def_hp();
        this.attack_range();
    },
}

function showImage(obj)	//显示或更新obj为图片关联的对象
{
	var ID=0,state=0;
	if (obj.ID==1)
	{
		ID=1;
		state=obj.image_state;
	}
	else if (obj.ID>=11 && obj.ID<=20)
	{
		ID=2;
		state=obj.image_state;
	}
	else if (obj.ID==21 || obj.ID==22)
	{
		ID=3;
	}
	if(!obj.image)
	{
		obj.image=document.createElement('img');
		if (ID==2)
			obj.image.className='image_small';
		else if (ID==3)
			obj.image.className='image_large';
		else
			obj.image.className='image_general';
		obj.image.src = './image/' + ID + '-' + state + '.png';
		obj.image.style.left= obj.pos_x * 2 - 25 + 'px';
		obj.image.style.top= obj.pos_y * 2 - 50 + 'px';
		document.getElementById('playArea').appendChild(obj.image);
	}
	else
	{
		obj.image.src = './image/' + ID + '-' + state + '.png';
		obj.image.style.left= obj.pos_x * 2 - 25 + 'px';
		obj.image.style.top= obj.pos_y * 2 - 50 + 'px';
		/*if (obj.state_changed)
		{
			obj.image.src = './image/' + ID + '-' + state + '.png';
		}*/
	}
}

function move(x,y,id){       //重置移动函数，x，y为目的地，ID为移动对象ID
	var obj=findSomethingByID(id);
	if (!obj) return;
	if (g.ground[x][y] == 0 || (g.thing[x][y] != 0 && g.thing[x][y] != obj.ID )) {   //目的无效
			obj.state=0;
			obj.image_state=0;
			showImage(obj);
			//obj.state_changed=true;
			return false;
		}
		//return;

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
					else if (x>pos_x){                    
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
					else
						ti=1;
					
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
					else if (y>pos_y){
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
					else
						ti=0;
			}
			if (obj.state!=1) obj.state_changed=true; else obj.state_changed=false;
			obj.state=1;
		}
		else
		{
			if (obj.state!=0) obj.state_changed=true; else obj.state_changed=false;
			obj.state=0;
		}
		obj.pos_x=pos_x;
		obj.pos_y=pos_y;
		obj.ti=ti;
		if (obj.image_state==1)
			obj.image_state=0;
		else if (obj.image_state==0)
			obj.image_state=1;
		showImage(obj);
}

function moveTo(x,y,obj)
{
		//此处只设定人物状态，目标的有效性交给move函数判断
		obj.tag_x=x;
		obj.tag_y=y;
		obj.state=1;
		obj.state_changed=true;
}

function doEvent()	//总的事件处理函数；具体处理过程交给相关对象的doEvent函数
{
	hero.doEvent();
	littles.littles11.doEvent();
	littles.littles12.doEvent();
	littles.littles13.doEvent();
	littles.littles14.doEvent();
	littles.littles15.doEvent();
    //XXX.doEvent();
	time++;
}

function findSomethingByID(ID)	//通过ID获取具体的对象
{
	switch (ID){
		case 1:
			return hero;
		case 11:
			return littles.littles11;
	  	case 12:
			return littles.littles12;
	  	case 13:
			return littles.littles13;
	  	case 14:
			return littles.littles14;
	  	case 15:
			return littles.littles15;
		case 16:
			return littles.littles16;
	  	case 17:
			return littles.littles17;
	  	case 18:
			return littles.littles18;
	  	case 19:
			return littles.littles19;
	  	case 20:
			return littles.littles20;	
		case 21:
			return tower1;		
		case 22:
			return tower2;						
		default:
			return;
	}
}

function init()	//初始化
{
	loadMap();
	showControlLayer();
	
	inited=true;
}
function ready()
{
	hero.setPosition(60,198);
	moveTo(280,20,hero);
	setInterval(doEvent,1);	//每隔0.05秒调用1次，相当于定时器	
	
	setTimeout(littles.littles11.setPosition(65,155),1000);
	setTimeout(moveTo(280,2,littles.littles11),1001);
	
	setTimeout(littles.littles12.setPosition(50,165),2000);
	setTimeout(moveTo(285,5,littles.littles12),20001);
	
	setTimeout(littles.littles13.setPosition(35,175),3000);
	setTimeout(moveTo(290,8,littles.littles13),30001);
	
	setTimeout(littles.littles14.setPosition(20,185),4000);
	setTimeout(moveTo(295,10,littles.littles14),40001);
	
	setTimeout(littles.littles15.setPosition(5,195),5000);
	setTimeout(moveTo(298,12,littles.littles15),50001);
	
	showImage(tower1);
	showImage(tower2);
}
