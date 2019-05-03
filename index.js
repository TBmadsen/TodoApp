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
      const compBtn = document.createElement("button");

      delBtn.innerText = "del";
      editBtn.innerText = "rediger";
      compBtn.innerText = "complete";

      //TODO: Optimer disse funktioner.
      delBtn.addEventListener("click", function(e) {
        del(index);
        loadSite();
      });
      editBtn.addEventListener("click", function(e) {
        showEdit(index);
      });

      hideBtn.addEventListener("click", function(e) {
        hideEdit();
        loadSite();
      });

      compBtn.addEventListener("click", function(e) {
        e.preventDefault();
        setComplete(index, anker);
      });

      li.appendChild(delBtn);
      li.appendChild(editBtn);
      li.appendChild(compBtn);
      li.classList.add("list-item");
      const anker = li.appendChild(document.createElement("A"));
      anker.setAttribute("class", "dark");
      anker.innerHTML += `#${index}: `;
      anker.innerHTML += item.text;
      if (item.status) {
        anker.classList.add("completed");
      } else {
        anker.classList.add("undone");
      }
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

function setComplete(index, ele) {
  let items = loadNotes();
  if (!items[index].status) {
    // ele.classList.add("completed");
    items[index].status = true;
    ele.classList.add("completed");
    setNotes(items);
  } else {
    ele.classList.add("undone");
  }
}

//Send function
function send() {
  const input = document.querySelector("input").value;
  if (!input) {
    console.log("Fail, no input");
  } else {
    let item2 = {
      text: input,
      status: false
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

function loadSite() {
  location.reload();
}
