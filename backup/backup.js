// backup/backup.js
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const AdmZip = require('adm-zip');
const nodemailer = require('nodemailer');

// 🛠️ Función para enviar el respaldo por email
async function sendBackupByEmail(backupFile) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // O puedes usar otro servicio de correo
      auth: {
        user: 'seminothomas8196@gmail.com', 
        pass: 'wguz arci hkkm jkxa' 
      }
    });

    const mailOptions = {
      from: 'seminothomas8196@gmail.com',
      to: 'capo1928374650@gmail.com',
      subject: '📦 Respaldo de la base de datos',
      text: 'Adjunto encontrarás el respaldo de la base de datos.',
      attachments: [
        {
          filename: path.basename(backupFile),
          path: backupFile
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Respaldo enviado correctamente por correo.');
  } catch (error) {
    console.error('❌ Error al enviar el respaldo por correo:', error);
  }
}

// 🛠️ Función para generar el respaldo
async function backupDatabase() {
  try {
    const backupDir = path.join(__dirname, 'backups');

    // Eliminar todos los archivos dentro de la carpeta 'backups' antes de crear uno nuevo
    const files = fs.readdirSync(backupDir);
    for (const file of files) {
      const filePath = path.join(backupDir, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath); // Elimina el archivo
      }
    }

    // Si no existe la carpeta 'backups', la crea
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `backup-${timestamp}.zip`);

    const zip = new AdmZip();

    for (const modelName of mongoose.modelNames()) {
      const Model = mongoose.model(modelName);
      const data = await Model.find({});
      const filePath = path.join(__dirname, `${modelName}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      zip.addLocalFile(filePath);
      fs.unlinkSync(filePath); // Elimina el archivo temporal JSON
    }

    zip.writeZip(backupFile);
    console.log(`✅ Respaldo completado: ${backupFile}`);

    // Enviar respaldo por correo
    await sendBackupByEmail(backupFile);
  } catch (error) {
    console.error('❌ Error al crear el respaldo:', error);
  }
}

module.exports = backupDatabase;