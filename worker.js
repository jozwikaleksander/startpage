const valuesToSetup = ['accentColor','foregroundColor','backgroundColor','fontColor','fontHoverColor','fontFamily','fontSize','gifAuto','gifX','gifY','gifWidth','gifHeight','gifZoom','startpageGif'];
let settings = {};
console.log("Worker running");
chrome.storage.sync.get([...valuesToSetup],function(res){
    settings = res;
    console.log("I received data from storage.");
});
addEventListener("message", (event) => {
    console.log("I got a message");
    event.source.postMessage(settings);
})