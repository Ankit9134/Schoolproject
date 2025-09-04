async function fetchSchools() {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/schools`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to load schools');
  }
  return res.json();
}

export default async function ShowSchoolsPage() {
  const { data } = await fetchSchools();

  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>No Schools Found</h2>
        <p>No schools available. <a href="/seed">Add dummy data</a> or <a href="/addSchool">add a school</a>.</p>
      </div>
    );
  }

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
