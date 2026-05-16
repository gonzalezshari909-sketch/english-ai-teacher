'use client';

import React, { useState, useEffect, useRef } from 'react';

// Base de datos de lecciones por idioma y nivel
const LESSONS_DATA = {
  English: {
    Básico: [
      { frase: 'Hello', traduccion: 'Hola' },
      { frase: 'How are you?', traduccion: '¿Cómo estás?' }
    ],
    Intermedio: [
      { frase: 'I would like to order food', traduccion: 'Me gustaría ordenar comida' },
      { frase: 'Could you help me, please?', traduccion: '¿Podrías ayudarme, por favor?' }
    ],
    Avanzado: [
      { frase: 'To kill two birds with one stone', traduccion: 'Matar dos pájaros de un tiro (Modismo)' },
      { frase: 'Notwithstanding the circumstances', traduccion: 'A pesar de las circunstancias' }
    ]
  },
  French: {
    Básico: [
      { frase: 'Bonjour', traduccion: 'Hola / Buenos días' },
      { frase: 'Comment ça va?', traduccion: '¿Cómo va eso?' }
    ],
    Intermedio: [
      { frase: 'Je voudrais un café', traduccion: 'Me gustaría un café' },
      { frase: 'Où se trouve la gare?', traduccion: '¿Dónde está la estación de tren?' }
    ],
    Avanzado: [
      { frase: 'Mettre les points sur les i', traduccion: 'Poner los puntos sobre las íes' },
      { frase: 'Bien que ce soit difficile', traduccion: 'Aunque sea difícil' }
    ]
  }
};

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [selectedModule, setSelectedModule] = useState('Básico'); // Controla qué módulo ve el usuario
  const [xp, setXp] = useState(0);
  const [userLevel, setUserLevel] = useState('Básico'); // Nivel general por XP
  const [streak, setStreak] = useState(1);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  
  const chatEndRef = useRef(null);

  // Auto-scroll del chat al recibir mensajes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  // Cargar datos persistidos
  useEffect(() => {
    const savedXp = localStorage.getItem('xp');
    const savedStreak = localStorage.getItem('streak');
    const savedLang = localStorage.getItem('lang');

    if (savedXp) setXp(Number(savedXp));
    if (savedStreak) setStreak(Number(savedStreak));
    if (savedLang) setCurrentLanguage(savedLang);

    // Mensaje de bienvenida inicial de la IA
    setChat([
      { role: 'bot', text: `Hi! I'm Eliza, your virtual assistant. Let's learn ${savedLang || 'English'} together!` }
    ]);
  }, []);

  // Guardar datos y calcular nivel del perfil
  useEffect(() => {
    localStorage.setItem('xp', xp);
    localStorage.setItem('streak', streak);
    localStorage.setItem('lang', currentLanguage);

    if (xp >= 150) setUserLevel('Avanzado');
    else if (xp >= 60) setUserLevel('Intermedio');
    else setUserLevel('Básico');
  }, [xp, streak, currentLanguage]);

  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = currentLanguage === 'English' ? 'en-US' : 'fr-FR';
      window.speechSynthesis.speak(msg);
    }
  };

  const completeLesson = (lesson) => {
    setXp(prev => prev + 15);
    setChat(prev => [
      ...prev,
      { role: 'bot', text: `🎉 ¡Excelente! Aprendiste: "${lesson.frase}" (${lesson.traduccion}). +15 XP` }
    ]);
    speak(lesson.frase);
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setCurrentLanguage(newLang);
    setChat([
      { role: 'bot', text: `Perfect! Language switched. Now let's practice your ${newLang}!` }
    ]);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = input;
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setXp(prev => prev + 5);

    // Respuestas simuladas rápidas en base al idioma
    setTimeout(() => {
      let botResponse = "That's interesting! Keep practicing. 😊";
      if (currentLanguage === 'French') {
        botResponse = "C'est super! Continuez à pratiquer. 🇫🇷";
      } else {
        if (userMsg.toLowerCase().includes('hello')) botResponse = "Hello! How can I assist you in your English path?";
        if (userMsg.toLowerCase().includes('help')) botResponse = "Sure! Try clicking the modules below to learn structured phrases.";
      }

      setChat(prev => [...prev, { role: 'bot', text: botResponse }]);
      speak(botResponse);
    }, 600);
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
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
        borderRadius: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '92vh'
      }}>

        {/* HEADER / TOP BAR */}
        <div style={{
          background: '#0f172a',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', background: '#334155', padding: '4px 10px', borderRadius: '20px' }}>
              🔥 {streak} días
            </span>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
              🌐 LINGUAGO
            </span>
            <span style={{ fontSize: '14px', background: '#1e3a8a', padding: '4px 10px', borderRadius: '20px' }}>
              ⭐ {userLevel} ({xp} XP)
            </span>
          </div>

          {/* Selector de idioma */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
            <label htmlFor="lang-select" style={{ fontSize: '13px', opacity: 0.8 }}>Idioma objetivo:</label>
            <select 
              id="lang-select"
              value={currentLanguage} 
              onChange={handleLanguageChange}
              style={{
                background: '#1e293b',
                color: 'white',
                border: '1px solid #475569',
                padding: '4px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="English">🇺🇸 English</option>
              <option value="French">🇫🇷 French</option>
            </select>
          </div>
        </div>

        {/* CONTENEDOR DEL CHAT (Estilo ChatGPT) */}
        <div style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          background: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {chat.map((msg, i) => (
            <div 
              key={i} 
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '80%',
                padding: '12px 16px',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.role === 'user' ? '#2563eb' : '#ffffff',
                color: msg.role === 'user' ? '#ffffff' : '#1e293b',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                fontSize: '15px',
                lineHeight: '1.4'
              }}>
                <span style={{
                  display: 'block', 
                  fontSize: '11px', 
                  fontWeight: 'bold', 
                  marginBottom: '4px',
                  opacity: msg.role === 'user' ? 0.8 : 0.5
                }}>
                  {msg.role === 'user' ? 'Tú' : 'Eliza (IA)'}
                </span>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* INPUT DE TEXTO */}
        <div style={{
          padding: '12px 16px',
          background: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          gap: '8px'
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={`Escribe en ${currentLanguage === 'English' ? 'inglés' : 'francés'}...`}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '24px',
              border: '1px solid #cbd5e1',
              outline: 'none',
              fontSize: '15px'
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '0 18px',
              borderRadius: '24px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Enviar
          </button>
        </div>

        {/* PESTAÑAS DE MÓDULOS (Básico, Intermedio, Avanzado) */}
        <div style={{
          background: '#ffffff',
          borderTop: '1px solid #f1f5f9',
          padding: '12px'
        }}>
          <div style={{
            display: 'flex',
            background: '#f1f5f9',
            borderRadius: '12px',
            padding: '4px'
          }}>
            {['Básico', 'Intermedio', 'Avanzado'].map((mod) => (
              <button
                key={mod}
                onClick={() => setSelectedModule(mod)}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  background: selectedModule === mod ? '#ffffff' : 'transparent',
                  color: selectedModule === mod ? '#2563eb' : '#64748b',
                  boxShadow: selectedModule === mod ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {mod}
              </button>
            ))}
          </div>

          {/* LISTA DE LECCIONES DEL MÓDULO SELECCIONADO */}
          <div style={{
            marginTop: '10px',
            maxHeight: '130px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {LESSONS_DATA[currentLanguage]?.[selectedModule]?.map((lesson, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#f8fafc',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ fontSize: '13px' }}>
                  <b style={{ color: '#0f172a', display: 'block' }}>{lesson.frase}</b>
                  <span style={{ color: '#64748b', fontSize: '12px' }}>{lesson.traduccion}</span>
                </div>
                
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    onClick={() => speak(lesson.frase)}
                    style={{ background: '#e2e8f0', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    🔊
                  </button>
                  <button 
                    onClick={() => completeLesson(lesson)}
                    style={{ background: '#22c55e', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                  >
                    +15 XP
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
