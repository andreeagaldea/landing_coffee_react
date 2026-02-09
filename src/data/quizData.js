export const quizData = {
  questions: [
    {
      id: 1,
      text: "How do you usually start your morning?",
      options: [
        { text: "With a strong energy boost", type: "A" },
        { text: "Savoring complex flavors", type: "B" },
        { text: "Something smooth & creamy", type: "C" }
      ]
    },
    {
      id: 2,
      text: "What flavor profile do you prefer?",
      options: [
        { text: "Dark, chocolatey & bold", type: "A" },
        { text: "Fruit-forward & floral", type: "B" },
        { text: "Nutty & caramel sweetness", type: "C" }
      ]
    },
    {
      id: 3,
      text: "How do you brew your coffee?",
      options: [
        { text: "Espresso or Moka Pot", type: "A" },
        { text: "Pour-over or Chemex", type: "B" },
        { text: "Drip or French Press", type: "C" }
      ]
    }
  ],
  results: {
    A: { title: "The Bold Adventurer", desc: "You need our Dark Sumatra Roast." },
    B: { title: "The Connoisseur", desc: "Try our Ethiopian Yirgacheffe." },
    C: { title: "The Classic Soul", desc: "Our Colombian Medium Roast is yours." },
    MIX: { title: "The Explorer", desc: "Our Signature House Blend fits you best." }
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