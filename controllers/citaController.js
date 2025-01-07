// controllers/citaController.js
const citaService = require('../logic/citaLogic');
const citaSchema = require('../models/cita/citaSchema');
// Crear una cita
async function crearCita(req, res) {
  try {
    const nuevaCita = await citaService.crearCita(req.body);
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Obtener todas las citas
async function obtenerCitas(req, res) {
  try {
    const citas = await citaService.obtenerCitas();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Obtener una cita por ID
async function obtenerCitaPorId(req, res) {
  try {
    const cita = await citaService.obtenerCitaPorId(req.params.id);
    if (cita) {
      res.status(200).json(cita);
    } else {
      res.status(404).json({ message: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Actualizar una cita
// Actualizar una cita
async function actualizarCita(req, res) {
  try {
    const citaActual = await citaService.obtenerCitaPorId(req.params.id);
    if (!citaActual) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    // Combinar los datos actuales de la cita con los datos recibidos en el cuerpo de la solicitud
    const datosActualizados = {
      ...citaActual.toObject(),
      ...req.body,
      motivo: req.body.motivo || citaActual.motivo, // Asegurar que el motivo no se pierda
    };

    const citaActualizada = await citaService.actualizarCita(req.params.id, datosActualizados);
    res.status(200).json(citaActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getCitasPorFecha(req, res) {
  try {
    const fechaString = req.params.fecha; // formato: "YYYY-MM-DD"
    
    // Crear fechas en zona horaria de Argentina
    const fechaInicio = new Date(`${fechaString}T00:00:00-03:00`);
    const fechaFin = new Date(`${fechaString}T23:59:59.999-03:00`);

    console.log('Buscando citas entre:', fechaInicio, 'y', fechaFin);

    const citas = await citaSchema.find({
      fecha: {
        $gte: fechaInicio,
        $lte: fechaFin
      }
    })
    .populate('pacienteId', 'nombre telefono areaCode')
    .populate('medicoId', 'nombre')
    .populate('tratamientos', 'nombre')
    .sort({ fecha: 1 });

    res.status(200).json({
      mensaje: 'Citas recuperadas exitosamente',
      total: citas.length,
      data: citas
    });

  } catch (error) {
    console.error('Error en getCitasPorFecha:', error);
    res.status(500).json({
      mensaje: 'Error al obtener las citas',
      error: error.message
    });
  }
}

// Eliminar una cita
async function eliminarCita(req, res) {
  try {
    const citaEliminada = await citaService.eliminarCita(req.params.id);
    if (citaEliminada) {
      res.status(200).json({ message: 'Cita eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// Obtener citas por mes y año
async function obtenerCitasPorMes(req, res) {
  try {
    const { mes, año } = req.query;

    if (!mes || !año) {
      return res.status(400).json({ message: 'Se requiere el mes y el año en los parámetros' });
    }

    // Crear el rango de fechas para el mes
    const fechaInicio = new Date(año, mes - 1, 1); // Mes es base 0 en JavaScript
    const fechaFin = new Date(año, mes, 0, 23, 59, 59, 999); // Último día del mes

    // Buscar citas en el rango
    const citas = await citaSchema.find({
      fecha: {
        $gte: fechaInicio,
        $lte: fechaFin
      }
    }).populate('pacienteId', 'nombre').populate('medicoId', 'nombre');

    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getCitasHoy = async (req, res) => {
  try {
      const fechaInicio = new Date();
      fechaInicio.setHours(0, 0, 0, 0);

      const fechaFin = new Date();
      fechaFin.setHours(23, 59, 59, 999);

      const citas = await citaSchema.find({
          fecha: {
              $gte: fechaInicio,
              $lte: fechaFin
          }
      })
      .populate('pacienteId', 'nombre telefono areaCode') // Agregamos los campos necesarios
      .populate('medicoId', 'nombre')
      .populate('tratamientos', 'nombre')
      .sort({ fecha: 1 });

      if (citas.length === 0) {
          return res.status(200).json({
              mensaje: 'No hay citas programadas para hoy',
              data: []
          });
      }

      res.status(200).json({
          mensaje: 'Citas del día recuperadas exitosamente',
          total: citas.length,
          data: citas
      });

  } catch (error) {
      res.status(500).json({
          mensaje: 'Error al obtener las citas del día',
          error: error.message
      });
  }
};

module.exports = {
  crearCita,
  obtenerCitas,
  obtenerCitaPorId,
  actualizarCita,
  eliminarCita,
  obtenerCitasPorMes,
  getCitasHoy,
  getCitasPorFecha,
};
