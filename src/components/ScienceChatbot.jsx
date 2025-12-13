import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';
import { askScienceBot } from '../services/chatbotService.js';

const cannedResponses = [
  {
    keywords: ['force', 'motion'],
    key: 'force',
    fallback:
      "A force is a push or pull. It can change an object's motion by speeding it up, slowing it down, or changing direction."
  },
  {
    keywords: ['atom', 'particle'],
    key: 'atom',
    fallback:
      'Atoms are very small particles. They have a nucleus with protons and neutrons, and electrons move around the nucleus.'
  },
  {
    keywords: ['ecosystem', 'food chain'],
    key: 'ecosystem',
    fallback:
      'An ecosystem is a community of living things and their environment. Energy flows from producers to consumers and then to decomposers.'
  },
  {
    keywords: ['climate', 'weather'],
    key: 'climate',
    fallback: 'Weather changes every day. Climate describes long-term patterns of weather in an area.'
  }
];

const resolveResponse = (message) => {
  const lower = message.toLowerCase();
  return cannedResponses.find((item) => item.keywords.some((keyword) => lower.includes(keyword)));
};

const ScienceChatbot = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      key: 'chatbot.welcome',
      fallback: 'Hello! Ask me a science question in English. I will explain with simple words.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendToBot = async (messageText) => {
    setIsLoading(true);
    try {
      const reply = await askScienceBot(messageText);
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    } catch (error) {
      console.error('AI chatbot error', error);
      const responseEntry = resolveResponse(messageText);
      const fallbackMessage = responseEntry
        ? {
            sender: 'bot',
            key: `chatbot.responses.${responseEntry.key}`,
            fallback: responseEntry.fallback
          }
        : {
            sender: 'bot',
            key: 'chatbot.responses.fallback',
            fallback: "I'm still learning. Try asking about force, atoms, ecosystems, or climate."
          };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    const trimmed = input.trim();
    const userMessage = { sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    await sendToBot(trimmed);
  };

  return (
    <section className="flex h-full flex-col gap-5 rounded-[24px] border border-white/60 bg-gradient-to-br from-white/95 via-white to-sky-50/80 p-6 text-slate-900 shadow-[0_20px_70px_rgba(0,0,0,0.18)]">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-inner">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-lg">🤖</div>
            <div>
              <p className="text-sm font-semibold">{t('chatbot.title', 'Science Helper Chatbot')}</p>
              <p className="text-xs text-slate-500">
                {t('chatbot.status', 'Online • Answers in simple English')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            {t('chatbot.liveBadge', 'Live tutor mode')}
          </div>
        </div>
        <p className="text-sm text-slate-700">
          {t('chatbot.description', 'Type a topic keyword and receive an easy English explanation.')}
        </p>
        <div className="flex flex-wrap gap-2">
          {t('chatbot.quickPrompts', ['Newton laws', 'Periodic table', 'Ecosystem energy', 'DNA'])?.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setInput(prompt)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-brand/60 hover:text-slate-900"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          {t('chatbot.timeline', 'Today')}
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 ${message.sender === 'bot' ? '' : 'flex-row-reverse text-right'}`}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg shadow-inner ${
                  message.sender === 'bot' ? 'bg-brand/10 text-brand-dark' : 'bg-slate-900 text-white'
                }`}
              >
                {message.sender === 'bot' ? 'SB' : 'You'}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  message.sender === 'bot'
                    ? 'border border-brand/30 bg-sky-50 text-slate-900'
                    : 'border border-slate-200 bg-white text-slate-900'
                }`}
              >
                {'text' in message ? message.text : t(message.key, message.fallback)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-inner md:grid-cols-[1fr_auto] md:items-center">
        <div className="relative flex items-center">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            placeholder={t('chatbot.placeholder', 'Ask about force, atoms, ecosystems...')}
            aria-label={t('chatbot.inputLabel', 'Chat message')}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-sky-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(56,189,248,0.35)] transition hover:translate-y-[-1px] hover:shadow-[0_16px_35px_rgba(56,189,248,0.45)] disabled:opacity-70"
        >
          {isLoading ? t('chatbot.generating', 'Generating...') : t('chatbot.send', 'Send')}
          <FiSend aria-hidden />
        </button>
      </form>
    </section>
  );
};

export default ScienceChatbot;
