var g={ground:0,thing:0};
//全局变量：地图数组
//其中ground代表地面；thing代表站在该处的物体 1为有物体
//并且暂时只用一个像素点来表示可移动单位

function createMapArray() {
    //首先构建二维数组当做地面
    g.ground = new Array(100);
    g.thing=new Array(100)
    var count = 0;
    for (var i = 0; i <= 100; i++) {
        g.ground[i] = new Array(100);
        g.thing[i] = new Array(100);
    }

    //规定：0为无法通过；1为道路；2为河流；3为基地；
    //整个数组归零
    for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++)
            g.ground[i][j] = 0;
    }
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
}

//单位在thing上面移动
//放置单位
function set(i, j) {
    var a = i+3, b = j+3;
    for (; i < a; i++) {
        for (; j < b; j++)
            g.thing[i][j] = 1;
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
    del(i,j);
if(j>0){
        set(i-1,j);
        i=i-1;
}
}

function mov_right(i, j) {
    del(i, j);
if (j < 99){
        set(i+1 , j);
	    i=i+1;
}
	
}
function mov_up(i, j) {
    del(i, j);
if (i > 0){
        set(i , j-1);
        j=j-1
}
} 

function mov_down(i, j) {

    del(i, j);
if (i < 99){
        set(i , j+1);
	    j=j+1
}
}

//中路小兵的路径  参数为目标位置坐标  *未完成*
function littles(x,y) {
    set(99, 0);
    var i=0,j=0;
    while(i!=x||j!=y)
    {
        if (g.thing[i - 1][j] == 0 && g.ground[i - 1][j] != 0)
        { mov_up(i, j); i--; }
        if (g.thing[i][j + 1] == 0 && g.ground[i][j + 1] != 0)
        {mov_right(i, j);j++}
    }
}
//英雄最短路径 参数为目的位置坐标  *未完成*
function hero(i,j,x,y) {
    if ((i != x) ||(j != y)) {
        if (g.thing[x][y] == 0 && g.ground[x][y] != 0) {
            mov_right(x, y);
        }
    }
   /* for (var i = 0; i <=6; i++)
    {
        for (var j = 99; j <= 93; j--)
            ground[i][j] = 3;
    }*/
}

//在屏幕上显示这个二维数组   
//供调试用
function printMap()
{
    for (var i = 0; i < 100; i++)
    {
        for (var j = 0; j < 100; j++)
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
    for (i = 0; i < 100; i++) {
        cellLine = document.createElement('ul');	//新建一行，元素类型为ul
        cellLine.className = 'cellLine';
        for (j = 0; j < 100; j++) {
            cell = document.createElement('li');	//新建一格，元素类型为li
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

document.onReady=loadMap();
