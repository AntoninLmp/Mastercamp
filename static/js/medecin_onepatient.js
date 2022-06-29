const btn_medoc = document.querySelector("#ajoutMedoc2")
const btn_presc = document.querySelector("#ajoutPrescrip2")

const cont_medoc = document.querySelector("#container_Medicament2")
const cont_presc = document.querySelector("#container_prescription2")

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
