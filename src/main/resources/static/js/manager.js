


function addHost(servername,serverhost) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/fileCheckWeb/manager/addHosts",
        data: {
         //   appflag: appflag,
       //     serverid: serverid,
            servername: servername,
            serverhost: serverhost
        },
        success: function (data) {
            initTablesLeft();

        },
        error: function(){
            //  alert(arguments[1]);
        }
    });
    
}

function editHost(serverid,servername,serverhost) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/fileCheckWeb/manager/editHosts",
        data: {
            //   appflag: appflag,
            serverid: serverid,
            servername: servername,
            serverhost: serverhost
        },
        success: function (data) {
            initTablesLeft();

        },
        error: function(){
            //  alert(arguments[1]);
        }
    });
    
}

function delHost(serverid) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/fileCheckWeb/manager/delHosts/"+serverid,
      //  data: {
            //   appflag: appflag,
      //      serverid: serverid,
         //   servername: servername,
         //   serverhost: serverhost
    //    },
        success: function (data) {
            initTablesLeft();

        },
        error: function(){
            //  alert(arguments[1]);
        }
    });
    
}




function ShowApp() {
    var serverid=checkSelected();

    if(serverid!=-1){
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/fileCheckWeb/manager/showApps/"+serverid,
            data: {
              //  appflag: flag,
                serverid: serverid,
              ///  appid:appid,
             //   appname:appname,
             //   apppath:apppath

            },
            success: function (data) {
                refreshStorage(serverid);
            }
        });
    }
}

function addApp(appname,apppath) {

    var serverid=checkSelected();

    if(serverid!=-1){
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/fileCheckWeb/manager/addApps",
            data: {
                //  appflag: flag,
                serverid: serverid,
                ///  appid:appid,
                   appname:appname,
                   apppath:apppath

            },
            success: function (data) {
                refreshStorage(serverid);
            }
        });
    }
}

function editApp(appid,appname,apppath) {

    var serverid=checkSelected();

    if(serverid!=-1){
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/fileCheckWeb/manager/editApps",
            data: {
                //  appflag: flag,
              //  serverid: serverid,
                appid:appid,
                appname:appname,
                apppath:apppath

            },
            success: function (data) {
                refreshStorage(serverid);
            }
        });
    }
}

function delApp(appid) {

    var serverid=checkSelected();

    if(serverid!=-1){
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/fileCheckWeb/manager/delApps/"+appid,
            data: {
                //  appflag: flag,
                //  serverid: serverid,
                appid:appid,
             //   appname:appname,
              //  apppath:apppath

            },
            success: function (data) {
                refreshStorage(serverid);
            }
        });
    }
}



function refreshStorage(serverid) {
    var cacheservierid="fileCheckWebAppData"+serverid;
    //       alert(cacheservierid);

    sessionStorage.removeItem(cacheservierid);
    //    sessionStorage.setItem(cacheservierid, JSON.stringify(data));
    refreshTableRight(serverid);


}


function checkSelected(){

    var rowData = tableleft.rows( { selected: true } ).data().toArray();

    if(rowData.length==0||rowData==null){
        alert("no server selected!");
        return -1;
    }else {

        return rowData[0].id;
    }
}









