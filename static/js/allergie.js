const form_all = document.querySelector("#form_allergie");
form_all.style.display = "none";

const btn_all = document.querySelector("#btn_ajout_allergie");

btn_all.onclick = function () {
    if (form_all.style.display === "none")
        form_all.style.display = ""
    else
        form_all.style.display = "none"
}   