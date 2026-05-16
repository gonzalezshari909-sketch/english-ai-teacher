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
    },
    {
      categoria: 'Negociación Avanzada 🤝',
      leccion: 'Closing complex deals',
      descripcion: 'Estrategias de comunicación fluida para persuasión y contratos.',
      tarjetas: [
        { en: 'We have reached a consensus on the contract terms.', es: 'Hemos llegado a un consenso sobre los términos del contrato.' },
        { en: 'That is a win-win situation for both parties.', es: 'Esa es una situación de ganar-ganar para ambas partes.' }
      ],
      quizzes: [
        { pregunta: '¿Qué es una "win-win situation"?', opciones: ['Donde todos se benefician', 'Donde solo uno gana', 'Un juego de azar'], correcta: 'Donde todos se benefician' }
      ]
    }
  ]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('inicio'); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('Básico');
  
  // Índices para controlar qué lección interna de la lista se está viendo
  const [indiceLeccion, setIndiceLeccion] = useState(0);
  const [indiceQuiz, setIndiceQuiz] = useState(0);

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

  // Resetear índices cuando el usuario cambia de nivel
  useEffect(() => {
    setIndiceLeccion(0);
    setIndiceQuiz(0);
    setQuizRespondido(false);
    setQuizMensaje('');
    setChat([
      { role: 'bot', text: `Hi! I am Eliza, your AI Coach. I see you selected the ${selectedModule} level. Let's practice with our new massive database! 🎙️` }
    ]);
  }, [selectedModule]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

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
      let respuesta = `Excellent! Your vocabulary in ${selectedModule} English is expanding. Let's keep going.`;
      if (texto.toLowerCase().includes('hello') || texto.toLowerCase().includes('hi')) {
        respuesta = "Hi there! Ready to explore your interactive lessons today?";
      }
      setChat(prev => [...prev, { role: 'bot', text: respuesta }]);
      speak(respuesta);
    }, 700);
  };

  const verificarQuiz = (opcion, respuestaCorrecta) => {
    if (quizRespondido) return;
    setQuizRespondido(true);
    if (opcion === respuestaCorrecta) {
      setXp(p => p + 25);
      setQuizMensaje('🎉 ¡Excelente! Respuesta correcta (+25 XP)');
    } else {
      setQuizMensaje(`❌ Incorrecto. La respuesta correcta era: "${respuestaCorrecta}"`);
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

  // Referencia corta a la lección actual seleccionada
  const datosActuales = CONTENIDO_EDUCATIVO[selectedModule][indiceLeccion] || CONTENIDO_EDUCATIVO[selectedModule][0];
  const quizActual = datosActuales.quizzes[indiceQuiz] || datosActuales.quizzes[0];

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

        {/* CONTENIDO INTERACTIVO */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#ffffff', paddingBottom: '80px' }}>
          
          {activeTab === 'inicio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* CARD DUOLINGO VERDE */}
              <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '24px', padding: '20px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '10px', fontWeight: 'bold' }}>Tu progreso</span>
                  <h2 style={{ margin: '5px 0', fontSize: '20px' }}>Nivel {selectedModule}</h2>
                  <p style={{ margin: '0 0 10px 0', fontSize: '12px', opacity: 0.9 }}>{datosActuales.categoria}</p>
                  <div style={{ width: '130px', height: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${((indiceLeccion + 1) / CONTENIDO_EDUCATIVO[selectedModule].length) * 100}%`, height: '100%', background: '#fbbf24' }} />
                  </div>
                </div>
                <div style={{ width: '80px', height: '80px', background: '#ffe4e6', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px' }}>👩‍🎧</div>
              </div>

              {/* GRID BOTONES DE ACCIÓN */}
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div onClick={() => setActiveTab('chat')} style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: '16px', padding: '12px', textAlign: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '20px' }}>🗣️</span> <b style={{ display: 'block', color: '#16a34a', fontSize: '13px' }}>Hablar</b>
                  </div>
                  <div onClick={() => { setActiveTab('chat'); startSpeechRecognition(); }} style={{ background: '#f0f9ff', border: '2px solid #bae6fd', borderRadius: '16px', padding: '12px', textAlign: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '20px' }}>🎧</span> <b style={{ display: 'block', color: '#0284c7', fontSize: '13px' }}>Escuchar</b>
                  </div>
                </div>
              </div>

              {/* RETO DIARIO INTERACTIVO CON BOTÓN DE CAMBIO */}
              <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '20px', padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#4f46e5', fontWeight: 'bold', textTransform: 'uppercase' }}>Tema {indiceLeccion + 1} de {CONTENIDO_EDUCATIVO[selectedModule].length}</span>
                  <button onClick={siguienteLeccion} style={{ background: '#e0e7ff', color: '#4f46e5', border: 'none', padding: '4px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>Siguiente Tema ➡️</button>
                </div>
                <h3 style={{ margin: '4px 0', fontSize: '16px', color: '#1e293b' }}>{datosActuales.leccion}</h3>
                <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: '#64748b' }}>{datosActuales.descripcion}</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {datosActuales.tarjetas.map((t, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1, paddingRight: '5px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>{t.en}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{t.es}</div>
                      </div>
                      <button onClick={() => { speak(t.en); setXp(x => x + 5); }} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>🔊</button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'lecciones' && (
            /* ================= PESTAÑA 2: QUIZZES ROTATIVOS ================= */
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ color: '#1e293b', margin: 0 }}>Trivia Interactiva 📖</h3>
                {datosActuales.quizzes.length > 1 && (
                  <button onClick={() => siguienteQuiz(datosActuales.quizzes.length)} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '5px 10px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Otro Quiz 🔄</button>
                )}
              </div>
              
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '20px', border: '2px solid #e2e8f0' }}>
                <p style={{ fontWeight: 'bold', fontSize: '15px', color: '#1e293b', marginBottom: '15px' }}>{quizActual.pregunta}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {quizActual.opciones.map((opc, i) => (
                    <button key={i} onClick={() => verificarQuiz(opc, quizActual.correcta)} style={{ padding: '12px 15px', borderRadius: '12px', border: '2px solid #e2e8f0', background: '#ffffff', textAlign: 'left', cursor: 'pointer', color: '#475569', fontWeight: '500' }}>
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
