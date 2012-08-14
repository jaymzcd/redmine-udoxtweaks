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

jQuery(document).ready(function($) {
    var currentUser = $('#loggedas>a').text();
    var dueCol = ($('table.issues tr>th:nth-child(11)').text() === 'Due date') ? 11 : 12;
    var today = new Date();
    $('table.issues tr>td:nth-child(' + dueCol.toString() +')').each(function() {
        var colorCode = 'none';
        var d = toJsDate($(this).text());
        var rowData = $(this).siblings();
        var cols = rowData.length;
        if(d < today) {
            if($(rowData[cols - 3]).text().replace(' ', '') === currentUser) {
                colorCode = '#ffabab';
            } else {
                colorCode = '#ffeaea';
            }
            console.log(currentUser, $(rowData[cols - 3]).text());
            $(this).parent('tr').css('background-color', colorCode);
        }
    });
});