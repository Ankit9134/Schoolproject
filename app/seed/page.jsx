'use client';

import { useState } from 'react';

export default function SeedPage() {
  const [status, setStatus] = useState(null);

  const addDummyData = async () => {
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      
      if (res.ok) {
        setStatus({ success: true, message: data.message });
      } else {
        setStatus({ success: false, message: data.error });
      }
    } catch (error) {
      setStatus({ success: false, message: error.message });
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <h2>Add Dummy Schools Data</h2>
      <p>Click the button below to add 3 dummy schools to the database.</p>
      
      <button 
        onClick={addDummyData}
        style={{ 
          padding: '12px 24px', 
          fontSize: '16px', 
          cursor: 'pointer',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '8px'
        }}
      >
        Add Dummy Data
      </button>

      {status && (
        <div style={{ 
          marginTop: '20px', 
          padding: '12px', 
          borderRadius: '8px',
          backgroundColor: status.success ? '#d4edda' : '#f8d7da',
          color: status.success ? '#155724' : '#721c24'
        }}>
          {status.message}
        </div>
      )}
    </div>
  );
}