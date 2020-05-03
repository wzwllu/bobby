var editor; // use a global for the submit and return data rendering in the examples
var tableleft;

$(document).ready(function() {

    tableleft  =  $('#tableleft').DataTable( {
        dom: "Bfrtip",

        order: [[ 2, 'asc' ]],
        columns: [
           {
              data: null,
             defaultContent: '',
           className: 'select-checkbox',
            orderable: false
           },
            { data: "id" ,"sClass":"hidden"},
	     	{ data: "name" },
            { data: "host",
                render: function ( data, type, row, meta ) {
                return type === 'display' && data.length > 50 ?
                    '<span title="'+data+'">'+data.substr( 0, 48 )+'...</span>' :
                    data;
            } }
        ],
       select: {
            style:    'os',
            selector: 'td:first-child'
        },
         buttons: [
             {
                 text: 'ADD',
                 attr:  {

                     id: 'AddButton'
                 },
                 action: function ( e, dt, node, config ) {
                 $.magnificPopup.open({
                         items: {
                             src: '#editor'
                         },

                         type: 'inline',
                         preloader: true,
                         focus: '#servername',
                         modal: true,

                     });


                 }
             },
             {
                 text: 'EDIT',
                 attr:  {

                     id: 'editButton'
                 },
                 enabled: false,
                 action: function ( e, dt, node, config ) {
                     var date =   dt.rows( { selected: true } ).data();
                     if(date[0]!=null){
                         $('#serverid').val(date[0].id);
                         $('#servername').val(date[0].name);
                         $('#serverpath').val(date[0].host);

                         $.magnificPopup.open({
                             items: {
                                 src: '#editor'
                             },

                             type: 'inline',
                             preloader: true,
                             focus: '#servername',
                             modal: true,

                         });


                     }


                 }
             }, {
                 text: 'DEL',
                 attr:  {

                     id: 'delButton'
                 },
                 enabled: false,
                 action: function ( e, dt, node, config ) {
                     var date =   dt.rows( { selected: true } ).data();
                     if(date[0]!=null){
                         $('#delserverid').val(date[0].id);
                         $('#delSeverid').text("Do you want to del "+date[0].name);
                         $.magnificPopup.open({
                             items: {
                                 src: '#delServer'
                             },

                             type: 'inline',
                             preloader: false,
                             focus: false,
                             modal: true



                         });
                     }


                 }
             },
    	{ extend: 'excelHtml5',
            customize: function( xlsx ) {
                var sheet = xlsx.xl.worksheets['sheet1.xml'];

                $('row c[r^="C"]', sheet).attr( 's', '2' );
            }
			}
        ]
    }
    );
    tableleft.on( 'select', function ( e, dt, type, indexes ) {
        tableleft.button(1).enable();
        tableleft.button(2).enable();
            var rowData = tableleft.rows( indexes ).data().toArray();
		//	alert(rowData[0].id+"catch id");
            refreshTableRight(rowData[0].id);

           
        } )
        .on( 'deselect', function ( e, dt, type, indexes ) {
            tableleft.button(1).disable();
            tableleft.button(2).disable();
            $('#tableright').DataTable().clear().draw();
        } );


    tableleft.buttons().container()
        .appendTo( $('.col-sm-6:eq(0)', tableleft.table().container() ) );
  //  tableleft.button(1).disable();
   // tableleft.button(2).disable();

    $(document).on('click', '.modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    /*
    Modal Confirm
    */
    $(document).on('click', '#DelSubmit', function (e) {
        delHost($('#delserverid').val());
        new PNotify({
            title: 'Success!',
            text: 'DEL : '+$('#delserverid').val(),
            type: 'success'
        });
        e.preventDefault();
        $.magnificPopup.close();
    });

    $(document).on('click', '#HostSubmit', function (e) {
        if($('#servername').val()==""||$('#serverpath').val()=="") {
            new PNotify({
                title: 'Bad Date!',
                text: 'ServerName !=null || ServerPath !=null',
                type: 'failure'
            });
            e.preventDefault();
            $.magnificPopup.close();
        }else{


        if($('#serverid').val()===""){
            addHost($('#servername').val(),$('#serverpath').val());
            new PNotify({
                title: 'Success!',
                text: 'Add'+$('#servername').val()+":"+$('#serverpath').val(),
                type: 'success'
            });
        }else{
            editHost($('#serverid').val(),$('#servername').val(),$('#serverpath').val());
            new PNotify({
                title: 'Success!',
                text: 'Edit:'+$('#serverid').val(),
                type: 'success'
            });
        }
        e.preventDefault();
        $.magnificPopup.close();
        }
    });



    initTablesLeft();

} );

function initTablesLeft() {
        tableleft.clear().draw();
        $.ajax({
            type: "POST",
            dataType: "json",
    //        url: "/fileCheckWeb/serverManagerServlet",
            url: "/fileCheckWeb/manager/showHosts",
            data: {
                appflag: "10",

            },
            success: function (data) {
                if(data!=null){
                //    sessionStorage.removeItem("fileCheckWebHostData");
               //     sessionStorage.setItem("fileCheckWebHostData", JSON.stringify(data));
                    tableleft.rows.add(data.rows).draw();
                }
            }
        });





}