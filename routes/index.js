const { Router: expressRouter } = require("express");
const router = expressRouter();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const backupDatabase = require('../backup/backup');
const restoreDatabase = require('../backup/restore');
const fileType = require('file-type');

// 📂 Configurar multer para subida de backups
const fileFilter = async (req, file, cb) => {
    // Verificar tipo MIME primero
    if (file.mimetype === 'application/zip' || file.originalname.endsWith('.zip')) {
      // Verificar contenido usando fileType
      try {
        console.log("Archivo recibido:", file);  // Log para verificar el archivo recibido
        const buffer = file.buffer;
        console.log("Buffer recibido:", buffer);  // Log para verificar si el buffer tiene datos
        
        if (!buffer) {
          return cb(new Error('❌ No se recibió un archivo válido.'));
        }
        
        const type = await fileType.fromBuffer(buffer);
        console.log("Tipo de archivo detectado:", type);  // Log para verificar el tipo de archivo
  
        if (type && type.ext === 'zip') {
          cb(null, true); // Archivo válido
        } else {
          cb(new Error('❌ El archivo no es un archivo .zip válido.'));
        }
      } catch (error) {
        console.error("Error al verificar el tipo de archivo:", error);  // Log para capturar el error
        cb(new Error('❌ Error al verificar el tipo del archivo.'));
      }
    } else {
      cb(new Error('❌ Solo se permiten archivos .zip'));
    }
  };
  
  // Configuración de Multer
  const upload = multer({
    storage: multer.memoryStorage(),  // Almacenar en memoria
    fileFilter: (req, file, cb) => {
      const extname = path.extname(file.originalname).toLowerCase();
      // Verificar si es un archivo .zip basado en la extensión
      if (extname === '.zip' || file.mimetype === 'application/zip') {
        cb(null, true);
      } else {
        cb(new Error('❌ Solo se permiten archivos .zip'));
      }
    }
  });

  
router.post('/backup', (req, res) => {
    backupDatabase();  // Llama a tu función de backup
    res.send('Backup iniciado...');
  });

// 📥 Endpoint para subir un archivo de backup
router.post('/upload-backup', upload.single('backup'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('❌ No se subió ningún archivo.');
      }
  
      // El archivo se encuentra en req.file.buffer, no en req.file.path
      const backupFile = req.file.buffer;
      console.log(`📂 Archivo subido con tamaño: ${backupFile.length} bytes`);
  
      // Asegúrate de que restoreDatabase esté preparado para aceptar un buffer, no un archivo en disco
      await restoreDatabase(backupFile);
      res.send('✅ Base de datos restaurada correctamente.');
    } catch (error) {
      console.error(error);
      res.status(500).send('❌ Error al restaurar la base de datos.');
    }
  });

// 📂 Endpoint para restaurar un backup existente
router.post('/restore-backup', async (req, res) => {
    try {
      const { filename } = req.body;
  
      if (!filename) {
        return res.status(400).send('❌ Debes proporcionar el nombre del archivo de backup.');
      }
  
      const backupFilePath = path.join(__dirname, '../backup/backups', filename);
      console.log(`📂 Verificando si el archivo existe: ${backupFilePath}`);
      if (!fs.existsSync(backupFilePath)) {
        return res.status(404).send(`❌ El archivo ${filename} no existe en la carpeta de backups.`);
      }
  
      console.log(`📂 Iniciando restauración desde: ${backupFilePath}`);
      await restoreDatabase(backupFilePath);
      res.send('✅ Base de datos restaurada correctamente desde el archivo especificado.');
    } catch (error) {
      console.error('❌ Error al restaurar desde el archivo:', error);
      res.status(500).send('❌ Error al restaurar la base de datos.');
    }
  });



  

const medicoRoutes = require("./medicoRoutes");
router.use("/medico", medicoRoutes);


const pacienteRoutes = require("./pacienteRoutes");
router.use("/paciente", pacienteRoutes);

const citaRoutes = require("./citaRoutes");
router.use("/citas", citaRoutes);

const empresaRoutes = require("./empresaRoutes");
router.use("/empresa", empresaRoutes);

const secretariaRoutes = require("./secretariaRoutes");
router.use("/secretaria", secretariaRoutes);

const historiaClinicaRoutes = require("./historiaClinicaRoutes");
router.use("/historiaClinica", historiaClinicaRoutes);

const loginRoutes = require("./loginRoutes");
router.use("/login", loginRoutes);

const tratamientoRoutes = require("./tratamientoRoutes");
router.use("/tratamientos", tratamientoRoutes);

const atencionRoutes = require("./atencionRoutes");
router.use("/atenciones", atencionRoutes);

const odontogramaRoutes = require("./odontogramaRoutes");
router.use("/odontograma", odontogramaRoutes);

const prestacionesRoutes = require("./prestacionesRoutes");
router.use("/prestaciones", prestacionesRoutes);
module.exports = router;