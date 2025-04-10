import { Link } from 'react-router-dom';

const UserMenu = () => {
  return (
    <>
      <search>
        <input type='text' placeholder='Search' className='input input-bordered w-24 md:w-auto' />
      </search>
      <nav>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img
                alt='Tailwind CSS Navbar component'
                src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              />
            </div>
          </div>
          <ul tabIndex={0} className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'>
            <li>
              <Link to={'/books'} className='justify-between'>
                Books
              </Link>
            </li>
            <li>
              <Link to={'/reading-list'}>Reading List</Link>
            </li>
            <li>
              <button onClick={() => alert('LOGOUT')}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default UserMenu;
