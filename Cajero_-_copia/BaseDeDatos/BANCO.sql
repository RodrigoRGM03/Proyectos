USE [master]
GO
/****** Object:  Database [Banco]    Script Date: 27/03/2024 05:07:47 p. m. ******/
CREATE DATABASE [Banco]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Banco', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Banco.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Banco_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Banco_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [Banco] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Banco].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Banco] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Banco] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Banco] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Banco] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Banco] SET ARITHABORT OFF 
GO
ALTER DATABASE [Banco] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Banco] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Banco] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Banco] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Banco] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Banco] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Banco] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Banco] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Banco] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Banco] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Banco] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Banco] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Banco] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Banco] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Banco] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Banco] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Banco] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Banco] SET RECOVERY FULL 
GO
ALTER DATABASE [Banco] SET  MULTI_USER 
GO
ALTER DATABASE [Banco] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Banco] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Banco] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Banco] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Banco] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Banco', N'ON'
GO
ALTER DATABASE [Banco] SET QUERY_STORE = OFF
GO
USE [Banco]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [Banco]
GO
/****** Object:  Table [dbo].[Tarjetas]    Script Date: 27/03/2024 05:07:47 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tarjetas](
	[ID] [int] NOT NULL,
	[Nombre1] [varchar](50) NULL,
	[Nombre2] [varchar](50) NULL,
	[Apellido1] [varchar](50) NULL,
	[Apellido2] [varchar](50) NULL,
	[NumeroTarjetaCredito] [varchar](16) NULL,
	[MontoTarjetaCredito] [decimal](10, 2) NULL,
	[NumeroTarjetaDebito] [varchar](16) NULL,
	[MontoTarjetaDebito] [decimal](10, 2) NULL,
	[PIN] [int] NULL,
	[DeudaTarjetaCredito] [decimal](10, 2) NULL,
	[PagoCoche] [decimal](10, 2) NULL,
	[PagoHipoteca] [decimal](10, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TarjetasNuevas]    Script Date: 27/03/2024 05:07:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TarjetasNuevas](
	[ID] [int] NOT NULL,
	[Nombre1] [varchar](50) NULL,
	[Nombre2] [varchar](50) NULL,
	[Apellido1] [varchar](50) NULL,
	[Apellido2] [varchar](50) NULL,
	[NumeroTarjetaCredito] [varchar](16) NULL,
	[MontoTarjetaCredito] [decimal](10, 2) NULL,
	[NumeroTarjetaDebito] [varchar](16) NULL,
	[MontoTarjetaDebito] [decimal](10, 2) NULL,
	[PIN] [int] NULL,
	[NumeroReferencia] [varchar](8) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (1, N'Juan', N'Pablo', N'Garcia', N'Lopez', N'1234567890123456', CAST(3050.00 AS Decimal(10, 2)), N'9876543210987654', CAST(5046.00 AS Decimal(10, 2)), 1234, CAST(1005.24 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (2, N'Maria', N'Isabel', N'Martinez', N'Rodriguez', N'2345678901234567', CAST(3900.00 AS Decimal(10, 2)), N'8765432109876543', CAST(6590.60 AS Decimal(10, 2)), 4321, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (3, N'Carlos', N'Alberto', N'Hernandez', N'Gomez', N'3456789012345678', CAST(7000.00 AS Decimal(10, 2)), N'7654321098765432', CAST(3500.00 AS Decimal(10, 2)), 7890, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (4, N'Ana', N'Sofia', N'Lopez', N'Gutierrez', N'4567890123456789', CAST(5500.00 AS Decimal(10, 2)), N'6543210987654321', CAST(7101.00 AS Decimal(10, 2)), 5678, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (5, N'Pedro', N'Luis', N'Diaz', N'Fernandez', N'5678901234567890', CAST(6500.00 AS Decimal(10, 2)), N'5432109876543210', CAST(9500.00 AS Decimal(10, 2)), 2345, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (6, N'Laura', N'Elena', N'Gonzalez', N'Sanchez', N'6789012345678901', CAST(4800.00 AS Decimal(10, 2)), N'4321098765432109', CAST(3800.00 AS Decimal(10, 2)), 6789, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (7, N'Diego', N'Andres', N'Ramirez', N'Perez', N'7890123456789012', CAST(5100.00 AS Decimal(10, 2)), N'3210987654321098', CAST(3200.00 AS Decimal(10, 2)), 3456, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (8, N'Carmen', N'Rosa', N'Torres', N'Lopez', N'8901234567890123', CAST(5900.00 AS Decimal(10, 2)), N'2109876543210987', CAST(3900.00 AS Decimal(10, 2)), 9012, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (9, N'Javier', N'Antonio', N'Castro', N'Gonzalez', N'9012345678901234', CAST(6200.00 AS Decimal(10, 2)), N'1098765432109876', CAST(4300.00 AS Decimal(10, 2)), 4567, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (10, N'Luisa', N'Maribel', N'Santos', N'Martinez', N'0123456789012345', CAST(5400.00 AS Decimal(10, 2)), N'0987654321098765', CAST(3600.00 AS Decimal(10, 2)), 6780, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (11, N'Fernando', N'Jose', N'Rojas', N'Hernandez', N'1234012345678901', CAST(5800.00 AS Decimal(10, 2)), N'9876543210987651', CAST(4100.00 AS Decimal(10, 2)), 8901, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (12, N'Silvia', N'Patricia', N'Flores', N'Gutierrez', N'2345123456789012', CAST(5300.00 AS Decimal(10, 2)), N'8765432109876540', CAST(6900.00 AS Decimal(10, 2)), 5670, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (13, N'Ricardo', N'Alejandro', N'Reyes', N'Diaz', N'3456234567890123', CAST(6700.00 AS Decimal(10, 2)), N'7654321098765432', CAST(3800.00 AS Decimal(10, 2)), 2340, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (14, N'Gabriela', N'Fernanda', N'Luna', N'Alvarez', N'4567345678901234', CAST(4900.00 AS Decimal(10, 2)), N'6543210987654321', CAST(8601.00 AS Decimal(10, 2)), 3510, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (15, N'Santiago', N'Alejandro', N'Cruz', N'Perez', N'5678456789012345', CAST(5500.00 AS Decimal(10, 2)), N'5432109876543210', CAST(8700.00 AS Decimal(10, 2)), 1729, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (16, N'Raul', N'Fernando', N'Garcia', N'Lopez', N'1234567809123456', CAST(5000.00 AS Decimal(10, 2)), N'9876543210987654', CAST(5046.00 AS Decimal(10, 2)), 1234, CAST(1005.24 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (17, N'Martha', N'Lucia', N'Martinez', N'Rodriguez', N'2345678950234567', CAST(6000.00 AS Decimal(10, 2)), N'8765432109876543', CAST(6590.60 AS Decimal(10, 2)), 4301, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (18, N'Daniela', N'Cristina', N'Hernandez', N'Gomez', N'3456789061345678', CAST(7000.00 AS Decimal(10, 2)), N'7654321098765432', CAST(3500.00 AS Decimal(10, 2)), 7890, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (19, N'Rafael', N'Arturo', N'Lopez', N'Gutierrez', N'4567890132456789', CAST(5500.00 AS Decimal(10, 2)), N'6543210987654321', CAST(7101.00 AS Decimal(10, 2)), 5678, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[Tarjetas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [DeudaTarjetaCredito], [PagoCoche], [PagoHipoteca]) VALUES (20, N'Laura', N'Marcela', N'Diaz', N'Fernandez', N'5678901243567890', CAST(6500.00 AS Decimal(10, 2)), N'5432109876543210', CAST(9500.00 AS Decimal(10, 2)), 2345, CAST(1005.24 AS Decimal(10, 2)), CAST(4470.80 AS Decimal(10, 2)), CAST(1615.15 AS Decimal(10, 2)))
INSERT [dbo].[TarjetasNuevas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [NumeroReferencia]) VALUES (16, N'Raul', N'Fernando', N'Garcia', N'Lopez', N'1234567809123456', CAST(5000.00 AS Decimal(10, 2)), N'9876543210987654', CAST(3000.00 AS Decimal(10, 2)), 1234, N'12345678')
INSERT [dbo].[TarjetasNuevas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [NumeroReferencia]) VALUES (17, N'Martha', N'Lucia', N'Martinez', N'Rodriguez', N'2345678950234567', CAST(6000.00 AS Decimal(10, 2)), N'8765432109876543', CAST(4000.00 AS Decimal(10, 2)), 4321, N'23456789')
INSERT [dbo].[TarjetasNuevas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [NumeroReferencia]) VALUES (18, N'Daniela', N'Cristina', N'Hernandez', N'Gomez', N'3456789061345678', CAST(7000.00 AS Decimal(10, 2)), N'7654321098765432', CAST(4500.00 AS Decimal(10, 2)), 7890, N'34567890')
INSERT [dbo].[TarjetasNuevas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [NumeroReferencia]) VALUES (19, N'Rafael', N'Arturo', N'Lopez', N'Gutierrez', N'4567890132456789', CAST(5500.00 AS Decimal(10, 2)), N'6543210987654321', CAST(3500.00 AS Decimal(10, 2)), 5678, N'45678901')
INSERT [dbo].[TarjetasNuevas] ([ID], [Nombre1], [Nombre2], [Apellido1], [Apellido2], [NumeroTarjetaCredito], [MontoTarjetaCredito], [NumeroTarjetaDebito], [MontoTarjetaDebito], [PIN], [NumeroReferencia]) VALUES (20, N'Laura', N'Marcela', N'Diaz', N'Fernandez', N'5678901243567890', CAST(6500.00 AS Decimal(10, 2)), N'5432109876543210', CAST(4700.00 AS Decimal(10, 2)), 2345, N'56789012')
USE [master]
GO
ALTER DATABASE [Banco] SET  READ_WRITE 
GO

use Banco
select * from Tarjetas

select COUNT (*) as Numero 
from Tarjetas 
where NumeroTarjetaDebito = '7654321098765432'

update Tarjetas 
set NumeroTarjetaDebito = '1165432109876543'
where ID = 17