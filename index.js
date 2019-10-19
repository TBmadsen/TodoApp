window.onload = function() {
  render();
};

let status = {
	COMPLETED: 1,
	UNCOMPLETED: 2,
};

function resetList(items) {
  while (items.firstChild) {
    items.removeChild(items.firstChild);
  }
}

function makeList(args) {
  	args.forEach(function(item, index) {
  		switch(item.status){
  			case status.COMPLETED:
  				renderNote(item, index);
  				break;
  			case status.UNCOMPLETED:
  				renderNote(item, index);
  				break;
  			default:
  				renderNote(item, index);
  				break;
  		}
  });
}

function render() {
  if (localStorage.length !== 0) {
    const args = loadNotes();
    const sortBtn = document.querySelector("#sortBtn");
    const allBtn 	= document.querySelector("#all");
    const items 	= document.querySelector("#items");
 		const saveBtn = document.querySelector("[data-create]");

 		saveBtn.addEventListener("click", function(){
 			try{
 				send();
		  }catch(e){
		  	console.error(e);
		  }
 		});

    allBtn.addEventListener("click", function() {
      resetList(items);
      makeList(args);
    });

    sortBtn.addEventListener("click", function(e) {
	  	status === status.COMPLETED ? sortBtn.textContent = "Show all undone" : sortBtn.textContent = "Show all completed";
	  	resetList(items);
      makeList(args);
    });

    makeList(args);
  }
}

function renderNote(item, index) {

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
    setComplete(index, this);
    loadSite();
  });

  li.appendChild(div);
  div.appendChild(delBtn);
  div.appendChild(editBtn);

  li.classList.add("list-item");
  const anker = li.appendChild(document.createElement("A"));
  anker.setAttribute("class", "dark");
  anker.textContent += item.text;

  item.status === 1 ? comp.classList.add("completed") : comp.classList.add("undone");

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

  const notes = loadNotes();
  console.log(index);
  notes[index].text = text;
  notes[index].status = status.UNCOMPLETED;
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
  	if (items[index].status === status.UNCOMPLETED) {
  		ele.classList.add("completed");
  		items[index].status = status.COMPLETED;
  	}else {
  	  ele.classList.add("undone");
  	  items[index].status = status.UNCOMPLETED;
  	}
    setNotes(items);
}

//Send function
function send() {
  const input = document.querySelector("input").value;
  if (!input) {
  	throw new Error("No input isset");
  } else {
	let item = {
	  text: input,
	  status: status.UNCOMPLETED
	};

    let items = loadNotes();
    
    items = items ? items : [];
    items.push(item);
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
