'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState('Básico');
  const [streak, setStreak] = useState(1);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const lessons = [
    'Hello = Hola',
    'I am = Yo soy/estoy',
    'How are you? = ¿Cómo estás?',
    'I want = Yo quiero',
    'Thank you = Gracias'
  ];

  // cargar datos
  useEffect(() => {
    const savedXp = localStorage.getItem('xp');
    const savedStreak = localStorage.getItem('streak');

    if (savedXp) setXp(Number(savedXp));
    if (savedStreak) setStreak(Number(savedStreak));
  }, []);

  // guardar datos + niveles
  useEffect(() => {
    localStorage.setItem('xp', xp);
    localStorage.setItem('streak', streak);

    if (xp >= 120) setLevel('Avanzado');
    else if (xp >= 50) setLevel('Intermedio');
    else setLevel('Básico');
  }, [xp, streak]);

  const completeLesson = (lesson) => {
    setXp(prev => prev + 10);
    setChat(prev => [
      ...prev,
      { role: 'bot', text: `Correct! "${lesson}" aprendido ✔` }
    ]);
  };

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
  };

  const sendMessage = () => {
    if (!input) return;

    const userMsg = input;
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);

    setInput('');

    // RESPUESTA IA SIMULADA (luego puedes conectar OpenAI)
    let response = '';

    if (userMsg.toLowerCase().includes('hello')) {
      response = 'Hello! How are you today?';
    } else if (userMsg.toLowerCase().includes('help')) {
      response = 'I can help you learn English step by step.';
    } else {
      response = 'Try using simple English sentences 😊';
    }

    setTimeout(() => {
      setChat(prev => [...prev, { role: 'bot', text: response }]);
      speak(response);
    }, 500);

    setXp(prev => prev + 5);
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      padding: 20,
      fontFamily: 'Arial'
    }}>
      
      <div style={{
        maxWidth: 420,
        margin: '0 auto',
        background: 'white',
        padding: 20,
        borderRadius: 20,
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>

        <h1 style={{ textAlign: 'center' }}>
          🇺🇸 English AI Teacher
        </h1>

        {/* ESTADÍSTICAS */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 20
        }}>
          <div>
            <p>🔥 Racha</p>
            <b>{streak}</b>
          </div>

          <div>
            <p>⭐ Nivel</p>
            <b>{level}</b>
          </div>

          <div>
            <p>XP</p>
            <b>{xp}</b>
          </div>
        </div>

        {/* CHAT */}
        <div style={{
          marginTop: 20,
          border: '1px solid #ddd',
          borderRadius: 10,
          padding: 10,
          height: 200,
          overflowY: 'auto'
        }}>
          {chat.map((msg, i) => (
            <p key={i} style={{
              textAlign: msg.role === 'user' ? 'right' : 'left'
            }}>
              <b>{msg.role === 'user' ? 'Tú' : 'IA'}:</b> {msg.text}
            </p>
          ))}
        </div>

        {/* INPUT */}
        <div style={{ display: 'flex', marginTop: 10 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe en inglés..."
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 10,
              border: '1px solid #ccc'
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              marginLeft: 5,
              padding: 10,
              background: 'black',
              color: 'white',
              borderRadius: 10
            }}
          >
            Enviar
          </button>
        </div>

        {/* LECCIONES */}
        <h2 style={{ marginTop: 20 }}>Lecciones</h2>

        {lessons.map((l, i) => (
          <div key={i} style={{
            background: '#f9fafb',
            padding: 10,
            borderRadius: 10,
            marginTop: 10
          }}>
            <p>{l}</p>

            <button onClick={() => completeLesson(l)}>
              Completar +10 XP
            </button>

            <button onClick={() => speak(l)} style={{ marginLeft: 10 }}>
              🔊
            </button>
          </div>
        ))}

      </div>
    </main>
  );
}
