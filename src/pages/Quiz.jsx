import { useState, useEffect } from 'react';
import { quizData, calculateResult } from '../data/quizData';

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('quiz_first_answer');
    if (saved) {
      setAnswers([saved]);
      setStep(1);
      sessionStorage.removeItem('quiz_first_answer');
    }
  }, []);

  const onAnswer = (type) => {
    const updated = [...answers, type];
    if (step < quizData.questions.length - 1) {
      setAnswers(updated);
      setStep(step + 1);
    } else {
      const resKey = calculateResult(updated);
      setFinalResult(quizData.results[resKey]);
    }
  };

  const handleRestart = () => {
    setStep(0); 
    setAnswers([]); 
    setFinalResult(null); 
    sessionStorage.removeItem('quiz_first_answer');
  };

  if (finalResult) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white p-4">
        <div className="max-w-md text-center border border-orange-500/30 p-8 rounded-2xl bg-zinc-800">
          <h1 className="text-4xl font-bold text-orange-500 mb-4">{finalResult.title}</h1>
          <p className="text-lg text-zinc-300 mb-6">{finalResult.desc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={handleRestart}
            className="cursor-pointer w-full sm:w-auto px-8 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all transform hover:scale-105"
          >
            Try Again
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="cursor-pointer w-full sm:w-auto px-8 py-3 bg-transparent text-white/50 border border-white/10 font-bold rounded-full hover:bg-white/5 hover:text-white transition-all"
          >
            Back to Home
          </button>
        </div>
        </div>
      </div>
    );
  }

  const q = quizData.questions[step];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <div className="w-full max-w-lg p-6 border border-white/10 rounded-xl">
        <span className="text-orange-500 font-mono">Step {step + 1} of {quizData.questions.length}</span>


        <div className="w-full max-w-2xl mb-10">
          <div className="flex justify-between items-end mb-2">
            <span className="text-orange-500 font-mono text-sm uppercase tracking-widest">
              Progress
            </span>
            <span className="text-white/50 font-mono text-sm">
              {step + 1} / {quizData.questions.length}
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(249,115,22,0.5)]" 
              style={{ width: `${((step) / quizData.questions.length) * 100}%` }}
            />
          </div>
        </div>


        <h2 className="text-3xl font-bold mt-2 mb-8">{q.text}</h2>
        <div className="grid gap-4">
          {q.options.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => onAnswer(opt.type)}
              className="p-4 text-left border border-white/10 rounded-xl hover:bg-white/5 hover:border-orange-500 transition cursor-pointer"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}