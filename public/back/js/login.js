$(function(){
	//校验
	$("#form").bootstrapValidator({
		
		//校验的图标显示
		feedbackIcons:{
			valid: 'glyphicon glyphicon-ok',//成功图标
	    invalid: 'glyphicon glyphicon-remove',//失败图标
	    validating: 'glyphicon glyphicon-refresh'
		},
		

		//指定校验的内容
		fields:{
			//校验用户名,对应的name属性
			username:{
				validators:{
					notEmpty:{
						message:'用户名不能为空'
					},
					//长度校验
					stringLength:{
						min:3,
						max:6,
						message:'用户名长度必须在3~6位'
					},
					callback: {
            message: "用户名不存在"
          }
					
				}

			},
			password:{
				validators:{
					notEmpty:{
						message:'密码不能为空'
					},
					//长度校验
					stringLength:{
						min:6,
						max:12,
						message:'密码长度必须在6~12位'
					},
					callback: {
            message: "密码错误"
          }
				}
			}
		}
	})
	
	//ajax请求
	
	$("#form").on('success.form.bv',function(e){
		e.preventDefault()//禁止浏览器的默认行为
		var username=$("#user").val()
		var password=$("#psword").val()
		$.ajax({
			url:'/employee/employeeLogin',
			dataType:"json",
			type:'post',
			data:{
				username:username,
				password:password
			},
				  
			
			success:function(info){
				console.log(info)
				//正确就跳转
				if(info.success){
					location.href = "index.html";
				}
				
				//用户名不存在
				if(info.error===1000){
					$('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
				}
				//密码错误
				if(info.error===1001){
					$('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback")
				}
				
			}
		})
	})
	
	//重置功能
	$("[type=reset]").on('click',function(){
		$('#form').data("bootstrapValidator").resetForm();
	})
	
})