//有关页面事件的处理函数

function start_onclick(){
	document.getElementById('start_button').innerHTML='Loading......';
	ready();	
}
function cell_onclick(e)
{
	if (window.event) e=window.event;
	var obj=e.srcElement;
	if (!obj) obj=e.target;		//For Firefox
	if (!obj.posX) return;
  moveTo(obj.posX,obj.posY,hero);
}
function cell_onmousemove(e)
{
	if (window.event) e=window.event;
	var obj=e.srcElement;
	if (!obj) obj=e.target;		//For Firefox
	if (!obj.posX) return;
  	document.getElementById('debug_div').innerHTML=obj.posX + '-' + obj.posY;
}
function attachToEvent(){
	var obj=findSomethingByID(1);
	document.getElementById('start_button_wrapper').onclick=start_onclick;
	document.getElementById('skillCell_1').onclick=obj.baseskill_1;
	document.getElementById('skillCell_2').onclick=obj.baseskill_2;
	document.getElementById('skillCell_3').onclick=obj.baseskill_3;
	document.getElementById('skillCell_4').onclick=obj.baseskill_4;
	document.getElementById('playArea').onclick=cell_onclick;
	//document.getElementById('playArea').onmousemove=cell_onmousemove;
}

window.onload=function(){
	init();		//调用Rtt.js的初始化函数
	attachToEvent();	//添加事件监听器
};
