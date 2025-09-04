import { getPool } from '../lib/db.js';

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

async function seedData() {
  try {
    const pool = getPool();
    
    console.log('Adding dummy schools...');
    
    for (const school of dummySchools) {
      await pool.execute(
        'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [school.name, school.address, school.city, school.state, school.contact, school.image, school.email_id]
      );
      console.log(`Added: ${school.name}`);
    }
    
    console.log('Dummy data added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding dummy data:', error);
    process.exit(1);
  }
}

seedData();