'use client';
import React, { useState, useEffect, useRef } from 'react';

// BASE DE DATOS MASIVA Y REAL - EXPANDIDA POR NIVELES
const DATABASE = {
  'Básico (A1)': [
    {
      categoria: 'Saludos y Cortesía 👋',
      leccion: 'The Basics (Lo Básico)',
      descripcion: 'Frases esenciales para iniciar cualquier conversación cotidiana.',
      vocabulario: [
        { en: 'Hello, how are you?', es: 'Hola, ¿cómo estás?' },
        { en: 'Nice to meet you', es: 'Gusto en conocerte' },
        { en: 'Please and Thank you', es: 'Por favor y Gracias' },
        { en: 'Good morning, have a nice day', es: 'Buenos días, ten un lindo día' },
        { en: 'See you later', es: 'Nos vemos luego' }
      ],
      quiz: {
        pregunta: '¿Cómo saludas de forma educada en inglés por las mañanas?',
        opciones: ['Good morning, have a nice day', 'Goodbye', 'See you later'],
        correcta: 'Good morning, have a nice day'
      }
    },
    {
      categoria: 'Números y Cantidades 🔢',
      leccion: 'Counting Things (Contando objetos)',
      descripcion: 'Aprende los números esenciales para dar información y precios.',
      vocabulario: [
        { en: 'How much does it cost?', es: '¿Cuánto cuesta?' },
        { en: 'I have five apples', es: 'Tengo cinco manzanas' },
        { en: 'Number ten', es: 'Número diez' }
      ],
      quiz: {
        pregunta: '¿Cómo se traduce la pregunta "¿Cuánto cuesta?"?',
        opciones: ['How much does it cost?', 'I have five apples', 'Number ten'],
        correcta: 'How much does it cost?'
      }
    }
  ],
  'Intermedio (B1)': [
    {
      categoria: 'Trabajo y Negocios 💼',
      leccion: 'In the Office (En la oficina)',
      descripcion: 'Vocabulario formal para juntas, reportes y correos electrónicos profesionales.',
      vocabulario: [
        { en: 'Let’s schedule a meeting', es: 'Programemos una reunión' },
        { en: 'Can you send the report?', es: '¿Puedes enviar el informe?' },
        { en: 'I am in charge of document control', es: 'Estoy a cargo del control documental' },
        { en: 'We need to meet the deadline', es: 'Necesitamos cumplir con la fecha límite' }
      ],
      quiz: {
        pregunta: '¿Qué significa "meet the deadline"?',
        opciones: ['Cumplir con la fecha límite', 'Programar una reunión', 'Enviar un reporte'],
        correcta: 'Cumplir con la fecha límite'
      }
    }
  ],
  'Avanzado (C1)': [
    {
      categoria: 'Fluidez y Modismos 🚀',
      leccion: 'Native Expressions (Expresiones nativas)',
      descripcion: 'Modismos comunes utilizados en el día a día del entorno angloparlante.',
      vocabulario: [
        { en: 'Hit the ground running', es: 'Empezar un proyecto con mucha energía' },
        { en: 'Let’s call it a day', es: 'Demos el día por terminado' },
        { en: 'It’s a piece of cake', es: 'Es pan comido (muy fácil)' }
      ],
      quiz: {
        pregunta: 'Si una tarea es sumamente fácil, ¿qué modismo usarías?',
        opciones: ['It’s a piece of cake', 'Let’s call it a day', 'Hit the ground running'],
        correcta: 'It’s a piece of cake'
      }
    }
  ]
};

// RESPUESTAS AUTOMÁTICAS SIMULADAS DEL BOT SEGÚN PALABRAS CLAVE
const RESPUESTAS_BOT = [
  "That's interesting! Tell me more about it. 🌟",
  "Great job practicing your English! Keep writing. ✍️",
  "I understand completely. How is your day going?",
  "Awesome! Let's keep practicing vocabulary and full sentences.",
  "Nice! Can you try using that word in another sentence?"
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('inicio'); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('Básico (A1)');
  const [indiceModulo, setIndiceModulo] = useState(0);
  
  // Progreso
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  
  // Estados Módulo de Estudio
  const [verTraduccion, setVerTraduccion] = useState({});
  const [quizRespondido, setQuizRespondido] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [feedback, setFeedback] = useState('');

  // Estados Interactivos del Chat Bot
  const [mensajes, setMensajes] = useState([
    { sender: 'bot', text: "Hi there! I am your AI assistant. Let's practice reading, writing, and listening. Type or talk to me!" }
  ]);
  const [inputChat, setInputChat] = useState('');
  const [escuchandoVoz, setEscuchandoVoz] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensajes]);

  useEffect(() => {
    setIndiceModulo(0);
    setQuizRespondido(false);
    setOpcionSeleccionada('');
    setFeedback('');
    setVerTraduccion({});
  }, [selectedLevel]);

  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.rate = 0.85;
      window.speechSynthesis.speak(msg);
    }
  };

  // FUNCIÓN PARA ENVIAR MENSAJES (WRITING)
  const enviarMensajeChat = (textoManual) => {
    const textoAEnviar = textoManual || inputChat;
    if (!textoAEnviar.trim()) return;

    const nuevosMensajes = [...mensajes, { sender: 'user', text: textoAEnviar }];
    setMensajes(nuevosMensajes);
    setInputChat('');
    setXp(p => p + 5); // Otorga XP por escribir y practicar

    // Simular respuesta inteligente de la IA tras 1 segundo
    setTimeout(() => {
      const respuestaAleatoria = RESPUESTAS_BOT[Math.floor(Math.random() * RESPUESTAS_BOT.length)];
      setMensajes([...nuevosMensajes, { sender: 'bot', text: respuestaAleatoria }]);
    }, 1000);
  };

  // FUNCIÓN DE RECONOCIMIENTO DE VOZ (SPEAKING / PRONUNCIACIÓN)
  const activarMicrofono = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Tu navegador no soporta el reconocimiento de voz directo. Intenta con Google Chrome.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US'; // Escucha en Inglés obligatoriamente
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setEscuchandoVoz(true);
      recognition.onend = () => setEscuchandoVoz(false);
      
      recognition.onresult = (event) => {
        const resultadoTexto = event.results[0][0].transcript;
        enviarMensajeChat(resultadoTexto);
      };

      recognition.onerror = () => {
        setEscuchandoVoz(false);
        alert("No se pudo reconocer la voz. Intenta hablar más claro y pausado.");
      };

      recognition.start();
    }
  };

  const evaluar = (opc, correcta) => {
    if (quizRespondido) return;
    setOpcionSeleccionada(opc);
    setQuizRespondido(true);
    if (opc === correcta) {
      setXp(p => p + 20);
      setFeedback('🎉 ¡Excelente respuesta! Sumaste +20 XP');
    } else {
      setFeedback(`❌ Incorrecto. La opción correcta era: "${correcta}"`);
    }
  };

  const listaLeccionesNivel = DATABASE[selectedLevel] || DATABASE['Básico (A1)'];
  const currentData = listaLeccionesNivel[indiceModulo] || listaLeccionesNivel[0];

  return (
    <main style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'system-ui, sans-serif', padding: '15px' }}>
      
      <div style={{ width: '100%', maxWidth: '450px', height: '92vh', background: '#ffffff', borderRadius: '30px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', border: '1px solid #e5e7eb' }}>
        
        {/* ENCABEZADO */}
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff' }}>
          <button onClick={() => setMenuOpen(true)} style={{ background: '#f3f4f6', border: 'none', padding: '10px 14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', color: '#1f2937', fontSize: '13px' }}>
            ☰ Cambiar Nivel
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: '800', fontSize: '17px', color: '#111827' }}>LINGUAGO PRO</div>
            <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>{selectedLevel}</div>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ background: '#fff7ed', color: '#ea580c', padding: '6px 10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px' }}>🔥 {streak}d</span>
            <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '6px 10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px' }}>⭐ {xp}</span>
          </div>
        </div>

        {/* MENÚ DE SELECCIÓN LATERAL */}
        {menuOpen && (
          <>
            <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15,23,42,0.2)', backdropFilter: 'blur(3px)', zIndex: 100 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '280px', height: '100%', background: '#ffffff', zIndex: 101, padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '10px 0 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Elige tu Módulo:</h3>
              {Object.keys(DATABASE).map(level => (
                <button key={level} onClick={() => { setSelectedLevel(level); setMenuOpen(false); }} style={{ padding: '14px', borderRadius: '12px', border: 'none', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', background: selectedLevel === level ? '#10b981' : '#f8fafc', color: selectedLevel === level ? '#ffffff' : '#475569' }}>
                  🎯 {level}
                </button>
              ))}
            </div>
          </>
        )}

        {/* CONTENIDO INTERACTIVO SEGÚN PESTAÑA */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', paddingBottom: '100px', background: '#ffffff' }}>
          
          {/* PESTAÑA 1: MÓDULOS Y LECCIONES */}
          {activeTab === 'inicio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', borderRadius: '24px', padding: '22px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', background: 'rgba(255,255,255,0.25)', padding: '3px 8px', borderRadius: '6px' }}>{currentData.categoria}</span>
                  <h2 style={{ margin: '6px 0 4px 0', fontSize: '20px', fontWeight: '800' }}>{currentData.leccion}</h2>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>{currentData.descripcion}</p>
                </div>
                <div style={{ width: '80px', height: '80px', background: '#ffe4e6', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '42px', border: '3px solid #ffffff' }}>👩‍🎧</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '10px 14px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <button onClick={() => setIndiceModulo((p) => (p - 1 + listaLeccionesNivel.length) % listaLeccionesNivel.length)} style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>⬅️ Anterior</button>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Tema {indiceModulo + 1} de {listaLeccionesNivel.length}</span>
                <button onClick={() => setIndiceModulo((p) => (p + 1) % listaLeccionesNivel.length)} style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Siguiente ➡️</button>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '20px' }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: '#1e293b' }}>📖 Vocabulario Práctico</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentData.vocabulario.map((item, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '14px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '700', fontSize: '14px' }}>{item.en}</div>
                        {verTraduccion[idx] && <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>{item.es}</div>}
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => setVerTraduccion({...verTraduccion, [idx]: !verTraduccion[idx]})} style={{ background: '#ffffff', border: '1px solid #e2e8f0', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}>👁️</button>
                        <button onClick={() => speak(item.en)} style={{ background: '#ffffff', border: '1px solid #e2e8f0', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}>🔊</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '20px' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#4f46e5' }}>RETO COMPLEMENTARIO</span>
                <p style={{ margin: '6px 0 14px 0', fontWeight: '700', fontSize: '14px' }}>{currentData.quiz.pregunta}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentData.quiz.opciones.map((opc, i) => (
                    <button key={i} onClick={() => evaluar(opc, currentData.quiz.correcta)} style={{ padding: '12px 14px', borderRadius: '12px', border: '2px solid', borderColor: opcionSeleccionada === opc ? (opc === currentData.quiz.correcta ? '#10b981' : '#ef4444') : '#e2e8f0', background: '#ffffff', textAlign: 'left', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                      {opc}
                    </button>
                  ))}
                </div>
                {feedback && <div style={{ marginTop: '12px', textAlign: 'center', fontWeight: '800', fontSize: '13px', color: feedback.includes('🎉') ? '#059669' : '#dc2626' }}>{feedback}</div>}
              </div>
            </div>
          )}

          {/* PESTAÑA 2: CHAT BOT COMPLETAMENTE INTERACTIVO (WRITING, LISTENING, SPEAKING) */}
          {activeTab === 'chat' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              
              {/* HISTORIAL DE MENSAJES */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '20px' }}>
                {mensajes.map((msg, index) => (
                  <div key={index} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                      <div style={{ background: msg.sender === 'user' ? '#10b981' : '#f1f5f9', color: msg.sender === 'user' ? '#ffffff' : '#0f172a', padding: '12px 16px', borderRadius: '18px', fontSize: '13.5px', fontWeight: '500', lineHeight: '1.4', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                        {msg.text}
                      </div>
                      {/* Botón para escuchar el mensaje del Bot (Listening) */}
                      {msg.sender === 'bot' && (
                        <button onClick={() => speak(msg.text)} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderStyle: 'none', cursor: 'pointer', fontSize: '14px', padding: '6px', borderRadius: '50%' }} title="Escuchar pronunciación">
                          🔊
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* BARRA DE ESCRITURA Y ENTRADA DE VOZ */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', padding: '10px 0', alignItems: 'center', background: '#ffffff' }}>
                {/* Botón de Micrófono (Speaking) */}
                <button onClick={activarMicrofono} style={{ background: escuchandoVoz ? '#ef4444' : '#f1f5f9', color: escuchandoVoz ? '#ffffff' : '#475569', border: 'none', width: '42px', height: '42px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', transition: '0.2s' }} title="Hablar con el micrófono">
                  {escuchandoVoz ? '🛑' : '🎙️'}
                </button>

                {/* Input de Texto (Writing) */}
                <input value={inputChat} onChange={(e) => setInputChat(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && enviarMensajeChat()} placeholder={escuchandoVoz ? "Escuchando tu voz en inglés..." : "Escribe tu oración en inglés..."} style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '13px', fontWeight: '500' }} disabled={escuchandoVoz} />
                
                <button onClick={() => enviarMensajeChat()} style={{ background: '#10b981', color: '#ffffff', border: 'none', padding: '12px 18px', borderRadius: '24px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                  Enviar
                </button>
              </div>

            </div>
          )}

        </div>

        {/* MENÚ DE NAVEGACIÓN INFERIOR */}
        <div style={{ position: 'absolute', bottom: 0, width: '100%', background: '#ffffff', borderTop: '1px solid #f3f4f6', display: 'flex', padding: '12px 0 20px 0', justifyContent: 'space-around', zIndex: 90 }}>
          <button onClick={() => setActiveTab('inicio')} style={{ background: 'none', border: 'none', color: activeTab === 'inicio' ? '#10b981' : '#94a3b8', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
            <span style={{ fontSize: '18px' }}>📖</span> Módulos
          </button>
          <button onClick={() => setActiveTab('chat')} style={{ background: 'none', border: 'none', color: activeTab === 'chat' ? '#10b981' : '#94a3b8', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
            <span style={{ fontSize: '18px' }}>💬</span> Chat IA
          </button>
        </div>

      </div>
    </main>
  );
}
