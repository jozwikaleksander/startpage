// Loading gif via JavaScript
const gifTag = document.querySelector('#gif-img');

chrome.storage.sync.get(['startpageGif'],function(gif){
    if(gif.startpageGif != undefined && gif.startpageGif != ""){
        assignGif(gif.startpageGif);
    }
});

const assignGif = (gif) => {
    $.get(gif)
    .done(function() { 
        gifTag.src = gif;

    })
}