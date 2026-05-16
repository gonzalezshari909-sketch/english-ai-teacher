'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState('Básico');

  const lessons = [
    'Saludos y presentaciones',
    'Números y colores',
    'Verbo To Be',
    'Presente simple',
    'Conversación básica',
  ];

  useEffect(() => {
    const saved = localStorage.getItem('xp');
    if (saved) setXp(Number(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('xp', xp);

    if (xp >= 50) setLevel('Intermedio');
    if (xp >= 120) setLevel('Avanzado');
  }, [xp]);

  const addXP = () => setXp(xp + 10);

  const speak = () => {
    const msg = new SpeechSynthesisUtterance(
      'Hello! Let’s practice English together.'
    );
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
  };

  return (
    <main style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Profesora de Inglés IA 🇺🇸</h1>

      <h2>Nivel: {level}</h2>
      <h3>XP: {xp}</h3>

      <button onClick={addXP} style={{ marginRight: 10 }}>
        Completar lección
      </button>

      <button onClick={speak}>
        Practicar pronunciación
      </button>

      <hr />

      <h2>Lecciones</h2>

      {lessons.map((l, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <p>{l}</p>
          <button onClick={addXP}>✓ Completar</button>
        </div>
      ))}
    </main>
  );
}
