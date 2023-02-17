// Script for configuration page
const valuesToSetup = ['accentColor','foregroundColor','backgroundColor','fontColor','fontHoverColor','fontFamily','fontSize','gifAuto','gifX','gifY','gifWidth','gifHeight','gifZoom'];

// Getting values from user storage and setting them to HTML tags

let gifSetAuto = false;

valuesToSetup.map(value => {
    chrome.storage.sync.get([value], function(res) {
        if(res[value] != undefined && res[value] != ""){
            // Depending on gifAuto state we set gif settings to be visible or not, and set gif max-width to 30% of screen
            if(value == 'gifAuto'){
                if(res[value] == 'on'){
                    gifSetAuto = true;
                    if($('.left')){
                        $('.left').css("max-width","30%")
                    }
                    if($('.gif-settings')){
                        $('.gif-settings').css("display","none");
                    }
                }
            }
            // Adding px to property value
            else if(value == "gifWidth" || value == "gifHeight"){
                if(!gifSetAuto){
                    document.body.style.setProperty(  '--'+value,res[value]+"px");
                }
            }
            // Adding % to property value
            else if(value == 'gifX' || value == 'gifY'){
                if(!gifSetAuto){
                    document.body.style.setProperty(  '--'+value,res[value]+"%");
                }
            }
            else{
                document.body.style.setProperty(  '--'+value,res[value]);
            }
        }
    });
});