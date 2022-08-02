function insertTextAtCursor(text) {
    var el = document.activeElement;
    var val = el.value;
    var endIndex;
    var range;
    var doc = el.ownerDocument;
    if (typeof el.selectionStart === 'number' &&
        typeof el.selectionEnd === 'number') {
        endIndex = el.selectionEnd;
        el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
        el.selectionStart = el.selectionEnd = endIndex + text.length;
    } else if (doc.selection !== 'undefined') {
        el.focus();
        range = doc.getSelection();
        range.text = text;
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    insertTextAtCursor(request.data);
    console.log(request);
    sendResponse({ status: 'success' });
});