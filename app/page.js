'use client';
import React, { useState, useEffect } from 'react';

// BASE DE DATOS MASIVA - TODOS LOS NIVELES (Básico, Intermedio, Avanzado)
const DATABASE = {
  'Básico (A1)': [
    {
      categoria: 'Saludos y Cortesía 👋',
      leccion: 'The Basics (Lo Básico)',
      descripcion: 'Frases esenciales para iniciar cualquier conversación desde cero.',
      vocabulario: [
        { en: 'Hello, how are you?', es: 'Hola, ¿cómo estás?' },
        { en: 'Nice to meet you', es: 'Gusto en conocerte' },
        { en: 'Please and Thank you', es: 'Por favor y Gracias' }
      ],
      quiz: {
        pregunta: '¿Cómo saludas de forma educada en inglés?',
        opciones: ['Hello, how are you?', 'Goodbye', 'Yellow'],
        correcta: 'Hello, how are you?'
      }
    },
    {
      categoria: 'Números y Colores 🔢',
      leccion: 'Daily Objects (Objetos diarios)',
      descripcion: 'Identifica cantidades y colores básicos a tu alrededor.',
      vocabulario: [
        { en: 'One red apple', es: 'Una manzana roja' },
        { en: 'Two blue books', es: 'Dos libros azules' }
      ],
      quiz: { pregunta: '¿Qué significa "Red"?', opciones: ['Rojo', 'Azul', 'Verde'], correcta: 'Rojo' }
    }
  ],
  'Intermedio (B1)': [
    {
      categoria: 'Trabajo y Negocios 💼',
      leccion: 'In the Office (En la oficina)',
      descripcion: 'Vocabulario para juntas y correos electrónicos profesionales.',
      vocabulario: [
        { en: 'Let’s schedule a meeting', es: 'Programemos una reunión' },
        { en: 'Can you send the report?', es: '¿Puedes enviar el informe?' }
      ],
      quiz: {
        pregunta: '¿Cómo pides un informe por correo?',
        opciones: ['Send the report', 'Go to sleep', 'I want coffee'],
        correcta: 'Send the report'
      }
    }
  ],
  'Avanzado (C1)': [
    {
      categoria: 'Fluidez y Modismos 🚀',
      leccion: 'Native Expressions (Expresiones nativas)',
      descripcion: 'Frases que usan los nativos y que no se enseñan en libros básicos.',
      vocabulario: [
        { en: 'Hit the ground running', es: 'Empezar algo con mucha energía' },
        { en: 'Call it a day', es: 'Terminar la jornada laboral' }
      ],
      quiz: {
        pregunta: '¿Qué significa "Call it a day"?',
        opciones: ['Terminar por hoy', 'Llamar a alguien', 'Iniciar un nuevo día'],
        correcta: 'Terminar por hoy'
      }
    }
  ]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('inicio'); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('Básico (A1)');
  const [indiceModulo, setIndiceModulo] = useState(0);
  
  // Progreso real
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  
  // Interactividad
  const [verTraduccion, setVerTraduccion] = useState({});
  const [quizRespondido, setQuizRespondido] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [feedback, setFeedback] = useState('');

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
      msg.rate = 0.9;
      window.speechSynthesis.speak(msg);
    }
  };

  const evaluar = (opc, correcta) => {
    if (quizRespondido) return;
    setOpcionSeleccionada(opc);
    setQuizRespondido(true);
    if (opc === correcta) {
      setXp(p => p + 20);
      setFeedback('🎉 ¡Excelente! +20 XP');
    } else {
      setFeedback(`❌ Incorrecto. Era: "${correcta}"`);
    }
  };

  const currentData = DATABASE[selectedLevel][indiceModulo] || DATABASE[selectedLevel][0];

  return (
    <main style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      
      {/* CONTENEDOR DE LA APP (Limpio, sin marcos de celular) */}
      <div style={{ width: '100%', maxWidth: '450px', height: '90vh', background: '#ffffff', borderRadius: '30px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', border: '1px solid #e5e7eb' }}>
        
        {/* HEADER DE LA APLICACIÓN */}
        <div style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff' }}>
          <button onClick={() => setMenuOpen(true)} style={{ background: '#f3f4f6', border: 'none', padding: '10px 15px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', color: '#1f2937' }}>
            ☰ Nivel
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: '800', fontSize: '18px', color: '#111827' }}>LINGUAGO PRO</div>
            <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>{selectedLevel}</div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ background: '#fff7ed', color: '#ea580c', padding: '6px 10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px' }}>🔥 {streak}d</span>
            <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '6px 10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px' }}>⭐ {xp}</span>
          </div>
        </div>

        {/* SELECTOR DE MÓDULOS (SIDEBAR) */}
        {menuOpen && (
          <>
            <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(3px)', zIndex: 100 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '280px', height: '100%', background: '#ffffff', zIndex: 101, padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '15px', boxShadow: '10px 0 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Selecciona tu Nivel:</h3>
              {Object.keys(DATABASE).map(level => (
                <button key={level} onClick={() => { setSelectedLevel(level); setMenuOpen(false); }} style={{ padding: '15px', borderRadius: '15px', border: 'none', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', background: selectedLevel === level ? '#10b981' : '#f9fafb', color: selectedLevel === level ? '#ffffff' : '#4b5563' }}>
                  ⚡ {level}
                </button>
              ))}
            </div>
          </>
        )}

        {/* CUERPO INTERACTIVO */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', paddingBottom: '100px' }}>
          
          {activeTab === 'inicio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* BANNER DE PROGRESO CON LA MUÑEQUITA */}
              <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '25px', padding: '25px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 20px rgba(16,185,129,0.15)' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '10px' }}>MI PROGRESO</span>
                  <h2 style={{ margin: '8px 0 5px 0', fontSize: '22px' }}>{currentData.categoria}</h2>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', marginTop: '10px', overflow: 'hidden' }}>
                    <div style={{ width: xp > 100 ? '100%' : `${xp}%`, height: '100%', background: '#fbbf24' }} />
                  </div>
                </div>
                <div style={{ width: '90px', height: '90px', background: '#ffe4e6', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '45px', border: '4px solid #ffffff' }}>👩‍🎧</div>
              </div>

              {/* CONTENIDO DE LA LECCIÓN (CAJA INTERACTIVA) */}
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '25px', padding: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#111827', borderBottom: '2px solid #f3f4f6', paddingBottom: '10px' }}>📖 Práctica de Vocabulario</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentData.vocabulario.map((item, idx) => (
                    <div key={idx} style={{ background: '#f9fafb', padding: '15px', borderRadius: '15px', border: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#1f2937' }}>{item.en}</div>
                        {verTraduccion[idx] && <div style={{ fontSize: '13px', color: '#10b981', marginTop: '3px' }}>{item.es}</div>}
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => setVerTraduccion({...verTraduccion, [idx]: !verTraduccion[idx]})} style={{ background: '#ffffff', border: '1px solid #d1d5db', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>👁️</button>
                        <button onClick={() => speak(item.en)} style={{ background: '#ffffff', border: '1px solid #d1d5db', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>🔊</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUIZ DINÁMICO */}
              <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '25px', padding: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#4f46e5' }}>RETO RÁPIDO</span>
                <p style={{ margin: '5px 0 15px 0', fontWeight: 'bold', color: '#1f2937' }}>{currentData.quiz.pregunta}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentData.quiz.opciones.map((opc, i) => (
                    <button key={i} onClick={() => evaluar(opc, currentData.quiz.correcta)} style={{ padding: '14px', borderRadius: '15px', border: '2px solid', borderColor: opcionSeleccionada === opc ? (opc === currentData.quiz.correcta ? '#10b981' : '#ef4444') : '#e5e7eb', background: '#ffffff', textAlign: 'left', fontWeight: 'bold', color: '#4b5563', cursor: 'pointer' }}>
                      {opc}
                    </button>
                  ))}
                </div>
                {feedback && <div style={{ marginTop: '15px', textAlign: 'center', fontWeight: 'bold', color: feedback.includes('🎉') ? '#059669' : '#dc2626' }}>{feedback}</div>}
              </div>

            </div>
          )}

          {activeTab === 'chat' && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '50px', marginBottom: '15px' }}>💬</div>
              <h3 style={{ fontWeight: '800' }}>Chat de Inteligencia Artificial</h3>
              <p style={{ color: '#6b7280' }}>Próximamente: Podrás hablar por voz directamente con tu tutora para corregir tu pronunciación.</p>
              <button onClick={() => setActiveTab('inicio')} style={{ background: '#10b981', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>Volver a Estudiar</button>
            </div>
          )}

        </div>

        {/* NAVEGACIÓN INFERIOR (Duolingo Style) */}
        <div style={{ position: 'absolute', bottom: 0, width: '100%', background: '#ffffff', borderTop: '1px solid #f3f4f6', display: 'flex', padding: '15px 0 25px 0', justifyContent: 'space-around' }}>
          <button onClick={() => setActiveTab('inicio')} style={{ background: 'none', border: 'none', color: activeTab === 'inicio' ? '#10b981' : '#9ca3af', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '20px' }}>📖</span> Lecciones
          </button>
          <button onClick={() => setActiveTab('chat')} style={{ background: 'none', border: 'none', color: activeTab === 'chat' ? '#10b981' : '#9ca3af', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '20px' }}>💬</span> Chat IA
          </button>
          <button onClick={() => setActiveTab('inicio')} style={{ background: 'none', border: 'none', color: '#9ca3af', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '20px' }}>👤</span> Perfil
          </button>
        </div>

      </div>
    </main>
  );
}
