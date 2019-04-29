$(function(){
	var sppage=1;
	var spPageSize=2;
	var picArr=[];//存取图片地址
	shang();
	function shang(){
		$.ajax({
			type:"get",
			url:"/product/queryProductDetailList",
			async:true,
			data:{
				page:sppage,
				pageSize:spPageSize
			},
			dataType:"json",
			success:function(info){
				console.log(info)
				var htmlStr=template("tpl",info);
				$(".shangping tbody").html(htmlStr)
				
				//配置分页插件
				$("#paginator").bootstrapPaginator({
					bootstrapMajorVersion:3,//对应bootstrap版本
					currentPage:info.page,//当前页
					numberOfPages:info.size,//每页条数
					totalPages:Math.ceil(info.total/info.size), //总页数
					
					onPageClicked:function(event, originalEvent,type,page){
						sppage=page;
						shang();
					},
					
					
					itemTexts:function(type,page,current){//配置按钮字体
						switch(type){
							case "first" : return "首页";
							case "prev" : return "上一页";
							case "next" : return "下一页";
							case "last" : return "末页";
							case "page" : return page;
						}
					},
					
					//配置按钮提示框
					tooltipTitles:function(type,page,current){
						switch(type){
							case "first" : return "首页";
							case "last" : return "尾页";
							case "prev" : return "上一页";
							case "next" : return "下一页";
							case "page" : return "前往第"+ page +"页"
						}
					},//使用bootstrap样式的提示框组件
					useBootstrapTooltip:true
				})
				
				
			}
		});
	}
	
	
	//点击添加商品按钮出现模态框
	
	$("#shang-an").click(function(){
		$("#shang-mo").modal('show');
		mo();
		function mo(){
			$.ajax({
				type:"get",
				url:"/category/querySecondCategoryPaging",
				async:true,
				data:{
					page:1,
					pageSize:100
				},
				dataType:"json",
				success:function(info){
					console.log(info);
					var htmlStr1=template("tpl1",info);
					$("#xuan").html(htmlStr1);
				}
			});
		}
	})
	
	//选中二级分类
	$("#xuan").on("click","a",function(){
		var txt= $(this).text();
		$(".shang-fen").text(txt);//让二级分类按钮显示选中的文字
		
		var id= $(this).data("id");
		$("[name='brandId']").val(id);
		//重置表单验证
		$("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
	});
	
	
	//配置上传图片回调函数
	$("#shang-shang").fileupload({
		dataType:"json",
		//每一张图片上传, 都会响应一次
		done:function(e,data){
			console.log(data)
			
			var tudui=data.result//图片地址对象
			var tudi=tudui.picAddr//图片地址
			
			//新得到的图片地址对象，放到数组最前面
			picArr.unshift(tudui);
			//新的图片，添加到imgBox的最前面
			$('#imgBox').prepend('<img src="'+ tudi +'" width="100"/>')
			
			//判断上传的图片个数如果大于3个，需要将最后面的一个删除
			
			if(picArr.length>3){
				//删除数组的最后一项
				picArr.pop();
				//删除了数组的最后一项还有页面中的最后一项也要删除
				
				$("#imgBox img:last-of-type").remove();
				
			}
			
			if(picArr.length===3){
				//重置表单中name为picStatus的校验状态
				$("#form").data("bootstrapValidator").updateStatus("picStatus","VALID")
			}
		}
	})
	
	//配置表单校验
	$("#form").bootstrapValidator({
		// 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],
		
		feedbackIcons: {//图标
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
  	},
		  	
  	fields:{//字段验证
  		brandId:{//字段名
  			validators:{
  				notEmpty:{
  					message:"请选择二级分类"
  				}
  			}
  		},
  		//商品名称
  		proName:{//字段名
  			validators:{
  				notEmpty:{
  					message:"请输入商品名称"
  				}
  			}
  		},
  		//商品描述
  		proDesc:{//字段名
  			validators:{
  				notEmpty:{
  					message:"请输入商品描述"
  				}
  			}
  		},
  		//商品库存
  		num:{//字段名
  			validators:{
  				notEmpty:{
  					message:"请输入商品库存"
  				},
  				//正则校验
  				regexp:{
  					regexp:/^[1-9]\d*$/,
  					message:'商品库存格式，必须是非零开头的数字'
  				}
  			}
  		},
  		//商品尺码
  		size:{//字段名
  			validators:{
  				notEmpty:{
  					message:"请输入商品尺码"
  				},
  				//正则校验
  				regexp:{
  					regexp:/^\d{2}-\d{2}$/,
  					message:'尺码格式, 必须是 32-40'
  				}
  			}
  		},
  		//商品原价
  		oldPrice:{//字段名
  			validators:{
  				notEmpty:{
  					message:"请输入商品原价"
  				}
  			}
  		},
  		//商品现价
  		price:{//字段名
  			validators:{
  				notEmpty:{
  					message:"请输入商品现价"
  				}
  			}
  		},
  		//文件上传
  		picStatus:{//字段名
  			validators:{
  				notEmpty:{
  					message:"请上传3张图片"
  				}
  			}
  		}
  		
  	}

	})
	
	//注册校验成功事件
	$("#form").on("success.form.bv",function(e){
		e.preventDefault()//阻止默认提交
		
		var params=$("#form").serialize()//表单提交得到的参数字符串
		params+="&picName1="+ picArr[0].tudui +"&picAddr1="+picArr[0].tudi
		params+="&picName2="+ picArr[0].tudui +"&picAddr2="+picArr[0].tudi
		params+="&picName3="+ picArr[0].tudui +"&picAddr3="+picArr[0].tudi
		
		$.ajax({
			type:"post",
			url:"/product/addProduct",
			async:true,
			data:params,
			dataType:"json",
			success:function(info){
				if(info.success){
					$("#shang-mo").modal('hide');//关闭模态框
					//重置表单验证
					$('#form').data("bootstrapValidator").resetForm( true );
					//重新渲染第一页
					sppage=1;
					shang();
					//重置下拉菜单和图片
					$(".shang-fen").text("请选择二级分类");
					$('#imgBox img').remove();
					//重置数组
					
					picArr=[];
				}
			}
		});
	})
	

	
})