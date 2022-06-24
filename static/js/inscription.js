const psw_1 = document.getElementById("floatingpassword1")
const psw_2 = document.getElementById("floatingpassword2")

psw_1.style.border = "1px solid red";
psw_2.style.border = "1px solid red";

if (psw_1 != "" && psw_1.value == psw_2.value) {
    psw_1.style.border = "1px solid green";
    psw_2.style.border = "1px solid green";
}
