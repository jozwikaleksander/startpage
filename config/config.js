// Script for configuration page
const inputs = [...document.querySelectorAll(".settings-input")];
const importButton = document.querySelector(".import-button");

// Getting values from user storage and setting them to HTML tags
const setInputs = () => {
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
}
setInputs();

// Submiting form without reloading the website
$("#settings-form").submit((e) => {
    e.preventDefault();
    setData(inputs);
    showPopupMessage("Settings saved");
});

// Setting values to user storage
const setData = (inputs) => { 
    console.log(inputs);
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

// Reset button
$("#settings-reset").click((e) => {
    e.preventDefault();
    inputs.map(input => {
        let inputID = input.id;
        let inputValue = defaultConfig[inputID];
        chrome.storage.sync.set({[inputID]:inputValue});
    });
});

// Sliders
$("input[type=range]").change((e) => {
    let id = e.target.id;
    let value = e.target.value;

    // Depending on the id of the slider, it will change the CSS
    switch(id){
        case 'gifX':
            $('#gif-img').css('left',value+"%");
            $("#"+id+"Display").text(value+"%");
            break;
        case 'gifY':
            $('#gif-img').css('top',value+"%");
            $("#"+id+"Display").text(value+"%");
            break;
        case 'gifWidth':
            $('.gif').css('width',value+"px");
            $("#"+id+"Display").text(value+"px");
            break;
        case 'gifHeight':
            $('.gif').css('height',value+"px");
            $("#"+id+"Display").text(value+"px");
            break;
        case 'gifZoom':
            $('#gif-img').css('transform',"scale("+value+")");
            $("#"+id+"Display").text(value);
            break;
    }
})

// Function for gifAuto checkbox
$("#gifAuto").click((e) => {
    e.preventDefault();
    if(e.target.value == "on"){
        $(".gif-settings").css("display","flex");
        $(e.target).prop("value","off");
        $(e.target).prop("checked",false);
    }
    else{
        $(".gif-settings").css("display","none");
        $(e.target).prop("value","on");
        $(e.target).prop("checked",true);
    }
})