import { Link } from 'react-router-dom';
import VisitorMenu from './VisitorMenu';
import { useContext } from 'react';

const Navbar = () => {
  return (
    <header className='navbar bg-base-100 shadow-sm'>
      <div className='flex-1'>
        <Link to={'/'} className='btn btn-ghost text-xl'>
          PersonalLibrary
        </Link>
      </div>
      <div className='flex gap-2'>
        <VisitorMenu />
      </div>
    </header>
  );
};

export default Navbar;
