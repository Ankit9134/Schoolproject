'use client';

import { useState, useEffect } from 'react';

export default function ShowSchoolsPage() {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Springfield Elementary School',
      address: '123 Main Street',
      city: 'Springfield',
      state: 'Illinois',
      contact: '555-123-4567',
      email_id: 'info@springfield-elementary.edu',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Riverside High School',
      address: '456 Oak Avenue',
      city: 'Riverside',
      state: 'California',
      contact: '555-987-6543',
      email_id: 'admin@riverside-high.edu',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Mountain View Academy',
      address: '789 Pine Road',
      city: 'Mountain View',
      state: 'Colorado',
      contact: '555-555-1234',
      email_id: 'contact@mountainview-academy.edu',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Greenwood International School',
      address: '321 Forest Lane',
      city: 'Austin',
      state: 'Texas',
      contact: '555-444-7890',
      email_id: 'admissions@greenwood-intl.edu',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Sunset Valley Middle School',
      address: '654 Valley Drive',
      city: 'Phoenix',
      state: 'Arizona',
      contact: '555-333-2468',
      email_id: 'office@sunsetvalley-ms.edu',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    }
  ]);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    fetch(`${baseUrl}/api/schools`)
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.length > 0) {
          setData(result.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2>Schools ({data.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {data.map((s) => (
          <div key={s.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: 12, 
            overflow: 'hidden', 
            boxShadow: '0 2px 8px rgba(0,0,0,.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}>
            {s.image ? (
              <img 
                src={s.image} 
                alt={s.name}
                style={{ 
                  width: '100%', 
                  height: 180, 
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{ 
                width: '100%', 
                height: 180, 
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                color: '#999'
              }}>
                🏫
              </div>
            )}
            <div style={{ padding: 16 }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: 20, color: '#333' }}>{s.name}</h3>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: '#666' }}>📍 {s.address}</span>
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: '#666' }}>{s.city}, {s.state}</span>
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: '#666' }}>📞 {s.contact}</span>
              </div>
              <div>
                <span style={{ fontSize: 14, color: '#666' }}>✉️ {s.email_id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
