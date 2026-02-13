
import { useNavigate } from 'react-router-dom';
import { quizData } from '../../data/quizData';
import { FaArrowRight } from 'react-icons/fa';

import './Home.css'

export default function Quiz() {
  const navigate = useNavigate();
  const firstQuestion = quizData.questions[0];

  const handleStartQuiz = (type) => {
    sessionStorage.setItem('quiz_first_answer', type);
    navigate('/quiz');
  };

return (
    <section className="py-24 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-orange-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
            Personalized Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Find Your Perfect Blend
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h4 className="text-2xl font-light text-zinc-400">
              {firstQuestion.text}
            </h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {firstQuestion.options.map((opt, i) => {
              const IconComponent = opt.icon;
              return (
                <button 
                  key={i}
                  onClick={() => handleStartQuiz(opt.type)}
                  className="group relative bg-[#151312] border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center transition-all duration-500 hover:border-orange-400/40 hover:bg-[#1a1817] hover:-translate-y-2 cursor-pointer shadow-2xl">
                  <div className="w-20 h-20 bg-[#0d0c0c] rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-inner text-accent">
                    <IconComponent size={28} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                    {opt.text}
                  </h4>
                  <p className="text-zinc-500 text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity mb-4">
                    {opt.subtext}
                  </p>
                  <div className="flex items-center gap-2 text-accent text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    Start Quiz <FaArrowRight size={8} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}