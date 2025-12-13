import ScienceChatbot from '../components/ScienceChatbot.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const ChatbotPage = () => {
  const { t } = useLanguage();
  const featureCards = [
    {
      title: t('chatbotPage.cards.guidance.title', 'Guided prompts'),
      description: t(
        'chatbotPage.cards.guidance.description',
        'Tap a suggested topic and get a clear, bilingual-friendly explanation.'
      )
    },
    {
      title: t('chatbotPage.cards.examples.title', 'Simple examples'),
      description: t(
        'chatbotPage.cards.examples.description',
        'Receive short definitions, visuals-in-words, and easy vocabulary you can reuse.'
      )
    },
    {
      title: t('chatbotPage.cards.practice.title', 'Practice-ready'),
      description: t(
        'chatbotPage.cards.practice.description',
        'Copy replies into flashcards or quizzes to keep reviewing what you learn.'
      )
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#0a3f6d] via-[#0b4f7f] to-[#0b4f7f] text-white">
      <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16 pt-14">
        <div className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.25)] backdrop-blur">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-100">
                {t('chatbotPage.eyebrow', 'AI Tutor')}
              </p>
              <h1 className="text-4xl font-black leading-tight md:text-5xl">
                {t('chatbotPage.title', 'Science chatbot for quick answers')}
              </h1>
              <p className="text-lg text-sky-100 md:text-xl">
                {t(
                  'chatbotPage.description',
                  'Ask a question, see sample wording, and learn with gentle English explanations made for students.'
                )}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {featureCards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-white/15 bg-white/5 p-4 text-left">
                    <p className="text-sm font-semibold text-white">{card.title}</p>
                    <p className="mt-2 text-sm text-sky-100">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-white/20 bg-white/10 p-2 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
              <ScienceChatbot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
