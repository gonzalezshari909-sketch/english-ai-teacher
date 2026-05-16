'use client';
import React, { useState, useEffect, useRef } from 'react';

// BASE DE DATOS MASIVA INTEGRADA
const CONTENIDO_EDUCATIVO = {
  'Básico': [
    {
      categoria: 'Saludos y Presentaciones 👋',
      leccion: 'Talking about your day',
      descripcion: 'Aprende a describir tu rutina diaria y expresiones comunes.',
      tarjetas: [
        { en: 'I wake up at 7 AM.', es: 'Me despierto a las 7 AM.' },
        { en: 'How do you feel today?', es: '¿Cómo te sientes hoy?' },
        { en: 'Let’s grab a cup of coffee.', es: 'Vamos por una taza de café.' }
      ],
      quizzes: [
        { pregunta: '¿Cómo se dice "Me despierto"?', opciones: ['I wake up', 'I sleep', 'I walk'], correcta: 'I wake up' }
      ]
    },
    {
      categoria: 'Viajes ✈️',
      leccion: 'At the Airport',
      descripcion: 'Frases clave para sobrevivir en el aeropuerto.',
      tarjetas: [
        { en: 'Where is my gate?', es: '¿Dónde está mi puerta?' }
      ],
      quizzes: [
        { pregunta: '¿Qué significa "Gate"?', opciones: ['Puerta de embarque', 'Maleta', 'Avión'], correcta: 'Puerta de embarque' }
      ]
    }
  ],
  'Intermedio': [
    {
      categoria: 'Trabajo 💼',
      leccion: 'Business Meeting',
      descripcion: 'Expresiones para juntas laborales.',
      tarjetas: [
        { en: 'Let’s circle back later.', es: 'Volvamos a esto más tarde.' }
      ],
      quizzes: [
        { pregunta: '¿Qué es "circle back"?', opciones: ['Retomar más tarde', 'Dar vueltas', 'Cancelar'], correcta: 'Retomar más tarde' }
      ]
    }
  ],
  'Avanzado': [
    {
      categoria: 'Fluidez 🚀',
      leccion: 'Native Idioms',
      descripcion: 'Modismos avanzados.',
      tarjetas: [
        { en: 'Hit the ground running.', es: 'Empezar a toda marcha.' }
      ],
      quizzes: [
        { pregunta: '¿Qué significa "Hit the ground running"?', opciones: ['Empezar con fuerza', 'Caerse', 'Correr despacio'], correcta: 'Empezar con fuerza' }
      ]
    }
  ]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('inicio'); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('Básico');
  
  const [indiceLeccion, setIndiceLeccion] = useState(0);
  const [xp, setXp] = useState(65);
  const [streak, setStreak] = useState(1);
  const [quizRespondido, setQuizRespondido] = useState(false);
  const [quizMensaje, setQuizMensaje] = useState('');
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setIndiceLeccion(0);
    setQuizRespondido(false);
    setQuizMensaje('');
    setOpcionSeleccionada('');
    setChat([
      { role: 'bot', text: `Hi Sofia! Ready to level up your English? Let's practice! 🎙️` }
    ]);
  }, [selectedModule]);

  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.rate = 0.95;
      window.speechSynthesis.speak(msg);
    }
  };

  const verificarQuiz = (opcion, respuestaCorrecta) => {
    if (quizRespondido) return;
    setOpcionSeleccionada(opcion);
    setQuizRespondido(true);
    if (opcion === respuestaCorrecta) {
      setXp(p => p + 25);
      setQuizMensaje('🎉 ¡Excelente! (+25 XP)');
    } else {
      setQuizMensaje(`❌ Inténtalo de nuevo`);
    }
  };

  const datosActuales = CONTENIDO_EDUCATIVO[selectedModule][indiceLeccion] || CONTENIDO_EDUCATIVO[selectedModule][0];
  const quizActual = datosActuales.quizzes[0];

  return (
    <main style={{ minHeight: '100vh', background: '#f3f4f6', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', padding: '10px' }}>
      
      {/* TELÉFONO CONTENEDOR PREMIUM */}
      <div style={{ width: '100%', maxWidth: '412px', height: '92vh', background: '#ffffff', borderRadius: '40px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', border: '8px solid #ffffff' }}>
        
        {/* TOP BAR STATUS (ESTILO IOS) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 24px 4px 24px', alignItems: 'center', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>📶 🪫</div>
        </div>

        {/* HEADER FLOTANTE REFINADO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', alignItems: 'center', background: '#ffffff', zIndex: 10 }}>
          <div style={{ background: '#ffffff', padding: '6px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => setMenuOpen(true)}>
            🔥 <span style={{ color: '#ff4500' }}>{streak} DÍAS</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>🌐</span>
            <span style={{ fontWeight: '800', fontSize: '17px', color: '#1e293b', letterSpacing: '0.5px' }}>LINGUAGO PRO</span>
          </div>

          <div style={{ background: '#ffffff', padding: '6px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            ⭐ <span style={{ color: '#d97706' }}>{xp} XP</span>
          </div>
        </div>

        {/* MENÚ DE NIVELES FLOTANTE */}
        {menuOpen && (
          <>
            <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', zIndex: 100 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '270px', height: '100%', background: '#ffffff', zIndex: 101, padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '10px 0 30px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#0f172a', fontWeight: '800' }}>Selecciona tu Nivel</h3>
              {['Básico', 'Intermedio', 'Avanzado'].map(nivel => (
                <button key={nivel} onClick={() => { setSelectedModule(nivel); setMenuOpen(false); }} style={{ padding: '14px', borderRadius: '16px', border: 'none', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', background: selectedModule === nivel ? '#10b981' : '#f3f4f6', color: selectedModule === nivel ? '#ffffff' : '#4b5563', transition: 'all 0.2s' }}>
                  🎯 Nivel {nivel}
                </button>
              ))}
            </div>
          </>
        )}

        {/* CUERPO DE LA APP CON SCROLL RESTRINGIDO */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '15px 20px', background: '#ffffff', paddingBottom: '100px' }}>
          
          {activeTab === 'inicio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* COMPONENTE 1: BANNER DUOLINGO INTEGRADO */}
              <div style={{ background: 'linear-gradient(135deg, #58cc02 0%, #46a302 100%)', borderRadius: '24px', padding: '20px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', boxShadow: '0 8px 20px rgba(88,204,2,0.2)' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', opacity: 0.9 }}>Tu progreso</span>
                  <h2 style={{ margin: '2px 0 4px 0', fontSize: '22px', fontWeight: '800' }}>Nivel Básico A2+</h2>
                  <p style={{ margin: '0 0 14px 0', fontSize: '13px', opacity: 0.9, fontWeight: '500' }}>{datosActuales.categoria}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: '65%', height: '100%', background: '#ffffff', borderRadius: '10px' }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '700' }}>65%</span>
                  </div>
                  <div style={{ marginTop: '12px', fontSize: '12px', fontWeight: '700', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '10px', display: 'inline-block' }}>
                    ¡Sigue así! 💪
                  </div>
                </div>
                {/* AVATAR ILUSTRADO */}
                <div style={{ width: '85px', height: '85px', background: 'radial-gradient(circle, #ffe4e6 0%, #fecdd3 100%)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '42px', marginLeft: '10px', border: '3px solid #ffffff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                  👩‍🎧
                  <div style={{ position: 'absolute', top: '25px', right: '85px', background: '#ffffff', color: '#1e293b', padding: '4px 12px', borderRadius: '15px', fontSize: '11px', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
                    Hi! Sofia!👋
                  </div>
                </div>
              </div>

              {/* TÍTULO DE SECCIÓN */}
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1f2937', margin: '5px 0 -5px 0' }}>¿Qué quieres hacer hoy?</h3>

              {/* COMPONENTE 2: GRID CUATRO ACCIONES MÓDULO */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div onClick={() => setActiveTab('chat')} style={{ background: '#ecfdf5', border: '1px solid #d1fae5', borderRadius: '20px', padding: '16px 12px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
                  <div style={{ width: '40px', height: '40px', background: '#10b981', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 8px auto', fontSize: '18px' }}>💬</div>
                  <b style={{ display: 'block', color: '#065f46', fontSize: '14px', fontWeight: '800' }}>Hablar</b>
                  <span style={{ fontSize: '11px', color: '#047857', opacity: 0.8 }}>Practica conversaciones</span>
                </div>
                <div onClick={() => setActiveTab('chat')} style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: '20px', padding: '16px 12px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
                  <div style={{ width: '40px', height: '40px', background: '#0284c7', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 8px auto', fontSize: '18px' }}>🎧</div>
                  <b style={{ display: 'block', color: '#075985', fontSize: '14px', fontWeight: '800' }}>Escuchar</b>
                  <span style={{ fontSize: '11px', color: '#0369a1', opacity: 0.8 }}>Mejora tu comprensión</span>
                </div>
                <div onClick={() => setActiveTab('lecciones')} style={{ background: '#f5f3ff', border: '1px solid #ede9fe', borderRadius: '20px', padding: '16px 12px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
                  <div style={{ width: '40px', height: '40px', background: '#8b5cf6', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 8px auto', fontSize: '18px' }}>📖</div>
                  <b style={{ display: 'block', color: '#5b21b6', fontSize: '14px', fontWeight: '800' }}>Aprender</b>
                  <span style={{ fontSize: '11px', color: '#6d28d9', opacity: 0.8 }}>Lecciones de gramática</span>
                </div>
                <div onClick={() => setActiveTab('chat')} style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '20px', padding: '16px 12px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
                  <div style={{ width: '40px', height: '40px', background: '#f59e0b', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 8px auto', fontSize: '18px' }}>✏️</div>
                  <b style={{ display: 'block', color: '#92400e', fontSize: '14px', fontWeight: '800' }}>Escribir</b>
                  <span style={{ fontSize: '11px', color: '#b45309', opacity: 0.8 }}>Practica tu escritura</span>
                </div>
              </div>

              {/* COMPONENTE 3: TARJETA INTEGRADA "MÓDULO DE SESIONES" */}
              <div style={{ background: '#ffffff', border: '1px solid #f3f4f6', borderRadius: '28px', padding: '20px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: '#1f2937' }}>
                  ⭐ <span>Módulo de Sesiones</span>
                </div>
                
                <div>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: '18px', fontWeight: '800', color: '#111827' }}>{datosActuales.leccion}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{datosActuales.descripcion}</p>
                </div>

                {/* FILA ESTILO ELSA SPEAK */}
                <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '12px 14px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#b45309' }}>- {datosActuales.tarjetas[0].en}</span>
                    <button onClick={() => speak(datosActuales.tarjetas[0].en)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>🔊</button>
                  </div>
                  <span style={{ fontSize: '11px', color: '#d97706', fontWeight: '600' }}>(Elsa Speak-inspired) 🔊</span>
                </div>

                {/* MINI JUEGO ESTILO MEMRISE */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#334155' }}>How do you feel? <span style={{ fontWeight: '500', color: '#64748b' }}>(Memrise-inspired)</span></span>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {/* Avatares de opciones simulando fotos de nativos */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#bae6fd', fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>👩</div>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fed7aa', fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>🧑</div>
                    </div>
                    {/* Opciones de test rápido */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input type="radio" name="memrise" disabled /> Feel feel
                      </label>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input type="radio" name="memrise" disabled /> Chatfornatore
                      </label>
                    </div>
                  </div>
                </div>

                {/* BOTÓN FLOTANTE PRINCIPAL DE LA TARJETA */}
                <button onClick={() => setActiveTab('lecciones')} style={{ background: '#007399', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '16px', fontWeight: '800', fontSize: '14px', width: '100%', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,115,153,0.2)', marginTop: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                  Sesión Básico ⭐
                </button>
              </div>

              {/* BOTÓN DESCARGAR ESTILO ACCIÓN COMPLETA */}
              <div style={{ display: 'flex', justifyContent: 'center', margin: '5px 0' }}>
                <button onClick={() => alert('¡Contenido descargado para usar sin conexión!')} style={{ background: '#0a5c36', color: '#ffffff', border: 'none', padding: '12px 35px', borderRadius: '30px', fontWeight: '800', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(10,92,54,0.2)' }}>
                  Descargar ⬇
                </button>
              </div>

            </div>
          )}

          {activeTab === 'lecciones' && (
            /* ================= PESTAÑA: TRIVIA / QUIZ ================= */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h3 style={{ color: '#111827', fontWeight: '800', margin: 0, fontSize: '20px' }}>Trivia Diaria</h3>
              <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '24px', border: '1px solid #e5e7eb' }}>
                <p style={{ fontWeight: '700', fontSize: '16px', color: '#1f2937', marginBottom: '16px' }}>{quizActual.pregunta}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {quizActual.opciones.map((opc, i) => {
                    const esSeleccionado = opcionSeleccionada === opc;
                    return (
                      <button key={i} onClick={() => verificarQuiz(opc, quizActual.correcta)} style={{ padding: '14px 16px', borderRadius: '16px', border: '2px solid', borderColor: esSeleccionado ? '#10b981' : '#e5e7eb', background: esSeleccionado ? '#ecfdf5' : '#ffffff', textAlign: 'left', cursor: 'pointer', color: '#1f2937', fontWeight: '600', fontSize: '14px' }}>
                        {opc}
                      </button>
                    );
                  })}
                </div>
                {quizMensaje && <p style={{ marginTop: '16px', fontWeight: '700', textAlign: 'center', color: quizMensaje.includes('🎉') ? '#10b981' : '#ef4444' }}>{quizMensaje}</p>}
                {quizRespondido && (
                  <button onClick={() => { setQuizRespondido(false); setQuizMensaje(''); setOpcionSeleccionada(''); }} style={{ marginTop: '10px', width: '100%', padding: '12px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '14px', fontWeight: 'bold', cursor: 'pointer' }}>Reiniciar Quiz</button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            /* ================= PESTAÑA: CHAT BOT ================= */
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '80px' }}>
                {chat.map((msg, i) => (
                  <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <div style={{ background: msg.role === 'user' ? '#10b981' : '#f3f4f6', color: msg.role === 'user' ? '#ffffff' : '#111827', padding: '12px 16px', borderRadius: '18px', fontSize: '14px', fontWeight: '500' }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div style={{ position: 'absolute', bottom: '80px', left: '15px', right: '15px', display: 'flex', gap: '8px', background: '#ffffff', padding: '6px 0' }}>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && setChat([...chat, { role: 'user', text: input }])} placeholder="Escribe tu mensaje en inglés..." style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid #d1d5db', outline: 'none' }} />
                <button onClick={() => { setChat([...chat, { role: 'user', text: input }]); setInput(''); }} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0 16px', borderRadius: '24px', fontWeight: 'bold', cursor: 'pointer' }}>Enviar</button>
              </div>
            </div>
          )}

          {activeTab === 'progreso' && (
            /* ================= PESTAÑA: ESTADÍSTICAS ================= */
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h3 style={{ fontWeight: '800', color: '#111827' }}>Estadísticas de Racha</h3>
              <p style={{ color: '#6b7280' }}>¡Vas por excelente camino, Sofía!</p>
            </div>
          )}

        </div>

        {/* MENÚ DE NAVEGACIÓN INFERIOR DE ALTA FIDELIDAD */}
        <div style={{ background: '#ffffff', borderTop: '1px solid #f3f4f6', display: 'flex', padding: '10px 0 16px 0', justifyContent: 'space-around', position: 'absolute', bottom: 0, width: '100%', zIndex: 90 }}>
          {[
            { id: 'inicio', label: 'Inicio', icon: '🏠' },
            { id: 'lecciones', label: 'Lecciones', icon: '📖' },
            { id: 'chat', label: 'Conversaciones', icon: '💬' },
            { id: 'progreso', label: 'Progreso', icon: '📊' },
            { id: 'perfil', label: 'Perfil', icon: '👤' }
          ].map(tab => (
            <button key={tab.id} onClick={() => tab.id !== 'perfil' && setActiveTab(tab.id)} style={{ background: 'none', border: 'none', color: activeTab === tab.id ? '#1d4ed8' : '#9ca3af', fontWeight: '700', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '11px', cursor: 'pointer', flex: 1 }}>
              <span style={{ fontSize: '22px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

      </div>
    </main>
  );
}
