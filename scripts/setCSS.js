// Script for configuration page
const valuesToSetup = ['accentColor','foregroundColor','backgroundColor','fontColor','fontHoverColor','fontFamily','fontSize'];

// Getting values from user storage and setting them to HTML tags

valuesToSetup.map(value => {
    chrome.storage.sync.get([value], function(res) {
        if(res[value] != undefined && res[value] != ""){
            document.body.style.setProperty(  '--'+value,res[value]);
        }
    });
});