const btnProduck = document.querySelector("#btn-product");
const material = document.querySelector("#material-icons");

btnProduck.addEventListener("mouseover", () => {
  material.style.display = "block";
});
btnProduck.addEventListener("mouseout", () => {
  material.style.display = "none";
});

const usernameProdil = document.querySelector("#username-profil");
const navbarNoLogin = document.querySelector("#nav-no-login");
const navLogin = document.querySelector("#nav-login");
const btnLogout = document.querySelector("#btn-logout");
if (
  localStorage.getItem("token-login") != null &&
  localStorage.getItem("username") != null
) {
  navbarNoLogin.style.display = "none";
  navLogin.style.display = "flex";
  usernameProdil.innerHTML = localStorage.getItem("username");
} else if (
  localStorage.getItem("token-login" === null) &&
  localStorage.getItem("username")
) {
  navbarNoLogin.style.display = "flex";
  navLogin.style.display = "none";
}

btnLogout.addEventListener("click", logoutStorage);

function logoutStorage() {
  if (
    localStorage.getItem("token-login") != null &&
    localStorage.getItem("username") != null
  ) {
    localStorage.removeItem("token-login");
    localStorage.removeItem("username");

    navbarNoLogin.style.display = "flex";
    navLogin.style.display = "none";
  }
}

function unloadStorage(e) {
  e.preventDefault();
  if (
    localStorage.getItem("token-login") != null &&
    localStorage.getItem("username") != null
  ) {
    localStorage.removeItem("token-login");
    localStorage.removeItem("username");

    navbarNoLogin.style.display = "flex";
    navLogin.style.display = "none";
  }
}
