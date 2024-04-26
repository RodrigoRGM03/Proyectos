using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apilongo.Models
{
    public class Tarjetas
    {
        public int ID { get; set; }
        public string Nombre1 { get; set; }
        public string Nombre2 { get; set; }
        public string Apellido1 { get; set; }
        public string Apellido2 { get; set; }
        public string NumeroTarjetaCredito { get; set; }
        public decimal MontoTarjetaCredito { get; set; }
        public string NumeroTarjetaDebito { get; set; }
        public decimal MontoTarjetaDebito { get; set; }
        public int PIN { get; set; }
        public decimal DeudaTarjetaCredito { get; set; }
        public decimal PagoCoche { get; set; }
        public decimal PagoHipoteca { get; set; }
    }

    public class VerificacionPINRequest
    {
        public string NumeroTarjetaCredito { get; set; }
        public int PIN { get; set; }
    }

    public class MontuelasC
    {
        public decimal MontoTarjetaCredito { get; set; }
    }

    public class MontuelasD
    {
        public decimal MontoTarjetaDebito { get; set; }
    }

    public class TarjetaRequest
    {
        public string numeroTarjeta { get; set; }
    }
}