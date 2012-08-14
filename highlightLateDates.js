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

    // Issue detail page
    var issueHighlights = function() {
        var d = toJsDate($('.attributes .due-date:last').text());
        if(d < today) {
            $('#content h2').css('background-image', 'url(/themes/a1/images/smooth-gradient-red.jpg)');
            $('.attributes .due-date').css('color', '#f20');
        }
    };

    // Issue list pages
    var issueListHighlights = function () {
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

    switch($('body').attr('class').split(' ').reverse()[0]) {
        case 'action-show':
            issueHighlights();
            break;
        case 'action-index':
            issueListHighlights();
            break;
    }

};

try {
    jQuery(document).ready(dateHighlighter);
} catch(e) {
    console.log(e);
}