'use client';
import React, { useState, useEffect } from 'react';

// BASE DE DATOS EXTENSA - NIVEL A1 (PRINCIPIANTE DESDE CERO)
const CONTENIDO_A1 = [
  {
    categoria: 'Saludos y Cortesía 👋',
    leccion: 'First Contact (Primer Contacto)',
    descripcion: 'Aprende las frases más básicas para saludar y despedirte de forma correcta.',
    vocabulario: [
      { en: 'Hello, how are you?', es: 'Hola, ¿cómo estás?' },
      { en: 'Good morning', es: 'Buenos días' },
      { en: 'Nice to meet you', es: 'Gusto en conocerte' },
      { en: 'Thank you very much', es: 'Muchas gracias' },
      { en: 'Goodbye and take care', es: 'Adiós y cuídate' }
    ],
    quiz: {
      pregunta: '¿Cómo le dices "Buenos días" a alguien por la mañana?',
      opciones: ['Good morning', 'Good night', 'Hello, how are you?'],
      correcta: 'Good morning'
    }
  },
  {
    categoria: 'Números Básicos (1-10) 🔢',
    leccion: 'Counting things (Contando cosas)',
    descripcion: 'Domina los primeros diez números en inglés, esenciales para precios y cantidades.',
    vocabulario: [
      { en: 'One, Two, Three', es: 'Uno, Dos, Tres' },
      { en: 'Four, Five, Six', es: 'Cuatro, Cinco, Seis' },
      { en: 'Seven, Eight, Nine, Ten', es: 'Siete, Ocho, Nueve, Diez' }
    ],
    quiz: {
      pregunta: '¿Cómo se escribe el número "Cuatro" en inglés?',
      opciones: ['Three', 'Four', 'Five'],
      correcta: 'Four'
    }
  },
  {
    categoria: 'Los Colores 🎨',
    leccion: 'Describing Colors (Describiendo colores)',
    descripcion: 'Aprende a identificar y nombrar los colores principales a tu alrededor.',
    vocabulario: [
      { en: 'The sky is Blue.', es: 'El cielo es Azul.' },
      { en: 'The apple is Red.', es: 'La manzana es Roja.' },
      { en: 'The grass is Green.', es: 'La hierba es Verde.' },
      { en: 'The sun is Yellow.', es: 'El sol es Amarillo.' }
    ],
    quiz: {
      pregunta: '¿Qué color significa "Green"?',
      opciones: ['Azul', 'Rojo', 'Verde'],
      correcta: 'Verde'
    }
  },
  {
    categoria: 'Objetos Comunes 🎒',
    leccion: 'In the Classroom (En el salón de clases)',
    descripcion: 'Identifica los objetos cotidianos que utilizas para estudiar o trabajar.',
    vocabulario: [
      { en: 'This is a book.', es: 'Esto es un libro.' },
      { en: 'I need a notebook.', es: 'Necesito un cuaderno.' },
      { en: 'Where is my pen?', es: '¿Dónde está mi bolígrafo?' }
    ],
    quiz: {
      pregunta: '¿Qué objeto es un "book"?',
      opciones: ['Un libro', 'Un bolígrafo', 'Un cuaderno'],
      correcta: 'Un libro'
    }
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('inicio'); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [indiceModulo, setIndiceModulo] = useState(0);
  
  // Progreso Real que inicia desde cero
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  
  // Estados de la Caja Interactiva
  const [verTraduccion, setVerTraduccion] = useState({});
  const [quizRespondido, setQuizRespondido] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [mensajeFeedback, setMensajeFeedback] = useState('');

  // Reiniciar estados interactivos al cambiar de lección
  useEffect(() => {
    setQuizRespondido(false);
    setOpcionSeleccionada('');
    setMensajeFeedback('');
    setVerTraduccion({});
  }, [indiceModulo]);

  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.rate = 0.9; // Un poco más pausado para nivel principiante
      window.speechSynthesis.speak(msg);
    }
  };

  const alternarTraduccion = (index) => {
    setVerTraduccion(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const evaluarRespuesta = (opcion, correcta) => {
    if (quizRespondido) return;
    setOpcionSeleccionada(opcion);
    setQuizRespondido(true);
    
    if (opcion === correcta) {
      setXp(prev => prev + 15);
      if (streak === 0) setStreak(1);
      setMensajeFeedback('🎉 ¡Excelente! Respuesta correcta. ¡Has ganado +15 XP!');
    } else {
      setMensajeFeedback(`❌ Incorrecto. La respuesta correcta es: "${correcta}". ¡Sigue intentando!`);
    }
  };

  const siguienteModulo = () => {
    setIndiceModulo((prev) => (prev + 1) % CONTENIDO_A1.length);
  };

  const datosActuales = CONTENIDO_A1[indiceModulo];

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'system-ui, sans-serif', padding: '15px' }}>
      
      {/* INTERFAZ PRINCIPAL DE LA APLICACIÓN */}
      <div style={{ width: '100%', maxWidth: '420px', height: '88vh', background: '#ffffff', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', border: '1px solid #e2e8f0' }}>
        
        {/* ENCABEZADO REAL DE LA APP */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', alignItems: 'center', background: '#ffffff', borderBottom: '1px solid #f1f5f9', zIndex: 10 }}>
          <button onClick={() => setMenuOpen(true)} style={{ background: '#f1f5f9', border: 'none', padding: '8px 14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', color: '#334155' }}>
            ☰ Módulos
          </button>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontWeight: '800', fontSize: '16px', color: '#0f172a' }}>LINGUAGO PRO</span>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>NIVEL A1 (PRINCIPIANTE)</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', fontSize: '13px', fontWeight: '700' }}>
            <span style={{ background: '#fff7ed', color: '#ea580c', padding: '6px 10px', borderRadius: '10px' }}>🔥 {streak}d</span>
            <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '6px 10px', borderRadius: '10px' }}>⭐ {xp} XP</span>
          </div>
        </div>

        {/* SELECTOR LATERAL DE CONTENIDOS */}
        {menuOpen && (
          <>
            <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(2px)', zIndex: 100 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '280px', height: '100%', background: '#ffffff', zIndex: 101, padding: '25px 20px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '15px 0 30px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Contenido A1</h3>
                <button onClick={() => setMenuOpen(false)} style={{ border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
              </div>
              {CONTENIDO_A1.map((item, idx) => (
                <button key={idx} onClick={() => { setIndiceModulo(idx); setMenuOpen(false); }} style={{ padding: '12px', borderRadius: '12px', border: 'none', textAlign: 'left', fontWeight: '600', fontSize: '13px', cursor: 'pointer', background: indiceModulo === idx ? '#10b981' : '#f8fafc', color: indiceModulo === idx ? '#ffffff' : '#475569', transition: '0.2s' }}>
                  {idx + 1}. {item.categoria}
                </button>
              ))}
            </div>
          </>
        )}

        {/* CONTENEDOR DE CONTENIDO INTERACTIVO */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#ffffff', paddingBottom: '90px' }}>
          
          {activeTab === 'inicio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* INDICADOR GENERAL DE TU UBICACIÓN ACTUAL */}
              <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '20px', padding: '18px', color: '#ffffff', boxShadow: '0 8px 16px rgba(16,185,129,0.1)' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '8px', textTransform: 'uppercase' }}>Lección Actual</span>
                <h2 style={{ margin: '6px 0 2px 0', fontSize: '20px', fontWeight: '800' }}>{datosActuales.categoria}</h2>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>{datosActuales.descripcion}</p>
              </div>

              {/* ACCIONES DE INTERACCIÓN RÁPIDA */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button onClick={() => { speak(datosActuales.leccion); alert("Escucha con atención la pronunciación de la lección."); }} style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: '14px', padding: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', color: '#0369a1', fontSize: '13px' }}>
                  🔊 Escuchar Título
                </button>
                <button onClick={siguienteModulo} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', color: '#475569', fontSize: '13px' }}>
                  Siguiente Tema ➡️
                </button>
              </div>

              {/* CAJA INTERACTIVA PRINCIPAL: CAJA DE APRENDIZAJE */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>📖 Vocabulario de Práctica:</h3>
                  <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b' }}>Presiona el parlante para oír la pronunciación o el ojo para ver qué significa.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {datosActuales.vocabulario.map((item, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '14px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1, paddingRight: '10px' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{item.en}</div>
                        {verTraduccion[idx] ? (
                          <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px', fontWeight: '600' }}>{item.es}</div>
                        ) : (
                          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', fontStyle: 'italic' }}>Traducción oculta</div>
                        )}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => alternarTraduccion(idx)} style={{ background: '#ffffff', border: '1px solid #e2e8f0', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }} title="Mostrar traducción">
                          👁️
                        </button>
                        <button onClick={() => speak(item.en)} style={{ background: '#ffffff', border: '1px solid #e2e8f0', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }} title="Escuchar">
                          🔊
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CAJA INTERACTIVA DE EVALUACIÓN (QUIZ) */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '20px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#4f46e5', textTransform: 'uppercase' }}>🧩 Ponte a prueba (Quiz)</span>
                  <p style={{ margin: '4px 0 0 0', fontWeight: '700', fontSize: '14px', color: '#1e293b', lineHeight: '1.4' }}>{datosActuales.quiz.pregunta}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {datosActuales.quiz.opciones.map((opc, i) => {
                    const fueSeleccionada = opcionSeleccionada === opc;
                    return (
                      <button key={i} onClick={() => evaluarRespuesta(opc, datosActuales.quiz.correcta)} style={{ padding: '12px 14px', borderRadius: '12px', border: '2px solid', borderColor: fueSeleccionada ? (opc === datosActuales.quiz.correcta ? '#10b981' : '#ef4444') : '#e2e8f0', background: fueSeleccionada ? (opc === datosActuales.quiz.correcta ? '#ecfdf5' : '#fef2f2') : '#ffffff', textAlign: 'left', cursor: 'pointer', color: '#334155', fontWeight: '600', fontSize: '13px', transition: '0.15s' }}>
                        {opc}
                      </button>
                    );
                  })}
                </div>

                {mensajeFeedback && (
                  <div style={{ marginTop: '12px', padding: '10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', textAlign: 'center', background: mensajeFeedback.includes('🎉') ? '#d1fae5' : '#fee2e2', color: mensajeFeedback.includes('🎉') ? '#065f46' : '#991b1b' }}>
                    {mensajeFeedback}
                  </div>
                )}
              </div>

            </div>
          )}

          {activeTab === 'chat' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '40px' }}>💬</div>
              <h3 style={{ margin: 0, fontWeight: '800' }}>Módulo de Chat en Vivo</h3>
              <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>Aquí podrás chatear con la Inteligencia Artificial para poner en práctica las palabras que vas aprendiendo en tus módulos.</p>
              <button onClick={() => setActiveTab('inicio')} style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Ir a Estudiar Vocabulario</button>
            </div>
          )}

          {activeTab === 'progreso' && (
            <div style={{ padding: '10px 0', textAlign: 'center' }}>
              <h3 style={{ fontWeight: '800', color: '#0f172a' }}>Tu panel de Control 📊</h3>
              <p style={{ fontSize: '13px', color: '#64748b' }}>Aquí verás lo que acumulas interaccionando con las cajas de preguntas.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '15px' }}>
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '20px' }}>⭐</div>
                  <h4 style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: '800' }}>{xp}</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Puntos de Experiencia</p>
                </div>
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '20px' }}>🔥</div>
                  <h4 style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: '800' }}>{streak}</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Días Practicando</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* NAVEGACIÓN INFERIOR REAL */}
        <div style={{ background: '#ffffff', borderTop: '1px solid #f1f5f9', display: 'flex', padding: '10px 0 14px 0', justifyContent: 'space-around', position: 'absolute', bottom: 0, width: '100%', zIndex: 90 }}>
          {[
            { id: 'inicio', label: 'Estudiar', icon: '📖' },
            { id: 'chat', label: 'Chat Práctica', icon: '💬' },
            { id: 'progreso', label: 'Mi Progreso', icon: '📊' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: 'none', border: 'none', color: activeTab === tab.id ? '#10b981' : '#94a3b8', fontWeight: '700', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '11px', cursor: 'pointer', flex: 1 }}>
              <span style={{ fontSize: '20px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

      </div>
    </main>
  );
}
