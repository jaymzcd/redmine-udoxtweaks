function toJsDate(text) {
    var dateStr = text.split('/');
    var d = new Date(
        parseInt(dateStr[2], 10),
        parseInt(dateStr[0], 10) - 1,
        parseInt(dateStr[1], 10),
        0,
        0,
        0,
        0
    );
    return d;
}

var dateHighlighter = function($) {
    var currentUser = $('#loggedas>a').text();
    var dueCol = ($('table.issues tr>th:nth-child(11)').text() === 'Due date') ? 11 : 12;
    var today = new Date();
    $('table.issues tr>td:nth-child(' + dueCol.toString() +')').each(function() {
        var colorCode = 'none';
        var d = toJsDate($(this).text());
        var rowData = $(this).siblings();
        var cols = rowData.length;

        if(d.getDayOfYear() < today.getDayOfYear() + 4) {
            colorCode = '#fff6ea';
        }

        if(d.getDayOfYear() > today.getDayOfYear() + 4) {
            colorCode = '#ebffea';
        }

        if(d.getDayOfYear() > today.getDayOfYear() + 7) {
            colorCode = '#b8ffb4';
        }

        if(d < today) {
            if($(rowData[cols - 3]).text().replace(' ', '') === currentUser) {
                colorCode = '#ffabab';
            } else {
                colorCode = '#ffeaea';
            }
        }

        if(d.getDayOfYear() === today.getDayOfYear()) {
            colorCode = '#ffd59e';
        }

        console.log(d, isNaN(d.getTime()));
        if (isNaN(d.getTime())) {
            $(this).siblings().css('border', 'dotted 2px #ffabab');
        }

        $(this).parent('tr').css('background-color', colorCode);
    });
};

try {
    jQuery(document).ready(dateHighlighter);
} catch(e) {
    console.log(e);
}