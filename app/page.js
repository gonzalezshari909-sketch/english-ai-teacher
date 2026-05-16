'use client';
import React, { useState, useEffect, useRef } from 'react';

// Base de datos interactiva con contenido real por niveles
const CONTENIDO_NIVELES = {
  'Básico': [
    { frase: 'Good morning, how are you?', traduccion: 'Buenos días, ¿cómo estás?', tipo: 'Saludarse', xp: 20 },
    { frase: 'Where is the nearest restroom?', traduccion: '¿Dónde está el baño más cercano?', tipo: 'Direcciones', xp: 20 },
    { frase: 'Could you help me, please?', traduccion: '¿Podrías ayudarme, por favor?', tipo: 'Supervivencia', xp: 20 },
    { frase: 'How much does this cost?', traduccion: '¿Cuánto cuesta esto?', tipo: 'Compras', xp: 20 }
  ],
  'Intermedio': [
    { frase: 'I would like to make a reservation for tonight.', traduccion: 'Me gustaría hacer una reservación para esta noche.', tipo: 'Restaurantes', xp: 30 },
    { frase: 'Could you please speak a bit slower?', traduccion: '¿Podrías hablar un poco más despacio, por favor?', tipo: 'Fluidez', xp: 30 },
    { frase: 'I completely agree with your point of view.', traduccion: 'Estoy completamente de acuerdo con tu punto de vista.', tipo: 'Opiniones', xp: 30 },
    { frase: 'Let me double-check that information for you.', traduccion: 'Déjame verificar esa información por ti.', tipo: 'Trabajo', xp: 30 }
  ],
  'Avanzado': [
    { frase: 'We need to hit the ground running on this project.', traduccion: 'Necesitamos empezar este proyecto a toda marcha.', tipo: 'Modismos', xp: 40 },
    { frase: 'It is vital to balance the pros and cons meticulously.', traduccion: 'Es vital sopesar los pros y los contras meticulosamente.', tipo: 'Negocios', xp: 40 },
    { frase: 'Actions speak louder than words in these circumstances.', traduccion: 'Las acciones hablan más fuerte que las palabras en estas circunstancias.', tipo: 'Proverbios', xp: 40 },
    { frase: 'She managed to overcome the obstacles against all odds.', traduccion: 'Ella logró superar los obstáculos contra todo pronóstico.', tipo: 'Avanzado', xp: 40 }
  ]
};

export default function Home() {
  // Estados de navegación e interfaz
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('Básico');
  const [activeTab, setActiveTab] = useState('aprender'); // 'aprender' o 'chat'
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  
  // Estados del Chat Inteligente
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const chatEndRef = useRef(null);

  // Cargar progreso del usuario
  useEffect(() => {
    const savedXp = localStorage.getItem('linguago_xp');
    if (savedXp) setXp(Number(savedXp));
    
    setChat([
      { role: 'bot', text: "👋 Hi! I am Eliza, your personal coach. Press the 🎙️ button to practice speaking or type your message in English!" }
    ]);
  }, []);

  // Auto-scroll del chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  // Reproductor de voz (La app te habla)
  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.rate = 0.9;
      window.speechSynthesis.speak(msg);
    }
  };

  // Reconocimiento de voz (Tú le hablas a la app)
  const startSpeechRecognition = () => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event) => {
        const vozTexto = event.results[0][0].transcript;
        procesarMensaje(vozTexto);
      };
      
      recognition.start();
    } else {
      alert("Tu dispositivo no soporta reconocimiento de voz nativo. ¡Prueba en Google Chrome!");
    }
  };

  const procesarMensaje = (texto) => {
    if (!texto.trim()) return;

    setChat(prev => [...prev, { role: 'user', text: texto }]);
    const nuevosXp = xp + 10;
    setXp(nuevosXp);
    localStorage.setItem('linguago_xp', nuevosXp);

    setTimeout(() => {
      let respuestaIA = `I love how you said that! Let's keep talking in the ${selectedModule} level. Tell me, what did you do today?`;
      if (texto.toLowerCase().includes('hello') || texto.toLowerCase().includes('hi')) {
        respuestaIA = "Hello there! It is wonderful to practice with you. Ready for some challenges?";
      }
      setChat(prev => [...prev, { role: 'bot', text: respuestaIA }]);
      speak(respuestaIA);
    }, 800);
  };

  const handleSendText = () => {
    procesarMensaje(input);
    setInput('');
  };

  const completarLeccion = (item) => {
    const nuevosXp = xp + item.xp;
    setXp(nuevosXp);
    localStorage.setItem('linguago_xp', nuevosXp);
    speak(item.frase);
    
    // Alertas dinámicas interactivas simuladas en el chat oculto
    setChat(prev => [...prev, { role: 'bot', text: `🎉 Practiced: "${item.frase}" (+${item.xp} XP!)` }]);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #58cc02 0%, #235300 100%)', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '430px', background: '#ffffff', borderRadius: '30px', height: '92vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        
        {/* HEADER VIBRANTE */}
        <nav style={{ background: '#58cc02', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #46a302' }}>
          <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '28px', cursor: 'pointer' }}>☰</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>⚡</span>
            <b style={{ color: 'white', fontSize: '18px', letterSpacing: '0.5px' }}>LINGUAGO PRO</b>
          </div>
          <div style={{ background: '#ffc800', color: '#e67e22', fontWeight: 'bold', padding: '5px 12px', borderRadius: '15px', borderBottom: '2px solid #e67e22', fontSize: '13px' }}>
            👑 {xp} XP
          </div>
        </nav>

        {/* SIDEBAR / MENU LATERAL DE NIVELES */}
        {menuOpen && (
          <>
            <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 99 }} />
            <div style={{ position: 'fixed', top: 0, left: 0, width: '280px', height: '100%', background: '#111827', zIndex: 100, padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: '#58cc02', margin: 0, fontSize: '22px' }}>Sesiones de Idioma</h3>
                <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px' }}>✕</button>
              </div>
              {['Básico', 'Intermedio', 'Avanzado'].map(m => (
                <button key={m} onClick={() => { setSelectedModule(m); setMenuOpen(false); }} style={{ padding: '16px', borderRadius: '16px', border: 'none', textAlign: 'left', background: selectedModule === m ? '#58cc02' : '#1f2937', color: 'white', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', borderBottom: selectedModule === m ? '4px solid #46a302' : '4px solid #11141a', transition: '0.2s' }}>
                  ⭐ Sesión {m}
                </button>
              ))}
            </div>
          </>
        )}

        {/* PANTALLA PRINCIPAL CAMBIANTE SEGÚN LA PESTAÑA */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#f7f9fa', padding: '20px' }}>
          
          {activeTab === 'aprender' ? (
            /* VISTA 1: MÓDULO DE APRENDIZAJE INTERACTIVO */
            <div>
              <div style={{ background: '#84d8ff', padding: '15px', borderRadius: '20px', color: '#1890ff', fontWeight: 'bold', marginBottom: '20px', border: '2px solid #1890ff', fontSize: '14px', textAlign: 'center' }}>
                🚀 Estás estudiando el nivel: <span style={{ textTransform: 'uppercase', color: '#0050b3' }}>{selectedModule}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {CONTENIDO_NIVELES[selectedModule].map((item, index) => (
                  <div key={index} style={{ background: '#ffffff', border: '2px solid #e5e5e5', borderBottom: '5px solid #e5e5e5', padding: '15px', borderRadius: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1, paddingRight: '10px' }}>
                      <span style={{ fontSize: '10px', background: '#ebebeb', color: '#666', padding: '3px 8px', borderRadius: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.tipo}</span>
                      <b style={{ display: 'block', color: '#3c3c3c', fontSize: '15px', marginTop: '5px' }}>{item.frase}</b>
                      <span style={{ color: '#afafaf', fontSize: '13px' }}>{item.traduccion}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => speak(item.frase)} style={{ background: '#e5e5e5', border: 'none', width: '38px', height: '38px', borderRadius: '12px', cursor: 'pointer', fontSize: '16px' }}>🔊</button>
                      <button onClick={() => completarLeccion(item)} style={{ background: '#58cc02', color: 'white', border: 'none', borderBottom: '3px solid #46a302', padding: '0 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>+{item.xp}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* VISTA 2: CHATBOT OCULTO CON ELIZA (SOLO SE VE SI ENTRAS AQUÍ) */
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '10px' }}>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '60px' }}>
                {chat.map((msg, i) => (
                  <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <div style={{ background: msg.role === 'user' ? '#1890ff' : '#ffffff', color: msg.role === 'user' ? '#white' : '#3c3c3c', padding: '12px 16px', borderRadius: '18px', fontSize: '14.5px', border: msg.role === 'user' ? 'none' : '2px solid #e5e5e5', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              
              {/* ENTRADA DE VOZ Y TEXTO */}
              <div style={{ position: 'absolute', bottom: '80px', left: '20px', right: '20px', display: 'flex', gap: '8px', background: '#f7f9fa', padding: '5px 0' }}>
                <button onClick={startSpeechRecognition} style={{ background: isListening ? '#ff4d4f' : '#1890ff', color: 'white', border: 'none', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(24, 144, 255, 0.3)' }}>
                  {isListening ? '🛑' : '🎙️'}
                </button>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendText()} placeholder={isListening ? "Listening..." : "Talk or type here..."} disabled={isListening} style={{ flex: 1, padding: '12px 15px', borderRadius: '20px', border: '2px solid #e5e5e5', outline: 'none' }} />
                <button onClick={handleSendText} style={{ background: '#58cc02', color: 'white', border: 'none', borderBottom: '3px solid #46a302', padding: '0 15px', borderRadius: '20px', fontWeight: 'bold' }}>Send</button>
              </div>
            </div>
          )}

        </div>

        {/* MENÚ DE NAVEGACIÓN INFERIOR (ESTILO DUOLINGO) */}
        <div style={{ background: '#ffffff', borderTop: '2px solid #e5e5e5', display: 'flex', padding: '10px 0', justifyContent: 'space-around' }}>
          <button onClick={() => setActiveTab('aprender')} style={{ background: 'none', border: 'none', color: activeTab === 'aprender' ? '#58cc02' : '#afafaf', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', fontSize: '13px' }}>
            <span style={{ fontSize: '20px' }}>📚</span> Aprender
          </button>
          <button onClick={() => setActiveTab('chat')} style={{ background: 'none', border: 'none', color: activeTab === 'chat' ? '#1890ff' : '#afafaf', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', fontSize: '13px' }}>
            <span style={{ fontSize: '20px' }}>💬</span> Chat IA
          </button>
        </div>

      </div>
    </main>
  );
}
