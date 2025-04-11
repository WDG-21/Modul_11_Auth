import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

const VisitorMenu = () => {
  const [pending, setPending] = useState(false);
  const [formState, setFormState] = useState({ email: '', password: '' });
  const dialogRef = useRef(null);

  const handleInput = (e) => setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    alert('LOGIN');
  };

  return (
    <>
      <nav>
        <ul className='menu menu-vertical sm:menu-horizontal bg-base-200 rounded-box'>
          <li>
            <Link to={'/signup'}>Sign Up</Link>
          </li>
          <li>
            <button onClick={() => dialogRef.current?.showModal()}>Login</button>
          </li>
        </ul>
      </nav>
      <dialog ref={dialogRef} id='my_modal_1' className='modal' data-testid='dialog'>
        <form method='dialog' onSubmit={handleSubmit}>
          <fieldset className='fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box'>
            <legend className='fieldset-legend'>Login</legend>

            <label className='fieldset-label' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              className='input'
              placeholder='Email'
              name='email'
              value={formState.email}
              onChange={handleInput}
              id='email'
            />

            <label className='fieldset-label' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              className='input'
              placeholder='Password'
              name='password'
              value={formState.password}
              onChange={handleInput}
              id='password'
            />

            <div className='mt-3 text-right'>
              <button className='btn btn-neutral  mr-5' type='submit' disabled={pending}>
                {pending ? <span className='loading loading-spinner text-secondary'></span> : <span>Login</span>}
              </button>
              <button className='btn btn-neutral' type='button' onClick={() => dialogRef.current?.close()}>
                Close
              </button>
            </div>
          </fieldset>
        </form>
      </dialog>
    </>
  );
};

export default VisitorMenu;
