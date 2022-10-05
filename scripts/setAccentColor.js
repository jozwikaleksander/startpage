chrome.storage.sync.get(['accentColor'], function(color) {
    document.body.style = "--accent-color: " +color.accentColor;
    })