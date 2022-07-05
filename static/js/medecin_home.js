const creerOrdo = document.querySelector("#formCO_")
// const ScanOrdo = document.querySelector("#scan_ordo")
const ajout_etablissement = document.querySelector("#add_eta_btn")

creerOrdo.style.display = ""
// ScanOrdo.style.display = "none"

const fleche_creeOrdo = document.querySelector("#fleche_creeOrdo")
fleche_creeOrdo.onclick = function () {
    if (creerOrdo.style.display === "none")
        creerOrdo.style.display = ""
    else
        creerOrdo.style.display = "none"
}

// const fleche_ScanOrdo = document.querySelector("#fleche_ScanOrdo")
// fleche_ScanOrdo.onclick = function () {
//     if (ScanOrdo.style.display === "none")
//         ScanOrdo.style.display = ""
//     else
//         ScanOrdo.style.display = "none"
// }

const btn_medoc = document.querySelector("#ajoutMedoc")
const btn_presc = document.querySelector("#ajoutPrescrip")

const cont_medoc = document.querySelector("#container_Medicament")
const cont_presc = document.querySelector("#container_prescription")

cont_presc.style.display = "none"
cont_medoc.style.display = "none"


btn_medoc.onclick = function () {
    if (cont_medoc.style.display === "none")
        cont_medoc.style.display = ""
    else
        cont_medoc.style.display = "none"
    if (cont_presc.style.display === "")
        cont_presc.style.display = "none"
}

btn_presc.onclick = function () {
    if (cont_presc.style.display === "none")
        cont_presc.style.display = ""
    else
        cont_presc.style.display = "none"
    if (cont_medoc.style.display === "")
        cont_medoc.style.display = "none"
}




