// Script for configuration page
const valuesToSetup = ['accentColor','foregroundColor','backgroundColor','fontColor','fontHoverColor','fontFamily','fontSize','gifAuto','gifX','gifY','gifWidth','gifHeight','gifZoom','startpageGif'];

// Getting values from user storage and setting them to HTML tags

let gifSetAuto = false;
let settings = {};
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./worker.js');
    navigator.serviceWorker.addEventListener('message', event => {
        // event is a MessageEvent object
        settings = event.data;

        console.log(settings);

        valuesToSetup.map(value => {
            if(settings[value] != undefined && settings[value] != ""){
                // Depending on gifAuto state we set gif settings to be visible or not, and set gif max-width to 30% of screen
                if(value == 'gifAuto'){
                    if(settings[value] == 'on'){
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
                        document.body.style.setProperty(  '--'+value,settings[value]+"px");
                    }
                }
                // Adding % to property value
                else if(value == 'gifX' || value == 'gifY'){
                    if(!gifSetAuto){
                        document.body.style.setProperty(  '--'+value,settings[value]+"%");
                    }
                }
                else if(value == 'startpageGif'){
                    const gifTag = document.querySelector('#gif-img');
                    if(gifTag){
                        gifTag.src = settings[value];
                    }
                }
                else{
                    document.body.style.setProperty(  '--'+value,settings[value]);
                }
            }
        });
      });
    
      navigator.serviceWorker.ready.then( registration => {
        registration.active.postMessage("Get settings");
      });
  }