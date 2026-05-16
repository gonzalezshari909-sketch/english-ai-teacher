'use client';
import React, { useState, useEffect, useRef } from 'react';

// BASE DE DATOS PROFESIONAL BASADA EN EL MARCO COMÚN EUROPEO (MCER)
const PLAN_ESTUDIOS = {
  'Básico (A1)': [
    {
      id: 1,
      categoria: 'Módulo 1: Saludos y Presentaciones 👋',
      leccion: 'Meeting people for the first time',
      descripcion: 'Aprende las frases esenciales para dar una buena primera impresión.',
      vocabulario: [
        { en: 'Nice to meet you, my name is John.', es: 'Gusto en conocerte, mi nombre es John.' },
        { en: 'Where are you from?', es: '¿De dónde eres?' },
        { en: 'Have a wonderful day.', es: 'Ten un día maravilloso.' }
      ],
      quiz: {
        pregunta: '¿Cuál es la forma correcta de decir "Gusto en conocerte"?',
        opciones: ['Nice to meet you', 'Goodbye', 'Thank you'],
        correcta: 'Nice to meet you'
      }
    },
    {
      id: 2,
      categoria: 'Módulo 2: Números y Cantidades 🔢',
      leccion: 'Counting Things',
      descripcion: 'Domina los números cardinales, precios y expresiones de cantidad cotidiana.',
      vocabulario: [
        { en: 'How much does it cost?', es: '¿Cuánto cuesta esto?' },
        { en: 'There are twelve apples in the box.', es: 'Hay doce manzanas en la caja.' }
      ],
      quiz: {
        pregunta: '¿Cómo se dice "¿Cuánto cuesta esto?"?',
        opciones: ['How much does it cost?', 'How old are you?', 'Where is it?'],
        correcta: 'How much does it cost?'
      }
    },
    {
      id: 3,
      categoria: 'Módulo 3: Entorno y Rutinas 🏠',
      leccion: 'Daily Habits',
      descripcion: 'Expresa las actividades frecuentes que realizas por la mañana y la noche.',
      vocabulario: [
        { en: 'I wake up at six o’clock.', es: 'Me despierto a las seis en punto.' },
        { en: 'She goes to work by train.', es: 'Ella va al trabajo en tren.' }
      ],
      quiz: {
        pregunta: 'Significado de "I wake up":',
        opciones: ['Me despierto', 'Me baño', 'Desayuno'],
        correcta: 'Me despierto'
      }
    },
    { id: 4, categoria: 'Módulo 4: Familia y Personas 👨‍👩‍👧', leccion: 'Describing Family', descripcion: 'Miembros del hogar y adjetivos descriptivos simples.', vocabulario: [{ en: 'This is my older brother.', es: 'Este es mi hermano mayor.' }], quiz: { pregunta: '¿Qué es "brother"?', opciones: ['Hermano', 'Tío', 'Primo'], correcta: 'Hermano' } },
    { id: 5, categoria: 'Módulo 5: Alimentos y Bebidas 🍎', leccion: 'At the Restaurant', descripcion: 'Ordenar alimentos, comidas del día y gustos básicos.', vocabulario: [{ en: 'I would like to order a chicken salad.', es: 'Me gustaría ordenar una ensalada de pollo.' }], quiz: { pregunta: '¿Qué significa "salad"?', opciones: ['Ensalada', 'Sopa', 'Carne'], correcta: 'Ensalada' } },
    { id: 6, categoria: 'Módulo 6: El Clima y Tiempo ☀️', leccion: 'Weather Conditions', descripcion: 'Estados del tiempo y los meses del año.', vocabulario: [{ en: 'It is rainy and cold today.', es: 'Está lluvioso y frío hoy.' }], quiz: { pregunta: '¿Qué es "rainy"?', opciones: ['Lluvioso', 'Soleado', 'Nublado'], correcta: 'Lluvioso' } }
  ],
  'Intermedio (B1)': [
    {
      id: 1,
      categoria: 'Módulo 1: Trabajo y Profesiones 💼',
      leccion: 'In the Office & Administration',
      descripcion: 'Vocabulario para juntas, reportes y tareas organizacionales.',
      vocabulario: [
        { en: 'I am in charge of document control.', es: 'Estoy a cargo del control documental.' },
        { en: 'We need to meet the deadline.', es: 'Necesitamos cumplir con la fecha límite.' }
      ],
      quiz: {
        pregunta: '¿Qué significa "meet the deadline"?',
        opciones: ['Cumplir con la fecha límite', 'Cancelar la junta', 'Entregar tarde'],
        correcta: 'Cumplir con la fecha límite'
      }
    },
    {
      id: 2,
      categoria: 'Módulo 2: Viajes y Hoteles ✈️',
      leccion: 'Booking and Airports',
      descripcion: 'Cómo desenvolverse en aeropuertos, aduanas y pedir indicaciones.',
      vocabulario: [
        { en: 'Where is the boarding gate for this flight?', es: '¿Dónde está la puerta de embarque para este vuelo?' }
      ],
      quiz: {
        pregunta: '¿Qué es "boarding gate"?',
        opciones: ['Puerta de embarque', 'Sala de espera', 'Recepción'],
        correcta: 'Puerta de embarque'
      }
    },
    { id: 3, categoria: 'Módulo 3: Salud y Bienestar 🏥', leccion: 'At the Doctor', descripcion: 'Explicar síntomas médicos y consejos de salud.', vocabulario: [{ en: 'I have a severe headache.', es: 'Tengo un dolor de cabeza severo.' }], quiz: { pregunta: '¿Qué es "headache"?', opciones: ['Dolor de cabeza', 'Fiebre', 'Tos'], correcta: 'Dolor de cabeza' } },
    { id: 4, categoria: 'Módulo 4: Experiencias Pasadas ⏳', leccion: 'Life Milestones', descripcion: 'Uso correcto del pasado simple y presente perfecto.', vocabulario: [{ en: 'I have worked here for three years.', es: 'He trabajado aquí durante tres años.' }], quiz: { pregunta: 'Pasado de "work":', opciones: ['Worked', 'Working', 'Works'], correcta: 'Worked' } },
    { id: 5, categoria: 'Módulo 5: Planes Futuros 🔮', leccion: 'Making Predictions', descripcion: 'Diferencia entre "Going to" y "Will" para proyectos.', vocabulario: [{ en: 'I am going to start a new project next month.', es: 'Voy a empezar un nuevo proyecto el próximo mes.' }], quiz: { pregunta: 'Para planes decididos se usa:', opciones: ['Going to', 'Will', 'Past'], correcta: 'Going to' } },
    { id: 6, categoria: 'Módulo 6: Tecnología y Medios 💻', leccion: 'Digital World', descripcion: 'Términos de computación, redes y comunicación moderna.', vocabulario: [{ en: 'Please download the attached file.', es: 'Por favor descarga el archivo adjunto.' }], quiz: { pregunta: '¿Qué significa "download"?', opciones: ['Descargar', 'Subir', 'Borrar'], correcta: 'Descargar' } }
  ],
  'Avanzado (C1)': [
    {
      id: 1,
      categoria: 'Módulo 1: Modismos y Fluidez 🚀',
      leccion: 'Native Idioms',
      descripcion: 'Expresiones idiomáticas complejas utilizadas en entornos corporativos.',
      vocabulario: [
        { en: 'Let’s call it a day.', es: 'Demos la jornada por terminada (dejar de trabajar).' },
        { en: 'It’s a piece of cake.', es: 'Es pan comido (muy fácil).' }
      ],
      quiz: {
        pregunta: 'Si algo es sumamente fácil, los nativos dicen:',
        opciones: ['It’s a piece of cake', 'Bite the bullet', 'Break a leg'],
        correcta: 'It’s a piece of cake'
      }
    },
    {
      id: 2,
      categoria: 'Módulo 2: Negociación y Debates 🗣️',
      leccion: 'Formal Disagreement',
      descripcion: 'Defender puntos de vista abstractos con diplomacia y propiedad.',
      vocabulario: [
        { en: 'I respectfully take a different stance on this matter.', es: 'Respetuosamente tomo una postura diferente sobre este asunto.' }
      ],
      quiz: {
        pregunta: '¿Cuál frase expresa desacuerdo de forma muy educada?',
        opciones: ['I respectfully take a different stance', 'You are wrong', 'I don’t care'],
        correcta: 'I respectfully take a different stance'
      }
    },
    { id: 3, categoria: 'Módulo 3: Análisis y Estadísticas 📈', leccion: 'Describing Trends', descripcion: 'Describir fluctuaciones financieras y de rendimiento de proyectos.', vocabulario: [{ en: 'The production rate peaked last quarter.', es: 'La tasa de producción alcanzó su punto máximo el trimestre pasado.' }], quiz: { pregunta: '¿Qué significa "peaked"?', opciones: ['Alcanzó el punto máximo', 'Cayó', 'Se mantuvo estable'], correcta: 'Alcanzó el punto máximo' } },
    { id: 4, categoria: 'Módulo 4: Literatura y Ensayo 📚', leccion: 'Advanced Connectors', descripcion: 'Conectores complejos como "Furthermore", "Nonetheless" y "Moreover".', vocabulario: [{ en: 'Furthermore, the data supports our hypothesis.', es: 'Además, los datos respaldan nuestra hipótesis.' }], quiz: { pregunta: 'Sinónimo de "Furthermore":', opciones: ['Moreover', 'But', 'So'], correcta: 'Moreover' } },
    { id: 5, categoria: 'Módulo 5: Hipótesis Complejas 🧬', leccion: 'Third Conditional', descripcion: 'Estructuras sobre situaciones hipotéticas del pasado y arrepentimientos.', vocabulario: [{ en: 'If I had studied more, I would have passed.', es: 'Si hubiera estudiado más, habría aprobado.' }], quiz: { pregunta: 'Estructura condicional del pasado:', opciones: ['Third Conditional', 'First Conditional', 'Zero'], correcta: 'Third Conditional' } },
    { id: 6, categoria: 'Módulo 6: Liderazgo y Gestión 👑', leccion: 'Strategic Thinking', descripcion: 'Vocabulario para persuadir, motivar e influir en equipos internacionales.', vocabulario: [{ en: 'We need to foster a collaborative environment.', es: 'Necesitamos fomentar un entorno colaborativo.' }], quiz: { pregunta: '¿Qué significa "foster"?', opciones: ['Fomentar / Promover', 'Destruir', 'Evitar'], correcta: 'Fomentar / Promover' } }
  ]
};

const RESPUESTAS_BOT = [
  "That sounds excellent! Keep pushing your limits. 🌟",
  "Great sentence structure! Let's practice more listening now. ✍️",
  "I completely agree with you. Your pronunciation is getting much better!",
  "Perfect! Can you use that exact phrase in an interview scenario?"
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('inicio'); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('Básico (A1)');
  const [indiceModulo, setIndiceModulo] = useState(0);
  
  // Progreso Visual Reincorporado
  const [xp, setXp] = useState(65);
  const [streak, setStreak] = useState(1);
  const [porcentajeProgreso, setPorcentajeProgreso] = useState(35);
  
  // Estados Dinámicos de Lección
  const [verTraduccion, setVerTraduccion] = useState({});
  const [quizRespondido, setQuizRespondido] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [feedback, setFeedback] = useState('');

  // Estados Completos de Chat Bot (Escritura, Audio y Voz)
  const [mensajes, setMensajes] = useState([
    { sender: 'bot', text: "Hi! I am your AI personal coach. Let's level up your Speaking, Listening, and Writing skills right now. Type or speak to me!" }
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
    // Ajustar barra de progreso visual de acuerdo al nivel elegido
    if (selectedLevel === 'Básico (A1)') setPorcentajeProgreso(35);
    else if (selectedLevel === 'Intermedio (B1)') setPorcentajeProgreso(60);
    else setPorcentajeProgreso(85);
  }, [selectedLevel]);

  useEffect(() => {
    setQuizRespondido(false);
    setOpcionSeleccionada('');
    setFeedback('');
    setVerTraduccion({});
  }, [indiceModulo]);

  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.rate = 0.85;
      window.speechSynthesis.speak(msg);
    }
  };

  const enviarMensajeChat = (textoManual) => {
    const textoAEnviar = textoManual || inputChat;
    if (!textoAEnviar.trim()) return;

    const nuevosMensajes = [...mensajes, { sender: 'user', text: textoAEnviar }];
    setMensajes(nuevosMensajes);
    setInputChat('');
    setXp(p => p + 10);

    setTimeout(() => {
      const respuestaAleatoria = RESPUESTAS_BOT[Math.floor(Math.random() * RESPUESTAS_BOT.length)];
      setMensajes([...nuevosMensajes, { sender: 'bot', text: respuestaAleatoria }]);
    }, 1000);
  };

  const activarMicrofono = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Tu navegador no soporta el reconocimiento de voz. Usa Google Chrome.");
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.onstart = () => setEscuchandoVoz(true);
      recognition.onend = () => setEscuchandoVoz(false);
      recognition.onresult = (event) => {
        enviarMensajeChat(event.results[0][0].transcript);
      };
      recognition.onerror = () => setEscuchandoVoz(false);
      recognition.start();
    }
  };

  const evaluar = (opc, correcta) => {
    if (quizRespondido) return;
    setOpcionSeleccionada(opc);
    setQuizRespondido(true);
    if (opc === correcta) {
      setXp(p => p + 25);
      setFeedback('🎉 ¡Excelente! +25 XP');
      if (porcentajeProgreso < 100) setPorcentajeProgreso(p => p + 5);
    } else {
      setFeedback(`❌ Incorrecto. Era: "${correcta}"`);
    }
  };

  const listaLecciones = PLAN_ESTUDIOS[selectedLevel];
  const currentData = listaLecciones[indiceModulo];

  return (
    <main style={{ minHeight: '100vh', background: '#f4f6f8', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '10px' }}>
      
      {/* CONTENEDOR ESTILIZADO DE LA APP */}
      <div style={{ width: '100%', maxWidth: '440px', height: '94vh', background: '#ffffff', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', border: '1px solid #eef0f3' }}>
        
        {/* TOP BAR / INDICADORES */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f2f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setMenuOpen(true)} style={{ background: '#f3f4f6', border: 'none', width: '38px', height: '38px', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ☰
          </button>
          
          <div style={{ background: '#eefdf6', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', color: '#10b981' }}>
            🇺🇸 {selectedLevel.toUpperCase()}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ background: '#fff7ed', color: '#ea580c', padding: '6px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px' }}>🔥 {streak}d</span>
            <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '6px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px' }}>⭐ {xp} XP</span>
          </div>
        </div>

        {/* DRAWER LATERAL DE MÓDULOS DE NIVEL */}
        {menuOpen && (
          <>
            <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', zIndex: 100 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '290px', height: '100%', background: '#ffffff', zIndex: 101, padding: '25px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '800', color: '#1f2937' }}>Cambiar Nivel</h3>
              {Object.keys(PLAN_ESTUDIOS).map(level => (
                <button key={level} onClick={() => { setSelectedLevel(level); setMenuOpen(false); }} style={{ padding: '14px', borderRadius: '14px', border: 'none', textAlign: 'left', fontWeight: 'bold', fontSize: '13.5px', cursor: 'pointer', background: selectedLevel === level ? '#10b981' : '#f3f4f6', color: selectedLevel === level ? '#ffffff' : '#4b5563', transition: '0.2s' }}>
                  🎯 {level}
                </button>
              ))}
            </div>
          </>
        )}

        {/* SECCIÓN DINÁMICA DE CONTENIDO */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', paddingBottom: '90px' }}>
          
          {/* PESTAÑA: LECCIONES Y AVANCE */}
          {activeTab === 'inicio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* RETORNO DEL BANNER CON AVANCE Y LA MUÑEQUITA */}
              <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '24px', padding: '20px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', boxShadow: '0 8px 20px rgba(16,185,129,0.15)' }}>
                <div style={{ flex: 1, paddingRight: '15px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '8px' }}>TU PROGRESO</span>
                  <h2 style={{ margin: '6px 0 2px 0', fontSize: '19px', fontWeight: '800' }}>Nivel {selectedLevel.split(' ')[0]}</h2>
                  <p style={{ margin: '0 0 12px 0', fontSize: '12px', opacity: 0.9 }}>{currentData.categoria}</p>
                  
                  {/* BARRA DE AVANCE REINCORPORADA */}
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: `${porcentajeProgreso}%`, height: '100%', background: '#fbbf24', transition: 'width 0.4s ease' }} />
                  </div>
                  <span style={{ fontSize: '11px', marginTop: '4px', display: 'inline-block', fontWeight: 'bold' }}>{porcentajeProgreso}% Completado</span>
                </div>
                <div style={{ width: '75px', height: '75px', background: '#ffe4e6', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', border: '3px solid #ffffff', flexShrink: 0 }}>👩‍🎧</div>
              </div>

              {/* SELECTORES GRANDES: HABLAR / ESCUCHAR */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button onClick={() => { setActiveTab('chat'); setTimeout(() => activarMicrofono(), 300); }} style={{ background: '#ffffff', border: '1px solid #e1e7ec', borderRadius: '18px', padding: '16px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.01)' }}>
                  <span style={{ fontSize: '22px', display: 'block', marginBottom: '4px' }}>🗣️</span>
                  <span style={{ fontWeight: 'bold', color: '#10b981', fontSize: '13px' }}>Practicar Hablar</span>
                </button>
                <button onClick={() => speak(currentData.vocabulario[0]?.en)} style={{ background: '#ffffff', border: '1px solid #e1e7ec', borderRadius: '18px', padding: '16px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.01)' }}>
                  <span style={{ fontSize: '22px', display: 'block', marginBottom: '4px' }}>🎧</span>
                  <span style={{ fontWeight: 'bold', color: '#2563eb', fontSize: '13px' }}>Escuchar Audio</span>
                </button>
              </div>

              {/* NAVEGACIÓN ENTRE LOS 6 MÓDULOS */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '10px 14px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <button onClick={() => setIndiceModulo(p => (p - 1 + listaLecciones.length) % listaLecciones.length)} style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  ⏮️ Anterior
                </button>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>Módulo {indiceModulo + 1} de {listaLecciones.length}</span>
                <button onClick={() => setIndiceModulo(p => (p + 1) % listaLecciones.length)} style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Siguiente 👀
                </button>
              </div>

              {/* MATERIAL DE TRABAJO (VOCABULARIO) */}
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '18px' }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#1f2937', fontSize: '14px', fontWeight: '800' }}>📖 Contenido del Módulo</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentData.vocabulario.map((item, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1, paddingRight: '10px' }}>
                        <div style={{ fontWeight: '700', fontSize: '13.5px', color: '#1f2937' }}>{item.en}</div>
                        {verTraduccion[idx] && <div style={{ fontSize: '12px', color: '#059669', marginTop: '3px', fontWeight: '500' }}>{item.es}</div>}
                      </div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={() => setVerTraduccion({...verTraduccion, [idx]: !verTraduccion[idx]})} style={{ background: '#ffffff', border: '1px solid #e2e8f0', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontSize: '12px' }}>👁️</button>
                        <button onClick={() => speak(item.en)} style={{ background: '#ffffff', border: '1px solid #e2e8f0', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontSize: '12px' }}>🔊</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* EVALUACIÓN DE COMPETENCIA */}
              <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '18px' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#4f46e5' }}>EVALUACIÓN DE RETROALIMENTACIÓN</span>
                <p style={{ margin: '4px 0 12px 0', fontWeight: '700', fontSize: '13.5px', color: '#1f2937' }}>{currentData.quiz.pregunta}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentData.quiz.opciones.map((opc, i) => (
                    <button key={i} onClick={() => evaluar(opc, currentData.quiz.correcta)} style={{ padding: '12px', borderRadius: '12px', border: '2px solid', borderColor: opcionSeleccionada === opc ? (opc === currentData.quiz.correcta ? '#10b981' : '#ef4444') : '#e2e8f0', background: '#ffffff', textAlign: 'left', fontWeight: 'bold', fontSize: '13px', color: '#4b5563', cursor: 'pointer' }}>
                      {opc}
                    </button>
                  ))}
                </div>
                {feedback && <div style={{ marginTop: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '13px', color: feedback.includes('🎉') ? '#059669' : '#dc2626' }}>{feedback}</div>}
              </div>

            </div>
          )}

          {/* PESTAÑA: CHAT BOT INTEGRADOR */}
          {activeTab === 'chat' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '15px' }}>
                {mensajes.map((msg, index) => (
                  <div key={index} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                      <div style={{ background: msg.sender === 'user' ? '#10b981' : '#f1f5f9', color: msg.sender === 'user' ? '#ffffff' : '#1f2937', padding: '10px 14px', borderRadius: '16px', fontSize: '13px', fontWeight: '500', lineHeight: '1.4' }}>
                        {msg.text}
                      </div>
                      {msg.sender === 'bot' && (
                        <button onClick={() => speak(msg.text)} style={{ background: '#f8fafc', border: 'none', cursor: 'pointer', fontSize: '13px', padding: '4px', borderRadius: '50%' }}>🔊</button>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* ACCIONES DE ESCRITURA Y ENTRADA POR MICROFONO */}
              <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid #f1f5f9', padding: '8px 0', alignItems: 'center' }}>
                <button onClick={activarMicrofono} style={{ background: escuchandoVoz ? '#ef4444' : '#f3f4f6', color: escuchandoVoz ? '#ffffff' : '#4b5563', border: 'none', width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                  {escuchandoVoz ? '🛑' : '🎙️'}
                </button>
                <input value={inputChat} onChange={(e) => setInputChat(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && enviarMensajeChat()} placeholder={escuchandoVoz ? "Listening..." : "Escribe o habla en inglés..."} style={{ flex: 1, padding: '10px 14px', borderRadius: '20px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '13px' }} disabled={escuchandoVoz} />
                <button onClick={() => enviarMensajeChat()} style={{ background: '#10b981', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                  Enviar
                </button>
              </div>

            </div>
          )}

        </div>

        {/* NAVEGACIÓN INFERIOR ESTILIZADA */}
        <div style={{ position: 'absolute', bottom: 0, width: '100%', background: '#ffffff', borderTop: '1px solid #f0f2f5', display: 'flex', padding: '10px 0 16px 0', justifyContent: 'space-around', zIndex: 90 }}>
          <button onClick={() => setActiveTab('inicio')} style={{ background: 'none', border: 'none', color: activeTab === 'inicio' ? '#10b981' : '#9ca3af', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
            <span style={{ fontSize: '18px' }}>📖</span> Módulos
          </button>
          <button onClick={() => setActiveTab('chat')} style={{ background: 'none', border: 'none', color: activeTab === 'chat' ? '#10b981' : '#9ca3af', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
            <span style={{ fontSize: '18px' }}>💬</span> Chat IA
          </button>
        </div>

      </div>
    </main>
  );
}
