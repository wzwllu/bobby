
function allAction(){
    stopTime();
    $('#resultMode').show();
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
            if (data.no == "-1") {
                allAction();
            } else {
                showDate(data);
            }
        }

    });
}

function newAction(){
    $('#startInit').show();
    $('#count').val(100);
    $('#addScale').val(25);
    $('#subScale').val(25);
     $('#mutliScale').val(25);
     $('#divScale').val(25);
     $('#hard').val(50);
     $('#addmax').val(100);
      $('#submax').val(100);
     $('#mutlimax').val(10);
     $('#divmax').val(10);

}

function btnAction() {

    startTime();

    $.ajax({
        url: "startMath",
        type: "post",
        data: {
            count:$('#count').val(),
            addScale:$('#addScale').val(),
            subScale:$('#subScale').val(),
            mutliScale:$('#mutliScale').val(),
            divScale:$('#divScale').val(),
            hard:$('#hard').val(),
            addmax:$('#addmax').val(),
            submax:$('#submax').val(),
            mutlimax:$('#mutlimax').val(),
            divmax:$('#divmax').val()
        },
        datatype: "json",
        timeout : 60000,
      success: function (data) {
          $('#startInit').hide();
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

    $('#result').text("第"+ (parseInt(data.no)+1)+"题");
    $('#result').val(data.no);


    if(data.max!=""){
        $('#maxmath').html("<input id=\"maxmathvalue\" type=\"text\"  readonly=\"readonly\" style=\"border-style:none\">");
        $('#maxmathvalue').val(data.max);
    }else {
        $('#maxmath').html("<input id=\"resultMath\" type=\"text\" >")
    }
    if(data.min!=""){
        $('#minmath').html("<input  id=\"minmathvalue\" type=\"text\"  readonly=\"readonly\" style=\"border-style:none\">");
        $('#minmathvalue').val(data.min);
    }else {
        $('#minmath').html("<input id=\"resultMath\" type=\"text\" >")
    }
    if(data.count!=""){
        $('#outcome').html("<input   id=\"resultMathvalue\" type=\"text\" readonly=\"readonly\" style=\"border-style:none\">");
        $('#resultMathvalue').val(data.count);
    }else {
        $('#outcome').html("<input id=\"resultMath\" type=\"text\" >")
    }
    $('#resultMath').css("height",$('#mathFlag').height())
    $('#maxmathvalue').css("height",$('#mathFlag').height())
    $('#minmathvalue').css("height",$('#mathFlag').height())
    $('#resultMathvalue').css("height",$('#mathFlag').height())
    $('#resultMath').css("width",$('#mathFlag').width()*1.5)
    $('#maxmathvalue').css("width",$('#mathFlag').width()*1.5)
    $('#minmathvalue').css("width",$('#mathFlag').width()*1.5)
    $('#resultMathvalue').css("width",$('#mathFlag').width()*1.5)
    $('#resultMath').focus();


}

let timer = null;


function startTime(){
    let sec =0;
    timer= setInterval(function(){
             sec++;
           $('#hours').text(formatSeconds(sec));}
           ,1000)

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

function finger(num) {
    let oldnum= $('#resultMath').val();
    if(oldnum==""){
        oldnum=0;
    }
    var newnum =parseInt(oldnum)*10+parseInt(num);
    $('#resultMath').val(newnum);


}
function clearAction() {
    $('#resultMath').val("");
}

