import './Home.css'

import { useNavigate } from 'react-router-dom';
import { quizData } from '../../data/quizData';

export default function Quiz() {
  const navigate = useNavigate();
  const firstQuestion = quizData.questions[0];

  const handleStartQuiz = (type) => {
    sessionStorage.setItem('quiz_first_answer', type);
    navigate('/quiz');
  };

  return (
    <section className="py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Find Your Perfect Blend</h2>
        <div className="max-w-2xl mx-auto bg-zinc-800 p-8 rounded-3xl border border-white/10 shadow-xl">
          <p className="text-orange-500 font-mono mb-2">Start the Quiz</p>
          <h3 className="text-2xl mb-8">{firstQuestion.text}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {firstQuestion.options.map((opt, i) => (
              <button 
                key={i}
                onClick={() => handleStartQuiz(opt.type)}
                className="p-4 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold transition-all transform hover:scale-105 cursor-pointer"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
