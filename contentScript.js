function tryToDoAll () {
    while ( pickOneCourse() ) {
        while( document.getElementById('ddiv1') == null ) {}
        if ( !tryToDoOne() ) {
            alert('Failed!');
            return false;
        }
    }
    alert('All Survey Is Done!');
    return true;
}

function tryToDoOne () {
    var ddiv1Children = document.getElementById('ddiv1').children;
    var innerDoc = null;

    for (var i = 0; i < ddiv1Children.length; i++) {
        if (ddiv1Children[i].nodeName == 'IFRAME') {
            var theIframe = ddiv1Children[i];
            innerDoc = theIframe.contentDocument || theIframe.contentWindow.document;
            break;
        }
    }
    if (innerDoc == null) {
        return false;
    }
    else {
        var succeed = surveying(innerDoc);
        if (!succeed) {
            return false;
        }
        else {
            var counter = 0;
            while (counter < 100000) {
                counter++;
                if ( sendConfirmed(innerDoc) ) {
                    // confirm again
                    // return true;
                }
            }
        }
    }
    return false;
}

function pickOneCourse () {
    var buttons = document.getElementsByName('SelectedItems');
    for (var i = 0; i < buttons.length; i++) {
        if (!buttons[i].disabled) {
            buttons[i].click();
            return true;
        }
    }
    return false;
}

function surveying (innerDoc) {
    var beCheckedValue = 3;

    var surveyTable = innerDoc.getElementById('tbA');
    var rows = null;
    for (var i = 0; i < surveyTable.children.length; i++) {
        if (surveyTable.children[i].nodeName == 'TBODY') {
            rows = surveyTable.children[i].children;
            break;
        }
    }
    if (rows == null) return false;

    // click radio buttons & submit
    for (var i = 0; i < rows.length; i++) {
        var tds = rows[i].children;
        for (var j = 0; j < tds.length; j++) {
            var tdsChld = tds[j].children;
            for (var k = 0; k < tdsChld.length; k++) {
                if (tdsChld[k].nodeName == 'INPUT' && tdsChld[k].getAttribute('type') == 'radio') {
                    if (tdsChld[k].getAttribute('value') == beCheckedValue) {
                        tdsChld[k].checked = true;
                    }
                }
                else if (tdsChld[k].nodeName == 'INPUT' && tdsChld[k].getAttribute('type') == 'button' && tdsChld[k].getAttribute('onclick') == 'doCheck_Preview();') {
                    tdsChld[k].click(); // submit button
                    return true;
                }
            }
        }
    }
    return false;
}

function sendConfirmed (innerDoc) {
    previewTable = innerDoc.getElementById('tbP');
    var rows = null;
    for (var i = 0; i < previewTable.children.length; i++) {
        if (previewTable.children[i].nodeName == 'TBODY') {
            rows = previewTable.children[i].children;
            break;
        }
    }
    if (rows == null) return false;

    // click confirm send button
    for (var i = 0; i < rows.length; i++) {
        var tds = rows[i].children;
        for (var j = 0; j < tds.length; j++) {
            var tdsChld = tds[j].children;
            for (var k = 0; k < tdsChld.length; k++) {
                if (tdsChld[k].nodeName == 'INPUT' && tdsChld[k].getAttribute('type') == 'button' && tdsChld[k].getAttribute('onclick') == 'doSend()') {
                    tdsChld[k].click();
                    return true;
                }
            }
        }
    }
    return false;
}
