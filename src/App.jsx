// App.jsx — Convite Virtual Mauro & Sawia
import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import HeroCarousel from "./components/HeroCarousel";


export default function App() {
  // ----- CONFIG -----
  const EMAILJS_USER_ID = 'p4RZQixG6P1xluizu';
  const EMAILJS_SERVICE_ID = 'service_fn4sly8';
  const EMAILJS_TEMPLATE_ID = 'template_lkop56b';
  const WEDDING_DATE = new Date('2025-11-29T15:00:00');
  const MAP_LINK = 'https://maps.app.goo.gl/PKe4yty2o1mD8mah9';
  const AUDIO_SRC = null;
  // -------------------

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [form, setForm] = useState({ name: '', guests: 1, message: '' });
  const [status, setStatus] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  function getTimeLeft() {
    const now = new Date();
    const diff = WEDDING_DATE - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('enviando');
    try {
      const templateParams = {
        from_name: form.name,
        guests: form.guests,
        message: form.message || '---',
        wedding_date: WEDDING_DATE.toLocaleString(),
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_USER_ID
      );

      setStatus('ok');
      setMessages(prev => [...prev, { name: form.name, guests: form.guests, message: form.message }]);
      setForm({ name: '', guests: 1, message: '' });
    } catch (err) {
      console.error(err);
      setStatus('erro');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--clr-bg)] text-[var(--clr-text)]">
      <div className="max-w-4xl w-full backdrop fade-in">
        {/* Cabeçalho */}
        <header>
          <h1>Mauro Chiau &amp; Sawia Cossa</h1>
          <p>28 de Novembro de 2025 • Bairro de Intaka 2, Q25, Casa 358</p>
                              <p className="frase-poetica">
            “O amor é o laço invisível que une duas almas destinadas.”
          </p>
        </header>

       <HeroCarousel />

        {/* Mensagem central */}
        <section className="texto-convite fade-in">
          <h2>Com amor, fé e alegria</h2>
          <p>
            Convidamo-vos a testemunhar este momento único em nossas vidas — o início da nossa jornada como marido e mulher.
            Traga o seu sorriso e boa vibe!
          </p>



          
        </section>

        {/* Contador regressivo */}
        <section className="contador fade-in">
          <TimeBox label="Dias" value={timeLeft.days} />
          <TimeBox label="Horas" value={timeLeft.hours} />
          <TimeBox label="Min" value={timeLeft.minutes} />
          <TimeBox label="Seg" value={timeLeft.seconds} />
        </section>

        {/* Mapa */}
        <section className="mapa fade-in">
          <iframe
            title="Local do casamento"
            src={`https://www.google.com/maps?q=${encodeURIComponent('Bairro de Intaka 2, Q25, Casa 358')}&output=embed`}
            allowFullScreen
          ></iframe>

          <a href={MAP_LINK} target="_blank" rel="noreferrer">Abrir no Maps</a>
        </section>


        {/* Formulário RSVP */}
        <form onSubmit={handleSubmit} className="rsvp fade-in">
          <label>
            <span>Nome completo</span>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ex: João Silva"
            />
          </label>

          <label>
            <span>Número de pessoas</span>
            <input
              required
              type="number"
              min="1"
              name="guests"
              value={form.guests}
              onChange={handleChange}
            />
          </label>

          <label>
            <span>Mensagem (opcional)</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="Deixe uma mensagem de felicitações"
            />
          </label>

          <div className="flex gap-2 items-center">
            <button type="submit">Confirmar presença</button>
            {status === 'enviando' && <span className="text-xs">A enviar...</span>}
            {status === 'ok' && <span className="text-xs text-green-700">Confirmado! Obrigado.</span>}
            {status === 'erro' && <span className="text-xs text-red-700">Erro ao enviar.</span>}
          </div>
        </form>

        {/* Mensagens */}
        <section className="mensagens fade-in">
          <ul ref={messageListRef}>
            {messages.length === 0 ? (
              <p className="text-xs text-slate-500">Seja o primeiro a deixar uma mensagem!</p>
            ) : (
              messages.map((m, i) => (
                <li key={i}>
                  <div className="nome">{m.name} <span className="text-xs text-slate-500">({m.guests})</span></div>
                  <div className="texto">{m.message}</div>
                </li>
              ))
            )}
          </ul>
        </section>

        <footer>
         © 2025, MVC. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}

function TimeBox({ label, value }) {
  return (
    <div className="box">
      <div className="valor">{String(value).padStart(2, '0')}</div>
      <div className="rotulo">{label}</div>
    </div>
  );
}
