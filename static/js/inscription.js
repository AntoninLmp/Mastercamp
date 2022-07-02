const psw_1 = document.getElementById("floatingpassword1")
const psw_1_val = document.getElementById("floatingpassword1").value
const psw_2 = document.getElementById("floatingpassword2")
const psw_2_val = document.getElementById("floatingpassword2").value

// psw_1.style.border = "1px solid red";
// psw_2.style.border = "1px solid red";

if (psw_1_val == "" && psw_2_val == "") {
    psw_1.style.border = "1px solid red";
    psw_2.style.border = "1px solid red";
}
if (psw_1_val != "") {
    psw_1.style.border = "1px solid green";
}
if (psw_2_val != "") {
    psw_2.style.border = "1px solid green";
}
