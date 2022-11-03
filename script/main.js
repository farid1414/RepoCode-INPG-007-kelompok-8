const btnProduck = document.querySelector("#btn-product");
const material = document.querySelector("#material-icons");

btnProduck.addEventListener("mouseover", () => {
  material.style.display = "block";
});
btnProduck.addEventListener("mouseout", () => {
  material.style.display = "none";
});
