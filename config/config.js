// Script for configuration page
const currentURLBox = document.querySelector("#api-url");
const currentGif = document.querySelector("#api-current-gif");
const inputBar = document.querySelector("#api-input");
const gifBar = document.querySelector("#api-gif");

chrome.storage.sync.get(['openWeatherAPIURL'], function(url) {
    currentURLBox.innerHTML = url.openWeatherAPIURL;
    })

chrome.storage.sync.get(['startpageGif'], function(gif) {
    currentGif.innerHTML = gif.startpageGif;
    })

$(function() {
    $('form').submit(function() {
        setData(inputBar.value,gifBar.value);
    });
});

const setData = (url,gif) => { 
    chrome.storage.sync.set({'openWeatherAPIURL': url});
    chrome.storage.sync.set({'startpageGif': gif});
 }