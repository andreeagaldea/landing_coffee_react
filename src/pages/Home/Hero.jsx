import './Home.css'

function Hero() {

  return (
    <div id="hero" className="background background-filter bg-cover bg-center flex items-center justify-center 
                min-h-[calc(100vh-var(--nav-height,0px))] ">
      <div className="content flex flex-col lg:flex-row w-full items-center justify-center max-w-7xl">
        <div className='w-full lg:w-1/2 p-5 flex flex-col justify-center'>
          <h1 className="text-white text-6xl font-bold pb-5 text-center lg:text-left">
            Pure <span className='special-text'>Artistry</span> In Every Bean.</h1>
          <p className='text-light opacity-75 text-center lg:text-left'>
            Redefining the standard of premium coffee. Experience a curated 
            journey from the worlds's moste exclusive high-altitude estates to your morning ritual.</p>
        </div>
        <div className='w-full lg:w-1/2 flex justify-center lg:justify-end p-5 relative'>
          <img src="../../src/assets/coffee-bag.png" alt="" className='' style={{maxHeight:'550px', zIndex:10}}/>
          <div className='beans'>
            <img src="../../src/assets/beans/1.png" alt="" className='absolute' 
              style={{zIndex:11, right:0, bottom:'-7%'}}/>
            {/* <img src="../../src/assets/beans/2.png" alt="" className='absolute' 
              style={{zIndex:11, right:0, top:0, }}/> */}
            <img src="../../src/assets/beans/3.png" alt="" className='absolute' 
              style={{zIndex:11, right:'7%', top: '2%', }}/>
            <img src="../../src/assets/beans/4.png" alt="" className='absolute' 
              style={{zIndex:1, right:0, left:'15%', bottom:0, maxHeight: '380px', filter: 'blur(1px)'}}/>
          </div>
          </div>
      </div>
    </div>

  );
}

export default Hero
