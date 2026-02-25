import { FaBolt, FaLeaf, FaCloud, FaMugHot, FaWineGlassAlt, FaFillDrip, FaCoffee, FaGem } from 'react-icons/fa';
import { GiCoffeePot, GiCoffeeBeans } from 'react-icons/gi';

export const quizData = {
  questions: [
    {
      id: 1,
      text: "How do you usually start your morning?",
      options: [
        { 
          text: "With a strong energy boost", 
          subtext: "Intense, quick, and powerful",
          type: "A",
          icon: FaBolt 
        },
        { 
          text: "Savoring complex flavors", 
          subtext: "Balanced, refined, and steady",
          type: "B" ,
          icon: FaGem
        },
        { 
          text: "Something smooth & creamy", 
          subtext: "Relaxed, comforting, and light",
          type: "C",
          icon: FaCloud 
        }
      ]
    },
    {
      id: 2,
      text: "What flavor profile do you prefer?",
      options: [
        { 
          text: "Dark, chocolatey & bold", 
          subtext: "Earthy notes with cocoa finish",
          type: "A",
          icon: GiCoffeeBeans 
        },
        { 
          text: "Fruit-forward & floral", 
          subtext: "Delicate with citrus brightness",
          type: "B",
          icon: FaWineGlassAlt
         },
        { 
          text: "Nutty & caramel sweetness", 
          subtext: "Natural sweetness and low acidity",
          type: "C" ,
          icon: FaLeaf
        }
      ]
    },
    {
      id: 3,
      text: "How do you brew your coffee?",
      options: [
        { 
          text: "Espresso or Moka Pot", 
          subtext: "High pressure and rich texture",
          type: "A" ,
          icon: FaMugHot
        },
        { 
          text: "Pour-over or Chemex", 
          subtext: "Clean, filtered, and aromatic",
          type: "B",
          icon: FaFillDrip
        },
        { 
          text: "Drip or French Press", 
          subtext: "Traditional, full-bodied, and simple",
          type: "C",
          icon: GiCoffeePot
       }
      ]
    }
  ],
  results: {
    A: { 
      title: "Intense & Powerful", 
      tags: ["PROFIL A", "DARK ROAST"],
      notes: ["Woody Notes", "Spices"],
      image: "assets/results/dark-roast.webp",
      desc: "Based on your choices, you are looking for a deep sensory experience. Your preferred profiles lean towards intense roasting, where the sugar in the coffee bean has completely caramelized.",
      why: "You preferred brewing methods like Espresso or Moka Pot and seek a full body with low acidity."
    },
    B: { 
      title: "Complex & Elegant", 
      tags: ["PROFIL B", "LIGHT ROAST"],
      notes: ["Floral", "Citrus"],
      image: "assets/results/light-roast.webp",
      desc: "You appreciate the subtle nuances of coffee. You enjoy high acidity and tea-like clarity in your cup.",
      why: "Your preference for pour-over methods suggests a palate that enjoys discovering hidden floral notes."
    },
    C: { 
      title: "Smooth & Balanced", 
      tags: ["PROFIL C", "MEDIUM ROAST"],
      notes: ["Caramel", "Roasted Nuts"],
      image: "assets/results/medium-roast.webp",
      desc: "You look for comfort in your coffee. A perfectly balanced cup with natural sweetness and a smooth finish.",
      why: "You enjoy traditional brewing and a versatile profile that works perfectly every single morning."
    },
    MIX: { 
      title: "The Explorer Blend", 
      tags: ["SPECIAL", "HOUSE BLEND"],
      notes: ["Chocolate", "Red Fruits"],
      image: "assets/results/house-blend.webp",
      desc: "You don't like to be boxed in! You enjoy a bit of everything: the body of a dark roast with the fruitiness of a light one.",
      why: "Your varied answers suggest a curiosity for complex blends that change character as they cool down."
    }
  }
};

export const calculateResult = (answers) => {
  const counts = answers.reduce((acc, t) => { 
    acc[t] = (acc[t] || 0) + 1; 
    return acc; 
  }, {});

  const maxVotes = Math.max(...Object.values(counts));

  const winners = Object.keys(counts).filter(key => counts[key] === maxVotes);

  if (winners.length > 1) {
    return 'MIX';
  }

  return winners[0];
};