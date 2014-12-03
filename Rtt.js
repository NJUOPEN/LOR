
    //首先构建二维数组当做地面
var ground = new Array(100);
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
//基地
    for (var i =99; i >=93; i--)
    {
        for (var j = 0; j <= 6; j++)
        {
            ground[i][j] = 3;
            ground[j][i] = 3;
        }
    }
   /* for (var i = 0; i <=6; i++)
    {
        for (var j = 99; j <= 93; j--)
            ground[i][j] = 3;
    }*/
//在屏幕上显示这个二维数组
   
    for (var i = 0; i < 100; i++)
    {
        for (var j = 0; j < 100; j++)
            document.write(ground[i][j] );
        document.write("<br />");
    }