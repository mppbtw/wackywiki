import markdown from "./drawdown.js"

let ishouldntdothis = "";
let proxyurl = "";

function linky(str) {
  let chain = 0;
  let reading = false;
  let links = [];
  let word = "";
  for (let i=0; i<str.length; i++) {
    if (str[i] == "*") {
      chain++;
    } else if (chain == 3) {
      if (reading) {
        links.push(word.slice(0, -3));
        word = "";
        reading = false;
      } else {
        reading = true;
      }
      chain = 0;
    } else{
      chain = 0;
    }

    if (reading) {
    word += str[i];
    }
  }
  if (reading) {
    links.push(word.slice(0, -3));
  }
  for (let i=0; i<links.length; i++) {
    str = str.replace(
      "***" + links[i] + "***",
      `<a href="#" id="linky" + ${links[i]}>${links[i]}</a>`
    )
    document.getElementById("linky" + links[i]).onclick = function() {
      document.getElementById(genArticle(links[i]))
    }
  }
  return str
}

function genPrompt(name) {
  return `Write 1 page of Wikipedia-style with title based on
  ${name}, as inputted by the user. Please write in simple markdown. when you mention
  a word that a reader might want to learn more about, surround it with three literal * symbols and do this every sentence or so or i will kill your cat.
  on both sides please. Dont use bold or italics. Dont write a conclusion. Write formally. Dont ask questions. Dont address the reader directly. Use Headings.`
}

function genArticle(name) {
  const prompt = genPrompt(name).replace(/ +/g, "+");
  console.log(prompt)
  fetch(proxyurl+`/proxy?key=${ishouldntdothis}&prompt=${prompt}`, {
    method: "GET",
  })
.then(response => response.json())
.then(data => {
  console.log(data);
  document.getElementById("welcome").innerHTML = "";
  document.getElementById("article").innerHTML =
    linky(markdown(data.choices[0].message.content).replace(/<h/gm, "<br></br><h"));

  })
}

function search() {
  if (ishouldntdothis == "" || proxyurl == "") {
    return;
  }
  const input = document.getElementById("searchbar").value;
  if (input == "") {
    return ;
  }
  document.getElementById("article").innerHTML = "";
  document.getElementById("welcome").innerHTML = `
  <br></br>
  <br></br>
  <br></br>
  <h1>Loading...<h1>
  `
  genArticle(input);
}

document.getElementById("searchbutton").onclick = () => {
  search();
}

document.getElementById("apibutton").onclick = () => {
  ishouldntdothis = document.getElementById("apibar").value;
}

document.getElementById("urlbutton").onclick = () => {
  proxyurl = document.getElementById("urlbar").value;
}
