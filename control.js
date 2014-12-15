//创建控制区
function showSkillArea(){
	var map=document.getElementById('playground');
	var table=document.getElementById('playArea');
	if (!table) return;		//技能区必须在playArea之后加载
	var skill=document.createElement('div');
	skill.id='skillArea';
	skill.innerHTML='123123123';
	map.insertBefore(skill,table);
}
