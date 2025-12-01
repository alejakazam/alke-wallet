    $(document).ready(function () {  // carga página para correcto funcionamiento de JS
        let saldoActual = Number(localStorage.getItem("saldo")) || 0; // crea variable de local storage que se muestra acá y se utiliza en deposit y sendmoney

        setTimeout(function () { // función que muestra saldo actual y lo almacena de manera local (para interactuar con deposit, transactions y sendmoney)
            $("#saldo").text("$" + saldoActual.toLocaleString());
        }, 1500);
            });
            $(".action-btn").on("click", function (e) { // función de redirección de los distintos botones según rúbrica
            e.preventDefault(); // previene comportamiento por defecto de la página 
            const $btn = $(this);
            const originalText = $btn.text();
            const url = $btn.attr("href");
            $btn.text("Redirigiendo...");  // cambia el texto del botón a redirigiendo
            $btn.addClass("disabled"); // añade clase disabled 
            setTimeout(function () { // pone timer de redirección
                $btn.text(originalText);
                $(location).prop("href", url); //redirecciona
            }, 1200); // tiempo redirección 
        });