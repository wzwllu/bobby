
function mathAction(){

    alert("提交");
}


function btnAction() {
    var serverlist=[];
    $("#searchable option:selected").each(function() {
        serverlist.push($(this).val());
    });
    var check1= $('#ex1').is(':checked');
    var check2= $('#ex2').prop("checked");
    var check3= $('#ex3').prop("checked");
    var checkvalue1=0;
    var checkvalue2=0;
    var checkvalue3=1;
    if(check1){
        checkvalue1=1;
    }
    if(check2){
        checkvalue2=1;
    }
    if(check3){
        checkvalue3=0;
    }

    $.ajax({
        url: "/fileCheckWeb/checkService/exeCheck",
        type: "post",
        data: {
            version: $('#classsearch').val(),
            severlist: serverlist.toString(),
            issame:checkvalue1,
            md5:  checkvalue2,
            nocache:checkvalue3

        },
        datatype: "json",
        timeout : 60000,
        error : function(){
            $("#myModal .modal-header").html("<h2>War Check Error<h2>");//更改模态框的标题，显示正在操作
            $('#modelclosebtn').removeClass("btn-primary").addClass("btn-success").prop('disabled', false);
        },
        beforeSend: function () { //执行前事件
            $('#myModal').modal({backdrop: 'static', keyboard: false});
            $("#myModal").modal('show');//显示模态框
            $("#myModal .modal-header").html("<h2>Getting War Check Info.....<h2>");//更改模态框的标题，显示正在操作
            value=0;
            setTimeout(increment,100);
        },
        success: function (data) {

            $('#myModal').modal('hide');
            if(data!=null){
                // var base= JSON.parse(data);

                var table= $('#datatable').dataTable();
                $('#result').html(data.msg).css("style", "white-space: normal; word-wrap: break-word; word-break: break-all");
                //     table.clear().draw();
                table.fnClearTable();
                //  table.rows.add(base.rows).draw();
                table.fnAddData(data.rows,true);
            }else{
                alert('操作有误，或者没有数据')
            }


        }

    });


}


