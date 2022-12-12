// Loading gif via JavaScript
const gifTag = document.querySelector('#gif-img');
const gifPath = "img/gif.gif";

gifTag.src = gifPath;

chrome.storage.sync.get(['startpageGif'],function(gif){
    if(gif.startpageGif != undefined && gif.startpageGif != ""){
        gifTag.src = gif.startpageGif;
    }
    else{
        gifTag.src = gifPath;
    }
});