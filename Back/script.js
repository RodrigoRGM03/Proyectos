let numeroTarjetaGlobal = '';
let PINGlobal = '';



// Opciones "Tipo_Tarjetas"---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.getElementById("credito").addEventListener("click", function() {
    document.getElementById("menu_principal").style.display = "none";
    document.getElementById("tarjeta_credito").style.display = "block";
});

document.getElementById("debito").addEventListener("click", function() {
    document.getElementById("menu_principal").style.display = "none";
    document.getElementById("tarjeta_debito").style.display = "block";
});

// Opciones
document.getElementById("salir_debito").addEventListener("click", function() {
    document.getElementById("menu_principal").style.display = "block";
    document.getElementById("tarjeta_debito").style.display = "none";
});

document.getElementById("salir_credito").addEventListener("click", function() {
    document.getElementById("menu_principal").style.display = "block";
    document.getElementById("tarjeta_credito").style.display = "none"; // Ocultar el menú de tarjeta de crédito
});

//Verificar Datos Credito-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('tarjetaForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var numeroTarjeta = document.getElementById('numero_tarjeta').value;
        var pin = document.getElementById('pin').value;

        numeroTarjetaGlobal = numeroTarjeta;
        PINGlobal = pin;

        console.log(numeroTarjeta);
        console.log(pin);

        // Construir la URL con los datos almacenados
        var url = 'https://localhost:44350/api/tarjetas/verificarpincre?numeroTarjeta=' + encodeURIComponent(numeroTarjeta) + '&pin=' + encodeURIComponent(pin);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data === true) {
                    document.getElementById("Menu_Credito").style.display = "block";
                    document.getElementById("tarjeta_credito").style.display = "none";
                } else {
                    alert('PIN incorrecto');
                }
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
                alert('Error al verificar el PIN');
            });
    });
});

//Verificar Datos Debito-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('ingresar_debito').addEventListener('click', function() {

        var numeroTarjeta = document.getElementById('numero_tarjeta_debito').value;
        var pin = document.getElementById('pin_debito').value;

        numeroTarjetaGlobal = numeroTarjeta;
        PINGlobal = pin;

        console.log(numeroTarjeta);
        console.log(pin);

        var url = 'https://localhost:44350/api/tarjetas/verificarpindeb?numeroTarjeta=' + encodeURIComponent(numeroTarjeta) + '&pin=' + encodeURIComponent(pin);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data === true) {
                    document.getElementById("Menu_Debito").style.display = "block";
                    document.getElementById("tarjeta_debito").style.display = "none";
                } else {
                    alert('PIN incorrecto');
                }
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
                alert('Error al verificar el PIN');
            });
    });
});

//Menu Credito------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Opcion de retiro---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function obtenerMontoTarjetaCredito(numeroTarjetaCredito) {
    const apiUrl = `https://localhost:44350/api/tarjetas/ObtenerMontoTarjetaCredito?numeroTarjetaCredito=${numeroTarjetaCredito}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el monto de la tarjeta');
            }
            return response.json();
        })
        .then(data => {
            const montoTarjeta = document.getElementById('montoTarjeta');
            montoTarjeta.textContent = `Monto disponible: $${data.toFixed(2)}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.getElementById('retiro_C').addEventListener('click', function() {
    document.getElementById("Menu_Credito").style.display = "none";
    document.getElementById("Retiro_credito").style.display = "block";

    const numeroTarjetaCredito = obtenerNumeroTarjetaCredito();

    obtenerMontoTarjetaCredito(numeroTarjetaCredito);
});

function obtenerNumeroTarjetaCredito() {
    return numeroTarjetaGlobal;
}

function verificarCantidad() {
    const cantidadInput = document.getElementById('cantidad');
    const cantidad = parseFloat(cantidadInput.value);

    const montoTarjetaElement = document.getElementById('montoTarjeta');
    const montoTexto = montoTarjetaElement.textContent.replace('Monto disponible: $', '');
    const montoTarjeta = parseFloat(montoTexto);

    const botonRetirar = document.getElementById('retirar_C');

    const mensajeErrorRetiro = document.getElementById('mensaje_error_retiro');

    if (cantidad >= 50 && cantidad <= montoTarjeta) {
        botonRetirar.disabled = false;
        mensajeErrorRetiro.style.display = 'none';
    } else {
        botonRetirar.disabled = true;
        mensajeErrorRetiro.style.display = 'block';
    }
}
document.getElementById('cantidad').addEventListener('input', verificarCantidad);
document.getElementById('retirar_C').disabled = true;


document.getElementById('retirar_C').addEventListener('click', function() {

    const cantidadRetiro = parseFloat(document.getElementById('cantidad').value);
    console.log("Cantidad de retiro:", cantidadRetiro);

    if (cantidadRetiro > 0 && cantidadRetiro % 50 === 0) {
        document.getElementById("Retiro_credito").style.display = "none";
        document.getElementById("informacion_billetes").style.display = "block";

        const billetes = new Billetes();

        const contadorBilletes = billetes.calcularBilletes(cantidadRetiro);

        const billetesInfo = document.getElementById('billetesInfo');
        billetesInfo.innerHTML = ''; // Limpiar el contenido existente de la tabla

        for (let i = 0; i < billetes.denominaciones.length; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${billetes.denominaciones[i]}</td>
                <td>${contadorBilletes[i]}</td>
                <td>${billetes.unidadesMoneda[i]}</td>
            `;
            billetesInfo.appendChild(row);
        }
    } else {
        document.getElementById('mensaje_error').style.display = 'block';
    }
});

const botonSalir = document.getElementById('salir');
const botonOtraTransaccion = document.getElementById('otra_transaccion');

botonSalir.addEventListener('click', function() {
    document.getElementById("informacion_billetes").style.display = "none";
    document.getElementById("menu_principal").style.display = "block";
});

botonOtraTransaccion.addEventListener('click', function() {
    document.getElementById("informacion_billetes").style.display = "none";
    document.getElementById("Menu_Credito").style.display = "block";
});

document.getElementById('regresar_MC').addEventListener('click', function() {
    document.getElementById("Retiro_credito").style.display = "none";
    document.getElementById("Menu_Credito").style.display = "block";
});

//YA LA FUNCION DEL FACKIN API
function realizarRetiro(numeroTarjeta, cantidad, montoTarjeta) {
    const apiUrl = `https://localhost:44350/api/tarjetas/RetiroCredito?numeroTarjetaCredito=${numeroTarjeta}&cantidadRetiro=${cantidad}&montoTarjeta=${montoTarjeta}`;

    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numeroTarjetaCredito: numeroTarjeta,
                cantidadRetiro: cantidad,
                montoTarjeta: montoTarjeta
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al realizar el retiro.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Retiro realizado con éxito:', data);
        })
        .catch(error => {
            console.error('Error al realizar el retiro:', error);
        });
}

document.getElementById('retirar_C').addEventListener('click', function() {
    const numeroTarjeta = obtenerNumeroTarjetaCredito();
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const montoTarjetaElement = document.getElementById('montoTarjeta');
    const montoTexto = montoTarjetaElement.textContent.replace('Monto disponible: $', '');
    const montoTarjeta = parseFloat(montoTexto);

    const botonRetirar = document.getElementById('retirar_C');
    if (!botonRetirar.disabled) {
        realizarRetiro(numeroTarjeta, cantidad, montoTarjeta);
    }
});

//Pago Credito (Tarjeta)-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


document.getElementById('pagar_C').addEventListener('click', function() {
    document.getElementById("Menu_Credito").style.display = "none";
    document.getElementById("PagarAdeudosCre").style.display = "block";

});


//Ver Saldo--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Evento para el botón "saldo_C"
    document.getElementById('saldo_C').addEventListener('click', function() {
        document.getElementById('Menu_Credito').style.display = 'none';
        document.getElementById('Retiro_cre').style.display = 'block';

        // Llamar a la función para obtener el saldo de la tarjeta
        obtenerSaldoTarjeta(numeroTarjetaGlobal);
    });

    document.getElementById('regresar_Retiro').addEventListener('click', function() {
        document.getElementById('Retiro_cre').style.display = 'none';
        document.getElementById('Menu_Credito').style.display = 'block';
    });

    // Función para actualizar la información de la tarjeta
    function actualizarInformacionTarjeta(numeroTarjeta, saldo) {
        document.getElementById('numero_tarjeta_mostrado').textContent = numeroTarjeta;
        document.getElementById('saldo_tarjeta_mostrado').textContent = '$' + saldo.toFixed(2);
    }

    // Función para obtener el saldo de la tarjeta
    function obtenerSaldoTarjeta(numeroTarjeta) {
        const apiUrl = `https://localhost:44350/api/tarjetas/ObtenerMontoTarjetaCredito?numeroTarjetaCredito=${numeroTarjeta}`;

        // Realizar la solicitud a la API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener el saldo de la tarjeta.');
                }
                return response.json();
            })
            .then(data => {
                // Mostrar el saldo devuelto por la API en la interfaz
                actualizarInformacionTarjeta(numeroTarjeta, data);
                guardarTransaccion('Checar Saldo');
            })
            .catch(error => {
                console.error('Error al obtener el saldo de la tarjeta:', error);
                // Puedes agregar lógica para manejar errores, como mostrar un mensaje de error al usuario
            });
    }
});

//CambioPINCredito---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.getElementById('pin_Cre').addEventListener('click', function() {
    document.getElementById("Menu_Credito").style.display = "none";
    document.getElementById("CambiarPIN_Cre").style.display = "block";
});

document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('CambiarPIN_Cre').style.display = 'none';
    document.getElementById('Menu_Credito').style.display = 'block';
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('acceptBtn').addEventListener('click', function() {
        if (!this.disabled) {
            const newPin = document.getElementById('newPin').value;
            const pinActual = document.getElementById('pinActual').value;

            cambiarPIN(pinActual, newPin);
        }
    });

    function verificarPIN() {
        const newPinInput = document.getElementById('newPin');
        const newPin = newPinInput.value;

        const pinActualInput = document.getElementById('pinActual');
        const pinActual = pinActualInput.value;

        const acceptBtn = document.getElementById('acceptBtn');
        const errorMsg = document.getElementById('errorMsg');

        const esValidoNuevoPin = /^[0-9]{4}$/.test(newPin);
        const esPinActualCorrecto = pinActual === PINGlobal;
        const esDiferenteDePinActual = newPin !== pinActual;

        if (esValidoNuevoPin && esPinActualCorrecto && esDiferenteDePinActual) {
            acceptBtn.disabled = false;
            errorMsg.style.display = 'none';
        } else {
            acceptBtn.disabled = true;
            errorMsg.style.display = 'block';

            if (!esValidoNuevoPin) {
                errorMsg.textContent = 'El nuevo PIN debe tener 4 dígitos numéricos.';
            } else if (!esDiferenteDePinActual) {
                errorMsg.textContent = 'El nuevo PIN no puede ser el mismo que el PIN actual.';
            } else {
                errorMsg.textContent = 'El PIN actual es incorrecto.';
            }
        }
    }

    document.getElementById('newPin').addEventListener('input', verificarPIN);
    document.getElementById('pinActual').addEventListener('input', verificarPIN);

    document.getElementById('acceptBtn').disabled = true;

    function cambiarPIN(pinActual, nuevoPIN) {
        const apiUrl = `https://localhost:44350/api/tarjetas/CambiarPINCre?numeroTarjetaCredito=${numeroTarjetaGlobal}&pin=${pinActual}&nuevoPIN=${nuevoPIN}`;

        fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cambiar el PIN.');
                }
                return response.json();
            })
            .then(data => {
                mostrarMensajeExito();
            })
            .catch(error => {
                console.error('Error al cambiar el PIN:', error);
            });
    }

    function mostrarMensajeExito() {
        alert('PIN cambiado con éxito');
        document.getElementById('CambiarPIN_Cre').style.display = 'none';
        document.getElementById('Menu_Credito').style.display = 'block';
    }
});



//Pagos de credito (Carro-Hipoteca)-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.getElementById('adeudosCredito_C').addEventListener('click', function() {
    document.getElementById("Menu_Credito").style.display = "none";
    document.getElementById("DeudaCredid").style.display = "block";
});

//Historial de trasaccion-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.getElementById('transacciones_C').addEventListener('click', function() {
    document.getElementById("Menu_Credito").style.display = "none";
    document.getElementById("Transacciones_Cr").style.display = "block";
});

// Boton De regreso-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.getElementById('regresar_C').addEventListener('click', function() {
    document.getElementById("Menu_Credito").style.display = "none";
    document.getElementById("menu_principal").style.display = "block";
});




//Menu Debito------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//document.addEventListener('DOMContentLoaded', function() {

    //retiro---------------------------------------------------

    // Función para obtener el monto de la tarjeta de débito utilizando una API tipo GET
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el elemento donde se mostrará el monto de la tarjeta
    const montoTarjetaElement = document.getElementById('montoT');

    num = numeroTarjetaGlobal
    console.log(num)

    // Función para obtener el monto de la tarjeta mediante la API GET
    function obtenerMontoTarjeta(numeroTarjeta) {
        const apiUrl = `https://localhost:44350/api/tarjetas/ObtenerMontoTarjetaDebito?numeroTarjetaDebito=${num}`;
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener el monto de la tarjeta');
                }
                return response.json();
            })
            .then(data => {
                // Actualizar el contenido del elemento con el monto obtenido
                montoTarjetaElement.textContent = `Monto disponible: $${data.toFixed(2)}`;
            })
            .catch(error => {
                console.error('Error al obtener el monto de la tarjeta:', error);
            });
    }
});


 
document.getElementById('retiro').addEventListener('click', function() {
    document.getElementById("Menu_Debito").style.display = "none";
    document.getElementById("Retiro_debitoD").style.display = "block";

});


    //deposito------------------------------------------------------------------
    document.getElementById('depositar').addEventListener('click', function() {
        document.getElementById("Menu_Debito").style.display = "none";
        document.getElementById("Depositar_debito").style.display = "block";
    });

    // Obtener el botón "Regresar" de la interfaz de depósito de débito
const regresaBtnDeposito = document.getElementById('regresaBtnDeposito');

// Agregar un evento de clic al botón "Regresar"
regresaBtnDeposito.addEventListener('click', function() {
    document.getElementById("Depositar_debito").style.display = "none";
    document.getElementById("Menu_Debito").style.display = "block";
    // Aquí iría la lógica para regresar al menú de débito
    console.log('Regresando al menú de débito desde Depositar_debito');
});


    // Obtener el botón "Depositar" de la interfaz de depósito de débito
const depositarBtn = document.getElementById('depositarBtn');

// Agregar un evento de clic al botón "Depositar"
depositarBtn.addEventListener('click', function() {
    const montoDepositoInput = document.getElementById('montoDeposito');
    const montoDeposito = parseFloat(montoDepositoInput.value);

    if (montoDeposito > 0 && montoDeposito > 50) {
        // Paso 1: Obtener el monto de la tarjeta de débito
        obtenerMontoTarjetaDebito(montoDeposito);
    } else {
        // Mostrar un mensaje de error si el monto es incorrecto
        alert('El monto a depositar debe ser mayor a $50 y mayor que cero.');
    }
});

// Función para obtener el monto de la tarjeta de débito utilizando una API tipo GET
function obtenerMontoTarjetaDebito(cantidadDeposito) {
    const apiUrl = `https://localhost:44350/api/tarjetas/ObtenerMontoTarjetaDebito?numeroTarjetaDebito=${numeroTarjetaGlobal}`;

    fetch(apiUrl, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const montoTarjeta = data;
        // Paso 2: Realizar el depósito utilizando una API tipo POST
        realizarDeposito(cantidadDeposito, montoTarjeta);
        console.log(cantidadDeposito)
        console.log(montoTarjeta)
    })
    .catch(error => {
        console.error('Error al obtener el monto de la tarjeta:', error);
        // Mostrar un mensaje de error en caso de fallo al obtener el monto
        alert('Error al obtener el monto de la tarjeta. Intente nuevamente más tarde.');
    });
}

// Función para realizar el depósito utilizando una API tipo POST
function realizarDeposito(cantidadDeposito, montoTarjeta) {
    const apiUrl = `https://localhost:44350/api/tarjetas/DepositarDebito?numeroTarjetaDebito=${numeroTarjetaGlobal}&cantidadDeposito=${cantidadDeposito}&montoTarjeta=${montoTarjeta}`;

    fetch(apiUrl, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al realizar el depósito.');
        }
        return response.json();
    })
    .then(data => {
        // Mostrar un mensaje de éxito después de realizar el depósito
        alert('Depósito realizado con éxito');
        // Actualizar el saldo en la interfaz si es necesario
        // Aquí podrías llamar a una función para actualizar el saldo mostrado en la interfaz
    })
    .catch(error => {
        console.error('Error al realizar el depósito:', error);
        // Mostrar un mensaje de error en caso de fallo al realizar el depósito
        alert('Error al realizar el depósito. Intente nuevamente más tarde.');
    });

   
}

    //Saldo-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Agregar un evento de clic al botón "saldo"
document.getElementById('saldo').addEventListener('click', function() {
    // Ocultar la interfaz del menú de débito y mostrar la interfaz de consulta de saldo
    document.getElementById("Menu_Debito").style.display = "none";
    document.getElementById("Consulta_saldo_debito").style.display = "block";

    // Obtener el número de tarjeta global
    const numeroTarjetaC = numeroTarjetaGlobal;

    console.log(numeroTarjetaC)

    // Mostrar el número de tarjeta en la interfaz
    document.getElementById('Numero_tarjeta_mostradoCre').textContent = numeroTarjetaC;

       // Hacer una solicitud GET a la API para obtener el monto de la tarjeta
    fetch('https://localhost:44350/api/tarjetas/ObtenerMontoTarjetaDebito?numeroTarjetaDebito=' + numeroTarjetaC, {
        method: 'GET' // Especificar que es una solicitud GET
    })
    .then(response => response.json())
    .then(dataD => {
        console.log(dataD);
        // Mostrar el monto de la tarjeta en la interfaz
        document.getElementById('Saldo_tarjeta_mostradoCre').textContent = `$${dataD}`;
        
    })
    .catch(error => {
        console.error('Error al obtener el monto de la tarjeta:', error);
        // En caso de error, mostrar un mensaje en la interfaz
        document.getElementById('Saldo_tarjeta_mostradoCre').textContent = 'Error al obtener el monto';
    });
});


// Obtener el botón "Regresar" por su ID
const btnRegresar = document.getElementById('regresar_RetiroCre');

// Agregar un evento de clic al botón "Regresar"
btnRegresar.addEventListener('click', function() {
    // Ocultar la interfaz de consulta de saldo y mostrar la interfaz del menú de débito
    document.getElementById('Consulta_saldo_debito').style.display = 'none';
    document.getElementById('Menu_Debito').style.display = 'block';
});


    //Cambio PIN---------------------------------------------------------------------------------
    document.getElementById('pin_D').addEventListener('click', function() {
        document.getElementById("Menu_Debito").style.display = "none";
        document.getElementById("Cambiar_PIN_debito").style.display = "block";
    });

    document.getElementById('cancelBtnDebito').addEventListener('click', function() {
        document.getElementById('Cambiar_PIN_debito').style.display = 'none';
        document.getElementById('Menu_Debito').style.display = 'block';
    });

    // Función para verificar si el nuevo PIN es válido
function verificarNuevoPINDebito() {
    const newPinDebitoInput = document.getElementById('newPinDebito');
    const newPinDebito = newPinDebitoInput.value;

    const pinActualDebitoInput = document.getElementById('pinActualDebito');
    const pinActualDebito = pinActualDebitoInput.value;

    const acceptBtnDebito = document.getElementById('acceptBtnDebito');
    const errorMsgDebito = document.getElementById('errorMsgDebito');

    const esValidoNuevoPinDebito = /^[0-9]{4}$/.test(newPinDebito);
    const esPinActualCorrectoDebito = pinActualDebito === PINGlobal;
    const esDiferenteDePinActualDebito = newPinDebito !== pinActualDebito;

    if (esValidoNuevoPinDebito && esPinActualCorrectoDebito && esDiferenteDePinActualDebito) {
        acceptBtnDebito.disabled = false;
        errorMsgDebito.style.display = 'none';
    } else {
        acceptBtnDebito.disabled = true;
        errorMsgDebito.style.display = 'block';

        if (!esValidoNuevoPinDebito) {
            errorMsgDebito.textContent = 'El nuevo PIN debe tener 4 dígitos numéricos.';
        } else if (!esDiferenteDePinActualDebito) {
            errorMsgDebito.textContent = 'El nuevo PIN no puede ser el mismo que el PIN actual.';
        } else {
            errorMsgDebito.textContent = 'El PIN actual es incorrecto.';
        }
    }
}

const acceptBtnDebito = document.getElementById('acceptBtnDebito');

// Agregar un evento de clic al botón "Aceptar"
acceptBtnDebito.addEventListener('click', function() {
    const newPinDebito = document.getElementById('newPinDebito').value;
    const pinActualDebito = document.getElementById('pinActualDebito').value;

    cambiarPINDebito(pinActualDebito, newPinDebito);
});

// Obtener el botón "Cancelar" de la interfaz de cambiar PIN de débito
const cancelBtnDebito = document.getElementById('cancelBtnDebito');

// Agregar un evento de clic al botón "Cancelar"
cancelBtnDebito.addEventListener('click', function() {
    // Aquí iría la lógica para cancelar la operación de cambiar PIN
    console.log('Operación de cambiar PIN de débito cancelada');
});

// Agregar eventos para verificar el nuevo PIN al escribir en el campo
document.getElementById('newPinDebito').addEventListener('input', verificarNuevoPINDebito);
document.getElementById('pinActualDebito').addEventListener('input', verificarNuevoPINDebito);

// Función para enviar el nuevo PIN a la API y realizar el cambio
function cambiarPINDebito(pinActual, nuevoPIN) {
    const apiUrl = `https://localhost:44350/api/tarjetas/CambiarPINDeb?numeroTarjetaDebito=${numeroTarjetaGlobal}&pin=${pinActual}&nuevoPIN=${nuevoPIN}`;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cambiar el PIN de débito.');
        }
        return response.json();
    })
    .then(data => {
        mostrarMensajeExitoDebito();
    })
    .catch(error => {
        console.error('Error al cambiar el PIN de débito:', error);
    });
}

// Función para mostrar un mensaje de éxito después de cambiar el PIN de débito
function mostrarMensajeExitoDebito() {
    alert('PIN de débito cambiado con éxito');
    document.getElementById('Cambiar_PIN_debito').style.display = 'none';
    document.getElementById('Menu_Debito').style.display = 'block';
}

    console.log('Nuevo PIN válido:', newPinDebito);


    //transacciones-------------------------------
    document.getElementById('transacciones').addEventListener('click', function() {
        document.getElementById("Menu_Debito").style.display = "none";
        document.getElementById("Transacciones_debito").style.display = "block";
    });

    // Mostrar la lista al hacer clic en el botón "Continuar"
document.getElementById('continuarBtn').addEventListener('click', function() {
    mostrarTransacciones();
    document.getElementById('Transacciones_debito').style.display = 'block'; // Mostrar la interfaz
});

// Regresar a la interfaz anterior al hacer clic en el botón "Regresar"
document.getElementById('regresarBtn').addEventListener('click', function() {
    document.getElementById('Transacciones_debito').style.display = 'none'; // Ocultar la interfaz
});

    document.getElementById('regresare').addEventListener('click', function() {
        document.getElementById("Menu_Debito").style.display = "none";
        document.getElementById("menu_principal").style.display = "block";
    });
//});


// Clases para funcionamiento -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


class Proceso {
    constructor(montoInicial, limiteRetiroDiario, limiteTransacciones, servicioAutenticacion) {
        this.Monto = montoInicial;
        this.LimiteRetiroDiario = limiteRetiroDiario;
        this.LimiteTransacciones = limiteTransacciones;
        this.ServicioAutenticacion = servicioAutenticacion;
        this.TransaccionesHoy = 0;
        this.Billetes = new Billetes();
    }

    retirar(cantidadRetiro) {
        // Verificar que la cantidad de retiro sea mayor que cero y sea un múltiplo de 50
        if (cantidadRetiro > 0 && cantidadRetiro % 50 === 0) {
            if (cantidadRetiro <= this.Monto) {
                this.Monto -= cantidadRetiro;
                this.ServicioAutenticacion.actualizarMontoMenor(this.NumeroTarjeta, cantidadRetiro);
                console.log(`Se retiraron ${cantidadRetiro} correctamente.`);

                const billetesRetirados = this.Billetes.calcularBilletes(cantidadRetiro);
                this.Billetes.imprimirBilletes();

                this.Billetes.depositarBilletes(billetesRetirados);
            } else {
                console.log("No se puede retirar la cantidad especificada.");
            }
        } else {
            console.log("La cantidad de retiro debe ser mayor que cero y un múltiplo de 50.");
        }
    }
}



class Billetes {
    constructor() {
        this.denominaciones = [50, 100, 200, 500, 1000];
        this.unidadesMoneda = ["pesos", "pesos", "pesos", "pesos", "pesos"];
        this.contadorBilletes = new Array(this.denominaciones.length).fill(0);
        this.contadorBilletesDepositados = new Array(this.denominaciones.length).fill(0);
    }

    calcularBilletes(efectivo) {
        for (let i = this.denominaciones.length - 1; i >= 0; i--) {
            this.contadorBilletes[i] = Math.floor(efectivo / this.denominaciones[i]);
            efectivo %= this.denominaciones[i];
        }

        return this.contadorBilletes;
    }

    imprimirBilletes() {
        console.log("Cantidad de billetes recibidos:");
        for (let i = 0; i < this.denominaciones.length; i++) {
            console.log(`${this.contadorBilletes[i]} ${this.denominaciones[i]} ${this.unidadesMoneda[i]}`);
        }
    }

    depositarBilletes(billetes) {
        for (let i = 0; i < this.denominaciones.length; i++) {
            this.contadorBilletesDepositados[i] += billetes[i];
        }
    }

    imprimirBilletesDepositados() {
        console.log("Cantidad de billetes depositados:");
        for (let i = 0; i < this.denominaciones.length; i++) {
            console.log(`${this.contadorBilletesDepositados[i]} ${this.denominaciones[i]} ${this.unidadesMoneda[i]}`);
        }
    }
}

document.getElementById('vehiculo').addEventListener('click', function() {
    document.getElementById("DeudaCredid").style.display = "none";
    document.getElementById("Pago_Vehiculo").style.display = "block";
});

document.getElementById('hipotecario').addEventListener('click', function() {
    document.getElementById("DeudaCredid").style.display = "none";
    document.getElementById("Pago_Hipotecario").style.display = "block";
});

document.addEventListener('DOMContentLoaded', function() {
    // Obtener los botones por su ID
    const vehiculoBtn = document.getElementById('vehiculo');
    const hipotecarioBtn = document.getElementById('hipotecario');

    // Agregar eventos de click a los botones
    vehiculoBtn.addEventListener('click', function() {
        // Mostrar la interfaz de Pago_Vehiculo
        document.getElementById('Pago_Vehiculo').style.display = 'block';
        // Ocultar la interfaz actual (DeudaCredid)
        document.getElementById('DeudaCredid').style.display = 'none';
    });

    // Evento para el botón "atrasPagoVehiculo"
document.getElementById('atrasPagoVehiculo').addEventListener('click', function() {
    // Oculta la sección "Pago_Vehiculo" y muestra la interfaz principal
    document.getElementById("Pago_Vehiculo").style.display = "none";
    document.getElementById("menu_principal").style.display = "block";
});

// Evento para el botón "pagarPagoVehiculo"
document.getElementById('pagarPagoVehiculo').addEventListener('click', function() {
    // Obtén la cantidad a pagar ingresada por el usuario
    const montoPagoVehiculo = parseFloat(document.getElementById('montoPagoVehiculo').value);

    // Realiza el pago de vehículo utilizando la API POST
    realizarPagoVehiculo(montoPagoVehiculo);
});

// Función para realizar el pago de vehículo
function realizarPagoVehiculo(montoPago) {
    // Define la URL de la API POST para saldar pago de vehículo
    const apiUrl = `https://localhost:44350/api/tarjetas/SaldarPagoDeCoche?numeroTarjeta=${numeroTarjetaGlobal}&saldoAPagar=${montoPago}`;

    // Realiza una solicitud POST a la API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al realizar el pago de vehículo.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Pago de vehículo realizado con éxito:', data);
        // Puedes agregar más lógica para manejar la respuesta si es necesario
    })
    .catch(error => {
        console.error('Error al realizar el pago de vehículo:', error);
        // Maneja el error de manera apropiada (por ejemplo, muestra un mensaje de error al usuario)
    });
}
    

    hipotecarioBtn.addEventListener('click', function() {
        // Mostrar la interfaz de Pago_Hipotecario
        document.getElementById('Pago_Hipotecario').style.display = 'block';
        // Ocultar la interfaz actual (DeudaCredid)
        document.getElementById('DeudaCredid').style.display = 'none';
    });
    
    // Evento para el botón "atrasPagoHipotecario"
document.getElementById('atrasPagoHipotecario').addEventListener('click', function() {
    // Oculta la sección "Pago_Hipotecario" y muestra la interfaz principal
    document.getElementById("Pago_Hipotecario").style.display = "none";
    document.getElementById("menu_principal").style.display = "block";
});

// Evento para el botón "pagarPagoHipotecario"
document.getElementById('pagarPagoHipotecario').addEventListener('click', function() {
    // Obtén la cantidad a pagar ingresada por el usuario
    const montoPagoHipotecario = parseFloat(document.getElementById('montoPagoHipotecario').value);

    // Realiza el pago hipotecario utilizando la API POST
    realizarPagoHipotecario(montoPagoHipotecario);
});

// Función para realizar el pago hipotecario
function realizarPagoHipotecario(montoPago) {
    // Define la URL de la API POST para saldar hipoteca
    const apiUrl = `https://localhost:44350/api/tarjetas/SaldarHipoteca?numeroTarjeta=${numeroTarjetaGlobal}&saldoAPagar=${montoPago}`;

    // Realiza una solicitud POST a la API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al realizar el pago hipotecario.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Pago hipotecario realizado con éxito:', data);
        // Puedes agregar más lógica para manejar la respuesta si es necesario
    })
    .catch(error => {
        console.error('Error al realizar el pago hipotecario:', error);
        // Maneja el error de manera apropiada (por ejemplo, muestra un mensaje de error al usuario)
    });
}
    

    
      
});

