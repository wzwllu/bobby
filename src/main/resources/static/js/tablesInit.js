/* Formating function for row details */
function fnFormatDetails ( oTable, nTr )
{
    var aData = oTable.fnGetData( nTr );
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
    sOut += '<tr><td>Rendering engine:</td><td>'+aData[1]+' '+aData[4]+'</td></tr>';
    sOut += '<tr><td>Link to source:</td><td>Could provide a link here</td></tr>';
    sOut += '<tr><td>Extra info:</td><td>And any further details here (images etc)</td></tr>';
    sOut += '</table>';

    return sOut;
}

/*
 * Insert a 'details' column to the table
 */
var nCloneTh = document.createElement( 'th' );
var nCloneTd = document.createElement( 'td' );
nCloneTd.innerHTML = '<img class="toggle-details" src="/fileCheckWeb/images/plus.png" />';
nCloneTd.className = "center";

$('#datatable-icons thead tr').each( function () {
    this.insertBefore( nCloneTh, this.childNodes[0] );
} );

$('#datatable-icons tbody tr').each( function () {
    this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
} );

/*
 * Initialse DataTables, with no sorting on the 'details' column
 */
var oTable = $('#datatable-icons').dataTable( {
    "aoColumnDefs": [
        { "bSortable": false, "aTargets": [ 0 ] }
    ],
    "aaSorting": [[1, 'asc']]
});

/* Add event listener for opening and closing details
 * Note that the indicator for showing which row is open is not controlled by DataTables,
 * rather it is done here
 */
$('#datatable-icons').delegate('tbody td img','click', function () {
    var nTr = $(this).parents('tr')[0];
    if ( oTable.fnIsOpen(nTr) )
    {
        /* This row is already open - close it */
        this.src = "/fileCheckWeb/images/plus.png";
        oTable.fnClose( nTr );
    }
    else
    {
        /* Open this row */
        this.src = "/fileCheckWeb/images/minus.png";
        oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
    }
} );

$('.dataTables_filter input').addClass('form-control').attr('placeholder','Search');
$('.dataTables_length select').addClass('form-control');