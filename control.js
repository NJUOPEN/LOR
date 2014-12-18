//有关页面事件的处理函数

function start_onclick(){
	document.getElementById('start_button').innerHTML='Loading......';
	ready();	
}
function cell_onclick(e)
{
	if (window.event) e=window.event;
	/*
	var obj=e.srcElement;
	if (!obj) obj=e.target;		//For Firefox
	if (!obj.posX) return;
  moveTo(obj.posX,obj.posY,hero);
	*/
	var map=document.getElementById('playArea');
	moveTo(Math.round((e.clientX + document.documentElement.scrollLeft - map.offsetLeft)/2),Math.round((e.clientY + document.documentElement.scrollTop - map.offsetTop)/2),hero)
}
function cell_onmousemove(e)
{
	if (window.event) e=window.event;
	var obj=e.srcElement;
	if (!obj) obj=e.target;		//For Firefox
	if (!obj.posX) return;
  	document.getElementById('debug_div').innerHTML=obj.posX + '-' + obj.posY;
}
function onSkill(){
	var skillID=parseInt(this.id.substr(-1));
	switch (skillID)
	{
		case 1: hero.baseskill_1(); break;			
	}
}
function attachToEvent(){
	//var obj=findSomethingByID(1);
	document.getElementById('start_button_wrapper').onclick=start_onclick;
	document.getElementById('skillCell_1').onclick=onSkill;
	document.getElementById('skillCell_2').onclick=onSkill;
	document.getElementById('skillCell_3').onclick=onSkill;
	document.getElementById('skillCell_4').onclick=onSkill;
	document.getElementById('playArea').onclick=cell_onclick;
	//document.getElementById('playArea').onmousemove=cell_onmousemove;
}

window.onload=function(){
	init();		//调用Rtt.js的初始化函数
	attachToEvent();	//添加事件监听器
};
