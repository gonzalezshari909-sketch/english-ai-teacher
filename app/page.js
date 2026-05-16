'use client';

import React, { useState, useEffect, useRef } from 'react';

// Generador de contenido dinámico ilimitado por nivel para que nunca sea el mismo
const GENERADOR_LECCIONES = {
  'Básico': [
    { frase: 'Good morning, how can I help you?', traduccion: 'Buenos días, ¿cómo puedo ayudarte?', contexto: 'Ideal para iniciar el día' },
    { frase: 'Where is the nearest supermarket?', traduccion: '¿Dónde está el supermercado más cercano?', contexto: 'Para pedir direcciones' },
    { frase: 'Nice to meet you, my name is John', traduccion: 'Mucho gusto, mi nombre es John', contexto: 'Para presentarse' },
    { frase: 'How much does this cost, please?', traduccion: '¿Cuánto cuesta esto, por favor?', contexto: 'Para de compras' }
  ],
  'Intermedio': [
    { frase: 'I am looking forward to working with you', traduccion: 'Tengo muchas ganas de trabajar contigo', contexto: 'Entorno profesional / laboral' },
    { frase: 'Could you please speak a bit slower?', traduccion: '¿Podrías hablar un poco más despacio, por favor?', contexto: 'Para fluidez conversacional' },
    { frase: 'I completely agree with your point of view', traduccion: 'Estoy completamente de acuerdo con tu punto de vista', contexto: 'Para debates y opiniones' },
    { frase: 'Let me double-check that information for you', traduccion: 'Déjame verificar esa información por ti', contexto: 'Resolución de problemas' }
  ],
  'Avanzado': [
    { frase: 'We need to hit the ground running on this project', traduccion: 'Necesitamos empezar este proyecto a toda marcha / sin perder tiempo', contexto: 'Modismo empresarial avanzado' },
    { frase: 'It is vital to balance the pros and cons meticulously', traduccion: 'Es vital sopesar los pros y los contras meticulosamente', contexto: 'Análisis crítico' },
    { frase: 'Actions speak louder than words in these circumstances', traduccion: 'Las acciones hablan más fuerte que las palabras en estas circunstancias', contexto: 'Proverbio formal' },
    { frase: 'She managed to overcome the obstacles against all odds', traduccion: 'Ella logró superar los obstáculos contra todo pronóstico', contexto: 'Narrativa compleja' }
  ]
};

export default function Home() {
  const [selectedModule, setSelectedModule] = useState('Básico'); 
  const [leccionesActuales, setLeccionesActuales] = useState([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [isListening, setIsListening] = useState(false); // Estado para el micrófono
  
  const chatEndRef = useRef(null);

  // Auto-scroll para seguir el ritmo de la conversación
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  // Inicializar lecciones aleatorias y cargar datos del progreso
  useEffect(() => {
    const savedXp = localStorage.getItem('xp');
    const savedStreak = localStorage.getItem('streak');
    if (savedXp) setXp(Number(savedXp));
    if (savedStreak) setStreak(Number(savedStreak));

    // Cargar lecciones iniciales de nivel básico
    rotarLecciones('Básico');

    setChat([
      { role: 'bot', text: "👋 Hi! I am your interactive AI Coach. Select any level below, complete challenges, or press the 🎙️ button to talk to me in real-time!" }
    ]);
  }, []);

  // Función para rotar y cambiar el contenido dinámicamente para que nunca sea el mismo
  const rotarLecciones = (nivel) => {
    const pool = GENERADOR_LECCIONES[nivel];
    // Desordenar y tomar frases dinámicas
    const mezcladas = [...pool].sort(() => 0.5 - Math.random());
    setLeccionesActuales(mezcladas.slice(0, 2));
  };

  // Cada vez que cambias de pestaña, el contenido cambia de acuerdo al nivel de forma automática
  const handleTabChange = (modulo) => {
    setSelectedModule(modulo);
    rotarLecciones(modulo);
  };

  // Sintetizador de voz (La app te habla)
  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Detener cualquier audio previo
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.rate = 0.95; // Velocidad cómoda para aprender
      window.speechSynthesis.speak(msg);
    }
  };

  // Reconocimiento de voz por micrófono (Tú le hablas a la app)
  const startSpeechRecognition = () => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US'; // Escucha tu inglés
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const vozTexto = event.results[0][0].transcript;
        procesarMensajeUsuario(vozTexto);
      };

      recognition.start();
    } else {
      alert("Lo siento, tu navegador o dispositivo no soporta el reconocimiento de voz directo. ¡Prueba usando Google Chrome!");
    }
  };

  const completeLesson = (lesson) => {
    setXp(prev => prev + 20);
    setChat(prev => [
      ...prev,
      { role: 'bot', text: `✨ Excellent! You practiced: "${lesson.frase}". Perfect pronunciation! (+20 XP)` }
    ]);
    speak(lesson.frase);
    // Cambiar el contenido inmediatamente por uno nuevo para mantenerlo dinámico
    setTimeout(() => rotarLecciones(selectedModule), 1000);
  };

  const procesarMensajeUsuario = (texto) => {
    if (!texto.trim()) return;

    setChat(prev => [...prev, { role: 'user', text: texto }]);
    setXp(prev => prev + 5);

    // Simular procesamiento inteligente basado en el nivel interactivo actual
    setTimeout(() => {
      let botResponse = `I heard you say: "${texto}". That's great! Let's keep practicing conversational English in the ${selectedModule} module. Tell me more!`;
      
      if (selectedModule === 'Básico') {
        botResponse = `Wonderful! Your sentence is good for beginners. Keep it simple! Can you say 'Hello' or ask for help?`;
      } else if (selectedModule === 'Avanzado') {
        botResponse = `Splendid formulation! That aligns perfectly with sophisticated English phrasing. What are your thoughts on challenging vocabulary?`;
      }

      setChat(prev => [...prev, { role: 'bot', text: botResponse }]);
      speak(botResponse); // Te responde con voz de vuelta
    }, 800);
  };

  const handleSendText = () => {
    procesarMensajeUsuario(input);
    setInput('');
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Fondo dinámico y más vivo
      padding: '20px 10px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      
      <div style={{
        width: '100%',
        maxWidth: '430px',
        background: '#ffffff',
        borderRadius: '35px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '92vh',
        border: '4px solid rgba(255, 255, 255, 0.1)'
      }}>

        {/* BARRA SUPERIOR GAMIFICADA */}
        <div style={{
          background: 'linear-gradient(180deg, #111827 0%, #1f2937 100%)',
          color: 'white',
          padding: '20px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', background: '#e11d48', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              🔥 {streak} DÍAS
            </span>
            <span style={{ fontWeight: '900', fontSize: '20px', letterSpacing: '1.5px', color: '#38bdf8' }}>
              LINGUAGO
            </span>
            <span style={{ fontSize: '13px', background: 'linear-gradient(90deg, #eab308 0%, #ca8a04 100%)', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold', color: '#1e1b4b' }}>
              ⭐ {xp} XP
            </span>
          </div>
        </div>

        {/* CONTENEDOR DE CONVERSACIÓN TIPO CHATGPT */}
        <div style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          background: '#f1f5f9',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {chat.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '85%',
                padding: '14px 18px',
                borderRadius: msg.role === 'user' ? '22px 22px 4px 22px' : '22px 22px 22px 4px',
                background: msg.role === 'user' ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : '#ffffff',
                color: msg.role === 'user' ? '#ffffff' : '#0f172a',
                boxShadow: '0 4px 6px rgba(15, 23, 42, 0.05)',
                fontSize: '14.5px',
                lineHeight: '1.5',
                border: msg.role === 'user' ? 'none' : '1px solid #e2e8f0'
              }}>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', marginBottom: '4px', opacity: 0.6, textTransform: 'uppercase' }}>
                  {msg.role === 'user' ? 'Tú (Hablando)' : 'Eliza AI Coach'}
                </span>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* INPUT DE TEXTO + INTERACCIÓN POR VOZ (MICRÓFONO) */}
        <div style={{
          padding: '14px 16px',
          background: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          {/* BOTÓN DE MICRÓFONO INTERACTIVO */}
          <button
            onClick={startSpeechRecognition}
            style={{
              background: isListening ? '#ef4444' : '#38bdf8',
              color: 'white',
              border: 'none',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: isListening ? '0 0 15px #ef4444' : '0 4px 10px rgba(56, 189, 248, 0.3)',
              transition: 'all 0.3s ease',
              animation: isListening ? 'pulse 1.2s infinite' : 'none'
            }}
            title="Presiona para hablar en inglés"
          >
            {isListening ? '🛑' : '🎙️'}
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
            placeholder={isListening ? "Escuchando tu voz..." : "Escribe o usa el micrófono..."}
            disabled={isListening}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '30px',
              border: '1px solid #cbd5e1',
              outline: 'none',
              fontSize: '14px',
              background: isListening ? '#f8fafc' : '#ffffff'
            }}
          />
          
          <button onClick={handleSendText} style={{
            background: '#0f172a',
            color: 'white',
            border: 'none',
            padding: '12px 22px',
            borderRadius: '30px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            Enviar
          </button>
        </div>

        {/* MENÚ DE PESTAÑAS ABIERTAS SIN BLOQUEOS */}
        <div style={{ background: '#ffffff', borderTop: '1px solid #f1f5f9', padding: '14px' }}>
          <p style={{ margin: '0 0 10px 4px', fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Prácticas sugeridas del nivel seleccionado:
          </p>
          <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '16px', padding: '5px' }}>
            {['Básico', 'Intermedio', 'Avanzado'].map((mod) => (
              <button
                key={mod}
                onClick={() => handleTabChange(mod)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  background: selectedModule === mod ? '#0f172a' : 'transparent',
                  color: selectedModule === mod ? '#ffffff' : '#64748b',
                  transition: 'all 0.2s ease'
                }}
              >
                {mod}
              </button>
            ))}
          </div>

          {/* CONTENIDO EN CONSTANTE CAMBIO / DINÁMICO */}
          <div style={{ marginTop: '12px', height: '145px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {leccionesActuales.map((lesson, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%)',
                padding: '12px 16px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}>
                <div style={{ flex: 1, paddingRight: '10px' }}>
                  <span style={{ display: 'inline-block', fontSize: '10px', background: '#cbd5e1', color: '#334155', padding: '2px 6px', borderRadius: '4px', marginBottom: '4px', fontWeight: '600' }}>
                    {lesson.contexto}
                  </span>
                  <b style={{ color: '#0f172a', fontSize: '14px', display: 'block', marginBottom: '2px' }}>{lesson.frase}</b>
                  <span style={{ color: '#64748b', fontSize: '12.5px' }}>{lesson.traduccion}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => speak(lesson.frase)} style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    🔊
                  </button>
                  <button onClick={() => completeLesson(lesson)} style={{ background: '#22c55e', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(34, 197, 94, 0.2)' }}>
                    ✓ +20
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
