
    //首先构建二维数组当做地面
function Grounds(){
	var ground = new Array(100);
	var count=0;
    for (var i = 0; i <= 100; i++)
        ground[i] = new Array(100);
//规定：0为无法通过；1为道路；2为河流；3为可移动单位
//整个数组归零
    for (var i = 0; i < 100; i++)
    {
        for (var j = 0; j < 100; j++)
            ground[i][j] = "_";
    }
 //河道
    for (var i = 0; i < 100; i++)
    {
        for (var j = count; j < count+7; j++)
            ground[i][j] = "~";
        count++;
    }
//中路
    for (var i = 99; i >= 0; i--)
    {
        var j = 0;
        ground[i][j] = "|";
        j++;
    }
//在屏幕上显示这个二维数组
   
    for (var i = 0; i < 100; i++)
    {
        for (var j = 0; j < 100; j++)
            document.write(ground[i][j] );
        document.write("<br />");
    }
	}