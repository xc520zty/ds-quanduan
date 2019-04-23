
NProgress.configure({ showSpinner: false })

$(document).ajaxStart(function(){//第一个ajax请求后
	NProgress.start()//显示进度条
})

$(document).ajaxStop(function(){//所有ajax请求完成后
	NProgress.done()//关闭进度条
})

//验证是否是管理员登录
if(location.href.indexOf("login.html")===-1){//不等于-1表示没在登录页，即要验证
	$.ajax({
		type:"get",
		url:"/employee/checkRootLogin",
		dataType:"json",
		success:function(info){
			if(info.success){//表示是管理员登录
				
			}
			if(info.error===400){//不是管理员登录，跳转到登录页
				location.href="login.html"
			}
		}
	});
}





$(function(){
	
	//模态框显示
	$(".tui").on("click",function(){
		
		$("#motaik").modal('show')
	})
	
	//菜单过去过来
	$(".qie").on("click",function(){
		$(".lt-aside").toggleClass("chu")//左侧的菜单
		
		$(".main-toubu").toggleClass("guo")//右侧的头部
		$(".main-neirong").toggleClass("guo1")//右侧的内容
		
	})
	
	//下拉菜单
	$("#tiaozhan").on("click",function(){
		$(".fenlei").stop().slideToggle("slow")
		
	})
	
	
	//点击退出按钮，发送ajax请求
	
	$("#tuichu").on("click",function(){
		$.ajax({
			type:"get",
			url:"/employee/employeeLogout",
			dataType:"json",
			success:function(info){
				console.log(info)
				if(info.success){//成功退出
					
					location.href="login.html"//跳转到登录页
				}
				
			}
		});
	})
	
})