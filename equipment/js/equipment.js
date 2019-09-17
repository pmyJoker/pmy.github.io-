$(function(){
	var url = location.href.split("equipment")[0];
	var layer;
  // 查询页面
  var code_equipment_value = $("#code_equipment_value"),// 设备编码
      code_type_value = $("#code_type_value"),// 设备类型
      code_company_value = $("#code_company_value"),// 公司名称
      integral_range_value_st = $("#integral_range_value_st"),// 积分范围开始
      integral_range_value_end = $("#integral_range_value_end"),// 积分范围结束
      integral_num_value_st = $("#integral_num_value_st"),// 可用次数开始
      integral_num_value_end = $("#integral_num_value_end"),// 可用次数结束
      txtBeginDate = $("#txtBeginDate"),// 销售日期开始
      txtEndDate = $("#txtEndDate"),// 销售日期结束
      unlimited_date = $(".unlimited_date"),// 是否不限日期
      date_remarks_value = $("#date_remarks_value");// 备注说明
	// 添加编辑设备
	var add_coding_l_value = $("#add_coding_l_value"),// 设备编码
			add_coding_r_value = $("#add_coding_r_value"),// 设备类型
			txtedit = $("#txtedit"),// 销售日期
			add_date_r_value = $("#add_date_r_value"),// 购买公司
			add_contacts_l_value = $("#add_contacts_l_value"),// 联系人
			add_contacts_r_value = $("#add_contacts_r_value"),// 电话
			add_integral_l_value = $("#add_integral_l_value"),// 积分类型
			add_integral_r_value = $("#add_integral_r_value"),// 设备积分
			add_num_l_value = $("#add_num_l_value"),// 次数类型
			add_num_r_value = $("#add_num_r_value"),// 可用次数

			add_library_l_value = $("#add_library_l_value"),// 歌库升级
			add_library_r_value = $("#add_library_r_value"),// 舞台升级
			add_branch_l_value = $("#add_branch_l_value"),// 设备积分
			add_branch_r_value = $("#add_branch_r_value"),// 使用次数

			add_explain_value = $("#add_explain_value"),// 备注说明
			add_button_power = $("#add_button_power"),// 是否授权
			add_checkboxs = $(".add_checkboxs ul li input");// 多选
	var strdata,enddata,table,id;
	layui.use('layer', function(){
		layer = layui.layer;
		layer.prompt(function(value, index, elem){
			// alert(value); //得到value
			if(value == 123){
				alert(value);
			}
			layer.close(index);
		});
	});
	table = $('#example').dataTable({
		"aaSorting": [[ 0, "desc" ]],        //默认第几个排序
    "aLengthMenu" : [ 20, 30, 40,50 ],   //更改显示记录数选项
    "iDisplayLength" : 15,               //默认显示的记录数
    "bLengthChange": true,               //是否允许用户自定义每页显示条数。
    "bPaginate": true,                   //是否分页。
    "bProcessing": true,                 //当datatable获取数据时候是否显示正在处理提示信息。
    "sPaginationType": 'full_numbers',   //分页样式
		"serverSide":true,
		"bFilter": false,
		"language":{ //把文字变为中文
			"sProcessing": "处理中...",
			"sLengthMenu": "显示 _MENU_ 项结果",
			"sZeroRecords": "没有匹配结果",
			"sInfo": "显示 _START_ 至 _END_ ，共 _TOTAL_ 项",
			"sInfoEmpty": "显示 0 至 0 ，共 0 项",
			"sInfoFiltered": "(由 _MAX_ 项结果过滤)",
			"sInfoPostFix": "",
			"sSearch": "搜索:",
			"sUrl": "",
			"sEmptyTable": "表中数据为空",
			"sLoadingRecords": "载入中...",
			"sInfoThousands": ",",
			"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "上页",
					"sNext": "下页",
					"sLast": "末页"
			},
			"oAria": {
					"sSortAscending": ": 以升序排列此列",
					"sSortDescending": ": 以降序排列此列"
			}
		},
    "ajax": {
        url: "http://192.168.1.148/project/storeroom/admin/Equipment/Equipment_list",
				type: "POSt",
        datatype: "json",
        data: function (d) {
					d.search = d.search.value;
					d.sort = d.order[0].column;
					d.sort_way = d.order[0].dir;
					d.code_equipment_value =code_equipment_value.val();//设备编码
					d.code_type_value =code_type_value.val();//设备类型
					d.code_company_value =code_company_value.val();//公司名称
					d.integral_range_value_st =integral_range_value_st.val();//积分范围开始
					d.integral_range_value_end =integral_range_value_end.val();//积分范围结束
					d.integral_num_value_st =integral_num_value_st.val();//可用次数开始
					d.integral_num_value_end =integral_num_value_end.val();//可用次数结束
					d.txtBeginDate =txtBeginDate.val();//销售日期开始
					d.txtEndDate =txtEndDate.val();//销售日期结束
					d.date_remarks_value =date_remarks_value.val(); //备注说明
					//是否不限日期
					if(unlimited_date.prop("checked")){
						d.unlimited_date = 1;
					}else{
						d.unlimited_date = 0;
					}
        },
        dataSrc: function (data){
					if (data.recordsTotal == null) {
							data.recordsTotal = 0;
					}
					//查询结束取消按钮不可用
					return data.rows;//自定义数据源，默认为data
        },
		},
    "retrieve": true,
    "columns": [
			{"data": "id"},
			{"data": "productid"},
			{"data": "style"},
			{"data": "buydate"},
			{"data": "songupdate"},
			{"data": "mouldupdate"},
			{"data": "companyname"},
			{"data": "integral"},
			{"data": "usetimes"},
			{"data": "mark"},
			{"data": "st1"},
			{"data": "st2"},
			{"data": "st3"},
			{"data": "st4"},
			{"data": "st5"},
			{"data": "st6"},
			{"data": "st7"},
			{"data": "st8"},
			{"data": "sttimemark",width: "10px"}
		],
	} );
	$(".list #example_wrapper").removeClass("no-footer");

	// 遍历公司和设备
	bianli();
	function bianli(){
		let company ="", style ="", companyarr =[], stylearr =[];
		$.ajax({
			url: "http://192.168.1.148/project/storeroom/admin/Equipment/company_style",
			type: "POST",
			dataType: "json",
			success:function(data){
				companyarr =$.parseJSON(data.company);
				stylearr =$.parseJSON(data.style);
				for(let i=0;i<companyarr.length;i++){
					company +='<option value="'+ companyarr[i].companyname + '">'+ companyarr[i].companyname + '</option>';
				}
				for(let j=0;j<stylearr.length;j++){
					style +='<option value="'+ stylearr[j].style + '">'+ stylearr[j].style + '</option>';
				}
				$("#code_type_value").append(style);
				$("#code_company_value").append(company);
				company = "";
				style = "";
			}
		})
	}

	// 开始的日期
	$("#txtBeginDate").calendar({
		controlId: "divDate",     // 弹出的日期控件ID，默认: $(this).attr("id") + "Calendar"
		speed: 200,               // 三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认：200
		complement: true,         // 是否显示日期或年空白处的前后月的补充,默认：true
		readonly: true,           // 目标对象是否设为只读，默认：true
		upperLimit: new Date(),   // 日期上限，默认：NaN(不限制)
		// lowerLimit: new Date("1900/01/01"),  // 日期下限，默认：NaN(不限制)
		callback: function () {               // 点击选择日期后的回调函数
				strdata =$("#txtBeginDate").val();
		}
	});
	// 结束的日期
	$("#txtEndDate").focus(function(){
		$("#txtEndDate").calendar({
			speed: 200,
			complement: true,
			readonly: true,
			upperLimit: new Date(),
			lowerLimit: new Date(strdata),
			callback: function () {
			}
		});
	})
	// 编辑或添加的日期
	$("#txtedit").calendar({
		speed: 200,
		complement: true,
		readonly: true,
		upperLimit: new Date(),
		callback: function () {
				
		}
	});
	// 选着开始日期
	$("#txtBeginDate").focus(function(){
		$("#divDate").css({'top':$(this).offset().top + 15 + 'px','left': $(this).offset().left + 'px'});
	})
	// 选择结束日期
	$("#txtEndDate").focus(function(){
		$("#txtEndDateCalendar").css({'top':$(this).offset().top + 15 + 'px','left': $(this).offset().left + 'px'});
	})
	// 选择编辑或添加日期
	$("#txtedit").focus(function(){
		$("#txteditCalendar").css({'top':$(this).offset().top + 15 + 'px','left': $(this).offset().left + 'px'});
	})

	// 查询事件
	$("#date_remarks_query").click(function(){
		var oSettings = table.fnSettings();
		table.fnClearTable(0);
		table.fnDraw();
		// 积分范围
		if(integral_range_value_st.val()){
			if(integral_range_value_end.val() == ""){
				layer.open({
					content: '积分范围不能为空'
				});
			}
		}
		if(integral_range_value_end.val()){
			if(integral_range_value_st.val() == ""){
				layer.open({
					content: '积分范围不能为空'
				});
			}
		}
		//可用次数
		if(integral_num_value_st.val()){
			if(integral_num_value_end.val() == ""){
				layer.open({
					content: '可用次数不能为空'
				});
			}
		}
		if(integral_num_value_end.val()){
			if(integral_num_value_st.val() == ""){
				layer.open({
					content: '可用次数不能为空'
				});
			}
		}
		//销售日期
		if(txtBeginDate.val()){
			if(txtEndDate.val() == ""){
				layer.open({
					content: '销售日期不能为空'
				});
			}
		}
		if(txtEndDate.val()){
			if(txtBeginDate.val() == ""){
				layer.open({
					content: '销售日期不能为空'
				});
			}
		}
	})

	// 添加设备事件
	$("#operation_btn_add").click(function(){
		$(".add_integral").show();
		$(".add_num").show();
		$(".add_library").hide();
		$(".add_branch").hide();
		$(".add_equipment").show();
	})

	// 编辑设备事件
	$("#operation_btn_edit").click(function(){
		if(code_equipment_value.val() == ""){
			layer.open({
				title: '警告',
				content: '请先填写设备编码'
			});
		}else{
			$(".add_integral").hide();
			$(".add_num").hide();
			$(".add_library").show();
			$(".add_branch").show();
			$(".add_equipment").show();
			// addEditor().add_coding_l_value = 3359;
			$.ajax({
				url: "http://192.168.1.148/project/storeroom/admin/Equipment/Equipment_edit",
				type: "POST",
				data:{code_edit:code_equipment_value.val()},
				dataType: "json",
				success:function(data){
					id = data.id;
					add_coding_l_value.val(data.productid);// 设备编码值
					add_coding_r_value.val(data.style);// 设备类型值
					txtedit.val(data.buydate);// 销售日期值
					add_date_r_value.val(data.companyname);// 购买公司值
					add_contacts_l_value.val(data.contactperson);// 联系人值
					add_contacts_r_value.val(data.tel);// 电话值
					add_library_l_value.val(data.songupdate); // 歌库升级
					add_library_r_value.val(data.mouldupdate); // 舞台升级
					add_branch_l_value.val(data.integral); // 设备积分
					add_branch_r_value.val(data.usetimes); // 使用次数
					add_explain_value.val(data.mark);// 备注说明值
					if(data.sttimemark == 1){
						add_button_power.prop("checked",true);// 是否授权值
					}else{
						add_button_power.prop("checked",false);// 是否授权值
					}
					// 多选值
					let dataarr = data.add_checkboxs;
					for(let i =0;i<add_checkboxs.length;i++){
						for(let j=0;j<dataarr.length;j++){
							if(($(add_checkboxs[i]).data("id") == dataarr[j])){
								$(add_checkboxs[i]).prop("checked",true);
							}
						}
					}
					// 升级歌库
					for(let k=0;k<$(add_library_l_value).find("option").length;k++){
						if($($(add_library_l_value).find("option")[k]).val() == data.songupdate){
							$($(add_library_l_value).find("option")[k]).attr("selected",true)
						}
					}
					// 舞台升级
					for(let l=0;l<$(add_library_r_value).find("option").length;l++){
						if($($(add_library_r_value).find("option")[l]).val() == data.mouldupdate){
							$($(add_library_r_value).find("option")[l]).attr("selected",true)
						}
					}
				}
			})
		}
	});

	// 确定事件
	$(".add_button_btn_confirm").click(function(){
		if($(".add_integral").css("display") == "none"){
			$.ajax({
				url: "http://192.168.1.148/project/storeroom/admin/Equipment/Equipment_save",
				type: "POST",
				data:{
					addEditor:JSON.stringify(Editor())
				},
				datatype: "json",
				success:function(data){
					if(data.code == 200){
						location.reload();
					}
				}
			})
		}else{
			$.ajax({
				url: "http://192.168.1.148/project/storeroom/admin/Equipment/Equipment_add",
				type: "POST",
				data:{
					addEditor:JSON.stringify(addEditor())
				},
				datatype: "json",
				success:function(data){
					if(data.code == 200){
						location.reload();
					}
				}
			})
		}
		$(".add_equipment").hide();
		bothclear();
	})

	// 设备添加和编辑取消事件
	$(".add_button_btn_cancel").click(function(){
		$(".add_equipment").hide();
		bothclear();
	})

	// 关闭设备添加和编辑
	$(".add_equipment_close").click(function(){
		$(".add_equipment").hide();
		bothclear();
	})

	// 清空弹窗内容
	function bothclear(){
		add_coding_l_value.val("");// 设备编码值清空
		add_coding_r_value.val("");// 设备类型值清空
		txtedit.val("");// 销售日期值清空
		add_date_r_value.val("");// 购买公司值清空
		add_contacts_l_value.val("");// 联系人值清空
		add_contacts_r_value.val("");// 电话值清空
		add_integral_l_value.val("");// 积分类型值清空
		add_integral_r_value.val("");// 设备积分值清空
		add_num_l_value.val("");// 次数类型值清空
		add_num_r_value.prop("checked",false);// 可用次数值清空
		add_explain_value.val("");// 备注说明值清空
		add_button_power.prop("checked",false);// 是否授权值清空
		// 多选值清空
		for(var i =0;i<add_checkboxs.length;i++){
			if($(add_checkboxs[i]).prop("checked")){
				$(add_checkboxs[i]).prop("checked",false);
			}
		}
	}
	// 添加
	function addEditor(){
		// 多选值
		let checkboxsarr = [];
		for(let i =0;i<add_checkboxs.length;i++){
			if($(add_checkboxs[i]).prop("checked")){
				checkboxsarr.push($(add_checkboxs[i]).data("id"));
			}
		}
		var addEditorval = {
			"add_coding_l_value":add_coding_l_value.val(), //设备编码
			"add_coding_r_value":add_coding_r_value.val(), //设备类型
			"txtedit":txtedit.val(), //销售日期
			"add_date_r_value":add_date_r_value.val(), //购买公司
			"add_contacts_l_value":add_contacts_l_value.val(), //联系人
			"add_contacts_r_value":add_contacts_r_value.val(), //电话
			"add_integral_l_value":add_integral_l_value.val(), //积分类型
			"add_integral_r_value":add_integral_r_value.val(), //设备积分
			"add_num_l_value":add_num_l_value.val(), //次数类型
			"add_num_r_value":add_num_r_value.prop("checked"), //可用次数
			"add_explain_value":add_explain_value.val(), //备注说明
			"add_checkboxs":checkboxsarr, //多选
			"add_button_power":add_button_power.prop("checked") //是否授权
		}
		//是否授权 
		if(addEditorval.add_button_power){
			addEditorval.add_button_power = 1;
		}else{
			addEditorval.add_button_power = 0;
		}
		//可用次数
		if(addEditorval.add_num_r_value){
			addEditorval.add_num_r_value = -1;
		}else{
			addEditorval.add_num_r_value = 0;
		}
		return addEditorval;
	}

	// 编辑内容
	function Editor(){
		// 多选值
		let checkboxsredit = [];
		for(let i =0;i<add_checkboxs.length;i++){
			if($(add_checkboxs[i]).prop("checked")){
				checkboxsredit.push($(add_checkboxs[i]).data("id"));
			}
		}
		var addEditorval = {
			"add_coding_l_value":add_coding_l_value.val(), //设备编码
			"add_coding_r_value":add_coding_r_value.val(), //设备类型
			"txtedit":txtedit.val(), //销售日期
			"add_date_r_value":add_date_r_value.val(), //购买公司
			"add_contacts_l_value":add_contacts_l_value.val(), //联系人
			"add_contacts_r_value":add_contacts_r_value.val(), //电话			
			"add_library_l_value": $("#add_library_l_value").val(),// 歌库升级
			"add_library_r_value": $("#add_library_r_value").val(),// 舞台升级
			"add_branch_l_value": $("#add_branch_l_value").val(),// 设备积分
			"add_branch_r_value": $("#add_branch_r_value").val(),// 使用次数
			"id":id,
			"add_explain_value":add_explain_value.val(), //备注说明
			"add_checkboxs":checkboxsredit, //多选
			"add_button_power":add_button_power.prop("checked") //是否授权
		}
		//是否授权
		if(addEditorval.add_button_power){
			addEditorval.add_button_power = 1;
		}else{
			addEditorval.add_button_power = 0;
		}
		return addEditorval;
	}

	// 清空查询内容
	function queryclear(){
		code_equipment_value.val(""); //设备编码
		code_type_value.val(""); //设备类型
		code_company_value.val(""); //公司名称
		integral_range_value_st.val(""); //积分范围开始
		integral_range_value_end.val(""); //积分范围结束
		integral_num_value_st.val(""); //可用次数开始
		integral_num_value_end.val("");//可用次数结束
		txtBeginDate.val(""); //销售日期开始
		txtEndDate.val(""); //销售日期结束
		unlimited_date.prop("checked",false); //是否不限日期
		date_remarks_value.val(""); //备注说明
	}

	// 查询内容
	function querycontent(){
		var dataval = {
			"code_equipment_value":code_equipment_value.val(), //设备编码
			"code_type_value":code_type_value.val(), //设备类型
			"code_company_value":code_company_value.val(), //公司名称
			"integral_range_value_st":integral_range_value_st.val(), //积分范围开始
			"integral_range_value_end":integral_range_value_end.val(), //积分范围结束
			"integral_num_value_st":integral_num_value_st.val(), //可用次数开始
			"integral_num_value_end":integral_num_value_end.val(), //可用次数结束
			"txtBeginDate":txtBeginDate.val(), //销售日期开始
			"txtEndDate":txtEndDate.val(), //销售日期结束
			"unlimited_date":unlimited_date.prop("checked"), //是否不限日期
			"date_remarks_value":date_remarks_value.val() //备注说明
		}
		//是否不限日期
		if(dataval.unlimited_date){
			dataval.unlimited_date = 1;
		}else{
			dataval.unlimited_date = 0;
		}
		return dataval;
	}
});
