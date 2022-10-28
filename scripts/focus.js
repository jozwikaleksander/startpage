if (location.search !== "?_") {
    location.search = "?_";
}

function onLoad() {
    document.getElementById("search").focus();
}

window.onload = onLoad;