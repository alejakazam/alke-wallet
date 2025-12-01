let saldoActual = Number(localStorage.getItem("saldo")) || 0; //accede a la variable saldo de localstorage de menu
$("#depositButton").click(function() {  // activa función en botón de depositar en evento de click que lee valor que se desea depositar
    const monto = Number ($("#depositAmount").val());
                if (isNaN(monto) || monto <= 0) {  // flujo revisa si el monto es un monto positivo, también en html tiene min-1 para este campo
                        Swal.fire({                    // alerta de monto no válido
                        title: "Monto no válido",
                        icon: "error",
                        theme: 'dark',
                        background: '#2A2A2E',
                        backdrop: '#1b1b1bd5',
                        width: '600px',
                        padding: "2.6em",
                        confirmButtonColor: '#41727D'
                        });
                        return;
                }
                            if (!Number.isInteger(monto)) {  //evitar floats como montos válidos en depósito
                                    Swal.fire({
                                        title: "Monto no válido",
                                        text: "No se permiten valores decimales",
                                        icon: "error",
                                        theme: 'dark',
                                        background: '#2A2A2E',
                                        backdrop: '#1b1b1bd5',
                                        width: '600px',
                                        padding: "2.6em",
                                        confirmButtonColor: '#41727D'
                                    });
                                    return;
                                }

    saldoActual += monto;  // monto de depósito válido se suma 
    localStorage.setItem("saldo", saldoActual); // se actualiza variable de saldo en localstorage
    let movimientos = localStorage.getItem("movimientos") || ""; //crea una variable de movimiento de tipo depósito para ser utilizada en transacciones
    movimientos += `Depósito misma cuenta - $${monto}\n`;
    localStorage.setItem("movimientos", movimientos);
    $("#depositAmount").val("");  // redirige una vez que se realiza un depósito exitoso, primero muestra alerta y el timer se activa al confirmarla (1seg)
                        Swal.fire({
                        title: "Depósito exitoso, pronto será redirigido",
                        theme: 'dark',
                        background: '#2A2A2E',
                        text: "Nuevo saldo: $" + saldoActual.toLocaleString(),
                        backdrop: '#1b1b1bd5',
                        width: '600px',
                        padding: "2.6em",
                        confirmButtonColor: '#41727D'
                            }).then((result) => {

                                if (result.isConfirmed) {
                                    setTimeout(function () {
                                    $(location).attr("href", "menu.html");
                                    }, 1000);
                                }
    });
});
                $(".action-btn").on("click", function (e) { // redirección y prevención de comportamiento por default
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