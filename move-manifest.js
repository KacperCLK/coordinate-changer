import { rename } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Pomocnicze funkcje do uzyskania ścieżki w ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const manifestSrc = join(__dirname, 'public', 'build', '.vite', 'manifest.json');
const manifestDest = join(__dirname, 'public', 'build', 'manifest.json');

async function moveManifest() {
    try {
        await rename(manifestSrc, manifestDest);
        console.log('manifest.json moved successfully!');
    } catch (err) {
        console.error('Error moving manifest.json:', err);
    }
}

moveManifest();
