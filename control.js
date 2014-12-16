//有关页面事件的处理函数

function start_onclick(){
	document.getElementById('start_button').innerHTML='Loading......';
	ready();	
}
function cell_onclick(e)
{
	if (window.event) e=window.event
	var obj=e.srcElement;
	if (!obj) obj=e.target		//For Firefox
  moveTo(obj.posX,obj.posY,hero);
}


document.onReady=init();
document.getElementById('start_button_wrapper').onclick=start_onclick;

document.getElementById('playArea').onclick=cell_onclick;
