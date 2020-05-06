
function allAction(){
    stopTime();

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
    startTime();
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

let timer = null;


function startTime(){

    timer= setInterval(function(){

    $.ajax({
        url: "getTime",
        type: "post",
        data: {
        },
        datatype: "json",
        timeout : 60000,
        success: function (data) {

           $('#hours').text(formatSeconds(data/1000));} }
           ,1000)


    });



}


function stopTime(){
    clearInterval(timer);
}

//将秒数转换为时分秒格式
function formatSeconds(value) {

    var theTime = parseInt(value);// 秒
    var middle= 0;// 分
    var hour= 0;// 小时

    if(theTime > 60) {
        middle= parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(middle> 60) {
            hour= parseInt(middle/60);
            middle= parseInt(middle%60);
        }
    }
    var result = ""+parseInt(theTime)+"秒";
    if(middle > 0) {
        result = ""+parseInt(middle)+"分"+result;
    }
    if(hour> 0) {
        result = ""+parseInt(hour)+"小时"+result;
    }
    return result;
}


