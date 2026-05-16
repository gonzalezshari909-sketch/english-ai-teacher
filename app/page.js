'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('Básico');
  const [xp, setXp] = useState(0);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  useEffect(() => {
    const savedXp = localStorage.getItem('xp_pro');
    if (savedXp) setXp(Number(savedXp));
    setChat([{ role: 'bot', text: "Hello! I am your AI Tutor. Open the menu (☰) to change levels or talk to me here!" }]);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setXp(prev => prev + 5);
    localStorage.setItem('xp_pro', xp + 5);

    setTimeout(() => {
      setChat(prev => [...prev, { role: 'bot', text: `Great sentence! Let's keep practicing ${selectedModule} English. What else is on your mind?` }]);
    }, 600);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: 'white', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER SUPERIOR PRO */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', background: '#0f172a', alignItems: 'center', borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '28px', cursor: 'pointer' }}>
          ☰
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="http://googleusercontent.com/image_collection/image_retrieval/966400121345029395" style={{ width: '35px', borderRadius: '50%' }} />
          <b style={{ letterSpacing: '1px', fontSize: '14px' }}>LINGUAGO PRO</b>
        </div>
        <div style={{ fontSize: '12px', background: '#1e3a8a', padding: '5px 12px', borderRadius: '20px' }}>
          ⭐ {xp} XP
        </div>
      </nav>

      {/* MENU LATERAL DESPLEGABLE */}
      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', zIndex: 99 }} />
          <div style={{ position: 'fixed', top: 0, left: 0, width: '280px', height: '100%', background: '#0f172a', zIndex: 100, padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '5px 0 20px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#38bdf8', margin: 0 }}>Niveles</h3>
              <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px' }}>✕</button>
            </div>
            {['Básico', 'Intermedio', 'Avanzado'].map(m => (
              <button key={m} onClick={() => { setSelectedModule(m); setMenuOpen(false); }} style={{ padding: '15px', borderRadius: '12px', border: 'none', textAlign: 'left', background: selectedModule === m ? '#1e3a8a' : '#1e293b', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                {selectedModule === m ? '🔹 ' : ''} Sesión {m}
              </button>
            ))}
          </div>
        </>
      )}

      {/* CHAT INTERACTIVO */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#64748b' }}>MODO: {selectedModule.toUpperCase()}</p>
        {chat.map((msg, i) => (
          <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', padding: '12px 16px', borderRadius: '15px', background: msg.role === 'user' ? '#2563eb' : '#1e293b', color: 'white', fontSize: '15px' }}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* INPUT FINAL */}
      <div style={{ padding: '20px', background: '#0f172a', display: 'flex', gap: '10px' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Habla con tu IA..." style={{ flex: 1, padding: '12px 20px', borderRadius: '25px', border: '1px solid #334155', background: '#1e293b', color: 'white', outline: 'none' }} />
        <button onClick={sendMessage} style={{ padding: '12px 20px', borderRadius: '25px', border: 'none', background: '#38bdf8', color: '#0f172a', fontWeight: 'bold' }}>Enviar</button>
      </div>
    </main>
  );
}
