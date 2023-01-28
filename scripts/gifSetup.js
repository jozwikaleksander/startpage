// Loading gif via JavaScript
const gifTag = document.querySelector('#gif-img');
const gifDefault = "img/gif.gif";
const gifPath = "";

gifTag.src = gifDefault;

chrome.storage.sync.get(['startpageGif'],function(gif){
    if(gif.startpageGif != undefined && gif.startpageGif != ""){
        assignGif(gif.startpageGif);
    }
    else{
        gifTag.src = gifDefault;
    }
});

const assignGif = (gif) => {
    $.get(gif)
    .done(function() { 
        gifTag.src = gif;

    }).fail(function() { 
        gifTag.src = gifDefault;
    })
}