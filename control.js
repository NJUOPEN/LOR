//有关页面事件的处理函数

function start_onclick(){
	document.getElementById('start_button').innerHTML='Loading......';
	ready();	
}
function cell_onclick(e)
{
	if (window.event) e=window.event
	var obj=e.srcElement;
	if (!obj) obj=e.target;		//For Firefox
	if (!obj.posX) return;
  moveTo(obj.posX,obj.posY,hero);
}
function cell_onmousemove(e)
{
	if (window.event) e=window.event
	var obj=e.srcElement;
	if (!obj) obj=e.target;		//For Firefox
	if (!obj.posX) return;
  	document.getElementById('debug_div').innerHTML=obj.posX + '-' + obj.posY;
}


document.onReady=init();
document.getElementById('start_button_wrapper').onclick=start_onclick;

document.getElementById('playArea').onclick=cell_onclick;
//document.getElementById('playArea').onmousemove=cell_onmousemove;
