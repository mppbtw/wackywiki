import getCookie from "./utils.js";
window.backend = "https://d123c039-879a-4429-8e8c-26dfb7cb8073-00-2elnkgit1zcaz.kirk.replit.dev"

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function genListBox(title, stamp) {
    return `<div class="listbox">
        <p>Time: ${timeConverter(stamp)}</p>
        <p>Title: ${title}</p>
        <br>
    </div>`
}

const name = getCookie("username");
if (name != "") {
  document.getElementById("rightbit").innerHTML = `
  <p>Logged in as ${getCookie("username")}</p>
  <a href="/history">History</a>
  <a href="#" onclick="
    document.cookie = 'username=';
    document.cookie = 'sessionid=';
    window.location.reload();
  ">Log out</a>
`
} else {
    window.location.replace("/login")
}

fetch(window.backend + `/secure/history?sessionid=${getCookie('sessionid')}`,
    {method: "GET"}
).then(response => response.json())
.then(data => {
    const history = JSON.parse(data.history);
    console.log("HISTORIIEEE:", history);
    let list = "";
    history.forEach(h => {
        list += genListBox(h.prompt, h.timestamp);
    })
    document.getElementById("list").innerHTML = list;
})
