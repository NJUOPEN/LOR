//此脚本仅供测试效果用
function cell_onclick(e)
{
	if (window.event) e=window.event;
	var obj=e.srcElement;
	if (!obj) obj=e.target;		//For Firefox
	hero.moveTo(obj.posX,obj.posY);
}
document.getElementById('playArea').onclick=cell_onclick;
