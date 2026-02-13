import { FaGlobeAmericas, FaFire, FaFlask } from 'react-icons/fa';

export default function Values() {
  const philosophies = [
    {
      title: "Terroir & Origin",
      description: "Discover how geography, soil, and altitude define the character of our hand-picked beans.",
      icon: FaGlobeAmericas,
      label: "Learn More"
    },
    {
      title: "Roasting Alchemy",
      description: "The science of time and temperature. See how we unlock the hidden notes of every harvest.",
      icon: FaFire,
      label: "Watch Process"
    },
    {
      title: "Brewing Rituals",
      description: "Master the physics of extraction. From V60 to Aeropress, elevate your daily cup.",
      icon: FaFlask,
      label: "Brewing Guides"
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Philosophy of Flavor
          </h2>
          <div className="w-16 h-1 bg-orange-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {philosophies.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-8 border border-white/5 group-hover:border-orange-400/50 transition-colors duration-500">
                <item.icon className="text-accent text-2xl opacity-80 group-hover:opacity-100" />
              </div>

              <h3 className="text-xl font-bold mb-4 tracking-wide group-hover:text-orange-400 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-[280px]">
                {item.description}
              </p>
              
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100 transition-opacity cursor-default">
                {item.label}
              </span>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}