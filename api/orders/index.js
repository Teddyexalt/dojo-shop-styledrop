import { createRequire } from 'module';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '../../src/data/db.json');

function readDb() {
  return JSON.parse(readFileSync(DB_PATH, 'utf-8'));
}

function writeDb(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const db = readDb();
    res.status(200).json(db.orders);
  } else if (req.method === 'POST') {
    const db = readDb();
    const newOrder = {
      ...req.body,
      id: Date.now(),
      orderStatus: 'Processing',
      orderDate: new Date().toISOString(),
    };
    db.orders.push(newOrder);
    writeDb(db);
    res.status(201).json(newOrder);
  } else {
    res.status(405).end();
  }
}
