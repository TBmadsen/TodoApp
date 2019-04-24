const $ = document;
const list = $.querySelector("#items");
const btn = $.querySelector("button");

const currentStorage = localStorage;
if (localStorage.length !== 0) {
  const res = JSON.parse(localStorage.getItem("key"));
  console.log(res);

  const li = list.appendChild($.createElement("LI"));
  li.innerHTML += res.value;
}

function send() {
  const input = $.querySelector("input").value;
  const obj = {
    value: input
  };

  if (!input) {
    console.log("Fail, no input");
    console.log(input);
  } else {
    if (localStorage.length === 0) {
      localStorage.setItem("key", JSON.stringify(obj));
    } else {
      let items = JSON.parse(localStorage.getItem("key"));
      console.log(typeof items);
      localStorage.setItem("key", JSON.stringify(obj));
    }
  }
  location.reload(true);
}
