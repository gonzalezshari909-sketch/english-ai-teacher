'use client';
import React, { useState, useEffect, useRef } from 'react';

// BASE DE DATOS EDUCATIVA
const CONTENIDO_EDUCATIVO = {
  'Básico': {
    categoria: 'Viajes y Supervivencia ✈️',
    leccion: 'Talking about your day',
    descripcion: 'Aprende a describir tu rutina diaria y pedir ayuda básica.',
    tarjetas: [
      { en: 'Where is the nearest train station?', es: '¿Dónde está la estación de tren más cercana?' },
      { en: 'Could you please help me with my bags?', es: '¿Podrías ayudarme con mis maletas, por favor?' }
    ],
    quiz: {
      pregunta: '¿Cómo se dice "Me despierto a las 7 AM" en inglés?',
      opciones: ['I wake up at 7 AM', 'I sleep at 7 AM', 'I go to work at 7 AM'],
      correcta: 'I wake up at 7 AM'
    }
  },
  'Intermedio': {
    categoria: 'Trabajo y Negocios 💼',
    leccion: 'Expressing complex opinions',
    descripcion: 'Aprende a debatir ideas en el entorno laboral.',
    tarjetas: [
      { en: 'From my perspective, the benefits outweigh the risks.', es: 'Desde mi perspectiva, los beneficios superan los riesgos.' },
      { en: 'Let’s circle back to this topic during next week’s meeting.', es: 'Volvamos a este tema en la reunión de la próxima semana.' }
    ],
    quiz: {
      pregunta: '¿Qué significa el modismo "circle back"?',
      opciones: ['Dar vueltas en círculos', 'Volver a retomar un tema más tarde', 'Terminar una llamada'],
      correcta: 'Volver a retomar un tema más tarde'
    }
  },
  'Avanzado': {
    categoria: 'Fluidez y Modismos 🚀',
    leccion: 'Mastering Native Idioms',
    descripcion: 'Domina frases e ironías que los nativos usan en su día a día.',
    tarjetas: [
      { en: 'We need to hit the ground running on this project.', es: 'Necesitamos empezar este proyecto a toda marcha.' },
      { en: 'He is fighting against all odds to achieve his goals.', es: 'Él está luchando contra todo pronóstico para lograr sus metas.' }
    ],
    quiz: {
      pregunta: '¿Qué significa "hit the ground running"?',
      opciones: ['Empezar algo con mucha energía y éxito', 'Caerse al correr', 'Llegar tarde'],
      correcta: 'Empezar algo con mucha energía y éxito'
    }
  }
};

export default function Home() {
  // Navegación (Tabs inferiores)
  const [activeTab, setActiveTab] = useState('inicio'); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('Básico');
  
  // Gamificación y Progreso
  const [xp, setXp] = useState(65);
  const [streak, setStreak] = useState(1);
  const [quizRespondido, setQuizRespondido] = useState(false);
  const [quizMensaje, setQuizMensaje] = useState('');

  // Chatbot Inteligente con Voz
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  useEffect(() => {
    setChat([
      { role: 'bot', text: `Hi! I am Eliza, your AI Coach. Let's practice English! Switch tabs below or text me here. 🎙️` }
    ]);
    setQuizRespondido(false);
    setQuizMensaje('');
  }, [selectedModule]);

  // Text-to-Speech (La IA Habla)
  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.rate = 0.9;
      window.speechSynthesis.speak(msg);
    }
  };

  // Speech-to-Text (Reconocimiento de Voz)
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
        procesarChat(vozTexto);
      };
      recognition.start();
    } else {
      alert("Tu dispositivo no soporta reconocimiento de voz nativo en este navegador. ¡Usa Google Chrome!");
    }
  };

  const procesarChat = (texto) => {
    if (!texto.trim()) return;
    setChat(prev => [...prev, { role: 'user', text: texto }]);
    setXp(p => p + 10);
    setInput('');

    setTimeout(() => {
      let respuesta = `Excellent sentence! Practicing in the ${selectedModule} module will boost your fluency. Do you have any questions?`;
      if (texto.toLowerCase().includes('hello') || texto.toLowerCase().includes('hi')) {
        respuesta = "Hi there! Ready to crush your English goals today? Select a challenge or talk to me!";
      }
      setChat(prev => [...prev, { role: 'bot', text: respuesta }]);
      speak(respuesta);
    }, 700);
  };

  const verificarQuiz = (opcion) => {
    if (quizRespondido) return;
    setQuizRespondido(true);
    if (opcion === CONTENIDO_EDUCATIVO[selectedModule].quiz.correcta) {
      setXp(p => p + 25);
      setQuizMensaje('🎉 ¡Excelente! Respuesta correcta (+25 XP)');
    } else {
      setQuizMensaje('❌ Incorrecto. ¡Sigue practicando!');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'system-ui, sans-serif', padding: '0 10px' }}>
      
      {/* TELÉFONO CONTENEDOR */}
      <div style={{ width: '100%', maxWidth: '430px', height: '94vh', background: '#ffffff', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', border: '6px solid #e2e8f0' }}>
        
        {/* HEADER SUPERIOR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
          <button onClick={() => setMenuOpen(true)} style={{ background: '#f1f5f9', border: 'none', width: '40px', height: '40px', borderRadius: '12px', fontSize: '20px', cursor: 'pointer' }}>☰</button>
          <div style={{ background: '#ecfdf5', color: '#10b981', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px' }}>
            🇺🇸 {selectedModule.toUpperCase()}
          </div>
          <div style={{ display: 'flex', gap: '8px', fontSize: '13px', fontWeight: 'bold' }}>
            <span style={{ background: '#fff7ed', color: '#ea580c', padding: '5px 10px', borderRadius: '12px' }}>🔥 {streak}d</span>
            <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '5px 10px', borderRadius: '12px' }}>⭐ {xp} XP</span>
          </div>
        </div>

        {/* MENÚ DE SELECCIÓN DE NIVELES */}
        {menuOpen && (
          <>
            <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', zIndex: 100 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '260px', height: '100%', background: '#ffffff', zIndex: 101, padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>Cambiar Nivel</h3>
              {['Básico', 'Intermedio', 'Avanzado'].map(nivel => (
                <button key={nivel} onClick={() => { setSelectedModule(nivel); setMenuOpen(false); }} style={{ padding: '14px', borderRadius: '14px', border: 'none', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', background: selectedModule === nivel ? '#10b981' : '#f8fafc', color: selectedModule === nivel ? '#ffffff' : '#64748b' }}>
                  🎯 Nivel {nivel}
                </button>
              ))}
            </div>
          </>
        )}

        {/* CONTENIDO INTERACTIVO SEGÚN TABS */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#ffffff', paddingBottom: '80px' }}>
          
          {activeTab === 'inicio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              {/* CARD DUOLINGO VERDE CON PERSONAJE */}
              <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '24px', padding: '20px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '10px', fontWeight: 'bold' }}>Tu progreso</span>
                  <h2 style={{ margin: '5px 0', fontSize: '22px' }}>Nivel {selectedModule}</h2>
                  <p style={{ margin: '0 0 10px 0', fontSize: '12px', opacity: 0.9 }}>{CONTENIDO_EDUCATIVO[selectedModule].categoria}</p>
                  <div style={{ width: '130px', height: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: '65%', height: '100%', background: '#fbbf24' }} />
                  </div>
                </div>
                <div style={{ width: '85px', height: '85px', background: '#ffe4e6', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '45px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>👩‍🎧</div>
              </div>

              {/* GRID BOTONES DE ACCIÓN */}
              <div>
                <h4 style={{ margin: '0 0 12px 0', color: '#334155' }}>¿Qué quieres practicar hoy?</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div onClick={() => setActiveTab('chat')} style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: '18px', padding: '15px', textAlign: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '24px' }}>🗣️</span> <b style={{ display: 'block', color: '#16a34a', fontSize: '14px' }}>Hablar</b>
                  </div>
                  <div onClick={() => { setActiveTab('chat'); startSpeechRecognition(); }} style={{ background: '#f0f9ff', border: '2px solid #bae6fd', borderRadius: '18px', padding: '15px', textAlign: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '24px' }}>🎧</span> <b style={{ display: 'block', color: '#0284c7', fontSize: '14px' }}>Escuchar</b>
                  </div>
                  <div onClick={() => setActiveTab('lecciones')} style={{ background: '#faf5ff', border: '2px solid #e9d5ff', borderRadius: '18px', padding: '15px', textAlign: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '24px' }}>📚</span> <b style={{ display: 'block', color: '#7c3aed', fontSize: '14px' }}>Aprender</b>
                  </div>
                  <div onClick={() => setActiveTab('chat')} style={{ background: '#fefce8', border: '2px solid #fef08a', borderRadius: '18px', padding: '15px', textAlign: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '24px' }}>✏️</span> <b style={{ display: 'block', color: '#ca8a04', fontSize: '14px' }}>Escribir</b>
                  </div>
                </div>
              </div>

              {/* SECCIÓN INTERACTIVA DE LECCIÓN SUGERIDA */}
              <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '20px', padding: '18px' }}>
                <span style={{ fontSize: '11px', color: '#4f46e5', fontWeight: 'bold', textTransform: 'uppercase' }}>🎯 Reto Diario</span>
                <h3 style={{ margin: '4px 0', fontSize: '16px', color: '#1e293b' }}>{CONTENIDO_EDUCATIVO[selectedModule].leccion}</h3>
                <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: '#64748b' }}>{CONTENIDO_EDUCATIVO[selectedModule].descripcion}</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {CONTENIDO_EDUCATIVO[selectedModule].tarjetas.map((t, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{t.en}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{t.es}</div>
                      </div>
                      <button onClick={() => { speak(t.en); setXp(x => x + 5); }} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}>🔊</button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'lecciones' && (
            /* ================= PESTAÑA 2: LECCIONES / QUIZZES ================= */
            <div>
              <h3 style={{ color: '#1e293b', margin: '0 0 5px 0' }}>Trivia de Nivel</h3>
              <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 20px 0' }}>Pon a prueba tus conocimientos gramaticales y acumula experiencia.</p>
              
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '20px', border: '2px solid #e2e8f0' }}>
                <p style={{ fontWeight: 'bold', fontSize: '15px', color: '#1e293b', marginBottom: '15px' }}>{CONTENIDO_EDUCATIVO[selectedModule].quiz.pregunta}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {CONTENIDO_EDUCATIVO[selectedModule].quiz.opciones.map((opc, i) => (
                    <button key={i} onClick={() => verificarQuiz(opc)} style={{ padding: '12px 15px', borderRadius: '12px', border: '2px solid #e2e8f0', background: '#ffffff', textAlign: 'left', cursor: 'pointer', color: '#475569' }}>
                      {opc}
                    </button>
                  ))}
                </div>
                {quizMensaje && <p style={{ marginTop: '15px', fontWeight: 'bold', textAlign: 'center', color: quizMensaje.includes('🎉') ? '#16a34a' : '#dc2626', fontSize: '14px' }}>{quizMensaje}</p>}
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            /* ================= PESTAÑA 3: CHAT TUTOR IA ================= */
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '80px' }}>
                {chat.map((msg, i) => (
                  <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <div style={{ background: msg.role === 'user' ? '#10b981' : '#f1f5f9', color: msg.role === 'user' ? '#ffffff' : '#1e293b', padding: '12px 16px', borderRadius: '18px', fontSize: '14px' }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* ENTRADA DE TEXTO Y MICRÓFONO */}
              <div style={{ position: 'absolute', bottom: '75px', left: '15px', right: '15px', display: 'flex', gap: '8px', background: '#ffffff', padding: '5px 0' }}>
                <button onClick={startSpeechRecognition} style={{ background: isListening ? '#ef4444' : '#10b981', color: 'white', border: 'none', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {isListening ? '🛑' : '🎙️'}
                </button>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && procesarChat(input)} placeholder={isListening ? "Listening..." : "Escribe o habla..."} disabled={isListening} style={{ flex: 1, padding: '12px 15px', borderRadius: '25px', border: '2px solid #e2e8f0', outline: 'none' }} />
                <button onClick={() => procesarChat(input)} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0 15px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>Send</button>
              </div>
            </div>
          )}

          {activeTab === 'progreso' && (
            /* ================= PESTAÑA 4: ESTADÍSTICAS ================= */
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h3>Tus Estadísticas 📊</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '20px' }}>⚡</span>
                  <h4 style={{ margin: '5px 0 0 0' }}>{xp}</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Puntos Totales</p>
                </div>
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '20px' }}>🔥</span>
                  <h4 style={{ margin: '5px 0 0 0' }}>{streak} día</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Racha de estudio</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* MENÚ DE NAVEGACIÓN INFERIOR (DUOLINGO) */}
        <div style={{ background: '#ffffff', borderTop: '2px solid #f1f5f9', display: 'flex', padding: '10px 0', justifyContent: 'space-around', position: 'absolute', bottom: 0, width: '100%', zIndex: 10 }}>
          <button onClick={() => setActiveTab('inicio')} style={{ background: 'none', border: 'none', color: activeTab === 'inicio' ? '#10b981' : '#94a3b8', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '11px', cursor: 'pointer' }}>
            <span style={{ fontSize: '18px' }}>🏠</span> Inicio
          </button>
          <button onClick={() => setActiveTab('lecciones')} style={{ background: 'none', border: 'none', color: activeTab === 'lecciones' ? '#10b981' : '#94a3b8', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '11px', cursor: 'pointer' }}>
            <span style={{ fontSize: '18px' }}>📖</span> Trivia
          </button>
          <button onClick={() => setActiveTab('chat')} style={{ background: 'none', border: 'none', color: activeTab === 'chat' ? '#10b981' : '#94a3b8', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '11px', cursor: 'pointer' }}>
            <span style={{ fontSize: '18px' }}>💬</span> Chat IA
          </button>
          <button onClick={() => setActiveTab('progreso')} style={{ background: 'none', border: 'none', color: activeTab === 'progreso' ? '#10b981' : '#94a3b8', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '11px', cursor: 'pointer' }}>
            <span style={{ fontSize: '18px' }}>📊</span> Progreso
          </button>
        </div>

      </div>
    </main>
  );
}
