const creerOrdo = document.querySelector("#formCO_")
const ScanOrdo = document.querySelector("#scan_ordo")

creerOrdo.style.display = ""
ScanOrdo.style.display = "none"

const fleche_creeOrdo = document.querySelector("#fleche_creeOrdo")
fleche_creeOrdo.onclick = function () {
    if (creerOrdo.style.display === "none")
        creerOrdo.style.display = ""
    else
        creerOrdo.style.display = "none"
}

const fleche_ScanOrdo = document.querySelector("#fleche_ScanOrdo")
fleche_ScanOrdo.onclick = function () {
    if (ScanOrdo.style.display === "none")
        ScanOrdo.style.display = ""
    else
        ScanOrdo.style.display = "none"
}


