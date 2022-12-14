// Loading gif via JavaScript
const gifTag = document.querySelector('#gif-img');
const gifDefault = "img/gif.gif";
const gifPath = "";

gifTag.src = gifDefault;

// TODO: Somehow I need to be able to find if gif can be accessed

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