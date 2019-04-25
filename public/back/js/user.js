$(function(){
	var wodepage=1;
	var pageSize=5;
	
	function qingqiu(){
		$.ajax({
			type:"get",
			url:"/user/queryUser",
			data:{
				page:wodepage,//当前页
				pageSize:pageSize//每条页数
			},
			dataType:"json",
			success:function(info){
				console.log(info)				
	//			模板渲染
				var htmlString=template("tpl",info)				
				$(".biaoge tbody").html(htmlString)
				
				//配置分页插件
				$("#paginator").bootstrapPaginator({
					bootstrapMajorVersion:3,//对应bootstrap版本
					currentPage:info.page,//当前页
					numberOfPages:info.size,//每页条数
					totalPages:Math.ceil(info.total/info.size), //总页数
//					shouldShowPage:true,//是否显示该按钮
					itemTexts:function(type,page,current){
						switch(type){
							case "first": return "首页";
								
							case "prev": return "上一页";
							case "next": return "下一页";
							case "last": return "末页";
							case "page": return page;
							 
						}
					},
					onPageClicked:function(event, originalEvent, type, page){
						//这里的page是表示当前的页码，我点击第几页即page等于第几页
						//将其赋值给变量wodepage，让其渲染当前页
						//console.log(page)
						wodepage=page;
						qingqiu();
					}
				})
			}
		})
	}
	
	qingqiu()
	
	/*****/
	
	$(".biaoge tbody").on("click",".btn",function(){
		console.log(11)
		$("#an-motai").modal('show');//模态框出现
		
		var id= $(this).parent().data("id");//id值
		
		//获取按钮的状态
		var isDelete=$(this).hasClass("btn-success")? 1 : 0;
		//点击确认按钮发送请求
		$("#diji").click(function(){
			$.ajax({
				type:"post",
				url:"/user/updateUser",
				async:true,
				data:{
					id:id,
					isDelete:isDelete
				},
				dataType:"json",
				success:function(info){
					//console.log(info)
					//请求成功重新渲染页面
					if(info.success){
						qingqiu();
						$("#an-motai").modal('hide')//关闭模态框
					}
					
				}
			});
		})
	})
	
	
	
})