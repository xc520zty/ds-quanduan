$(function(){
	var currentPage=1;
	var pageSizes=5;
	fa()
	function fa(){
		$.ajax({
			type:"get",
			url:"/category/queryTopCategoryPaging",
			async:true,
			data:{
				page:currentPage,
				pageSize:pageSizes
			},
			dataType:"json",
			success:function(info){
				console.log(info)
				
				var htmlStr=template("tpl",info)
				
				$(".yiji-fenlei tbody").html(htmlStr);
				
				//配置分页插件
				$("#paginator").bootstrapPaginator({
					bootstrapMajorVersion:3,
					currentPage:info.page,//当前页
					totalPages: Math.ceil(info.total/info.size),//总页数
					numberOfPages:5,//一页显示5个按钮
					
					//配置按钮文字
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
						currentPage=page;
						fa();
					},
						
				})
			
		}

	});
	
		
	}

	//添加分类按钮
	
	$(".bt-tianjia").click(function(){
		$("#yiji-fenlei").modal("show")
	})
	//表单验证
	$("#form").bootstrapValidator({
		feedbackIcons: {/*input状态样式图片*/
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
		
		fields:{//验证规则
			categoryName:{//要验证的表单元素name值
				validators:{//为要验证的表单元素添加验证的监听
					notEmpty:{//非空提示
						message:"一级分类不能为空"
					}
				}
			}	
		}
		
	});
	//点击提交后
	$("#form").on('success.form.bv',function(e){
		e.preventDefault();//阻止浏览器默认行为  preventDefault
		$.ajax({
			type:"post",
			url:"/category/addTopCategory",
			async:true,
			dataType:"json",
			data:$('#form').serialize(),
			success:function(info){
				//console.log(info)
				
				if(info.success){
					$("#yiji-fenlei").modal('hide')//关闭模态框
					//重新渲染到第一页
					currentPage=1
					fa()
					//重置表单
					$("#form").data('bootstrapValidator').resetForm(true);
				}
			}
		});
	})
	
})