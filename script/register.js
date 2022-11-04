const inputUsername = document.querySelector("#username");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelectorAll("#password");
const errorUser = document.querySelector("#errorUser");
const errorEmail = document.querySelector("#errorEmail");
const errorPassword = document.querySelector("#errorPassword");
const errorConfirmPassword = document.querySelector("#errorConfirmPassword");
const btnSubmit = document.querySelector("#btn-register");
const btnIconPass = document.querySelectorAll("#icon-pass");
const spesialChars = "!`@#$%^&*()+=-[]\\';,./{}|\":<>?~_";
const storageKey = "STORAGE_KEY";

for (let i = 0; i < btnIconPass.length; i++) {
  btnIconPass[i].addEventListener("click", () => {
    if (inputPassword[i].type == "password") {
      btnIconPass[i].innerHTML = "visibility_off";
      inputPassword[i].type = "text";
    } else {
      inputPassword[i].type = "password";
      btnIconPass[i].innerHTML = "visibility";
    }
  });
}

inputUsername.addEventListener("keyup", validationUsername);
inputEmail.addEventListener("keyup", validationEmail);
inputPassword[0].addEventListener("keyup", validationPassword);
inputPassword[1].addEventListener("keyup", validationConfirmPassword);

function validationUsername() {
  const userValue = inputUsername.value;
  const validasiHurufAngka = /^[a-zA-Z]+[0-9]+$/;
  const noSpace = /\s/g;
  const isSpace = noSpace.test(userValue);
  errorUser.innerHTML = "";

  if (inputUsername.value.length < 5) {
    errorUser.innerHTML = "Username harus tediri minimal 5 karakter";
    inputEmail.disabled = true;
  } else if (isSpace) {
    errorUser.innerHTML = "Tidak boleh ada spasi";
  } else if (!validasiHurufAngka.test(userValue)) {
    errorUser.innerHTML = "Username  terdiri huruf terlebih dahulu baru angka";
  } else {
    for (let i = 0; i < userValue.length; i++) {
      if (spesialChars.indexOf(userValue.charAt(i)) != -1) {
        errorUser.innerHTML = "Tidak boleh ada karakter";
        inputEmail.disabled = true;
      } else if (
        spesialChars.indexOf(userValue.charAt(i)) === -1 &&
        inputUsername.value.length >= 5 &&
        !isSpace &&
        validasiHurufAngka.test(userValue)
      ) {
        inputEmail.disabled = false;
        return true;
      }
    }
  }
}
function validationEmail() {
  errorEmail.innerHTML = "";

  const polaEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!polaEmail.test(inputEmail.value)) {
    errorEmail.innerHTML = "Email tidak valid";
    inputPassword[0].disabled = true;
  } else {
    inputPassword[0].disabled = false;
    return true;
  }
}
function validationPassword() {
  const validasiHurufAngka = /^[a-zA-Z]+[0-9]+[A-Z]+$/;
  const noSpace = /\s/g;
  const valuePassword = inputPassword[0].value;
  errorPassword.innerHTML = "";

  if (valuePassword.length < 6) {
    errorPassword.innerHTML = "Password minimal 6 karakter";
  } else if (noSpace.test(valuePassword)) {
    errorPassword.innerHTML = "Password tidak boleh ada spasi";
  } else if (!validasiHurufAngka.test(valuePassword)) {
    errorPassword.innerHTML =
      "Password harus urut dari huruf kecil ,angka dan huruf besar";
  } else {
    return true;
  }
}

function validationConfirmPassword() {
  if (inputPassword[0].value !== inputPassword[1].value) {
    errorConfirmPassword.innerHTML = "Password tidak sama";
  } else if (inputPassword[0].value !== inputPassword[1].value) {
    errorConfirmPassword.innerHTML = "";
    return true;
  } else {
    errorConfirmPassword.innerHTML = "";
  }
}
function checkForStorage() {
  return typeof Storage !== "undefined";
}

function addToStorage(data) {
  if (checkForStorage()) {
    let dataTodos = [];
    if (localStorage.getItem(storageKey) !== null) {
      dataTodos = JSON.parse(localStorage.getItem(storageKey));
    }

    dataTodos.unshift(data);
    if (dataTodos.length > 5) {
      dataTodos.pop();
    }

    localStorage.setItem(storageKey, JSON.stringify(dataTodos));
    inputUsername.value = "";
    inputEmail.value = "";
    inputPassword[0].value = "";
    inputPassword[1].value = "";
  }
}

function getData() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } else {
    return [];
  }
}

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const dataStorage = getData();
  const valueEmail = inputEmail.value;
  const valueUsername = inputUsername.value;
  const valuePass = inputPassword[0].value;

  if (
    !validationUsername() &&
    !validationEmail() &&
    !validationPassword() &&
    !validationConfirmPassword()
  ) {
    alert("Form harus sesuai ketentuan");
  } else if (
    validationUsername() &&
    validationEmail() &&
    validationPassword()
  ) {
    if (dataStorage.length === 0) {
      const newUser = {
        username: valueUsername,
        email: valueEmail,
        password: valuePass,
      };

      addToStorage(newUser);
      window.location.href = "./login.html";
    } else if (dataStorage.length != 0) {
      dataStorage.forEach((isi, index) => {
        if (valueEmail === isi.email) {
          dataStorage.splice(index, 1, {
            username: valueUsername,
            email: isi.email,
            password: valuePass,
          });
          localStorage.setItem(storageKey, JSON.stringify(dataStorage));
          window.location.href = "./login.html";
        } else if (valueEmail != isi.email) {
          const newUser = {
            username: valueUsername,
            email: valueEmail,
            password: valuePass,
          };

          addToStorage(newUser);
          window.location.href = "./login.html";
        }
      });
    }
  }
});
