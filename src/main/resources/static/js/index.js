

$('#tt').datagrid({
	title:'操作结果',
	rownumbers: true,
	remoteSort:false,
	sortName:'host',
	sortOrder:'asc',
	toolbar:'#tb',
	singleSelect:true,
	columns:[[
		{field:'host',title:'IP地址',width:100,sortable:true},
		// {field:'classcheck',title:'classcheck',width:150},
		{field:'classname',title:'classname',width:150},
		{field:'md5',title:'md5',width:250},
		{field:'time',title:'time',width:150},
		{field:'length',title:'length',width:150},
		{field:'status',title:'status',width:400,formatter:function(value,rowData,rowIndex){
				if (value === "" ||value==null){
					return '<span style="color:red;">未找到</span>';
				} else {
					return value;
				}
			} }


	]]
});


function doSearch(){
	var isSelected = $("#checkAll").attr("checked", true);

	var md=2;
	if(isSelected){
		md=1;
	}

	$.messager.progress({
		title: '请等待',
		msg: '正在进行系统设置',
		text: '处理.......'
	});
	$.ajax({
		url: "/checkServers/checkServersServlet",
		type: "post",
		data:{
			version : $('#checkString').textbox('getValue'),
			md5:md
		},
		datatype:"json",
		success: function(data){
			$('#tt').datagrid('loadData', { total: 0, rows: [] });
			$.messager.progress('close');
			var base=$.parseJSON(data);
			$('#tt').datagrid('loadData', base);
		}
	});
}
