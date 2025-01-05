// backup/restore.js
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const mongoose = require('mongoose');

async function restoreDatabase(zipFilePath) {
  try {
    const zip = new AdmZip(zipFilePath);
    const tempDir = path.join(__dirname, 'temp_restore');
    zip.extractAllTo(tempDir, true);

    console.log('✅ Archivo ZIP extraído correctamente.');

    const files = fs.readdirSync(tempDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const schemaName = path.basename(file, '.json');
        const filePath = path.join(tempDir, file);
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const Model = mongoose.model(schemaName);

        await Model.deleteMany();
        await Model.insertMany(jsonData);

        console.log(`✅ Datos restaurados para el modelo: ${schemaName}`);
      }
    }

    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log('✅ Restauración completada y archivos temporales eliminados.');
  } catch (error) {
    console.error('❌ Error al restaurar la base de datos:', error);
    throw error;
  }
}

module.exports = restoreDatabase;
