'use client';
import React, { useState, useEffect, useRef } from 'react';

// Base de datos de lecciones dinámicas para la sección "Comenzar lección"
const LECCIONES_POR_NIVEL = {
  'Básico': {
    titulo: 'Talking about your day',
    descripcion: 'Aprende a describir tu rutina diaria básica.',
    frases: [
      { en: 'I wake up at 7 AM every day.', es: 'Me despierto a las 7 AM todos los días.' },
      { en: 'I drink coffee in the morning.', es: 'Bebo café por la mañana.' }
    ]
  },
  'Intermedio': {
    titulo: 'Expressing complex opinions',
    descripcion: 'Aprende a debatir y defender tus puntos de vista.',
    frases: [
      { en: 'From my perspective, the benefits outweigh the risks.', es: 'Desde mi perspectiva, los beneficios superan los riesgos.' },
      { en: 'I see your point, however, I disagree with the conclusion.', es: 'Entiendo tu punto, sin embargo, no estoy de acuerdo con la conclusión.' }
    ]
  },
  'Avanzado': {
    titulo: 'Mastering Business Idioms',
    descripcion: 'Domina frases nativas del mundo corporativo.',
    frases: [
      { en: 'We need to hit the ground running on this project.', es: 'Necesitamos empezar este proyecto a toda marcha.' },
      { en: 'Let’s circle back to this topic during next week’s meeting.', es: 'Volvamos a este tema en la reunión de la próxima semana.' }
    ]
  }
};

export default function Home() {
  // Navegación principal (Menú inferior)
  const [activeTab, setActiveTab] = useState('inicio'); // 'inicio', 'lecciones', 'chat', 'progreso', 'perfil'
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('Básico'); // Básico, Intermedio, Avanzado
  
  // Progreso y juego
  const [xp, setXp] = useState(65);
  const [streak, setStreak] = useState(1);
  const [progresoLeccion, setProgresoLeccion] = useState(0);
  const [mostrarPractica, setMostrarPractica] = useState(false);

  // Estados del Chatbot Inteligente con Voz
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  useEffect(() => {
    setChat([
      { role: 'bot', text: `Hi! I am your AI Coach. Open the chat or select an activity below to start practicing your ${selectedModule} English! 🎙️` }
    ]);
  }, [selectedModule]);

  // Función de Síntesis de Voz (La IA habla)
  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.rate = 0.95;
      window.speechSynthesis.speak(msg);
    }
  };

  // Función de Reconocimiento de Voz (Tú le hablas a la IA)
  const startSpeechRecognition = () => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      
      recognition.onstart = () => setIsListening(true);
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event) => {
        const vozTexto = event.results[0][0].transcript;
        procesarMensajeChat(vozTexto);
      };
      recognition.start();
    } else {
      alert("Tu dispositivo o navegador no soporta el reconocimiento de voz por ahora. ¡Prueba en Google Chrome!");
    }
  };

  const procesarMensajeChat = (texto) => {
    if (!texto.trim()) return;
    setChat(prev => [...prev, { role: 'user', text: texto }]);
    setXp(prev => prev + 10);
    setInput('');

    setTimeout(() => {
      let respuesta = `That sounds interesting! Let's keep talking in English. Can you elaborate on that?`;
      if (texto.toLowerCase().includes('hello') || texto.toLowerCase().includes('hi')) {
        respuesta = "Hello! Welcome back to your daily practice. How is your day going?";
      }
      setChat(prev => [...prev, { role: 'bot', text: respuesta }]);
      speak(respuesta);
    }, 700);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#f4f6f8', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', padding: '0 10px' }}>
      
      {/* CONTENEDOR DISPOSITIVO MÓVIL ESTILO DUOLINGO */}
      <div style={{ width: '100%', maxWidth: '430px', height: '94vh', background: '#ffffff', borderRadius: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', border: '6px solid #e5e5e5' }}>
        
        {/* TOP BAR / NOTIFICACIONES Y MÓDULO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', alignItems: 'center', borderBottom: '1px solid #f0f0f0', background: '#ffffff' }}>
          <button onClick={() => setMenuOpen(true)} style={{ background: '#f4f6f8', border: 'none', width: '40px', height: '40px', borderRadius: '12px', fontSize: '20px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>☰</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#eef2ff', padding: '6px 14px', borderRadius: '20px' }}>
            <span style={{ fontSize: '16px' }}>🌐</span>
            <b style={{ color: '#4f46e5', fontSize: '14px', textTransform: 'uppercase' }}>{selectedModule}</b>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ background: '#fff3e0', color: '#ff9800', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>🔥 {streak} días</span>
            <span style={{ background: '#e8f5e9', color: '#4caf50', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>⭐ {xp} XP</span>
          </div>
        </div>

        {/* MENÚ HAMBURGUESA LATERAL */}
        {menuOpen && (
          <>
            <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', zIndex: 100 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '260px', height: '100%', background: '#ffffff', zIndex: 101, padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, color: '#1f2937' }}>Niveles</h3>
                <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
              </div>
              {['Básico', 'Intermedio', 'Avanzado'].map(nivel => (
                <button key={nivel} onClick={() => { setSelectedModule(nivel); setMenuOpen(false); }} style={{ padding: '14px', borderRadius: '14px', border: 'none', textAlign: 'left', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', background: selectedModule === nivel ? '#58cc02' : '#f4f6f8', color: selectedModule === nivel ? '#ffffff' : '#4b5563', transition: '0.2s' }}>
                  ⚡ Nivel {nivel}
                </button>
              ))}
            </div>
          </>
        )}

        {/* CUERPO CENTRAL DE LA APP (CAMBIA SEGÚN LA PESTAÑA INFERIOR) */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#ffffff' }}>
          
          {activeTab === 'inicio' && (
            /* ================= PESTAÑA 1: INICIO (ESTILO COPIA FIEL) ================= */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              {/* CARD DE PROGRESO CON AVATAR EN VERDE JADE DUOLINGO */}
              <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', borderRadius: '24px', padding: '20px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' }}>
                <div style={{ flex: 1, zIndex: 1 }}>
                  <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '10px', fontWeight: 'bold' }}>Tu progreso</span>
                  <h2 style={{ margin: '8px 0 2px 0', fontSize: '22px', fontWeight: 'bold' }}>Nivel {selectedModule}</h2>
                  <p style={{ margin: '0 0 12px 0', fontSize: '13px', opacity: 0.9 }}>Idioma Objetivo: <b>us English 🇺🇸</b></p>
                  
                  {/* Barra de Progreso */}
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: '65%', height: '100%', background: '#ffc800', borderRadius: '10px' }} />
                  </div>
                  <span style={{ fontSize: '11px', display: 'block', marginTop: '5px', opacity: 0.8 }}>65% Completado • ¡Sigue así! 💪</span>
                </div>
                {/* Muñequita Avatar Vectorizada */}
                <div style={{ width: '100px', height: '110px', background: '#ffe4e6', borderRadius: '50% 50% 40% 40%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '50px', marginLeft: '10px', boxShadow: '0 8px 15px rgba(0,0,0,0.1)', position: 'relative' }}>
                  👩‍
                  <div style={{ position: 'absolute', bottom: '5px', right: '5px', background: '#ffffff', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>🎧</div>
                </div>
              </div>

              {/* SECCIÓN MÓDULOS DE ACTIVIDADES (GRID) */}
              <div>
                <h4 style={{ margin: '0 0 15px 0', color: '#1f2937', fontSize: '16px', fontWeight: 'bold' }}>¿Qué quieres hacer hoy?</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  
                  <div onClick={() => setActiveTab('chat')} style={{ background: '#e6fcf5', border: '2px solid #c3fae8', borderRadius: '20px', padding: '15px', textAlign: 'center', cursor: 'pointer', transition: '0.2s' }}>
                    <div style={{ fontSize: '28px', marginBottom: '5px' }}>💬</div>
                    <b style={{ color: '#0ca678', fontSize: '14px', display: 'block' }}>Hablar</b>
                    <span style={{ color: '#20c997', fontSize: '11px' }}>Practica conversaciones</span>
                  </div>

                  <div onClick={() => { setActiveTab('chat'); startSpeechRecognition(); }} style={{ background: '#e7f5ff', border: '2px solid #d0ebff', borderRadius: '20px', padding: '15px', textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ fontSize: '28px', marginBottom: '5px' }}>🎧</div>
                    <b style={{ color: '#1c7ed6', fontSize: '14px', display: 'block' }}>Escuchar</b>
                    <span style={{ color: '#228be6', fontSize: '11px' }}>Mejora tu comprensión</span>
                  </div>

                  <div onClick={() => setMostrarPractica(true)} style={{ background: '#f3f0ff', border: '2px solid #e5dbff', borderRadius: '20px', padding: '15px', textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ fontSize: '28px', marginBottom: '5px' }}>📚</div>
                    <b style={{ color: '#7048e8', fontSize: '14px', display: 'block' }}>Aprender</b>
                    <span style={{ color: '#748ffc', fontSize: '11px' }}>Gramática y vocabulario</span>
                  </div>

                  <div onClick={() => setActiveTab('chat')} style={{ background: '#fff9db', border: '2px solid #fff3bf', borderRadius: '20px', padding: '15px', textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ fontSize: '28px', marginBottom: '5px' }}>✏️</div>
                    <b style={{ color: '#f59f00', fontSize: '14px', display: 'block' }}>Escribir</b>
                    <span style={{ color: '#fab005', fontSize: '11px' }}>Práctica tu escritura</span>
                  </div>

                </div>
              </div>

              {/* CARD LECCIÓN DIARIA DINÁMICA */}
              <div style={{ background: '#ffffff', border: '2px solid #e5e5e5', borderRadius: '24px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ color: '#7048e8', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>⭐ Lección sugerida</span>
                  <h3 style={{ margin: '6px 0 4px 0', color: '#2c2c2c', fontSize: '17px' }}>{LECCIONES_POR_NIVEL[selectedModule].titulo}</h3>
                  <p style={{ margin: '0 0 15px 0', color: '#777777', fontSize: '12px' }}>{LECCIONES_POR_NIVEL[selectedModule].descripcion}</p>
                  <button onClick={() => setMostrarPractica(true)} style={{ background: '#58cc02', color: '#ffffff', border: 'none', borderBottom: '4px solid #46a302', padding: '10px 20px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Comenzar lección</button>
                </div>
                <div style={{ fontSize: '50px' }}>📅</div>
              </div>

              {/* MINI PRÁCTICA INTERACTIVA FLOTANTE */}
              {mostrarPractica && (
                <div style={{ background: '#f8fafc', border: '2px solid #4f46e5', borderRadius: '20px', padding: '15px', marginTop: '5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <b>Challenge Activo:</b>
                    <button onClick={() => setMostrarPractica(false)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>Cerrar</button>
                  </div>
                  {LECCIONES_POR_NIVEL[selectedModule].frases.map((f, i) => (
                    <div key={i} style={{ background: '#ffffff', padding: '10px', borderRadius: '12px', marginBottom: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b' }}>{f.en}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{f.es}</div>
                      </div>
                      <button onClick={() => { speak(f.en); setXp(p => p + 15); }} style={{ background: '#eef2ff', border: 'none', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer' }}>🔊 +15 XP</button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {activeTab === 'chat' && (
            /* ================= PESTAÑA 3: CHAT INTELIGENTE EXCLUSIVO ================= */
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '70px' }}>
                {chat.map((msg, i) => (
                  <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <div style={{ background: msg.role === 'user' ? '#10b981' : '#f1f5f9', color: msg.role === 'user' ? '#ffffff' : '#1f2937', padding: '12px 16px', borderRadius: '20px', fontSize: '14px', border: msg.role === 'user' ? 'none' : '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* CONTROLES DE ENTRADA (VOZ Y TEXTO) ABAJO DEL CHAT */}
              <div style={{ position: 'absolute', bottom: '75px', left: '15px', right: '15px', display: 'flex', gap: '8px', background: '#ffffff', padding: '5px 0' }}>
                <button onClick={startSpeechRecognition} style={{ background: isListening ? '#ef4444' : '#10b981', color: 'white', border: 'none', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(16,185,129,0.3)' }}>
                  {isListening ? '🛑' : '🎙️'}
                </button>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && procesarMensajeChat(input)} placeholder={isListening ? "Listening your English..." : "Escribe o usa el micrófono..."} disabled={isListening} style={{ flex: 1, padding: '12px 15px', borderRadius: '25px', border: '2px solid #e5e5e5', outline: 'none', fontSize: '14px' }} />
                <button onClick={() => procesarMensajeChat(input)} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0 15px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>Enviar</button>
              </div>
            </div>
          )}

          {activeTab === 'lecciones' && <p style={{ textAlign: 'center', color: '#777', marginTop: '40px' }}>📚 Sección de cursos estructurados en desarrollo.</p>}
          {activeTab === 'progreso' && <p style={{ textAlign: 'center', color: '#777', marginTop: '40px' }}>📈 Gráficos de rendimiento y estadísticas.</p>}
          {activeTab === 'perfil' && <p style={{ textAlign: 'center', color: '#777', marginTop: '40px' }}>👤 Configuración de tu cuenta de Linguago.</p>}

        </div>

        {/* MENÚ DE NAVEGACIÓN INFERIOR (ESTILO DUOLINGO PERFECTO) */}
        <div style={{ background: '#ffffff', borderTop: '2px solid #e5e5e5', display: 'flex', padding: '10px 0', justifyContent: 'space-around', position: 'absolute', bottom: 0, width: '100%', zIndex: 10 }}>
          <button onClick={() => setActiveTab('inicio')} style={{ background: 'none', border: 'none', color: activeTab === 'inicio' ? '#10b981' : '#afafaf', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', fontSize: '11px' }}>
            <span style={{ fontSize: '20px' }}>🏠</span> Inicio
          </button>
          <button onClick={() => setActiveTab('lecciones')} style={{ background: 'none', border: 'none', color: activeTab === 'lecciones' ? '#10b981' : '#afafaf', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', fontSize: '11px' }}>
            <span style={{ fontSize: '20px' }}>📖</span> Lecciones
          </button>
          <button onClick={() => setActiveTab('chat')} style={{ background: 'none', border: 'none', color: activeTab === 'chat' ? '#10b981' : '#afafaf', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', fontSize: '11px' }}>
            <span style={{ fontSize: '20px' }}>💬</span> Chat IA
          </button>
          <button onClick={() => setActiveTab('progreso')} style={{ background: 'none', border: 'none', color: activeTab === 'progreso' ? '#10b981' : '#afafaf', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', fontSize: '11px' }}>
            <span style={{ fontSize: '20px' }}>📊</span> Progreso
          </button>
          <button onClick={() => setActiveTab('perfil')} style={{ background: 'none', border: 'none', color: activeTab === 'perfil' ? '#10b981' : '#afafaf', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', fontSize: '11px' }}>
            <span style={{ fontSize: '20px' }}>👤</span> Perfil
          </button>
        </div>

      </div>
    </main>
  );
}
