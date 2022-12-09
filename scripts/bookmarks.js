// Bookmark variable
let bookmarks;

// Defining current match; Array of matched link objects
let currentMatch = [];

// Creating links array
let links = [];

// Accessing HTML tags
const linksContainer = document.querySelector(".links");
const matches = document.querySelector("#matches");
const search = document.querySelector("#search");

let searchURL = "https://www.google.com/search?q="; 

chrome.storage.sync.get(['searchEngine'], function(res) {
    if(res.searchEngine != undefined && res.searchEngine != ""){
        searchURL = res.searchEngine;
    }
});
// Detecting if chosen object is folder or bookmark
const folderDetection = (elem) => {
    if(!elem.url){
        return elem;
    }
}
// Assigning bookmarks into variable
const writeIntoObject = (res) => {
    bookmarks = res[0]['children'];

    links = bookmarks.map((element) => { return element.children }).flat();

    // Accessing link objects from JSON file (without sections)
    bookmarks.forEach(link => {
        linksContainer.innerHTML += createHTML(link);
    });
} 
// Getting subtree of provided folder
const getSubTree = (id) => {
    chrome.bookmarks.getSubTree(id).then(res => writeIntoObject(res));
}

// Checking is provided object is folder and getting it's id.
const getParentFolder = (res) => { if (res.length > 0) {
    let folder = res.filter(elem => folderDetection(elem));
    let folderID = folder[0].id;
    getSubTree(folderID);
} }

// Looking for parent folder
chrome.bookmarks.search("Startpage").then(res => getParentFolder(res));

// Creating HTML for each section
const createHTML = (obj) => {
    let html = `<div class='link-group'><p>${obj.title}</p><ul class="links-list">`;
    
    obj.children.forEach(link => {
        html += `<li><a href="${link.url}">${ellipsize(link.title)}</a></li>`;
    });

    html+=`</ul></div>`;
    
    return html;
}
// Finding match in provided list
const findMatch = (arrival, list) => {
    let match = [];

    if(arrival.length > 1){
        match = list.filter(function(place) {
            return (place.title.toLowerCase().indexOf(arrival) !== -1);
        });
    }
    if(match != ''){
        let arr = [];
        match.forEach(element => {
            arr.push(element.title);
        });
        matches.innerHTML = arr.join(" | ");
       return match;
    }
    else{
        matches.innerHTML = "";
        return [];
    }
}

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
// Ellipsize text
const ellipsize = (text) => {
    if (text.length > 15) {
        return text.substring(0, 15) + '...';
    }
    return text;
}