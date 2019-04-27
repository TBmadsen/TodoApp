window.onload = function() {
  render();
};

function render() {
  if (localStorage.length !== 0) {
    const list = document.querySelector("#items");

    const args = loadNotes();

    args.forEach(function(item, index) {
      const li = list.appendChild(document.createElement("LI"));
      const btn = document.createElement("button");
      btn.innerText = "del";

      btn.addEventListener("click", function(e) {
        del(index);
      });

      li.appendChild(btn);
      const anker = li.appendChild(document.createElement("A"));
      anker.setAttribute("class", "dark");
      console.log(item);

      anker.innerHTML += item.text;
    });
  }
}

function del(index) {
  const entries = loadNotes();
  entries.splice(index, 1);
  setNotes(entries);
}

//Send function
function send() {
  const input = document.querySelector("input").value;
  if (!input) {
    console.log("Fail, no input");
  } else {
    let item2 = {
      text: input
    };
    let items = loadNotes();

    items = items ? items : [];
    items.push(item2);
    setNotes(items);
  }
}

function loadNotes() {
  const notes = localStorage.getItem("key");
  const args = JSON.parse(notes);
  return args;
}

function setNotes(items) {
  localStorage.setItem("key", JSON.stringify(items));
}
