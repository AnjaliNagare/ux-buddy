import { useState, useEffect } from "react";
import { Sparkles, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <header style={{ borderBottom: '1px solid #e5e5e5', position: 'sticky', top: 0, zIndex: 10, backgroundColor: theme === 'dark' ? 'rgba(31, 31, 31, 0.8)' : 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#000000', transition: 'background-color 0.3s, color 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: "#22c55e", borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)' }}>
            <Sparkles style={{ color: '#fce809f1', width: '24px', height: '24px' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '-0.02em', margin: '0' }}>UX Buddy</h1>
            <p style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', margin: '0' }}>
              AI Writing Assistant
            </p>
          </div>
        </div>

        <button
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{ padding: '8px', borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
        >
          {theme === "dark" ? <Sun style={{ width: '20px', height: '20px' }} /> : <Moon style={{ width: '20px', height: '20px' }} />}
        </button>
      </div>
    </header>
  );
} 
