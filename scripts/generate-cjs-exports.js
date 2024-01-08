import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcDir = path.join(__dirname, '../dist/esm'); // Adjust the path as needed
const outputDir = path.join(__dirname, '../dist/cjs'); // Adjust the path as needed

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all files from the ES Modules directory
fs.readdir(srcDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    const moduleName = path.parse(file).name;
    const content = `module.exports.${moduleName} = require('../esm/${file}').${moduleName};\n`;

    // Write the CommonJS re-export file
    fs.writeFile(path.join(outputDir, file), content, err => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log(`CommonJS re-export generated for ${file}`);
      }
    });
  });
});
