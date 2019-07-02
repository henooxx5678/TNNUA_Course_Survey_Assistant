chrome.runtime.onInstalled.addListener(function() {

});

chrome.pageAction.onClicked.addListener(function(tab) {
    alert('c');
});
