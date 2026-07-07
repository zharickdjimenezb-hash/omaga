const formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", function(e){
    e.preventDefault();

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    if(correo === "" || password === ""){
        alert("Complete todos los campos");
        return;
    }

    alert("Inicio de sesión exitoso");
});

document.getElementById("googleBtn").addEventListener("click", () => {
    alert("Inicio de sesión con Google");
});

document.getElementById("facebookBtn").addEventListener("click", () => {
    alert("Inicio de sesión con Facebook");
});

document.getElementById("whatsappBtn").addEventListener("click", () => {
    alert("Inicio de sesión con WhatsApp");
});



document.addEventListener("DOMContentLoaded", () => {
    const btnTema = document.getElementById("btn-theme");
    
    const temaGuardado = localStorage.getItem("tema") || "dark";
    document.documentElement.setAttribute("data-theme", temaGuardado);
    actualizarTextoBoton(temaGuardado);

    btnTema.addEventListener("click", () => {
        let temaActual = document.documentElement.getAttribute("data-theme");
        let nuevoTema = (temaActual === "dark") ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", nuevoTema);
        localStorage.setItem("tema", nuevoTema);
        
        actualizarTextoBoton(nuevoTema);
    });

    function actualizarTextoBoton(tema) {
        if (tema === "light") {
            btnTema.innerText = "☀️ ";
        } else {
            btnTema.innerText = "🌙 ";
        }
    }
});