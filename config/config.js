// Script for configuration page
const inputs = [...document.querySelectorAll(".settings-input")];

// Getting values from user storage and setting them to HTML tags

inputs.map(input => {
    let inputID = input.id;
    chrome.storage.sync.get([inputID], function(res) {
        if(res[inputID] != undefined && res[inputID] != ""){
            input.value = res[inputID];
            if(input.getAttribute('type') == 'color'){
                updateInput(input);
            }
        }
    });
});

// Submiting form without reloading the website
$(function() {
    $('form').submit(function() {
        setData(inputs);
    });
});

// Setting values to user storage
const setData = (inputs) => { 
    inputs.map(input => {
        let inputID = input.id;
        let inputValue = input.value;
        chrome.storage.sync.set({[inputID]:inputValue});
    });
 };