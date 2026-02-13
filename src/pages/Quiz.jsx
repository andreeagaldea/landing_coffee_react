import { useState, useEffect } from 'react';
import { quizData, calculateResult } from '../data/quizData';
import { FaArrowRight, FaUndo, FaLeaf, FaCoffee } from 'react-icons/fa';

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
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white p-4 md:p-10 font-sans">
        <div className="max-w-5xl w-full bg-[#151312] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-700">
          
          <div className="md:w-1/2 relative p-6 md:p-8">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden group">
              <img 
                src={finalResult.image} 
                alt={finalResult.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#151312]/80 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-6 left-6 flex gap-2">
                {finalResult.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black tracking-[0.15em] text-accent uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
              DISCOVERING YOUR PROFILE
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-[1.1] tracking-tight">
              Your ideal aroma is... <br/>
              <span className="text-white/90">{finalResult.title}</span>
            </h2>

            <div className="flex flex-wrap gap-6 mb-8">
              {finalResult.notes.map((note, idx) => (
                <div key={idx} className="flex items-center gap-2 text-accent font-bold text-[10px] uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full shadow-[0_0_8px_rgba(234,88,12,0.6)]" />
                  {note}
                </div>
              ))}
            </div>

            <p className="text-zinc-400 text-sm md:text-base mb-10 leading-relaxed font-light">
              {finalResult.desc}
            </p>

            <div className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-orange-200/10 p-2.5 rounded-xl text-accent border border-orange-400/20">
                  <FaCoffee size={14} />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold mb-2">Why does it suit you?</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed italic opacity-80">
                    "{finalResult.why}"
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-10">
              <button 
                onClick={handleRestart}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-orange-400 text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-orange-500 transition-all cursor-pointer shadow-lg shadow-orange-900/20">
                <FaUndo size={10} className="group-hover:rotate-[-180deg] transition-transform duration-500" />
                Retake Quiz
              </button>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/10 text-white/60 text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-white/5 hover:text-white transition-all cursor-pointer">
                Back Home
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  const q = quizData.questions[step];
  const progress = ((step + 1) / quizData.questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-6 flex flex-col items-center relative overflow-hidden font-sans">
      
      <div className="max-w-5xl w-full relative z-10">
        
        <div className="mb-10">
          <div className="flex justify-between items-end mb-5">
            <div className="flex flex-col gap-1">
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">
                Step {step + 1} of {quizData.questions.length}
              </span>
            </div>
            <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                {Math.round(progress)}% Completed
            </span>
          </div>
          <div className="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-400 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(234,88,12,0.3)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-5xl font-bold mb-8 tracking-tighter leading-[1.1]">
            {q.text}
          </h2>
          <p className="text-zinc-500 text-lg md:text-1xl font-light max-w-2xl mx-auto">
            Select the style that best defines your daily coffee ritual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {q.options.map((opt, i) => {
            const IconComponent = opt.icon; 
            return (
              <button
                key={i}
                onClick={() => onAnswer(opt.type)}
                className="group relative bg-[#151312] border border-white/5 rounded-[3rem] p-12 flex flex-col items-center transition-all duration-500 hover:border-orange-400/40 hover:bg-[#1a1817] hover:-translate-y-2 cursor-pointer shadow-xl shadow-black/20"
              >
                <div className="w-24 h-24 bg-[#0d0c0c] rounded-full flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-inner">
                  <IconComponent className="w-8 h-8 text-orange-400" />
                </div>
                
                <h4 className="text-2xl md:text-2xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors text-center">
                  {opt.text}
                </h4>
                <p className="text-light text-sm md:text-base font-medium text-center leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                  {opt.subtext} 
                </p>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center items-center gap-4 text-zinc-700 text-[10px] font-black uppercase tracking-[0.2em]">
          <span className="w-2 h-[1px] bg-zinc-800"></span>
          <p className="flex items-center gap-2">
            <span className="w-1 h-1 bg-orange-600 rounded-full animate-pulse"></span>
            Think about your favorite way to brew at home.
          </p>
          <span className="w-2 h-[1px] bg-zinc-800"></span>
        </div>
      </div>
    </div>
  );
}