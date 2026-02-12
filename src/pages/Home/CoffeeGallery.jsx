import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

import { coffeeBeansData } from '../../data/coffeeBeansData';

import 'swiper/css';
import 'swiper/css/navigation';

function CoffeeGallery() {
  const [selectedBean, setSelectedBean] = useState(null);

  const openModal = (bean) => {
    setSelectedBean(bean);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedBean(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-24 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
      
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
                <span className="text-accent uppercase tracking-[0.2em] text-[10px] font-black">
                    Discovery Gallery
                </span>
                <h2 className="text-white text-4xl md:text-5xl font-bold mt-3 leading-tight">
                    Explore Our Origins
                </h2>
            </div>
        
        <div className="flex gap-4 relative z-10">
            <button className="cursor-pointer swiper-prev-custom p-4 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300">
                <FaArrowLeft size={16} />
            </button>
            <button className="cursor-pointer swiper-next-custom p-4 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300">
                <FaArrowRight size={16} />
            </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        slideToClickedSlide={true}
        speed={800}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        navigation={{
            nextEl: '.swiper-next-custom',
            prevEl: '.swiper-prev-custom',
        }}
        breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 20 },
            768: { slidesPerView: 2.3, spaceBetween: 30 },
            1024: { 
            slidesPerView: 3.5, 
            spaceBetween: 40 
            }
        }}
        className="!overflow-visible py-10" 
      >
        {[...coffeeBeansData, ...coffeeBeansData].map((bean, index) => (
          <SwiperSlide key={`${bean.id}-${index}`} className="h-full">
            <div className="card-inner group bg-[#12100E] border border-white/5 rounded-[2.5rem] p-6 h-full flex flex-col transition-all duration-500 hover:border-orange-300/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              
              {/* Imagine Card */}
              <div className="relative aspect-[4/5] rounded-[1.8rem] overflow-hidden mb-8">
                <img 
                  src={bean.image} 
                  alt={bean.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="flex-grow">
                <span className="inline-block bg-orange-100/10 text-accent text-[10px] font-bold uppercase py-1.5 px-4 rounded-full border border-orange-400/20 mb-4">
                  {bean.region}
                </span>
                <h3 className="text-white text-2xl font-bold mb-3">{bean.name}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8 line-clamp-2">
                  {bean.description}
                </p>
              </div>
              
              <button 
                onClick={() => openModal(bean)}
                className="cursor-pointer w-full py-4 border border-white/10 rounded-full text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
              >
                Discover Story
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


      {selectedBean && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity duration-300"
            onClick={closeModal}
          ></div>

          <div className="relative bg-[#12100E] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl flex flex-col md:flex-row border border-white/10 animate-in fade-in zoom-in duration-300">
            
            <button 
              onClick={closeModal}
              className="cursor-pointer absolute top-8 right-8 z-20 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all border border-white/10"
            >
              <FaTimes size={18} />
            </button>

            <div className="w-full md:w-[45%] h-[400px] md:h-auto overflow-hidden">
              <img 
                src={selectedBean.image} 
                alt={selectedBean.name} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:w-[55%] p-10 md:p-16 flex flex-col justify-center">
              <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                Origin Spotlight
              </span>
              <h2 className="text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
                {selectedBean.name}
              </h2>
              
              <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-10 border-t border-white/5 pt-10">
                <div>
                  <p className="text-zinc-500 uppercase text-[9px] font-black tracking-widest mb-1">Region</p>
                  <p className="text-white font-medium">{selectedBean.details.origin}</p>
                </div>
                <div>
                  <p className="text-zinc-500 uppercase text-[9px] font-black tracking-widest mb-1">Elevation</p>
                  <p className="text-white font-medium">{selectedBean.details.altitude}</p>
                </div>
                <div>
                  <p className="text-zinc-500 uppercase text-[9px] font-black tracking-widest mb-1">Processing</p>
                  <p className="text-white font-medium">{selectedBean.details.process}</p>
                </div>
                <div>
                  <p className="text-zinc-500 uppercase text-[9px] font-black tracking-widest mb-1">Notes</p>
                  <p className="text-accent font-medium">{selectedBean.details.notes.join(' • ')}</p>
                </div>
              </div>

              <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                <p className="text-zinc-400 text-base leading-relaxed italic font-light">
                  "{selectedBean.details.story}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      </div>
    </section>
  );
}

export default CoffeeGallery;