var jsonstr = '{"copyright":"<center>©2021 - 2022 | RAH Code - All Rights Reserved.</center>"}';
var activity = JSON.parse(jsonstr);
var footer = document.getElementById("footer");

footer.innerHTML = activity.copyright;