
function allAction(){


    $.ajax({
        url: "endtoMath",
        type: "post",
        data: {
             },
        datatype: "json",
        timeout : 60000,
        success: function (data) {

            let wrongDo=0;
            let str="";
            for (i = 0; i < data.length; i++) {
                if(data[i].rightOrWrong){
                    str=str+"<div class=\"col-xs-12  col-sm-12 col-md-3\" style=\"text-align: center;font-size:20px;color:green\">"+data[i].showStr+"</div>";
                }else{
                    wrongDo++;
                    str=str+"<div class=\"col-xs-12  col-sm-12 col-md-3\" style=\"text-align: center;font-size:20px;color:red\">"+data[i].showStr+"</div>";
                }

            }
            $('#allresulttitle').html("<h3>共"+data.length+"题，错误"+wrongDo+"题</h3>");
            $('#allresult').html(str);
        }

    });
}




function mathAction(){


    $.ajax({
        url: "toMath",
        type: "post",
        data: {
            no: $('#result').val(),
            ans: $('#resultMath').val()

        },
        datatype: "json",
        timeout : 60000,
        success: function (data) {
            showDate(data);
        }

    });
}


function btnAction() {
    $.ajax({
        url: "startMath",
        type: "post",
        data: {
        },
        datatype: "json",
        timeout : 60000,
      success: function (data) {
          showDate(data);
          $('#allresult').html();
        }

    });


}

function showDate(data){
    if(data.flag=="1"){
        $('#mathFlag').attr("src", "images/add.jpg");
    }else if(data.flag=="2"){
        $('#mathFlag').attr("src", "images/sub.jpg");
    }else if(data.flag=="3"){
        $('#mathFlag').attr("src", "images/mutli.jpg");
    }else if(data.flag=="4"){
        $('#mathFlag').attr("src", "images/div.jpg");
    }

    $('#result').text("第"+ data.no+"题");
    $('#result').val(data.no);


    if(data.max!=""){
        $('#maxmath').text(data.max);
    }else {
        $('#maxmath').html("<input id=\"resultMath\" type=\"text\" class=\"div2\" style=\"width:80%;\">")
    }
    if(data.min!=""){
        $('#minmath').text(data.min);
    }else {
        $('#minmath').html("<input id=\"resultMath\" type=\"text\" class=\"div2\" style=\"width:80%;\">")
    }
    if(data.count!=""){
        $('#outcome').text(data.count);
    }else {
        $('#outcome').html("<input id=\"resultMath\" type=\"text\" class=\"div2\" style=\"width:80%;\">")
    }
    $('#resultMath').css("height",$('#mathFlag').height())
}





