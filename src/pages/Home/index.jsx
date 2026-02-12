import Hero from './Hero';
import CoffeeGallery from './CoffeeGallery';
import Quiz from './Quiz';
import './Home.css';

const Home = () => {
  return (
    <div >
      <Hero />
      <CoffeeGallery />
      <Quiz />
    </div>
  );
};

export default Home;