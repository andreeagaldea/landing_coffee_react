import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef(null);

  useEffect(() => {
    if (navRef.current) {
      const height = navRef.current.offsetHeight;
      document.documentElement.style.setProperty('--nav-height', `${height}px`);
    }
  }, []);

  return (
    <nav ref={navRef} className='bg-dark-brown border-b border-[#12100E] px-8 py-4'>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        <div className="font-bold text-2xl text-white">Logo</div>

        <button className="text-white md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        <ul className={`
          flex flex-col md:flex-row items-center gap-5 list-none
          absolute md:static bg-dark-brown left-0 w-full md:w-auto p-5 md:p-0
          transition-all duration-300 ease-in
          ${isOpen ? 'top-[60px] opacity-100' : 'top-[-400px] opacity-0 md:opacity-100'}
          md:top-0 z-50
        `}>
          <li>
            <Link to="/" className="text-white hover:text-orange-400" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-orange-400" onClick={() => setIsOpen(false)}>Contact</Link>
          </li>
          <li>
            <Link to="/quiz" className="cta-button inline-block" onClick={() => setIsOpen(false)}>Quiz</Link>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;