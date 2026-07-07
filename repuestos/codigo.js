let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    configurarBotonesComprar();
    configurarEventosPanel(); 
});


function configurarEventosPanel() {
    const panel = document.getElementById("menuCarrito");
    const btnAbrir = document.getElementById("btn-abrir-carrito");
    const btnCerrar = document.getElementById("btn-cerrar-carrito");

    btnAbrir.addEventListener("click", () => {
        panel.classList.add("mostrar"); 
    });

    btnCerrar.addEventListener("click", () => {
        panel.classList.remove("mostrar"); 
    });
}

function configurarBotonesComprar() {
    const botonesComprar = document.querySelectorAll(".azul");
    
    botonesComprar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const tarjeta = e.target.closest(".caja");
            
            const titulo = tarjeta.querySelector("h3").innerText;
            const precioTexto = tarjeta.querySelector(".precio").innerText;
            const imagenSrc = tarjeta.querySelector(".imagen").src;
            
            const precioNumero = parseInt(precioTexto.replace(/[^0-9]/g, ""));

            const producto = {
                titulo: titulo,
                precio: precioNumero,
                imagen: imagenSrc,
                cantidad: 1
            };

            agregarAlCarrito(producto);
        });
    });
}

function agregarAlCarrito(productoNuevo) {
    const existe = carrito.find(item => item.titulo === productoNuevo.titulo);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push(productoNuevo);
    }

    actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const contadorCarrito = document.getElementById("carrito-contador");
    const totalCarrito = document.getElementById("carrito-total");

    listaCarrito.innerHTML = "";

    let totalSuma = 0;
    let totalItems = 0;

    carrito.forEach((producto, indice) => {
        totalSuma += producto.precio * producto.cantidad;
        totalItems += producto.cantidad;

        const item = document.createElement("li");
        item.classList.add("carrito-item"); 
        item.innerHTML = `
            <div class="carrito-item-info">
                <img src="${producto.imagen}" width="50" height="40">
                <div class="carrito-item-texto">
                    <h6>${producto.titulo}</h6>
                    <small>$${(producto.precio).toLocaleString('es-CO')} x ${producto.cantidad}</small>
                </div>
            </div>
            <button class="btn-eliminar-item" onclick="eliminarDelCarrito(${indice})">❌</button>
        `;
        listaCarrito.appendChild(item);
    });

    contadorCarrito.innerText = totalItems;
    totalCarrito.innerText = `$${totalSuma.toLocaleString('es-CO')}`;
}

function eliminarDelCarrito(indice) {
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
    } else {
        carrito.splice(indice, 1);
    }
    actualizarInterfazCarrito();
}

function pagarOEnviarAWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "¡Hola BAYMAX! Me gustaría comprar los siguientes productos:\n\n";
    let totalSuma = 0;

    carrito.forEach(prod => {
        mensaje += `• ${prod.titulo} (Cant: ${prod.cantidad}) - $${(prod.precio * prod.cantidad).toLocaleString('es-CO')}\n`;
        totalSuma += prod.precio * prod.cantidad;
    });

    mensaje += `\n*Total a pagar: $${totalSuma.toLocaleString('es-CO')}*`;
    
    const urlMensaje = encodeURIComponent(mensaje);
    window.open(`https://wa.me/573001234567?text=${urlMensaje}`, "_blank");
}
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
            btnTema.innerText = "☀️";
        } else {
            btnTema.innerText = "🌙 ";
        }
    }
});