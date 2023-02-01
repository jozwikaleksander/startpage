const search = document.querySelector("#search");
let searchURL = "https://www.google.com/search?q="; 

chrome.storage.sync.get(['searchEngine'], function(res) {
    if(res.searchEngine != undefined && res.searchEngine != ""){
        searchURL = res.searchEngine;
    }
});

// Matching bookmark based of value in search bar
$(search).on('keypress keyup change input', function() { 
    let arrival = $(this).val().toLowerCase();
    if(arrival.indexOf("*") === 0){
        // Bookmarksg
        currentMatch = findMatch(arrival.slice(1),links);
    }
    else if(arrival.slice(0, 2) == "r/"){
        // Reddit subreddits
        currentMatch = findMatch(arrival.slice(2),links);
    }
    else if(arrival.slice(0,2) == "y/"){
        // Youtube
        currentMatch = [{
            "url": `https://www.youtube.com/results?search_query=${encodeURIComponent(arrival.slice(2))}`
        }]
    }
    else if(/l\/\d+/.test(arrival) || /localhost:\d+/.test(arrival) || /l:\d+/.test(arrival) && /localhost:\d+/.test(arrival)){
        // Localhost
        currentMatch = [{
            "url": `http://localhost:${arrival.slice(2)}`
        }]
    }
    else if(/tr-[a-z][a-z][a-z]?=/g.test(arrival)){
        // Google translate
        let rest = arrival.slice(3).split("=");
        let options = rest[0];
        let search = rest.slice(1).join("=");
        currentMatch = [{
            "url": `https://translate.google.com/?sl=auto&tl=${options}&text=${encodeURIComponent(search)}&op=translate`
        }]
    }
    else if(/settings\//g.test(arrival) || /s\//g.test(arrival)){
        // Google translate
        let rest = arrival.slice(3).split("=");
        let options = rest[0];
        let search = rest.slice(1).join("=");
        currentMatch = [{
            "url": `config/configuration.html`
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