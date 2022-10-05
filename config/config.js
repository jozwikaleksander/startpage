// Script for configuration page

// Current values
const currentURLBox = document.querySelector("#api-url");
const currentGif = document.querySelector("#api-current-gif");
const currentColor = document.querySelector("#api-current-color");

// HTML tags
const inputBar = document.querySelector("#api-input");
const gifBar = document.querySelector("#api-gif");
const colorPicker = document.querySelector("#api-color");


chrome.storage.sync.get(['openWeatherAPIURL'], function(url) {
    currentURLBox.innerHTML = url.openWeatherAPIURL;
    })

chrome.storage.sync.get(['startpageGif'], function(gif) {
    currentGif.innerHTML = gif.startpageGif;
    })
chrome.storage.sync.get(['accentColor'], function(color) {
    currentColor.innerHTML = color.accentColor;
    })

$(function() {
    $('form').submit(function() {
        setData(inputBar.value,gifBar.value,colorPicker.value);
    });
});

const setData = (url,gif,color) => { 
    console.log(color);
    chrome.storage.sync.set({'openWeatherAPIURL': url});
    chrome.storage.sync.set({'startpageGif': gif});
    chrome.storage.sync.set({'accentColor': color});
 }