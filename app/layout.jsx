export const metadata = {
  title: 'Schools App',
  description: 'Add and show schools',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'ui-sans-serif, system-ui', margin: 0 }}>
        <header style={{ padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', gap: 16 }}>
          <a href="/addSchool">Add School</a>
          <a href="/showSchools">Show Schools</a>
          <a href="/seed">Add Dummy Data</a>
        </header>
        <main style={{ padding: 16, maxWidth: 1000, margin: '0 auto' }}>{children}</main>
      </body>
    </html>
  );
}
