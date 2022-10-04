// Loading gif via JavaScript
const gifTag = document.querySelector('#gif-img');
const gifPath = "img/green.gif";

chrome.storage.sync.get(['startpageGif'],function(gif){
    console.log(gif.start);
    gifTag.src = gif.startpageGif;
});