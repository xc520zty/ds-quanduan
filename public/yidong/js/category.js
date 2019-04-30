$(function(){
	$.ajax({
		type:"get",
		url:"/category/queryTopCategory",
		async:true,
		dataType:"json",
		success:function(info){
			console.log(info)
			var htmlStr=template("tpl",info)
			$(".left-gun ul").html(htmlStr);
			//获取id值
			
			youce(info.rows[0].id)
			
		}
	});
	
	$(".left-gun ul").on("click","li",function(){
		$(".left-gun ul li").removeClass("gai");
		$(this).addClass('gai');
		var id=$(this).data("id");
		//调用渲染函数
		youce(id);
	})
	
	
	//右侧的请求渲染函数
	function youce(id){
		$.ajax({
			type:"get",
			url:"/category/querySecondCategory",
			async:true,
			dataType:"json",
			data:{
				id:id
			},
			success:function(info){
				console.log(info)
				var htmlStr1=template("tpl1",info)
				$(".right-gun ul").html(htmlStr1);
			}
		});
	}
	
})