using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Apilongo.Data;
using Apilongo.Models;

namespace Apilongo.Controllers
{
    public class TarjetasController : ApiController
    {
        [HttpGet]
        [Route("api/tarjetas/verificarpincre")]
        public IHttpActionResult VerificarPinTarjeta(string numeroTarjeta, int pin)
        {
            try
            {
                bool pinCorrecto = UsuarioData.VerificarPIN(numeroTarjeta, pin);

                if (pinCorrecto)
                {
                    return Ok(true);
                }
                else
                {
                    return Ok(false);
                }
            }
            catch (Exception ex)
            {
                
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/tarjetas/verificarpindeb")]
        public IHttpActionResult VerificarPinTarjetaDeb(string numeroTarjeta, int pin)
        {
            try
            {
                bool pinCorrecto = UsuarioData.VerificarPINDeb(numeroTarjeta, pin);
               
                if (pinCorrecto)
                {
                    return Ok(true);
                }
                else
                {
                    return Ok(false);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        
        public Tarjetas Get(int id)
        {
            return UsuarioData.Obtener(id);
        }

        [HttpGet]
        [Route("api/tarjetas/ObtenerMontoTarjetaCredito")]
        public IHttpActionResult ObtenerMontoTarjetaCredito(string numeroTarjetaCredito)
        {
            decimal montoTarjetaCredito = 0;

            string connectionString = Apilongo.Data.Conexion.rutaConexion;

            string query = "SELECT MontoTarjetaCredito FROM Tarjetas WHERE NumeroTarjetaCredito = @NumeroTarjetaCredito";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@NumeroTarjetaCredito", numeroTarjetaCredito);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            montoTarjetaCredito = Convert.ToDecimal(reader["MontoTarjetaCredito"]);
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                }
            }

            return Ok(montoTarjetaCredito);
        }

        [HttpPost]
        [Route("api/tarjetas/CambiarPINCre")]
        public IHttpActionResult CambiarPINCre(string numeroTarjetaCredito, int pin, int nuevoPIN)
        {
            string connectionString = Apilongo.Data.Conexion.rutaConexion;

            string consultaVerificacion = "SELECT PIN FROM Tarjetas WHERE NumeroTarjetaCredito = @NumeroTarjetaCredito";

            string consultaActualizacion = "UPDATE Tarjetas SET PIN = @NuevoPIN WHERE NumeroTarjetaCredito = @NumeroTarjetaCredito";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                
                using (SqlCommand commandVerificacion = new SqlCommand(consultaVerificacion, connection))
                {
                    commandVerificacion.Parameters.AddWithValue("@NumeroTarjetaCredito", numeroTarjetaCredito);

                    int pinActual = Convert.ToInt32(commandVerificacion.ExecuteScalar());

                    if (pinActual != pin)
                    {
                        return Ok(false);
                    }

                    using (SqlCommand commandActualizacion = new SqlCommand(consultaActualizacion, connection))
                    {
                        commandActualizacion.Parameters.AddWithValue("@NumeroTarjetaCredito", numeroTarjetaCredito);
                        commandActualizacion.Parameters.AddWithValue("@NuevoPIN", nuevoPIN);
                        
                        commandActualizacion.ExecuteNonQuery();
                    }
                }
            }

            return Ok(true);
        }

        [HttpPost]
        [Route("api/tarjetas/SaldarDeudaTarjetaCredito")]
        public IHttpActionResult SaldarDeudaTarjetaCredito(string numeroTarjetaCredito, decimal cantidadPagar)
        {
            string connectionString = Apilongo.Data.Conexion.rutaConexion;

            string consultaDeuda = "SELECT DeudaTarjetaCredito FROM Tarjetas WHERE NumeroTarjetaCredito = @NumeroTarjetaCredito";

            string consultaActualizacion = "UPDATE Tarjetas SET DeudaTarjetaCredito = @CantidadActualizada WHERE NumeroTarjetaCredito = @NumeroTarjetaCredito";

            decimal deudaTarjetaCredito = 0;
            decimal cantidadActualizada = 0;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(consultaDeuda, connection))
                { 
                    command.Parameters.AddWithValue("@NumeroTarjetaCredito", numeroTarjetaCredito);

                    object resultado = command.ExecuteScalar();
                    if (resultado != null && resultado != DBNull.Value)
                    {
                        deudaTarjetaCredito = Convert.ToDecimal(resultado);
                    }
                    else
                    {
                        
                        return NotFound();
                    }
                }

                cantidadActualizada = deudaTarjetaCredito - cantidadPagar;

                using (SqlCommand command = new SqlCommand(consultaActualizacion, connection))
                {
                    command.Parameters.AddWithValue("@NumeroTarjetaCredito", numeroTarjetaCredito);
                    command.Parameters.AddWithValue("@CantidadActualizada", cantidadActualizada);

                    command.ExecuteNonQuery();
                }
            }

            
            return Ok(true);
        }
        [HttpGet]
        [Route("api/tarjetas/ObtenerMontoTarjetaDebito")]
        public IHttpActionResult ObtenerMontoTarjetaDebito(string numeroTarjetaDebito)
        {
            decimal montoTarjetaDebito = 0;

            string connectionString = Apilongo.Data.Conexion.rutaConexion;

            string query = "SELECT MontoTarjetaDebito FROM Tarjetas WHERE NumeroTarjetaDebito = @NumeroTarjetaDebito";

            using (SqlConnection connection = new SqlConnection(connectionString))
            { 
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@NumeroTarjetaDebito", numeroTarjetaDebito);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            montoTarjetaDebito = Convert.ToDecimal(reader["MontoTarjetaDebito"]);
                        }
                        else
                        {
                            return Ok(false);
                        }
                    }
                }
            }
            return Ok(montoTarjetaDebito);
        }

    }
}