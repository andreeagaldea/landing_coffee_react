import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f8f8f8',
    borderBottom: '1px solid #ddd'
  };

  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>CoffeeLogo</div>
      <ul style={{ display: 'flex', gap: '20px', listStyle: 'none' }}>
        <li>
          <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>Home</Link>
        </li>
        <li>
          <Link to="/contact" style={{ textDecoration: 'none', color: 'blue' }}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;