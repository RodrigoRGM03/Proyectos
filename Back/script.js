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

        numeroTarjetaGlobal = numeroTarjeta;
        PINGlobal = pin;

        var numeroTarjeta = document.getElementById('numero_tarjeta_debito').value;
        var pin = document.getElementById('pin_debito').value;

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
    document.getElementById("PagarAdeudos").style.display = "block";

});

document.addEventListener('DOMContentLoaded', function() {
    mostrarPagarAdeudos();
});

function obtenerDeuda(numeroTarjetaCredito) {
    const apiUrl = 'https: //localhost:44350/api/tarjetas/ObtenerDeudaTarjetaCredito?numeroTarjetaCredito=${numeroTarjetaCredito}';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la deuda de la tarjeta.');
            }
            return response.json();
        })
        .then(data => {
            const deudaElement = document.getElementById('deuda');
            deudaElement.textContent = 'Deuda actual: $$ { data.toFixed(2)}';
        })
        .catch(error => {
            console.error('Error al obtener la deuda de la tarjeta:', error);
        });
}

function mostrarPagarAdeudos() {
    document.getElementById('PagarAdeudos').style.display = 'block';

    const numeroTarjetaCredito = numeroTarjetaGlobal;

    obtenerDeuda(numeroTarjetaCredito);
}

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
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('retiro').addEventListener('click', function() {
        document.getElementById("Menu_Debito").style.display = "none";
        document.getElementById("Retiro_debito").style.display = "block";
    });

    document.getElementById('depositar').addEventListener('click', function() {
        document.getElementById("Menu_Debito").style.display = "none";
        document.getElementById("Depositar_debito").style.display = "block";
    });

    document.getElementById('saldo').addEventListener('click', function() {
        document.getElementById("Menu_Debito").style.display = "none";
        document.getElementById("Consulta_saldo_debito").style.display = "block";
    });

    document.getElementById('pin_D').addEventListener('click', function() {
        document.getElementById("Menu_Debito").style.display = "none";
        document.getElementById("Cambiar_PIN_debito").style.display = "block";
    });

    document.getElementById('transacciones').addEventListener('click', function() {
        document.getElementById("Menu_Debito").style.display = "none";
        document.getElementById("Transacciones_debito").style.display = "block";
    });

    document.getElementById('regresar').addEventListener('click', function() {
        document.getElementById("Menu_Debito").style.display = "none";
        document.getElementById("menu_principal").style.display = "block";
    });
});


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