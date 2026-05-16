'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState('Básico');
  const [streak, setStreak] = useState(1);

  const lessons = [
    'Saludos y presentaciones',
    'Verbo To Be',
    'Números y colores',
    'Presente simple',
    'Conversaciones básicas',
  ];

  // Cargar XP guardado
  useEffect(() => {
    const savedXp = localStorage.getItem('xp');
    const savedStreak = localStorage.getItem('streak');

    if (savedXp) setXp(Number(savedXp));
    if (savedStreak) setStreak(Number(savedStreak));
  }, []);

  // Guardar progreso
  useEffect(() => {
    localStorage.setItem('xp', xp);
    localStorage.setItem('streak', streak);

    if (xp >= 120) setLevel('Avanzado');
    else if (xp >= 50) setLevel('Intermedio');
    else setLevel('Básico');
  }, [xp, streak]);

  const completeLesson = () => {
    setXp(prev => prev + 10);
  };

  const speak = () => {
    const msg = new SpeechSynthesisUtterance(
      'Hello! Repeat after me. I am learning English.'
    );
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
  };

  const addStreak = () => {
    setStreak(prev => prev + 1);
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      padding: 20,
      fontFamily: 'Arial'
    }}>
      
      <div style={{
        maxWidth: 400,
        margin: '0 auto',
        background: 'white',
        padding: 20,
        borderRadius: 20,
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }}>

        <h1 style={{ textAlign: 'center' }}>
          Profesora de Inglés IA 🇺🇸
        </h1>

        {/* ESTADÍSTICAS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <div>
            <p>🔥 Racha</p>
            <h3>{streak} días</h3>
          </div>

          <div>
            <p>⭐ Nivel</p>
            <h3>{level}</h3>
          </div>

          <div>
            <p>XP</p>
            <h3>{xp}</h3>
          </div>
        </div>

        {/* BOTONES */}
        <button
          onClick={completeLesson}
          style={{
            width: '100%',
            marginTop: 20,
            padding: 12,
            background: 'green',
            color: 'white',
            border: 'none',
            borderRadius: 10
          }}
        >
          ✓ Completar lección (+10 XP)
        </button>

        <button
          onClick={speak}
          style={{
            width: '100%',
            marginTop: 10,
            padding: 12,
            background: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: 10
          }}
        >
          🔊 Practicar pronunciación
        </button>

        <button
          onClick={addStreak}
          style={{
            width: '100%',
            marginTop: 10,
            padding: 12,
            background: 'black',
            color: 'white',
            border: 'none',
            borderRadius: 10
          }}
        >
          🔥 Aumentar racha
        </button>

        {/* LECCIONES */}
        <h2 style={{ marginTop: 20 }}>Lecciones</h2>

        {lessons.map((lesson, i) => (
          <div
            key={i}
            style={{
              background: '#f9fafb',
              padding: 10,
              borderRadius: 10,
              marginTop: 10
            }}
          >
            <p>{lesson}</p>
            <button onClick={completeLesson}>
              Completar
            </button>
          </div>
        ))}

        {/* NIVEL INFO */}
        <div style={{
          marginTop: 20,
          padding: 10,
          background: '#eef2ff',
          borderRadius: 10
        }}>
          <p><b>Tu progreso:</b></p>
          <p>Completa lecciones para subir de nivel</p>
        </div>

      </div>
    </main>
  );
}
