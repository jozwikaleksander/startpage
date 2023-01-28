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
    for (let index = 0; index < bookmarks.length; index++) {
        linksContainer.innerHTML += createHTML(bookmarks[index]);
    }
    searchForFolders();
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

const createSubFolders = (obj,depth=1) => {
    let html = ""
    html += `<li>
                <details data-depth=${depth}>
                    <summary>${ellipsize(obj.title)}</summary>
                    
                    <div class="content"><ul>`;
            
    for (let j = 0; j < obj.children.length; j++) {
        const element = obj.children[j];

        links.push(element);
        
        if(element.children){
            console.log('sub folder detected');
            html+= `${createSubFolders(element,depth+1)}`;
        }

        else{
            html += `<li><a class="sublink" href="${element.url}">${ellipsize(element.title)}</a></li>`;
        }
    }

    html += `</ul></div></details></li>`;

    return html;
}

// Creating HTML for each section
const createHTML = (obj) => {

    let html = `<div class='link-group'><p>${obj.title}</p><ul class="links-list">`;

    for (let index = 0; index < obj.children.length; index++) {
        if(!obj.children[index].children){
            html += `<li><a href="${obj.children[index].url}">${ellipsize(obj.children[index].title)}</a></li>`;
        }
        else{
            html += createSubFolders(obj.children[index]);
        }
    }

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

        for (let index = 0; index < match.length; index++) {
            arr.push(match[index].title);    
        }

        matches.innerHTML = arr.join(" | ");
       return match;
    }
    else{
        matches.innerHTML = "";
        return [];
    }
}