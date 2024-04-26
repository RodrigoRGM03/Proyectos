using System;
using System.Data;
using System.Data.SqlClient;
using System.Net.Http;
using System.Net;
using Apilongo.Models;

namespace Apilongo.Data
{
    public class UsuarioData
    {
        public static Tarjetas Obtener(int idusuario)
        {
            Tarjetas oTarjetas = new Tarjetas();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                using (SqlCommand cmd = new SqlCommand("usp_obtener", oConexion))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", idusuario);

                    try
                    {
                        oConexion.Open();
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                oTarjetas = new Tarjetas
                                {
                                    ID = Convert.ToInt32(dr["ID"]),
                                    Nombre1 = dr["Nombre1"].ToString(),
                                    Nombre2 = dr["Nombre2"].ToString(),
                                    Apellido1 = dr["Apellido1"].ToString(),
                                    Apellido2 = dr["Apellido2"].ToString(),
                                    NumeroTarjetaCredito = dr["NumeroTarjetaCredito"].ToString(),
                                    MontoTarjetaCredito = Convert.ToDecimal(dr["MontoTarjetaCredito"]),
                                    NumeroTarjetaDebito = dr["NumeroTarjetaDebito"].ToString(),
                                    MontoTarjetaDebito = Convert.ToDecimal(dr["MontoTarjetaDebito"]),
                                    PIN = Convert.ToInt32(dr["PIN"]),
                                    DeudaTarjetaCredito = Convert.ToDecimal(dr["DeudaTarjetaCredito"]),
                                    PagoCoche = Convert.ToDecimal(dr["PagoCoche"]),
                                    PagoHipoteca = Convert.ToDecimal(dr["PagoHipoteca"])
                                };
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error al obtener datos: {ex.Message}");
                    }
                }
            }
            return oTarjetas;
        }

        public static bool VerificarPIN(string numeroTarjeta, int pin)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                using (SqlCommand cmd = new SqlCommand("usp_VerificarCredito", oConexion))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Parámetros del procedimiento almacenado
                    cmd.Parameters.AddWithValue("@NumeroTarjeta", numeroTarjeta);
                    cmd.Parameters.AddWithValue("@PIN", pin);

                    try
                    {
                        oConexion.Open();
                        int result = (int)cmd.ExecuteScalar();
                        return result == 1;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error al verificar el PIN: {ex.Message}");
                        return false;
                    }
                }
            }
        }

        public static bool VerificarPINDeb(string numeroTarjeta, int pin)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                using (SqlCommand cmd = new SqlCommand("usp_VerificarDebito", oConexion))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Parámetros del procedimiento almacenado
                    cmd.Parameters.AddWithValue("@NumeroTarjeta", numeroTarjeta);
                    cmd.Parameters.AddWithValue("@PIN", pin);

                    try
                    {
                        oConexion.Open();
                        int result = (int)cmd.ExecuteScalar();
                        return result == 1;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error al verificar el PIN: {ex.Message}");
                        return false;
                    }
                }
            }
        }

        public static MontuelasC ObtenerMontoTarjetaCredito(string numeroTarjeta)
        {
            MontuelasC oMontuel = new MontuelasC();
            
            using (SqlConnection oconexion = new SqlConnection(Conexion.rutaConexion))
            {
                using (SqlCommand cmd = new SqlCommand("usp_PalMontoC", oconexion))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@NumeroC", numeroTarjeta);

                    try
                    {
                        oconexion.Open();
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                oMontuel = new MontuelasC
                                {
                                    MontoTarjetaCredito = Convert.ToDecimal(dr["MontoTarjetaCredito"]),
                                };
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error al obtener el monto de la tarjeta de crédito: {ex.Message}");
                    }
                }
            }
            return oMontuel;
        }



    }
}

