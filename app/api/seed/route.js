import { NextResponse } from 'next/server';
import { getPool } from '../../../lib/db';

const dummySchools = [
  {
    name: 'Springfield Elementary School',
    address: '123 Main Street',
    city: 'Springfield',
    state: 'Illinois',
    contact: 5551234567,
    email_id: 'info@springfield-elementary.edu',
    image: 'school1.jpg'
  },
  {
    name: 'Riverside High School',
    address: '456 Oak Avenue',
    city: 'Riverside',
    state: 'California',
    contact: 5559876543,
    email_id: 'admin@riverside-high.edu',
    image: 'school2.jpg'
  },
  {
    name: 'Mountain View Academy',
    address: '789 Pine Road',
    city: 'Mountain View',
    state: 'Colorado',
    contact: 5555551234,
    email_id: 'contact@mountainview-academy.edu',
    image: 'school3.jpg'
  }
];

export async function POST() {
  try {
    const pool = getPool();
    
    for (const school of dummySchools) {
      await pool.execute(
        'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [school.name, school.address, school.city, school.state, school.contact, school.image, school.email_id]
      );
    }
    
    return NextResponse.json({ success: true, message: 'Dummy data added successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}