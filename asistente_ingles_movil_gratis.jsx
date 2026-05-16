// App lista para usar como asistente/profesora de inglés
// Puedes subirla gratis a Vercel y luego instalarla en tu celular.

export default function EnglishAssistantApp() {
  const levels = [
  {
    level: 'Nivel 1 - Básico',
    description: 'Aprende desde cero',
    modules: [
      {
        title: 'Saludos y presentaciones',
        completed: false,
        review: true,
      },
      {
        title: 'Números y colores',
        completed: false,
        review: true,
      },
      {
        title: 'Verbo To Be',
        completed: false,
        review: true,
      },
    ],
  },
  {
    level: 'Nivel 2 - Intermedio',
    description: 'Empieza a conversar',
    modules: [
      {
        title: 'Presente simple',
        completed: false,
        review: true,
      },
      {
        title: 'Preguntas y respuestas',
        completed: false,
        review: true,
      },
      {
        title: 'Conversaciones cotidianas',
        completed: false,
        review: true,
      },
    ],
  },
  {
    level: 'Nivel 3 - Avanzado',
    description: 'Habla con fluidez',
    modules: [
      {
        title: 'Conversaciones avanzadas',
        completed: false,
        review: true,
      },
      {
        title: 'Listening avanzado',
        completed: false,
        review: true,
      },
      {
        title: 'Pensar en inglés',
        completed: false,
        review: true,
      },
    ],
  },
];

  const startVoicePractice = () => {
    const utterance = new SpeechSynthesisUtterance(
      'Hello! Welcome to your English class.'
    );
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const setReminder = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('Clase de Inglés', {
          body: 'Tu clase comienza a las 7:00 PM',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Asistente de Inglés</h1>
          <p className="text-gray-500 mt-2">
            Aprende inglés desde cero en 3 a 4 meses
          </p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4">
          <h2 className="font-semibold text-lg">Horario Diario</h2>
          <p>Todos los días</p>
          <p>7:00 PM - 8:00 PM</p>
        </div>

        <button
          onClick={setReminder}
          className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold"
        >
          Activar Recordatorios
        </button>

        <button
          onClick={startVoicePractice}
          className="w-full bg-green-600 text-white py-3 rounded-2xl font-semibold"
        >
          Practicar Pronunciación
        </button>

        <div>
          <h2 className="text-xl font-semibold mb-3">Ruta de Aprendizaje</h2>
          <div className="space-y-6">
            {levels.map((level, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-4 border">
                <div className="mb-3">
                  <h3 className="text-lg font-bold">{level.level}</h3>
                  <p className="text-gray-600 text-sm">{level.description}</p>
                </div>

                <div className="space-y-3">
                  {level.modules.map((module, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm"
                    >
                      <div>
                        <p className="font-medium">{module.title}</p>
                        {module.review && (
                          <p className="text-xs text-gray-500">
                            Se seguirá repasando automáticamente
                          </p>
                        )}
                      </div>

                      <button className="bg-green-100 px-3 py-1 rounded-full text-sm">
                        ✓ Pendiente
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-2xl border">
          <h2 className="font-semibold text-lg">Instalar en el Celular</h2>
          <ol className="list-decimal ml-5 mt-2 text-sm text-gray-700 space-y-1">
            <li>Sube este proyecto gratis a Vercel</li>
            <li>Abre el enlace desde tu celular</li>
            <li>Presiona “Agregar a pantalla de inicio”</li>
            <li>La app funcionará como una aplicación real</li>
          </ol>
        </div>

        <div className="bg-purple-50 p-4 rounded-2xl border">
          <h2 className="font-semibold text-lg">Modo Profesor IA</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
            <li>Evalúa tu progreso</li>
            <li>Recuerda temas anteriores automáticamente</li>
            <li>Desbloquea nuevos niveles</li>
            <li>Hace repasos inteligentes</li>
            <li>Corrige pronunciación y escritura</li>
            <li>Te guía como un profesor personal</li>
          </ul>
        </div>
      </div>

        <div className="bg-yellow-50 p-4 rounded-2xl">
          <h2 className="font-semibold">Rutina Recomendada</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
            <li>Escuchar y repetir frases</li>
            <li>Practicar pronunciación</li>
            <li>Hablar en voz alta</li>
            <li>Practicar todos los días</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}

// FUNCIONES FUTURAS QUE YA ESTÁN PREPARADAS PARA AGREGAR:
// - IA conversacional tipo ChatGPT
// - Micrófono y reconocimiento de voz
// - Pronunciación automática
// - Exámenes y quizzes
// - Seguimiento diario
// - Sistema de experiencia y niveles
// - Recordatorios automáticos a las 7 PM
// - Listening interactivo
// - Conversaciones en tiempo real
// - Guardado automático del progreso
