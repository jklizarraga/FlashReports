// Definitions
var tablecolgroup   = '<colgroup><col class="column-item-bullet"><col class="column-item-report"><col class="column-item-remove"></colgroup>';
var tableheader     = '<thead><tr><th></th><th>Report</th><th></th></tr></thead>';
var newrowtemplate  = '<tr><td contenteditable="false">&bullet;</td><td contenteditable="true" onkeydown="keyboardinputwhenincell(this, event)" onfocus="onfocuscell(this, event)"></td><td><span class="row-remove" onclick="removerow(this)">&cross;</span></td></tr>';
var addrowfooter    = '<tfoot><tr class="table-add-row"><td contenteditable="false"><span class="row-add" onclick="addrow(this)">&plus;</span></td><td contenteditable="false"></td><td></td></tr></tfoot>';

var addrow = function (event) {
    var  $thistable = $(event).parents('table')                 ;
    $thistable.append($(newrowtemplate))                        ;

    var $newcell = $("tbody:last-child tr:last-child td:nth-child(2)", $thistable);
    $newcell.focus();
    $newcell.empty();
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

var movecarettoend = function(element){
    var selection = window.getSelection()                       ;

    if (selection.rangeCount > 0) selection.removeAllRanges()   ;
    selection.selectAllChildren(element)                        ;
    selection.collapseToEnd()                                   ;
};

var isprintablekey = function(keyCode){
    return ((keyCode >= 48 && keyCode <=90) || (keyCode >= 96 && keyCode <=111) || (keyCode >= 186 && keyCode <=192) || (keyCode >= 219 && keyCode <=222) || keyCode === 32)
};

var isthecaretattheendofthecell =  function(element){
    var cellChildNodes  = element.childNodes                    ;
    var selection       = window.getSelection()                 ;
    var result          = false                                 ;

    var lastnode = function(nodeList){
        return nodeList[nodeList.length - 1]                    ;
    };

    if (selection.isCollapsed && selection.type === "Caret"){
        console.log(selection.anchorNode.isSameNode(lastnode(cellChildNodes)));
        console.log(selection.anchorNode.textContent.length === selection.anchorOffset);
        console.log(selection.anchorNode.isSameNode(element));
        console.log(selection.anchorOffset === (cellChildNodes.length - 1));
        if(selection.anchorNode.isSameNode(lastnode(cellChildNodes)) && selection.anchorNode.textContent.length === selection.anchorOffset){
            result = true;
        } else if (selection.anchorNode.isSameNode(element) && selection.anchorOffset === (cellChildNodes.length - 1)){
            result = true;
        }
    }
    console.log(result);
    console.log(cellChildNodes);
    console.log(selection);

    return result;
};

var keyboardinputwhenincell = function(element, event) {

    var backSpaceKey    = 8                                     ;
    var enterKey        = 13                                    ;
    var arrowUp         = 38                                    ;
    var arrowDw         = 40                                    ;
    var delKey          = 46                                    ;
    var $thisrow        = $(element).parents('tr')              ;
    var celltext        = $(element).text()                     ;

    if (event.keyCode === enterKey && !event.altKey && celltext.length > 0){
        if ($thisrow.is(':last-child')){
            addrow(element)                                     ;
        } else{
            $("td:nth-child(2)", $thisrow.next()).focus()       ;
        }
        event.preventDefault()                                  ;
    }  else if (event.keyCode === arrowDw && !($thisrow.is(':last-child'))){
        $("td:nth-child(2)", $thisrow.next()).focus()           ;
        event.preventDefault()                                  ;
    } else if (event.keyCode === arrowUp && !($thisrow.is(':first-child'))){
        $("td:nth-child(2)", $thisrow.prev()).focus()           ;
        event.preventDefault()                                  ;
    } /*else if (celltext.length > 0 && element.lastChild.nodeName === "BR" && isprintablekey(event.keyCode) && isthecaretattheendofthecell(element)) {
        event.preventDefault()                                  ;
        console.log(event);
        $(element).append(String.fromCharCode(event.keyCode))              ;
        movecarettoend(element)                                 ;
    } else if (event.keyCode === enterKey && event.altKey && celltext.length > 0){
        event.preventDefault()                                  ;
        $(element).append("<br><br>")                               ;
        movecarettoend(element)                                 ;
    }*/

    //isthecaretattheendofthecell(element);
    //console.log(isprintablekey(event.keyCode) && isthecaretattheendofthecell(element));

    if ((event.keyCode === backSpaceKey || event.keyCode === delKey) && celltext.length === 1){
        event.preventDefault()                                  ;
        $(element).empty()                                      ;
    }
};

var onfocuscell = function(element, event){
    var celltext = $(element).text()                            ;

    if (celltext.length > 0){
        movecarettoend(element)                                 ;
    } else {
        $(element).empty()                                      ;
    }
};

var main = function(){
    "use strict"                                                ;

    var tableID     = ["achievements", "news", "issues-concerns", "meeting_conclusions", "future_meetings"              ];
    var tabTXT      = ["Achievements", "News", "Issues/Concerns", "Meeting conclusions", "Meetings to come"   ];

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