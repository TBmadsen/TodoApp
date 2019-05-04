window.onload = function() {
  render();
};
let status = false;

function resetList(items) {
  while (items.firstChild) {
    items.removeChild(items.firstChild);
  }
}

function makeList(args) {
  args.forEach(function(item, index) {
    if (item.status === status) {
      renderNote(index, item);
      !status
        ? (sortBtn.innerText = "See all Completed")
        : (sortBtn.innerText = "See all uncompleted");
    }
    if (!status) {
      renderNote(index, item);
    }
  });
}

function render() {
  if (localStorage.length !== 0) {
    const args = loadNotes();
    const sortBtn = document.querySelector("#sortBtn");
    const allBtn = document.querySelector("#all");
    const items = document.querySelector("#items");

    allBtn.addEventListener("click", function() {
      status = status === null;
      resetList(items);
      makeList(args);
    });

    sortBtn.addEventListener("click", function() {
      status = !status ? true : false;
      resetList(items);
      makeList(args);
    });

    makeList(args);
  }
}

function renderNote(index, item) {
  const list = document.querySelector("#items");

  const li = list.appendChild(document.createElement("LI"));
  const comp = document.createElement("i");
  const delBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const hideBtn = document.querySelector("#hideEdit");
  const div = document.createElement("div");

  comp.classList.add("far");
  comp.classList.add("fa-check-circle");
  div.classList.add("button-group");

  delBtn.innerText = "del";
  editBtn.innerText = "rediger";

  //TODO: Optimer disse funktioner.
  delBtn.addEventListener("click", function() {
    del(index);
    loadSite();
  });

  editBtn.addEventListener("click", function() {
    showEdit(index);
  });

  hideBtn.addEventListener("click", function() {
    hideEdit();
    loadSite();
  });

  comp.addEventListener("click", function(e) {
    e.preventDefault();
    setComplete(index, comp);
  });
  li.appendChild(div);
  div.appendChild(delBtn);
  div.appendChild(editBtn);

  li.classList.add("list-item");
  const anker = li.appendChild(document.createElement("A"));
  anker.setAttribute("class", "dark");
  anker.innerHTML += `#${index}: `;
  anker.innerHTML += item.text;
  if (item.status) {
    comp.classList.add("completed");
  } else {
    anker.classList.add("undone");
  }
  li.appendChild(comp);
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

function sortCompleted() {}

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
