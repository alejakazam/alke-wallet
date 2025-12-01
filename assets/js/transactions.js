$(document).ready(function () {    //función para cargar página y evitar conflictos en js
    let $lista = $(".list-group"); //creación de lista en base a clase de list-group
    let movimientos = localStorage.getItem("movimientos");  // creación de variable de movimientos en localstorage

    if (movimientos) {       // flujo de decisión con respecto a los movimientos
        let lineas = movimientos.trim().split("\n");    
        $lista.empty(); //vacía la lista de transacciones
        $.each(lineas, function (i, m) {      // utiliza la función creada de líneas y define flujo para depósitos y transferencias
            let tipo = "";
            if (m.toLowerCase().includes("depósito") || m.toLowerCase().includes("deposito")) {
                tipo = "deposito";
            } else if (m.toLowerCase().includes("transferencia")) {
                tipo = "transferencia";
            }
            $("<li>")
                .addClass("list-group-item movimiento-item")
                .attr("data-tipo", tipo)
                .text(m)
                .appendTo($lista);
        });
    }
    function filtrarMovimientos() {    // función para filtrar movimientos dependiendo de acción de check en depósitos o transferencias, o ambos.
        let mostrarDepositos = $("#filtroDepositos").is(":checked");
        let mostrarTransferencias = $("#filtroTransferencias").is(":checked");
        $(".movimiento-item").each(function () {
            let tipo = $(this).data("tipo");
            if (
                (tipo === "deposito" && mostrarDepositos) ||
                (tipo === "transferencia" && mostrarTransferencias)
            ) {
                $(this).show();
            } else {
                $(this).hide();     // flujo que se muestre o oculte según el check
            }
        });
    }
  $("#filtroDepositos, #filtroTransferencias").on("change", filtrarMovimientos);

  $(".action-btn").on("click", function (e) {  // función de prevención de default, delay y cambios en botón antes de redirección visto previamente.
        e.preventDefault();
        const $btn = $(this);
        const originalText = $btn.text();
        const url = $btn.attr("href");
        $btn.text("Redirigiendo...");
        $btn.addClass("disabled");
        setTimeout(function () {
            $btn.text(originalText);
            $(location).prop("href", url);
        }, 1200);
    });
    
});
