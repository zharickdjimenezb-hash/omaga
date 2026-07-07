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