// Definitions
var tablecolgroup   = '<colgroup><col class="column-item-bullet"><col class="column-item-report"><col class="column-item-remove"></colgroup>';
var tableheader     = '<thead><tr><th></th><th>Report</th><th></th></tr></thead>';
var newrowtemplate  = '<tr><td contenteditable="false">&bullet;</td><td contenteditable="true" onkeydown="keyboardinputwhenincell(this, event)" onfocus="onfocuscell(this, event)"></td><td><span class="row-remove" onclick="removerow(this)">&cross;</span></td></tr>';
var addrowfooter    = '<tfoot><tr class="table-add-row"><td contenteditable="false"><span class="row-add" onclick="addrow(this)">&plus;</span></td><td contenteditable="false"></td><td></td></tr></tfoot>';

var addrow = function (event) {
    var  $thistable = $(event).parents('table')                 ;
    $thistable.append($(newrowtemplate))                        ;
    $("tbody:last-child tr:last-child td:nth-child(2)", $thistable).focus();
};

var removerow = function (event) {
    $(event).parents('tr').remove()                             ;
};

var createtable = function (tableID){

    var $table = $('<table></table>').attr("id",tableID)        ;

    $table.append($(tablecolgroup   ))                          ;
    //$table.append($(tableheader     ))                          ;
    $table.append($(addrowfooter    ))                          ;
    $table.append($(newrowtemplate  ))                          ;

    return $table
};

var activatetab = function(element){
    var $activetab      = $(".tabs span.active")                ;
    var $activetable    = $(".content #" + $activetab.attr('id'));
    var $newactivetab   = $(element)                            ;
    var $newactivetable = $(".content #" + element.id)          ;

    $activetab.removeClass("active")                            ;
    $activetable.css("display","none")                          ;

    $newactivetab.addClass("active")                            ;
    $newactivetable.css("display","table")                      ;
    $("tbody:last-child tr:last-child td:nth-child(2)", $newactivetable).focus();
};

var keyboardinputwhenincell = function(element, event) {

    var  $thisrow = $(element).parents('tr')                    ;

    if (event.keyCode === 13 && !event.altKey){
        event.preventDefault()                                  ;
        if ($thisrow.is(':last-child')){
            addrow(element)                                     ;
        } else{
            $("td:nth-child(2)", $thisrow.next()).focus()       ;
        }
    } else if (event.keyCode === 13 && event.altKey){
        $(element).append("<br><br>")                           ;
    }

};

var onfocuscell = function(element, event){
    var celltext = $(element).text()                            ;

    if (celltext.length > 0){
        var selection = window.getSelection()                   ;

        if (selection.rangeCount > 0) selection.removeAllRanges();
        selection.selectAllChildren(element)                    ;
        selection.collapseToEnd()                               ;
    }
};

var main = function(){
    "use strict"                                                ;

    var tableID     = ["achievements", "news", "issues-concerns", "meeting_conclusions", "future_meetings"              ];
    var tabTXT      = ["Achievements", "News", "Issues/Concerns", "Meeting conclusions", "Important meetings to come"   ];

    var $maintabs   = $("main .tabs")                           ;
    var $maintables = $("main .content")                        ;

    tabTXT.forEach(function(element, index){
        var tab = '<span id="'+ tableID[index] + '" onclick="activatetab(this)">' + element + '</span>' ;
        $maintabs.append(tab);
    });

    tableID.forEach(function(element){
        var $table = createtable(element)                       ;
        $maintables.append($table)                              ;
        $table.css("display", "none")                           ;
    });

    $(".tabs    #achievements").addClass("active")              ;
    $(".content #achievements").css("display", "table")         ;
    $(".content #achievements tbody:last-child tr:last-child td:nth-child(2)").focus();

};

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