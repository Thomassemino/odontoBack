const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const AdmZip = require('adm-zip');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

async function backupDatabase() {
  try {
    const backupDir = process.env.BACKUP_DIR || path.join(__dirname, 'backups');
    
    // Crear directorio si no existe
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `backup-${timestamp}.zip`);

    const zip = new AdmZip();

    // Respaldar cada modelo de Mongoose
    for (const modelName of mongoose.modelNames()) {
      const Model = mongoose.model(modelName);
      const data = await Model.find({});
      const modelFile = path.join(backupDir, `${modelName}.json`);
      fs.writeFileSync(modelFile, JSON.stringify(data, null, 2));
      zip.addLocalFile(modelFile);
      fs.unlinkSync(modelFile); // Eliminar archivo temporal
    }

    zip.writeZip(backupFile);

    // Enviar por correo
    await sendBackupByEmail(backupFile);

    // Limpiar backups antiguos (mantener últimos 7)
    await cleanOldBackups(backupDir);

    return backupFile;
  } catch (error) {
    console.error('❌ Error en backup:', error);
    throw error;
  }
}

async function sendBackupByEmail(backupFile) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.BACKUP_EMAIL,
    subject: '📦 Respaldo diario de base de datos',
    text: 'Respaldo de base de datos adjunto',
    attachments: [{ filename: path.basename(backupFile), path: backupFile }]
  };

  await transporter.sendMail(mailOptions);
}

async function cleanOldBackups(backupDir) {
  const files = fs.readdirSync(backupDir)
    .filter(file => file.startsWith('backup-') && file.endsWith('.zip'))
    .map(file => ({
      file,
      mtime: fs.statSync(path.join(backupDir, file)).mtime
    }))
    .sort((a, b) => b.mtime - a.mtime);

  // Eliminar backups más antiguos, mantener los 7 más recientes
  for (let i = 7; i < files.length; i++) {
    fs.unlinkSync(path.join(backupDir, files[i].file));
  }
}

// Programar backup diario a las 9 PM
function scheduleBackup() {
  cron.schedule('0 21 * * *', async () => {
    try {
      await backupDatabase();
      console.log('✅ Backup diario completado');
    } catch (error) {
      console.error('❌ Backup diario falló:', error);
    }
  });
}

module.exports = { backupDatabase, scheduleBackup };