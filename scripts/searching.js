const search = document.querySelector("#search");
let searchURL = "https://www.google.com/search?q="; 

chrome.storage.sync.get(['searchEngine'], function(res) {
    if(res.searchEngine != undefined && res.searchEngine != ""){
        searchURL = res.searchEngine;
    }
});

// Matching bookmark based of value in search bar
$("#search").on('keypress keyup change input', function() { 
    let arrival = $(this).val().toLowerCase();
    if(arrival.indexOf("*") === 0){
        currentMatch = findMatch(arrival.slice(1),links);
    }
    else if(arrival.slice(0, 2) == "r/"){
        currentMatch = findMatch(arrival.slice(2),links);
    }
    else if(/localhost:\d+/.test(arrival)){
        currentMatch = [{
            "url": `http://${arrival}`
        }]
    }
    else if(/tr-[a-z][a-z][a-z]?=/g.test(arrival)){
        let rest = arrival.slice(3).split("=");
        let options = rest[0];
        let search = rest.slice(1).join("=");
        currentMatch = [{
            "url": `https://translate.google.com/?sl=auto&tl=${options}&text=${search}&op=translate`
        }]
    }
    else{
        matches.innerHTML = "";
        currentMatch = [];
    }
});
// Submiting search
$(document).keyup(function(e) {
    if (e.key === "Enter") {
        if(currentMatch.length == 0){
            window.open(searchURL+encodeURIComponent(search.value),'_self');
        }
        else{
            window.open(currentMatch[0].url,'_self');
        }
   }
});