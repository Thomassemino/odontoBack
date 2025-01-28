const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const AdmZip = require('adm-zip');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

async function backupDatabase() {
  console.log('🚀 Iniciando proceso de backup...');
  
  // Verificar variables de entorno
  const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'BACKUP_EMAIL'];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Variable de entorno ${envVar} no está configurada`);
    }
  }

  try {
    // Usar /tmp para almacenamiento temporal en Railway
    const backupDir = '/tmp/backups';
    
    console.log(`📁 Usando directorio temporal: ${backupDir}`);
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log('📁 Directorio de backup creado');
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `backup-${timestamp}.zip`);
    console.log(`📦 Creando archivo de backup: ${backupFile}`);

    const zip = new AdmZip();
    const modelNames = mongoose.modelNames();
    console.log(`🗄️ Modelos encontrados: ${modelNames.join(', ')}`);

    for (const modelName of modelNames) {
      console.log(`📑 Respaldando modelo: ${modelName}`);
      const Model = mongoose.model(modelName);
      const data = await Model.find({});
      console.log(`✓ Encontrados ${data.length} documentos para ${modelName}`);
      
      const modelFile = path.join(backupDir, `${modelName}.json`);
      fs.writeFileSync(modelFile, JSON.stringify(data, null, 2));
      zip.addLocalFile(modelFile);
      fs.unlinkSync(modelFile);
    }

    zip.writeZip(backupFile);
    console.log('📚 Archivo ZIP creado exitosamente');

    await sendBackupByEmail(backupFile);

    // Limpiar el archivo de backup después de enviarlo
    fs.unlinkSync(backupFile);
    console.log('🧹 Archivos temporales limpiados');

    return backupFile;
  } catch (error) {
    console.error('❌ Error detallado en backup:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw error;
  }
}

async function sendBackupByEmail(backupFile) {
  console.log('📧 Configurando envío de email...');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "seminothomas8196@gmail.com",
      pass: "wguz arci hkkm jkxa"
    }
  });

  const mailOptions = {
    from: "seminothomas8196@gmail.com",
    to: "capo1928374650@gmail.com",
    subject: `📦 Respaldo DB - ${new Date().toISOString().split('T')[0]}`,
    text: `Backup automático generado el ${new Date().toLocaleString()}`,
    attachments: [{ filename: path.basename(backupFile), path: backupFile }]
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✉️ Backup enviado por correo exitosamente');
  } catch (error) {
    console.error('📧 Error al enviar email:', {
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
}

function scheduleBackup() {
  console.log('⚙️ Configurando programador de backup...');
  console.log(`⏰ Zona horaria configurada: America/Argentina/Buenos_Aires`);
  
  cron.schedule('0 21 * * *', async () => {
    console.log('🎯 Ejecutando backup programado:', new Date().toISOString());
    try {
      await backupDatabase();
      console.log('🎉 Backup diario completado exitosamente');
    } catch (error) {
      console.error('💥 Error en backup programado:', {
        message: error.message,
        stack: error.stack
      });
    }
  }, {
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
  });
  
  console.log('✅ Backup programado correctamente para las 21:00 (Buenos Aires)');
}

module.exports = { backupDatabase, scheduleBackup };