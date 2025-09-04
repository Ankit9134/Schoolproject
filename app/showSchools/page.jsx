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

  return (
    <div>
      <h2>Schools</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {data.map((s) => (
          <a key={s.id} href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}>
              <img src={s.image?.startsWith('http') ? s.image : `/schoolImages/${s.image}`} alt={s.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
              <div style={{ padding: 12 }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: 18 }}>{s.name}</h3>
                <p style={{ margin: 0, fontSize: 14, color: '#555' }}>{s.address}</p>
                <p style={{ margin: 0, fontSize: 13, color: '#777' }}>{s.city}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
