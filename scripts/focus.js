if (location.search !== "?_") {
    location.search = "?_";
    throw new Error; // load everything on the next page;
    // stop execution on this page
}

function onLoad() {
    document.getElementById("search").focus();
}

window.onload = onLoad;