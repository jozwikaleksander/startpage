// Bookmark variable
let bookmarks;

// Defining current match; Array of matched link objects
let currentMatch = [];

// Creating links array
let links = [];

// Accessing HTML tags
const linksContainer = document.querySelector(".links");
const matches = document.querySelector("#matches");
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

// Ellipsize text
const ellipsize = (text) => {
    if (text.length > 15) {
        return text.substring(0, 15) + '...';
    }
    return text;
}