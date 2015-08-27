// Definitions
var tablecolgroup   = '<colgroup><col class="column-item-bullet"><col class="column-item-report"><col class="column-item-remove"></colgroup>';
var tableheader     = '<thead><tr><th></th><th>Report</th><th></th></tr></thead>';
var newrowtemplate  = '<tr><td contenteditable="false">&bullet;</td><td contenteditable="true"></td><td><span class="row-remove" onclick="removerow(this)">&cross;</span></td></tr>';
var addrowtemplate  = '<tr class="table-add-row"><td contenteditable="false"><span class="row-add" onclick="addrow(this)">&plus;</span></td><td contenteditable="false"></td><td></td></tr>';

var addrow = function (event) {
    var $thistablebody  = $(event).parents('tbody')     ;
    var $addrowrow      = $(event).parents('tr'   )     ;

    $addrowrow.remove()                                 ;
    $thistablebody.append($(newrowtemplate))            ;
    $thistablebody.append($(addrowtemplate))            ;
};

var removerow = function (event) {
    $(event).parents('tr').remove()                     ;
};

var createtable = function (tableID){

    var $table = $('<table></table>').attr("id",tableID);

    $table.append($(tablecolgroup   ))                  ;
    $table.append($(tableheader     ))                  ;
    $table.append($(newrowtemplate  ))                  ;
    $table.append($(addrowtemplate  ))                  ;

    return $table
}

var main = function(){
    "use strict"                                        ;
    var $main      = $("main")                          ;
    var $newstable = createtable("news")                ;

    $main.append($newstable)
}

$(document).ready(main());

/*// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.click(function () {
    var $rows = $TABLE.find('tr:not(:hidden)');
    var headers = [];
    var data = [];

    // Get the headers (add special header logic here)
    $($rows.shift()).find('th:not(:empty)').each(function () {
        headers.push($(this).text().toLowerCase());
    });

    // Turn all existing rows into a loopable array
    $rows.each(function () {
        var $td = $(this).find('td');
        var h = {};

        // Use the headers from earlier to name our hash keys
        headers.forEach(function (header, i) {
            h[header] = $td.eq(i).text();
        });

        data.push(h);
    });

    // Output the result
    $EXPORT.text(JSON.stringify(data));
});*/