import { useEffect, useRef } from 'react';
import Parallax from 'parallax-js';
import { animate, createScope, stagger, splitText} from 'animejs';
import './Home.css'

function Hero() {
  const sceneRef = useRef(null);
  const scope = useRef(null);

  const titleRef = useRef(null);
  const paragraphRef = useRef(null);


  useEffect(() => {
    let parallaxInstance;
    if (sceneRef.current) {
      parallaxInstance = new Parallax(sceneRef.current, {
        relativeInput: true,
        hoverOnly: true,
        selector: '.layer' 
      });
    }

    scope.current = createScope({ root: sceneRef.current }).add( self => {

      animate('#coffeeBag', {
        translateY: [0, 10],
        translateX: [10, 0],
        duration: 2000,
        easing: 'inQuad',
        loop: true,
        alternate: true,
        delay: 300,
      });

    if (titleRef.current) {
      const splitTitle = splitText(titleRef.current, { words: true, chars: true });
      if (splitTitle.chars && splitTitle.chars.length > 0) {
        animate(splitTitle.chars, {
          opacity: [0, 1],
          translateX: [-20, 0],
          duration: 600,
          easing: 'outQuad',
          delay: stagger(50),
        });
      }
    }

    if (paragraphRef.current) {
      
        animate('#hero p', {
          opacity: [0, 1],
          duration: 500,
          easing: 'outQuad',
          delay: 2000,
        });
    }

    });

    return () => {
      parallaxInstance?.destroy();
      if (scope.current && typeof scope.current.revert === 'function') {
        scope.current.revert();
      }
    }

  }, []);

  return (
    <section id="hero" ref={sceneRef} 
                className="background background-filter bg-cover bg-center flex items-center justify-center 
                min-h-[calc(100vh-var(--nav-height,0px))] overflow-hidden">
      <div className="content flex flex-col lg:flex-row w-full items-center justify-center max-w-7xl">

        <div className='w-full lg:w-1/2 p-5 flex flex-col justify-center'>
          <h1 ref={titleRef} className="text-white text-7xl md:text-8xl font-bold pt-5 pb-5 text-center lg:text-left">
            Pure <span className='special-text'>Artistry</span> In Every Bean.</h1>
          <p ref={paragraphRef} className='text-light opacity-75 text-center lg:text-left' style={{opacity:0}}>
            Redefining the standard of premium coffee. Experience a curated 
            journey from the worlds's moste exclusive high-altitude estates to your morning ritual.</p>
        </div>

        <div className='w-full lg:w-1/2 min-h-[550px] relative'>
          
          <div className="layer absolute inset-0 w-full h-full" data-depth="0.1" style={{ zIndex: 1 }}>
            <img src="../../src/assets/beans/4.png" className="absolute opacity-60" alt="coffe bean 4" loading="lazy"
                 style={{ left: '10%', top: '10%', maxHeight: '400px', filter: 'blur(4px)' }} />
          </div>

          <div className="layer absolute inset-0 w-full h-full flex justify-center lg:justify-end" data-depth="0.2" style={{ zIndex: 5 }}>
            <img src="../../src/assets/coffee-bag.png" alt="Coffee Bag" style={{ maxHeight: '550px' }} id="coffeeBag" loading="lazy"/>
          </div>

          <div className="layer absolute inset-0 w-full h-full" data-depth="0.4" style={{ zIndex: 10 }}>
            <img src="../../src/assets/beans/3.png" className="absolute" style={{ right: '25%', top: '5%' }} alt="coffe bean 3" loading="lazy"/>
          </div>

          <div className="layer absolute inset-0 w-full h-full" data-depth="0.6" style={{ zIndex: 11 }}>
            <img src="../../src/assets/beans/1.png" className="absolute" style={{ right: '5%', bottom: '5%' }} alt="coffe bean 1" loading="lazy"/>
          </div>

        </div>

      </div>
    </section>

  );
}

export default Hero
