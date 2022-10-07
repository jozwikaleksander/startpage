// Loading gif via JavaScript
const gifTag = document.querySelector('#gif-img');
const gifPath = "img/gif.gif";

chrome.storage.sync.get(['startpageGif'],function(gif){
    if(gif.startpageGif != undefined && gif.startpageGif != ""){
        gifTag.src = gif.startpageGif;
        console.log(gif);
    }
    else{
        gifTag.src = gifPath;
    }
});