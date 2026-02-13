import Hero from './Hero';
import Gallery from './Gallery';
import Quiz from './Quiz';
import Values from './Values';
import './Home.css';

const Home = () => {
  return (
    <div >
      <Hero />
      <Gallery />
      <Values />
      <Quiz />
    </div>
  );
};

export default Home;