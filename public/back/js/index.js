$(function(){
	var myChart1 = echarts.init(document.getElementById('tu-left'));

    // 指定图表的配置项和数据
    var option1= {
    	//标题
        title: {
            text: '2019年注册人数'
        },
        //提示框
        tooltip: {trigger:'axis'},
        
        legend: {
            data:['人数']
        },
        
        xAxis: {
            data: ["一月","二月","三月","四月","五月","六月"]
        },
        //配置y轴
        yAxis: {},
        
        series: [{
            name: '人数',
            type: 'bar',
            data: [500, 600, 900, 1800, 800, 950]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
  
  
  /*****************/
 
  	var myChart2=echarts.init(document.getElementById("tu-right"))
  
  	var option2 = {
  		//标题
	    title : {
	        text: '人们品牌销售',
	        subtext: '2019年4月',//副标题
	        x:'center'//居中
	    },
	    //提示框
	    tooltip : {
	        trigger: 'item',
	        //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['耐克','阿迪','新百伦','361','森马']
	    },
	    series : [
	        {
	            name: '品牌',//鼠标指上去触发所显示的字体
	            type: 'pie',//系列列表
	            radius : '55%',//饼图的半径
	            center: ['50%', '60%'],//饼图圆心坐标
	            data:[
	                {value:335, name:'耐克'},
	                {value:310, name:'阿迪'},
	                {value:234, name:'新百伦'},
	                {value:135, name:'361'},
	                {value:1548, name:'森马'}
	            ],
	            
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,//图形阴影的模糊大小
	                    shadowOffsetX: 0,//阴影水平方向上的偏移距离
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'//阴影颜色
	                }
	            }
	        }
	    ]
		};      
        
  myChart2.setOption(option2);      
})