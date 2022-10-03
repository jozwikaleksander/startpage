// BOOKMARKS JSON FILE
const data = [{
    "Name":"Socials",
    "Links":[
       {
        "Name":"Youtube",
        "URL":"https://www.youtube.com"
       },
       {
        "Name":"Twitch",
        "URL":"https://www.twitch.com"
       },
       {
        "Name":"Reddit",
        "URL":"https://www.reddit.com"
       }
    ]
},
{
    "Name":"School",
    "Links":[
       {
        "Name":"Plan lekcji",
        "URL":"https://plan.elektronik.edu.pl/plany/o31.html"
       },
       {
        "Name":"Librus",
        "URL":"https://adfslight.vulcan.net.pl/radomprojekt/LoginPage.aspx?ReturnUrl=%2fradomprojekt%2fDefault.aspx%3fwa%3dwsignin1.0%26wtrealm%3dhttps%253A%252F%252Fsynergia.librus.pl%252Floguj%252Fradom"
       },
       {
        "Name":"Classroom",
        "URL":"https://www.classroom.google.com"
       },
       {
        "Name":"Pasja informatyki",
        "URL":"https://pasja-informatyki.pl/"
       }
    ]
},
{
    "Name":"Games",
    "Links":[
       {
        "Name":"Łowcy gier",
        "URL":"https://lowcygier.pl/"
       },
       {
        "Name":"G2A",
        "URL":"https://www.g2a.com"
       }
    ]
},
{
    "Name":"VOD",
    "Links":[
       {
        "Name":"Netflix",
        "URL":"https://www.netflix.com"
       },
       {
        "Name":"Amazon Prime",
        "URL":"https://www.amazon.pl/prime"
       }
    ]
}
];

// Creating HTML for each section
const createHTML = (obj) => {
    let html = `<div class='link-group'><p>${obj.Name}</p><ul class="links-list">`;
    
    obj.Links.forEach(link => {
        html += `<li><a href="${link.URL}">${link.Name}</a></li>`;
    });

    html+=`</ul></div>`;
    
    return html;
}

// Defining constant variables
const links = data.map((element) => { return element.Links }).flat();

const linksContainer = document.querySelector(".links");
const matches = document.querySelector("#matches");
const search = document.querySelector("#search");

// Defining current match; Array of matched link objects
let currentMatch = [];

// Accessing link objects from JSON file (without sections)
data.forEach(link => {
    linksContainer.innerHTML += createHTML(link);
});

// Matching bookmark based of value in search bar
$("#search").on('keypress keyup change input', function() { 
    let arrival = $(this).val().toLowerCase();
    if(arrival.indexOf("*") === 0){
        let match = [];
        if(arrival.length > 1){
            match = links.filter(function(place) {
                // look for the entry with a matching `code` value
                return (place.Name.toLowerCase().indexOf(arrival.slice(1)) !== -1);
            });
        }
        if(match != ''){
            let arr = [];
            match.forEach(element => {
                arr.push(element.Name);
            });
            matches.innerHTML = arr.join(" | ");
            currentMatch = match;
        }
        else{
            matches.innerHTML = "";
            currentMatch = [];
        }  
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
            window.open("http://www.google.com/search?q="+search.value);
        }
        else{
            window.open(currentMatch[0].URL);
        }
   }
});

if (location.search !== "?_") {
    location.search = "?_";
    throw new Error; // load everything on the next page;
    // stop execution on this page
}

function onLoad() {
    document.getElementById("search").focus();
}

window.onload = onLoad;