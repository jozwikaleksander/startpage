// Accessing current time and showing it in HTML
function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59

    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear()

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    day = (day < 10) ? "0" + day : day;
    month = (month < 10) ? "0" + month : month;
    
    var time = h + ":" + m + ":" + s;
    document.getElementById("time").innerText = time;
    document.getElementById("calendar").innerText = day + "/" + month + "/" + year;
    
    setTimeout(showTime, 1000);
    
}

showTime();