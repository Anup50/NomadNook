import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import Button from '../layouts/Button';

const Navbar = () => {
  const backgroundColor = 'bg-white';
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth'
    });
  };
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <div className='fixed top-0  flex flex-row justify-between w-full p-5  bg-slate-900 text-white px-16 'style={{ zIndex: 100 }}>
      <div className='flex items-center'>
        <Link to="/">Nomad Nook</Link>
      </div>
      <nav className='flex flex-row items-center gap-12'>
      <ScrollLink to="hero" smooth={true} duration={500} className='cursor-pointer' onClick={() => scrollToSection('hero')}>Home</ScrollLink>
        <ScrollLink to="package" smooth={true} duration={500} className='cursor-pointer' onClick={() => scrollToSection('hero')}>Our Packages</ScrollLink>
        <ScrollLink to="features" smooth={true} duration={500} className='cursor-pointer' onClick={() => scrollToSection('hero')}>Why Us?</ScrollLink>
        <ScrollLink to="contactus" smooth={true} duration={500} className='cursor-pointer' onClick={() => scrollToSection('hero')}>Contact Us</ScrollLink>
      </nav>
     <div className='flex flex-row items-center gap-4'>
        {isLoggedIn ? (
          <>
            <span>{/* Display username here */}</span>
            <Button title='Logout' onClick={handleLogout} backgroundColor={backgroundColor} />
          </>
        ) : (
          <>
            <Link to="/register">
              <Button title='Register' backgroundColor={backgroundColor} />
            </Link>
            <Link to="/login">
              <Button title='Login' backgroundColor={backgroundColor}/>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
