var ground;		//全局变量：地图数组

﻿function createMapArray()
{
    //首先构建二维数组当做地面
	ground = new Array(100);

	var count=0;
    for (var i = 0; i <= 100; i++)
        ground[i] = new Array(100);
//规定：0为无法通过；1为道路；2为河流；3为基地；
//整个数组归零
    for (var i = 0; i < 100; i++)
    {
        for (var j = 0; j < 100; j++)
            ground[i][j] = 0;
    }
 //河道
    for (var i = 0; i < 100; i++)
    {
        for (var j = count; j < count+7; j++)
            ground[i][j] = 2;
        count++;
    }
    //中路
     for (var k = 0; k < 4; k++)
    {
        var j = 0;
        for (var i = 99 - k; i >= 0; i--)
        {
            ground[i][j] = 1;
            j++;
        }
    }
    for (var k = 0; k < 4; k++)
    {
        var i=99;
        for(var j=k;j<100;j++)
        {
            ground[i][j] = 1;
            i--;
        }
    }
//小路i=48--53
    for (var k = 0; k <= 6; k++)
    {
        var j = 0;
        for (var i = 48 + k; i < 100; i++)
        {
            ground[i][j] = 1;
            j++;
        }
    }
//小路j=48-53
    for (var k = 0; k <= 6; k++)
    {
        var i=0;
        for(var j=48+k;j<100;j++)
        {
            ground[i][j] = 1;
            i++;
        }
    }
    //边路
    for (var i = 0; i <= 5; i++) {
        for (var j = 0; j <= 99; j++) {
            ground[i][j] = 1;
            ground[j][i] = 1;
        }
    }
    for (var i = 99; i >= 94; i--) {
        for (var j = 0; j <= 99; j++) {
            ground[i][j] = 1;
            ground[j][i] = 1;
        }
    }
//基地
    for (var i =99; i >=93; i--)
    {
        for (var j = 0; j <= 6; j++)
        {
            ground[i][j] = 3;
            ground[j][i] = 3;
        }
    }
}

//在屏幕上显示这个二维数组   
//供调试用
function printMap()
{
    for (var i = 0; i < 100; i++)
    {
        for (var j = 0; j < 100; j++)
            document.write(ground[i][j] );
        document.write("<br />");
    }
}

function loadMap()
{
	createMapArray();
	var map=document.getElementById('playground'); 	//获取视图区
	var table=document.createElement('div');	//新建一个表格，类型为div
	table.id='playArea';
	var cell,cellLine;
	var i,j;
	for (i=0;i<100;i++)
	{
		cellLine=document.createElement('ul');	//新建一行，元素类型为ul
		cellLine.className='cellLine';
		for(j=0;j<100;j++)
		{
			cell=document.createElement('li');	//新建一格，元素类型为li
			cell.className='cell';	//基础样式为cell
			switch(ground[i][j])
			{
				case 0:
					cell.className+=' cell_Blank';
					break;
				case 1:
					cell.className+=' cell_Road';
					break;
				case 2:
					cell.className+=' cell_River';
					break;
				case 3:
					cell.className+=' cell_Removable';
					break;
			}
			cellLine.appendChild(cell);	//将新的一格追加到该行中
		}
		table.appendChild(cellLine);	//将完整的一行追加到整个表格中
	}
	map.appendChild(table);	//将完整的表格追加到视图区
}

document.onReady=loadMap();
