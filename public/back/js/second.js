$(function(){
	var erjiPage=1;//页数
	var erjiPageSize=5;//每页条数
	erji()
	function erji(){
		$.ajax({
			type:"get",
			url:"/category/querySecondCategoryPaging",
			async:true,
			data:{
				page:erjiPage,
				pageSize:erjiPageSize
			},
			dataType:"json",
			success:function(info){
				console.log(info)
				var htmlStr=template("tpl",info)
				$(".erji-fenlei tbody").html(htmlStr)
				
				//分页插件配置
				$("#erji-ul").bootstrapPaginator({
					bootstrapMajorVersion: 3,//bootstrap版本
			    currentPage: info.page,//当前页码
			    totalPages: Math.ceil(info.total/info.size),//总页数
			    numberOfPages: 5,//一页显示几个按钮
			    itemTexts: function (type, page, current) {//改写分页按钮字样
			     switch (type) {
			      case "first": return "首页";
			      case "prev": return "上一页";
			      case "next": return "下一页";
			      case "last": return "末页";
			      case "page": return page;
			     }
			    },
					onPageClicked:function(event, originalEvent, type, page){
						erjiPage=page;
						erji()
					}
				})
			}
		});
	}
	
	$(".erji-tian").click(function(){
		$("#erji-mo").modal('show')//打开模态框
		$.ajax({
			type:"get",
			url:"/category/queryTopCategoryPaging",
			async:true,
			data:{
				page:1,
				pageSize:100
			},
			dataType:"json",
			success:function(info){
				console.log(info)
				var htmlStr=template("tpl1",info)
				$("#erji-xia").html(htmlStr)
			}
		});
	})
	
	//让按钮显示选中的选项
	$("#erji-xia").on("click","a",function(){
		var txt= $(this).text();
		$("#erji-biao").text(txt)
		
		// 将选中的 id 设置到 input 表单元素中
		var id=$(this).data("id");
		$('[name="categoryId"]').val(id)
		
		//手动配置表单校验规则
		$("#form").data("bootstrapValidator").updateStatus("categoryId","VALID")
		
	})
	
	//文件上传
	$("#shangchuan").fileupload({
		dataType:"json",
		//data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
		
		done:function(e,data){
			var dizhi=data.result.picAddr;
			$("#imgBox img").attr("src",dizhi)
			
			$('[name="brandLogo"]').val(dizhi)
			//手动配置表单校验规则
			$("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID")
			
		}
	})
	
	
	
	//表单验证
	
	$("#form").bootstrapValidator({
		// 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],
		
		feedbackIcons: {//图标
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
  	},
//	字段验证
		fields:{
			categoryId:{
				validators:{
					notEmpty:{
						message:'请选择一级分类'
					}
				}
			},
			brandName:{
				validators:{
					notEmpty:{
						message:'请输入二级分类名称'
					}
				}
			},
			brandLogo:{
				validators:{
					notEmpty:{
						message:'请上传图片'
					}
				}
			}
		}
	});
	
	$("#form").on("success.form.bv",function(e){
		//阻止默认提交
		e.preventDefault()
		
		$.ajax({
			type:"post",
			dataType:"json",
			url:"/category/addSecondCategory",
			data:$("#form").serialize(),
			success:function(info){
				//console.log(info);
				
				$("#erji-mo").modal('hide');//关闭模态框
				
				//重置表单里面的内容和校验状态
				$('#form').data("bootstrapValidator").resetForm( true );
				erjiPage=1;
				erji();
					
				$("#erji-biao").text("请选择一级分类")//下拉按钮
				$("#imgBox img").attr("src","images/default.png")//图片
			}
		})
	})
	
	
	
})