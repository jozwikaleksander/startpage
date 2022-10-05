chrome.storage.sync.get(['accentColor'], function(color) {
    if(color.accentColor){
        document.body.style = "--accent-color: " +color.accentColor;
    }
    else{
        document.body.style = "--accent-color: " +"#b8bb26";
    }
    })