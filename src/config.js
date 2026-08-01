import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.resolve(__dirname, '../config.json');

const DEFAULT_CONFIG = {
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  defaultTheme: 'Immobilien & High-Price Lead Gen',
  defaultUrl: 'https://www.slavawagner.de',
  defaultTrack: 'RSA',
  framework: ''
};

export function getConfig() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = fs.readFileSync(CONFIG_PATH, 'utf8');
      const parsed = JSON.parse(data);
      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch (error) {
    console.error('Error reading config file, using defaults:', error.message);
  }
  return { ...DEFAULT_CONFIG };
}

export function saveConfig(config) {
  try {
    const data = JSON.stringify(config, null, 2);
    fs.writeFileSync(CONFIG_PATH, data, 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving config file:', error.message);
    return false;
  }
}
