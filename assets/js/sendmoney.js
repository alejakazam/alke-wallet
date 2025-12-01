$(document).ready(function () { //función para cargar la página y que JS se ejecute correctamente
    $("#submitForm").on("click", function () { // Función envío de formulario con evento de click 
        let nombreCompleto = $("#nombre").val().trim(); //Valores que se leen del formulario que retornan el input y usan trim para recortar espacios
        let alias = $("#alias").val().trim();
        let numCuenta = $("#numcuenta").val().trim();
        let banco = $("#banco").val().trim();
        if (!nombreCompleto || !numCuenta || !banco) {  //lectura de campos obligatorios (omite alias) envía alerta si no están completos
            Swal.fire({
                title: "Por favor rellene los campos obligatorios (*)", 
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
            if (!/^\d+$/.test(numCuenta)) {  // flujo de decisión de envío de alerta si el número de cuenta no es numérico (alerta)
        Swal.fire({
            title: "El número de cuenta debe ser numérico",
            text: "Evite letras, espacios o símbolos",
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
        Swal.fire({  // alerta de envío de formulario exitoso
            title: "Nuevo contacto agregado correctamente",
            icon: "success",
            theme: 'dark',
            background: '#2A2A2E',
            backdrop: '#1b1b1bd5',
            width: '600px',
            padding: "2.6em",
            confirmButtonColor: '#41727D'
        });
        let nuevoLi = $("<li>").addClass("list-group-item"); // añade clase a nuevo li a crear
        let nuevoDiv = $("<div>").addClass("contact-info"); // añade clase a nuevo div a crear
            nuevoDiv.append(  // crea nuevos span con clase añadida que tienen formato tipo de texto que incluye espacio inicial y leen campo del formulario
            $("<input>").attr({
                type: "radio",
                name: "contactoSeleccionado"
            }).addClass("radio-contacto"),
            $("<span>").addClass("nombre-contacto").text(nombreCompleto),
            $("<span>").addClass("detalles-contacto numCuenta").text(" Cuenta n°:" + numCuenta),
            $("<span>").addClass("detalles-contacto alias").text(" Alias:" + (alias || "Sin alias")),
            $("<span>").addClass("detalles-contacto banco").text(" Banco:" + banco)
        );
        nuevoLi.append(nuevoDiv); // añade el div
        $("#contactList").append(nuevoLi); // añade el li
        $("#formModal").modal('hide'); // cierra el modal
        $("#myForm")[0].reset(); // resetea el formulario para nuevos envíos
    });
    $("#searchContact").on("keyup", function () {  //función para búsqueda de contactos de la lista
        let filtro = $(this).val().toLowerCase(); // crea una variable de filtro en base a los valores transformando el input a minúscula
        $("#contactList li").each(function () { // función que permite la búsqueda si hay coincidencias en nombre o detalles (después de convertir a minúsculas)
            let nombre = $(this).find(".nombre-contacto").text().toLowerCase();
            let detalles = $(this).find(".detalles-contacto").text().toLowerCase();
            $(this).toggle(nombre.includes(filtro) || detalles.includes(filtro));
        });
    });
    let saldoActual = Number(localStorage.getItem("saldo")) || 0; // toma la variable en localStorage del saldo de menú para hacer uso de la función abajo
    $("#moneySend").on("click", function () { // genera función con evento de click en moneysend con prompt personalizado y restringido para monto
    Swal.fire({
        title: "Ingrese el monto que desea enviar (saldo actual: " + localStorage.getItem("saldo") + ")", // muestra saldo en mensaje de confirmación de monto 
        input: "number",
        inputAttributes: { //limita tipos de inputs
            min: 1,
            step: 1
        },
        theme: 'dark',
        background: '#2A2A2E',
        backdrop: '#1b1b1bd5',
        width: '600px',
        padding: "2.6em",
        confirmButtonColor: '#41727D',
        cancelButtonColor: '#555',
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        inputPlaceholder: "Monto en pesos"
    }).then((result) => {    // flujo de decisión con el resultado de la alerta tipo sweetalert (no arroja booleano)
        if (!result.isConfirmed) return;
        let monto = Number(result.value);
        if (isNaN(monto) || monto <= 0) { // verificación de monto válido, arroja una alerta de error en caso de no ser válido
            Swal.fire({
                title: "Monto no válido",
                icon: "error",
                theme: 'dark',
                background: '#2A2A2E',
                text: "Ingrese un número mayor a 0",
                backdrop: '#1b1b1bd5',
                width: '600px',
                padding: "2.6em",
                confirmButtonColor: '#41727D'
            });
            return;
        }
        if (monto > saldoActual) {  // revisa que el monto sea un número que no exceda el saldo actual de la cuenta o envía alerta
            Swal.fire({
                title: "El monto excede su saldo actual",
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
        saldoActual -= monto;  // resta al monto actual si la transacción es exitosa
        localStorage.setItem("saldo", saldoActual); // actualiza el saldo
         let movimientos = localStorage.getItem("movimientos") || ""; // crea variable de movimiento para ser utilizada en transacciones
         movimientos += `Transferencia a terceros - $${monto}\n`;
         localStorage.setItem("movimientos", movimientos);
          Swal.fire({  // confirma transferencia a usuario
            title: "Transferencia realizada con éxito",
            icon: "success",
            theme: 'dark',
            background: '#2A2A2E',
            backdrop: '#1b1b1bd5',
            width: '600px',
            padding: "2.6em",
            confirmButtonColor: '#41727D'
        });
    });
});
});
    $(".action-btn").on("click", function (e) { // redirección de botón, si bien no es requerido en este apartado, se añade para tener unidad en diseño
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