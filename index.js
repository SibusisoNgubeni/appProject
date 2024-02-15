import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://my-personal-app-c744c-default-rtdb.europe-west1.firebasedatabase.app//",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const musicListInDB = ref(database, "music-list");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const musicListEl = document.getElementById("music-List");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(musicListInDB, inputValue);

  clearInputFieldEl();
});

onValue(musicListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearmusicListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemTomusicListEl(currentItem);
    }
  } else {
    musicListEl.innerHTML = "No items here... yet";
  }
});

function clearmusicListEl() {
  musicListEl.classList.remove("grow");
  musicListElListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemTomusicListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `musicList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  musicListElListEl.append(newEl);
}
