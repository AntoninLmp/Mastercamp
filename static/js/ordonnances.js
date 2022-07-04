const afficherlasuite = document.getElementById("afficherlasuite");
const ordosuivantes = document.getElementById("ordosuivantes");

ordosuivantes.style.display = "none";

function togg(){
    if(getComputedStyle(ordosuivantes).display != "none"){
        ordosuivantes.style.display = "none";
    } else {
        ordosuivantes.style.display = "block";
    }
  };
  afficherlasuite.onclick = togg;