'use client';
import React, { useState, useEffect, useRef } from 'react';

// BASE DE DATOS MASIVA EXPANDIDA
const CONTENIDO_EDUCATIVO = {
  'Básico': [
    {
      categoria: 'Saludos y Presentaciones 👋',
      leccion: 'Meeting people for the first time',
      descripcion: 'Aprende las frases esenciales para dar una buena primera impresión.',
      tarjetas: [
        { en: 'Nice to meet you, my name is John.', es: 'Gusto en conocerte, mi nombre es John.' },
        { en: 'Where are you from?', es: '¿De dónde eres?' },
        { en: 'What do you do for a living?', es: '¿A qué te dedicas?' }
      ],
      quizzes: [
        { pregunta: '¿Cuál es la forma más común de decir "Gusto en conocerte"?', opciones: ['Nice to meet you', 'Goodbye', 'Thank you'], correcta: 'Nice to meet you' },
        { pregunta: '¿Cómo preguntas "¿A qué te dedicas?"', opciones: ['What do you do?', 'How are you?', 'Where are you?'], correcta: 'What do you do?' }
      ]
    },
    {
      categoria: 'Viajes y Supervivencia ✈️',
      leccion: 'At the Airport & Train Station',
      descripcion: 'Frases clave para no perderte durante tus viajes internacionales.',
      tarjetas: [
        { en: 'Where is the nearest train station?', es: '¿Dónde está la estación de tren más cercana?' },
        { en: 'Could you please help me with my bags?', es: '¿Podrías ayudarme con mis maletas, por favor?' },
        { en: 'I have a flight reservation at 9 PM.', es: 'Tengo una reservación de vuelo a las 9 PM.' }
      ],
      quizzes: [
        { pregunta: '¿Qué significa "Baggage claim"?', opciones: ['Reclamo de equipaje', 'Puerta de embarque', 'Boletería'], correcta: 'Reclamo de equipaje' }
      ]
    },
    {
      categoria: 'Restaurante y Comida 🍔',
      leccion: 'Ordering food easily',
      descripcion: 'Pide tu comida favorita y entiende al mesero sin nervios.',
      tarjetas: [
        { en: 'Can I see the menu, please?', es: '¿Puedo ver el menú, por favor?' },
        { en: 'I would like to order a chicken burger.', es: 'Me gustaría ordenar una hamburguesa de pollo.' },
        { en: 'Could we have the check, please?', es: '¿Nos podría traer la cuenta, por favor?' }
      ],
      quizzes: [
        { pregunta: '¿Cómo se pide la cuenta de forma educada?', opciones: ['The check, please', 'Give me food', 'I want water'], correcta: 'The check, please' }
      ]
    }
  ],
  'Intermedio': [
    {
      categoria: 'Trabajo y Negocios 💼',
      leccion: 'Expressing complex opinions',
      descripcion: 'Aprende a debatir ideas en el entorno laboral y corporativo.',
      tarjetas: [
        { en: 'From my perspective, the benefits outweigh the risks.', es: 'Desde mi perspectiva, los beneficios superan los riesgos.' },
        { en: 'Let’s circle back to this topic during next week’s meeting.', es: 'Volvamos a este tema en la reunión de la próxima semana.' },
        { en: 'We need to streamline this process to save time.', es: 'Necesitamos optimizar este proceso para ahorrar tiempo.' }
      ],
      quizzes: [
        { pregunta: '¿Qué significa el modismo laboral "circle back"?', opciones: ['Dar vueltas en círculos', 'Volver a retomar un tema más tarde', 'Cancelar el proyecto'], correcta: 'Volver a retomar un tema más tarde' },
        { pregunta: '¿Qué significa "streamline"?', opciones: ['Hacer algo más eficiente/optimizar', 'Transmitir en vivo', 'Dibujar una línea'], correcta: 'Hacer algo más eficiente/optimizar' }
      ]
    },
    {
      categoria: 'Vida Diaria y Planes 🗓️',
      leccion: 'Making arrangements and plans',
      descripcion: 'Acuérda citas, reuniones o salidas con amigos usando lenguaje natural.',
      tarjetas: [
        { en: 'Are you free to hang out this weekend?', es: '¿Estás libre para salir este fin de semana?' },
        { en: 'Let’s look at the big picture before deciding.', es: 'Veamos el panorama general antes de decidir.' },
        { en: 'I look forward to hearing from you soon.', es: 'Quedo a la espera de saber de ti pronto.' }
      ],
      quizzes: [
        { pregunta: '¿Qué significa la expresión "the big picture"?', opciones: ['Una foto enorme', 'El panorama general / la situación completa', 'Una película larga'], correcta: 'El panorama general / la situación completa' }
      ]
    }
  ],
  'Avanzado': [
    {
      categoria: 'Fluidez y Modismos 🚀',
      leccion: 'Mastering Native Idioms',
      descripcion: 'Domina frases complejas que los nativos usan en su día a día.',
      tarjetas: [
        { en: 'We need to hit the ground running on this project.', es: 'Necesitamos empezar este proyecto a toda marcha.' },
        { en: 'He is fighting against all odds to achieve his goals.', es: 'Él está luchando contra todo pronóstico para lograr sus metas.' },
        { en: 'Let’s call it a day, we have worked enough.', es: 'Terminemos por hoy, ya hemos trabajado suficiente.' }
      ],
      quizzes: [
        { pregunta: '¿Qué significa "hit the ground running"?', opciones: ['Empezar algo con mucha energía y éxito instantáneo', 'Caerse corriendo', 'Llegar tarde al trabajo'], correcta: 'Empezar algo con mucha energía y éxito instantáneo' },
        { pregunta: 'Si alguien dice "Let’s call it a day", ¿qué quiere hacer?', opciones: ['Dar por terminado el trabajo por hoy', 'Llamar a un amigo', 'Iniciar un nuevo día'], correcta: 'Dar por terminado el trabajo por hoy' }
      ]
    }
  ]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('inicio'); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('Básico');
  
  const [indiceLeccion, setIndiceLeccion] = useState(0);
  const [indiceQuiz, setIndiceQuiz] = useState(0);

  const [xp, setXp] = useState(65);
  const [streak, setStreak] = useState(1);
  const [quizRespondido, setQuizRespondido] = useState(false);
  const [quizMensaje, setQuizMensaje] = useState('');

  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setIndiceLeccion(0);
    setIndiceQuiz(0);
    setQuizRespondido(false);
    setQuizMensaje('');
    setChat([
      { role: 'bot', text: `Hi! I am Eliza, your AI Coach. Ready to master the ${selectedModule} level today? Let's talk!🎙️` }
    ]);
  }, [selectedModule]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.rate = 0.95;
      window.speechSynthesis.speak(msg);
    }
  };

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
      alert("Tu navegador no soporta reconocimiento de voz nativo. ¡Prueba en Chrome!");
    }
  };

  const procesarChat = (texto) => {
    if (!texto.trim()) return;
    setChat(prev => [...prev, { role: 'user', text: texto }]);
    setXp(p => p + 10);
    setInput('');

    setTimeout(() => {
      let respuesta = `Awesome sentence! Keep going with your ${selectedModule} practice.`;
      if (texto.toLowerCase().includes('hello') || texto.toLowerCase().includes('hi')) {
        respuesta = "Hi there! I'm glad to see you back. What are we practicing today?";
      }
      setChat(prev => [...prev, { role: 'bot', text: respuesta }]);
      speak(respuesta);
    }, 600);
  };

  const verificarQuiz = (opcion, respuestaCorrecta) => {
    if (quizRespondido) return;
    setQuizRespondido(true);
    if (opcion === respuestaCorrecta) {
      setXp(p => p + 25);
      setQuizMensaje('🎉 ¡Excelente! Respuesta correcta (+25 XP)');
    } else {
      setQuizMensaje(`❌ Incorrecto. Era: "${respuestaCorrecta}"`);
    }
  };

  const siguienteLeccion = () => {
    const limite = CONTENIDO_EDUCATIVO[selectedModule].length;
    setIndiceLeccion((prev) => (prev + 1) % limite);
    setIndiceQuiz(0);
    setQuizRespondido(false);
    setQuizMensaje('');
  };

  const siguienteQuiz = (totalQuizzes) => {
    setIndiceQuiz((prev) => (prev + 1) % totalQuizzes);
    setQuizRespondido(false);
    setQuizMensaje('');
  };

  const datosActuales = CONTENIDO_EDUCATIVO[selectedModule][indiceLeccion] || CONTENIDO_EDUCATIVO[selectedModule][0];
  const quizActual = datosActuales.quizzes[indiceQuiz] || datosActuales.quizzes[0];

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', padding: '15px' }}>
      
      {/* TELÉFONO CONTENEDOR OPTIMIZADO */}
      <div style={{ width: '100%', maxWidth: '412px', height: '92vh', background: '#ffffff', borderRadius: '35px', boxShadow: '0 25px 60px rgba(15, 23, 42, 0.12)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', border: '8px solid #0f172a' }}>
        
        {/* HEADER MEJORADO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', alignItems: 'center', borderBottom: '1px solid #f1f5f9', background: '#ffffff', zIndex: 50 }}>
          <button onClick={() => setMenuOpen(true)} style={{ background: '#f1f5f9', border: 'none', width: '38px', height: '38px', borderRadius: '12px', fontSize: '18px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>☰</button>
          <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '6px 14px', borderRadius: '20px', fontWeight: '700', fontSize: '12px', letterSpacing: '0.5px' }}>
            🇺🇸 {selectedModule.toUpperCase()}
          </div>
          <div style={{ display: 'flex', gap: '6px', fontSize: '12px', fontWeight: '700' }}>
            <span style={{ background: '#fff7ed', color: '#ea580c', padding: '5px 10px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(234,88,12,0.05)' }}>🔥 {streak}d</span>
            <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '5px 10px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(22,163,74,0.05)' }}>⭐ {xp} XP</span>
          </div>
        </div>

        {/* MENÚ BLUR MODERNO */}
        {menuOpen && (
          <>
            <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 100, transition: 'all 0.3s' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '280px', height: '100%', background: '#ffffff', zIndex: 101, padding: '35px 24px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '20px 0 40px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, color: '#0f172a', fontWeight: '800' }}>Niveles</h3>
                <button onClick={() => setMenuOpen(false)} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
              </div>
              {['Básico', 'Intermedio', 'Avanzado'].map(nivel => (
                <button key={nivel} onClick={() => { setSelectedModule(nivel); setMenuOpen(false); }} style={{ padding: '14px 18px', borderRadius: '16px', border: 'none', textAlign: 'left', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s', background: selectedModule === nivel ? '#10b981' : '#f8fafc', color: selectedModule === nivel ? '#ffffff' : '#475569', boxShadow: selectedModule === nivel ? '0 4px 12px rgba(16,185,129,0.2)' : 'none' }}>
                  🎯 Nivel {nivel}
                </button>
              ))}
            </div>
          </>
        )}

        {/* CONTENEDOR PRINCIPAL CON LIMITACIÓN DE SCROLL */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px', background: '#ffffff', paddingBottom: '90px' }}>
          
          {activeTab === 'inicio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* TARGETA BANNER DUOLINGO */}
              <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '24px', padding: '20px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 8px 20px rgba(16,185,129,0.15)' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.25)', padding: '4px 10px', borderRadius: '20px', fontWeight: '700', textTransform: 'uppercase' }}>Tu Progreso</span>
                  <h2 style={{ margin: '6px 0 2px 0', fontSize: '22px', fontWeight: '800' }}>{selectedModule}</h2>
                  <p style={{ margin: '0 0 12px 0', fontSize: '12px', opacity: 0.9, fontWeight: '500' }}>{datosActuales.categoria}</p>
                  <div style={{ width: '100%', maxWidth: '140px', height: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${((indiceLeccion + 1) / CONTENIDO_EDUCATIVO[selectedModule].length) * 100}%`, height: '100%', background: '#fbbf24', borderRadius: '10px', transition: 'width 0.4s ease' }} />
                  </div>
                </div>
                <div style={{ width: '75px', height: '75px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '38px', marginLeft: '10px' }}>👩‍🎧</div>
              </div>

              {/* BOTONES INTERACTIVOS RÁPIDOS */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div onClick={() => setActiveTab('chat')} style={{ background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: '16px', padding: '14px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <span style={{ fontSize: '20px' }}>🗣️</span> <b style={{ display: 'block', color: '#16a34a', fontSize: '13px', marginTop: '4px' }}>Hablar</b>
                </div>
                <div onClick={() => { setActiveTab('chat'); startSpeechRecognition(); }} style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: '16px', padding: '14px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <span style={{ fontSize: '20px' }}>🎧</span> <b style={{ display: 'block', color: '#0284c7', fontSize: '13px', marginTop: '4px' }}>Escuchar</b>
                </div>
              </div>

              {/* CONTENIDO INTERACTIVO DE LA LECCIÓN */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '22px', padding: '18px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', color: '#4f46e5', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tema {indiceLeccion + 1} de {CONTENIDO_EDUCATIVO[selectedModule].length}</span>
                  <button onClick={siguienteLeccion} style={{ background: '#ffffff', color: '#4f46e5', border: '1px solid #e2e8f0', padding: '5px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>Siguiente ➡️</button>
                </div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#0f172a', fontWeight: '800' }}>{datosActuales.leccion}</h3>
                <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>{datosActuales.descripcion}</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {datosActuales.tarjetas.map((t, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '12px 14px', borderRadius: '14px', border: '1px solid #edf2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                      <div style={{ flex: 1, paddingRight: '10px' }}>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{t.en}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{t.es}</div>
                      </div>
                      <button onClick={() => { speak(t.en); setXp(x => x + 5); }} style={{ background: '#f1f5f9', border: 'none', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', transition: 'background 0.2s' }}>🔊</button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'lecciones' && (
            /* ================= PESTAÑA: TRIVIA ================= */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: '#0f172a', fontWeight: '800', margin: 0 }}>Trivia Interactiva</h3>
                {datosActuales.quizzes.length > 1 && (
                  <button onClick={() => siguienteQuiz(datosActuales.quizzes.length)} style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', cursor: 'pointer', fontWeight: '700', color: '#475569' }}>Cambiar 🔄</button>
                )}
              </div>
              
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontWeight: '700', fontSize: '15px', color: '#1e293b', marginBottom: '16px', lineHeight: '1.4' }}>{quizActual.pregunta}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {quizActual.opciones.map((opc, i) => (
                    <button key={i} onClick={() => verificarQuiz(opc, quizActual.correcta)} style={{ padding: '14px 16px', borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', textAlign: 'left', cursor: 'pointer', color: '#334155', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s' }}>
                      {opc}
                    </button>
                  ))}
                </div>
                {quizMensaje && <p style={{ marginTop: '16px', fontWeight: '700', textAlign: 'center', color: quizMensaje.includes('🎉') ? '#16a34a' : '#dc2626', fontSize: '13px' }}>{quizMensaje}</p>}
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            /* ================= PESTAÑA: CHAT TUTOR ================= */
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '75px' }}>
                {chat.map((msg, i) => (
                  <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '82%' }}>
                    <div style={{ background: msg.role === 'user' ? '#10b981' : '#f1f5f9', color: msg.role === 'user' ? '#ffffff' : '#0f172a', padding: '12px 16px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', fontSize: '13px', lineHeight: '1.4', fontWeight: '500', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div style={{ position: 'absolute', bottom: '80px', left: '16px', right: '16px', display: 'flex', gap: '8px', background: '#ffffff', padding: '6px 0' }}>
                <button onClick={startSpeechRecognition} style={{ background: isListening ? '#ef4444' : '#10b981', color: 'white', border: 'none', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 12px rgba(16,185,129,0.2)' }}>
                  {isListening ? '🛑' : '🎙️'}
                </button>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && procesarChat(input)} placeholder={isListening ? "Escuchando..." : "Escribe tu respuesta..."} disabled={isListening} style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px' }} />
                <button onClick={() => procesarChat(input)} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '0 16px', borderRadius: '24px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>Enviar</button>
              </div>
            </div>
          )}

          {activeTab === 'progreso' && (
            /* ================= PESTAÑA: ESTADÍSTICAS ================= */
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <h3 style={{ fontWeight: '800', color: '#0f172a' }}>Tus Estadísticas 📊</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '16px' }}>
                <div style={{ background: '#f8fafc', padding: '18px 14px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '22px' }}>⚡</span>
                  <h4 style={{ margin: '6px 0 2px 0', fontSize: '18px', fontWeight: '800' }}>{xp}</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#64748b', fontWeight: '600' }}>Puntos Totales</p>
                </div>
                <div style={{ background: '#f8fafc', padding: '18px 14px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '22px' }}>🔥</span>
                  <h4 style={{ margin: '6px 0 2px 0', fontSize: '18px', fontWeight: '800' }}>{streak} día</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#64748b', fontWeight: '600' }}>Racha Diaria</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* MENÚ DE NAVEGACIÓN INFERIOR ESTILIZADO */}
        <div style={{ background: '#ffffff', borderTop: '1px solid #f1f5f9', display: 'flex', padding: '12px 0 14px 0', justifyContent: 'space-around', position: 'absolute', bottom: 0, width: '100%', zIndex: 90 }}>
          {[
            { id: 'inicio', label: 'Inicio', icon: '🏠' },
            { id: 'lecciones', label: 'Trivia', icon: '📖' },
            { id: 'chat', label: 'Chat IA', icon: '💬' },
            { id: 'progreso', label: 'Progreso', icon: '📊' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: 'none', border: 'none', color: activeTab === tab.id ? '#10b981' : '#94a3b8', fontWeight: '700', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s', transform: activeTab === tab.id ? 'scale(1.05)' : 'scale(1)' }}>
              <span style={{ fontSize: '20px', filter: activeTab === tab.id ? 'none' : 'grayscale(30%)' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

      </div>
    </main>
  );
}
