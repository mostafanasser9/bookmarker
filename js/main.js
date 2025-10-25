var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var closeBtn = document.getElementById("closeBtn");
var boxInfo = document.querySelector(".box-info");

var siteList = [];

if (localStorage.getItem("sites") !== null) {
  siteList = JSON.parse(localStorage.getItem("sites"));

  displaysiteList();
}

submitBtn.addEventListener("click", addSite);
closeBtn.addEventListener("click", closeModal);
bookmarkNameInput.addEventListener("input", validateName);
bookmarkURLInput.addEventListener("input", validateURL);

function addSite() {
  if (validInputs() === true) {
    var website = {
      name: bookmarkNameInput.value,
      url: bookmarkURLInput.value,
    };

    siteList.push(website);

    clearInputs();

    setItemInlocalStorage();

    displaysiteList();
  } else {
    showModal();
  }
}

function showModal() {
  boxInfo.classList.remove("d-none");
}

function closeModal() {
  boxInfo.classList.add("d-none");
}

function clearInputs() {
  bookmarkNameInput.value = "";
  bookmarkURLInput.value = "";
  bookmarkNameInput.classList.remove("is-valid", "is-invalid");
  bookmarkURLInput.classList.remove("is-valid", "is-invalid");
}

function setItemInlocalStorage() {
  localStorage.setItem("sites", JSON.stringify(siteList));
}

function displaysiteList() {
  var table = ``;

  for (var i = 0; i < siteList.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${siteList[i].name}</td>
    <td><a href="${
      siteList[i].url
    }" target="blank"><button class="btn btn-success"><i class="fa-solid fa-up-right-from-square text-white"></i></button></a></td>
    <td><button class="btn btn-danger" onclick="deleteSite(${i});"><i class="fa-solid fa-trash-can text-white"></i></button></td>
    </tr>
    `;
  }
  document.getElementById("tableContent").innerHTML = table;
}

function deleteSite(index) {
  siteList.splice(index, 1);

  setItemInlocalStorage();

  displaysiteList();
}

function validInputs() {
  var paternName = /[a-zA-Z0-9]{3,}/;
  var paternURL = /^(https:\/\/|www\.)[a-z0-9\.]{2,}(\.[a-z]{2,}$)/;
  if (
    paternURL.test(bookmarkURLInput.value) === true &&
    paternName.test(bookmarkNameInput.value) === true
  ) {
    return true;
  } else {
    return false;
  }
}

function validateName() {
  var patternName = /[a-zA-Z0-9]{3,}/;
  if (patternName.test(bookmarkNameInput.value) === true) {
    bookmarkNameInput.classList.remove("is-invalid");
    bookmarkNameInput.classList.add("is-valid");
  } else {
    bookmarkNameInput.classList.remove("is-valid");
    bookmarkNameInput.classList.add("is-invalid");
  }
}

function validateURL() {
  var patternURL = /^(https:\/\/|www\.)[a-z0-9\.]{2,}(\.[a-z]{2,}$)/;
  if (patternURL.test(bookmarkURLInput.value) === true) {
    bookmarkURLInput.classList.remove("is-invalid");
    bookmarkURLInput.classList.add("is-valid");
  } else {
    bookmarkURLInput.classList.remove("is-valid");
    bookmarkURLInput.classList.add("is-invalid");
  }
}
