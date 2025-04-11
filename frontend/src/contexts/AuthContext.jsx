import { createContext, useState, useContext, useEffect } from 'react';
import { ToasterContext } from './ToasterContext';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [user, setUser] = useState(() => {
  //   const u = JSON.parse(localStorage.getItem("user"))
  //   return u ? u : null
  // });
  const { toaster } = useContext(ToasterContext);
  const navigate = useNavigate();

  const signup = async (formState) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(formState),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token, message, user } = await res.json();
      if (!res.ok) throw new Error(message);
      setUser(user);
      localStorage.setItem('token', token);
      toaster.success(`Welcome on board, ${user.firstName}`);
      navigate('/books');
    } catch (error) {
      toaster.error(error.message);
      // console.log(error);
    }
  };

  const login = async (formState) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify(formState),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token, message, data } = await res.json();
      console.log(res);
      if (!res.ok) throw new Error(message);
      setUser(data);
      localStorage.setItem('token', token);
      toaster.success(`Welcome back, ${data.firstName}`);
      navigate('/books');
    } catch (error) {
      toaster.error(error.message);
      // console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      const { message } = await res.json();
      if (!res.ok) throw new Error(message);
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (error) {
      toaster.error(error.message);
    }
  };

  const sendMe = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        credentials: 'include',
      });
      const { message, data } = await res.json();
      if (!res.ok) throw new Error(message);
      setUser(data);
      toaster.success(`Welcome back ${data.firstName}!`);
    } catch (error) {
      toaster.toast('Log in again, please');
      logout();
    }
  };

  useEffect(() => {
    sendMe();
  }, []);

  return <AuthContext.Provider value={{ signup, login, logout, user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
