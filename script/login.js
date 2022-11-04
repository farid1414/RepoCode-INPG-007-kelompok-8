const storageKey = "STORAGE_KEY";
const btnIcon = document.querySelector("#pass-login");
const userLogin = document.querySelector("#usernameLogin");
const passLogin = document.querySelector("#passwordLogin");
const btnSubmitLogin = document.querySelector("#btn-login");

function checkForStorage() {
  return typeof Storage !== "undefined";
}
function getData() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } else {
    return [];
  }
}
function randomString(panjang) {
  var randomString = "";
  var characters =
    "1234567890abcdefghjiklmnopqrstuvwxyzAVCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i, i = 0; i < panjang; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
}

btnIcon.addEventListener("click", (e) => {
  e.preventDefault();
  if (passLogin.type == "password") {
    passLogin.type = "text";
    btnIcon.innerHTML = "visibility_off";
  } else {
    passLogin.type = "password";
    btnIcon.innerHTML = "visibility";
  }
});

console.log("data storage", getData());

btnSubmitLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const getDataStorage = getData();
  console.log("sudah diklik");
  if (userLogin.value == "" || passLogin.value == "") {
    alert("Form tidak boleh kosong");
  } else {
    getDataStorage.forEach((isi, index) => {
      if (userLogin.value === isi.email && passLogin.value === isi.password) {
        console.log("benar");
        localStorage.setItem("token-login", randomString(10));
        localStorage.setItem("username", isi.username);
        window.location.href = "../index.html";
      } else {
        alert("username atau password salah");
      }
    });
  }
});
