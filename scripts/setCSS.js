// Script for configuration page
const valuesToSetup = ['accentColor','foregroundColor','backgroundColor','fontColor','fontHoverColor','fontFamily','fontSize','gifAuto','gifX','gifY','gifWidth','gifHeight','gifZoom'];

// Getting values from user storage and setting them to HTML tags

let gifSetAuto = false;

valuesToSetup.map(value => {
    chrome.storage.sync.get([value], function(res) {
        if(res[value] != undefined && res[value] != ""){
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
            else if(value == "gifWidth" || value == "gifHeight"){
                if(!gifSetAuto){
                    document.body.style.setProperty(  '--'+value,res[value]+"px");
                }
            }
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