import { NextResponse } from 'next/server';
import { getPool } from '../..lib/db';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
fs.mkdirSync(uploadDir, { recursive: true });

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: false, uploadDir, keepExtensions: true });
    form.on('fileBegin', (name, file) => {
      const safe = Date.now() + '-' + file.originalFilename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      file.filepath = path.join(uploadDir, safe);
      file.newFilename = safe;
    });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT id, name, address, city, image FROM schools ORDER BY id DESC');
    return NextResponse.json({ data: rows });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { fields, files } = await parseForm(req);

    const required = ['name','address','city','state','contact','email_id'];
    for (const r of required) {
      if (!fields[r] || (Array.isArray(fields[r]) && !fields[r][0])) {
        return NextResponse.json({ error: `${r} is required` }, { status: 400 });
      }
    }

    const imageFile = files.image;
    if (!imageFile) {
      return NextResponse.json({ error: 'image is required' }, { status: 400 });
    }
    const imageName = Array.isArray(imageFile) ? imageFile[0].newFilename : imageFile.newFilename;

    const pool = getPool();
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        String(fields.name),
        String(fields.address),
        String(fields.city),
        String(fields.state),
        String(fields.contact),
        imageName,
        String(fields.email_id),
      ]
    );

    return NextResponse.json({ ok: true, id: result.insertId });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
