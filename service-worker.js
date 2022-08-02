function onClickHandler(info, tab) {
    chrome.storage.local.get('pre_fills', function (item) {
        let pre_fills = item.pre_fills;
        if (pre_fills !== undefined) {
            let prefill = pre_fills.find(obj => {
                return obj.name === info.menuItemId
            });
            sendPasteToContentScript(prefill.message);
        }
    });
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.storage.local.get('pre_fills', function (item) {
    let pre_fills = item.pre_fills;
    if (pre_fills !== undefined) {
        for (let i = 0; i < pre_fills.length; i++) {
            let prefill = pre_fills[i];
            chrome.contextMenus.create({
                title: prefill.name,
                contexts: ["editable"],
                id: prefill.name,
            });
        }
    }
});


/**
 * Send the value that should be pasted to the content script.
 */
function sendPasteToContentScript(toBePasted) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { data: toBePasted });
    });
}


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        // do your things
        let url = tab.url;
        console.log('url:', url);
        // if (url.indexOf('https://www.upwork.com') > -1) {
        //     console.log('upwork');
        //     chrome.scripting.insertCSS({
        //         target: {
        //             tabId: tabId
        //         },
        //         files: ['content/css/upwork.css'],
        //     }, () => { });


        //     if (url.indexOf('https://www.upwork.com/nx/find-work/') > -1) {
        //         chrome.scripting.executeScript(
        //             {
        //                 target: { tabId: tabId },
        //                 files: ['content/js/upwork.js'],
        //             },
        //             (injectionResult) => {
        //                 console.log('injectionResult: ' + injectionResult);
        //             });
        //     }
        // }
        // else if (url.indexOf('https://www.freelancer.com/') > -1) {
        //     console.log('freelancer');
        //     chrome.scripting.insertCSS({
        //         target: {
        //             tabId: tabId
        //         },
        //         files: ['content/css/freelancer.css'],
        //     },
        //         () => { });

        //     if (url.indexOf('https://www.freelancer.com/search/projects/') > -1)
        //         chrome.scripting.executeScript(
        //             {
        //                 target: { tabId: tabId },
        //                 files: ['content/js/freelancer.js'],
        //             },
        //             (injectionResult) => {
        //                 console.log('injectionResult: ' + injectionResult);
        //             });
        // }
        // else {
        //     console.log('others');
        //     chrome.scripting.insertCSS({
        //         target: {
        //             tabId: tabId
        //         },
        //         files: ['content/css/content.css'],
        //     }, () => { });
        // }

    }
})