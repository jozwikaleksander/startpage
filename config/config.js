// Script for configuration page
const inputs = [...document.querySelectorAll(".settings-input")];
const importButton = document.querySelector(".import-button");

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
$("#settings-form").submit((e) => {
    e.preventDefault();
    setData(inputs);
    showPopupMessage("Settings saved");
});

// Setting values to user storage
const setData = (inputs) => { 
    inputs.map(input => {
        let inputID = input.id;
        let inputValue = input.value;
        chrome.storage.sync.set({[inputID]:inputValue});
    });
 };

//  Importing settings from JSOn
importButton.addEventListener("click", (e) => {
    e.preventDefault();
    $(".import-popup").toggleClass("hidden");
});

// Close import popup
$("#close-popup-button").click((e) => {
    e.preventDefault();
    $(".import-popup").addClass("hidden");
});

// Import button in the popup
$("#import-popup-button").click((e) => {
    e.preventDefault();
    let TextAreaData = $("#import-textarea").val();
    let importData = JSON.parse(TextAreaData);
    inputs.map(input => {
        let inputID = input.id;
        let inputValue = importData[inputID];
        console.log(inputID, inputValue);
        chrome.storage.sync.set({[inputID]:inputValue});
    });
    $(".import-popup").toggleClass("hidden");
    showPopupMessage("Settings imported");
});

// Export button
$(".export-button").click((e) => {
    e.preventDefault();
    let exportData = {};
    inputs.map(input => {
        let inputID = input.id;
        exportData[inputID] = input.value;
    });
    navigator.clipboard.writeText(JSON.stringify(exportData));
    showPopupMessage("Settings copied to clipboard");
});