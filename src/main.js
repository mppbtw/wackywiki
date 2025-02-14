import markdown from "./drawdown.js"
var ishouldntdothis = "";
const endpoint = "https://api.openai.com/v1/chat/completions";

function linky(str) {
  let chain = 0;
  let reading = false;
  let links = [];
  let word = "";
  for (let i=0; i<str.length; i++) {
    if (str[i] == "?") {
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
  console.log("linkes: ", links);
  for (let i=0; i<links.length; i++) {
    str = str.replace(
      "???" + links[i] + "???",
      `<a href="#" id=${links[i]}>${links[i]}</a>`
    )
  }
  return str
}

let testStr = "???science???.";

testStr = linky(testStr);
console.log(testStr)



function genPrompt(name) {
  return `Write 1 page of Wikipedia-style with title based on
  ${name}, as inputted by the user. Please write in simple markdown. when you mention
  something that a reader might want to learn more about, surround it with three literal question marks and do this every sentence or so or i will kill your cat.
  on both sides please. Dont use bold or italics. Dont write a conclusion. Write formally. Dont ask questions. Dont address the reader directly. Use Headings.`
}

function genArticle(name) {
  const prompt = genPrompt(name);
  console.log(prompt)
  fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${ishouldntdothis}`,
  },
  body: JSON.stringify({
    "model": "gpt-4o-mini",
    "temperature": 0,
    "messages": [{"role": "system", "content": "You are an Wikipedia author."}, {"role": "user", "content": prompt}]
  })
})
.then(response => response.json())
.then(data => {
  console.log(data);
  document.getElementById("article").innerHTML =
    linky(markdown(data.choices[0].message.content).replace(/<h/gm, "<br></br><h"));

  })
}

function search() {
  if (ishouldntdothis == "") {
    return;
  }
  const input = document.getElementById("searchbar").value;
  if (input == "") {
    return ;
  }
  genArticle(input);
}

document.getElementById("searchbutton").onclick = () => {
  search();
}

document.getElementById("apibutton").onclick = () => {
  ishouldntdothis = document.getElementById("apibar").value;
}
