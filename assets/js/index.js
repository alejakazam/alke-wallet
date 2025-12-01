    const confirmacion= Swal.fire({ // Confirmación diseñada para entregar al usuario las credenciales, posee un flujo con if que lleva a una página si se omite (cancela)
                        title: "Por favor tome nota de las credenciales de la página",
                        icon: "info",
                        theme:'dark',
                        background:'#2A2A2E',
                        text: "mail ceagarcia@gmail.com pass 12345",
                        backdrop: '#1b1b1bd5',
                        width: '600px',
                        padding: "1em",
                        showCancelButton: true,
                        cancelButtonText: "Cancelar",
                        confirmButtonColor: '#41727D'
                        }).then((result) => {
                        if (result.isDismissed){
                        $(location).attr("href", "./backroom.html");
                        }
                        });
    function login(){   // Función login con los datos de credenciales válidos y los valores que debe leer en el formulario
    const validEmail= "ceagarcia@gmail.com"
    const validPass= "12345"
    const email = $("#email").val() 
    const password = $("#password").val()
                        if (!validarEmail(email)) {   //Flujo de decisión si el mail no es válido (toma la función definida más abajo)
                        Swal.fire({
                                        title: "Datos ingresados no válidos",
                                        icon: "error",
                                        theme:'dark',
                                        background:'#2A2A2E',
                                        text: "Pruebe cambiando el formato ej: @gmail.com",
                                        backdrop: '#1b1b1bd5',
                                        width: '600px',
                                        padding: "2.6em",
                                        confirmButtonColor: '#41727D'
                                        });
                                return;
                        }
             if(email === validEmail && password === validPass){  //Flujo de decisión, si el email es el correcto envía a menú (no me convencía usar attr pero la rúbrica indicaba usar JQuery)
             $(location).attr("href", "./menu.html");
             }else{
             Swal.fire({                                   //Alerta en caso de usar credenciales válidas pero incorrrectas.
                        title: "Credenciales no válidas",
                        icon: "error",
                        theme:'dark',
                        background:'#2A2A2E',
                        text: "Este computador se autodestruirá en 5 segundos...",
                        backdrop: '#1b1b1bd5',
                        width: '600px',
                        padding: "2.6em",
                        confirmButtonColor: '#41727D'
                        });
                        }
                        }
                function validarEmail(email) {      // Función para verificar que el email siga un formato específico usuario@algo.com
                        const regex = /^[^\s@]+@[^\s@]+\.com$/;
                        return regex.test(email);
                        }
                        
