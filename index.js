window.onload = function() {
  render();
};

function render() {
  if (localStorage.length !== 0) {
    const list = document.querySelector("#items");

    const args = loadNotes();

    args.forEach(function(item, index) {
      const li = list.appendChild(document.createElement("LI"));
      const delBtn = document.createElement("button");
      const editBtn = document.createElement("button");
      const hideBtn = document.querySelector("#hideEdit");

      delBtn.innerText = "del";
      editBtn.innerText = "rediger";

      //TODO: Optimer disse funktioner.
      delBtn.addEventListener("click", function(e) {
        del(index);
      });
      editBtn.addEventListener("click", function(e) {
        showEdit(index);
      });

      hideBtn.addEventListener("click", function(e) {
        hideEdit();
      });

      li.appendChild(delBtn);
      li.appendChild(editBtn);
      const anker = li.appendChild(document.createElement("A"));
      anker.setAttribute("class", "dark");

      anker.innerHTML += item.text;
    });
  }
}

function showEdit(index) {
  const text = document.querySelector("#editNote");
  text.value = readNoteFromIndex(index).text;
  const saveBtn = document.querySelector("#hideEdit");
  const modal = document.querySelector("#modal");
  modal.classList.remove("hide");
  saveBtn.addEventListener("click", function(e) {
    saveNoteByIndex(text.value, index);
  });
}

function hideEdit() {
  const modal = document.querySelector("#modal");
  modal.classList.add("hide");
}

function saveNoteByIndex(text, index) {
  console.assert(text != 0, "fail saveNoteByIndex text null");
  console.assert(index >= 0, "fail saveNoteByIndex index null");

  const notes = loadNotes();

  notes[index].text = text;
  setNotes(notes);
}

function readNoteFromIndex(index) {
  return loadNotes()[index];
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
