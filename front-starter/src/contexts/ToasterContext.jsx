/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const colors = {
  success: 'hsl(120, 61%, 50%)',
  error: 'hsl(0, 100%, 50%)',
  neutral: 'hsl(208, 37%, 45%)',
};

export const ToasterContext = createContext();

const ToasterProvider = ({ children, styles = { position: 'top-left' } }) => {
  const [messages, setMessages] = useState([]);

  const deleteToast = (msg) => setMessages((prev) => prev.filter((m) => m.id !== msg));

  const toaster = useRef({
    toast: (msg) => setMessages((prev) => [...prev, { msg, id: crypto.randomUUID(), state: 'neutral' }]),
    success: (msg) => setMessages((prev) => [...prev, { msg, id: crypto.randomUUID(), state: 'success' }]),
    error: (msg) => setMessages((prev) => [...prev, { msg, id: crypto.randomUUID(), state: 'error' }]),
  });

  return (
    <ToasterContext.Provider value={{ toaster: toaster.current }}>
      <ToastContainer styles={styles}>
        {messages.length >= 0 &&
          messages.map((msg, i) => (
            <Toast key={msg.id} message={msg} ind={i} deleteToast={deleteToast} styles={styles} />
          ))}
      </ToastContainer>
      {children}
    </ToasterContext.Provider>
  );
};

export default ToasterProvider;

const Toast = ({ message, ind, deleteToast, styles, duration = 3000 }) => {
  const { position } = styles;
  const isBottom = position?.includes('bottom');
  const [width, setWidth] = useState(100);
  const [toggle, setToggle] = useState(false);
  const [delay, setDelay] = useState(100 * ind + 700);

  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (delay > 0) {
        setDelay((d) => d - 100);
        return;
      }

      setWidth((w) => {
        if (w <= 0) {
          clearInterval(intervalRef.current);
          return 0;
        } else {
          return w - 10000 / duration;
        }
      });
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [toggle, duration, delay]);

  useEffect(() => {
    if (width > 0) return;

    const timeoutId = setTimeout(() => {
      deleteToast(message.id);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [width, deleteToast, message.id]);

  return (
    <div
      className={`toast ${isBottom ? 'enter-bottom' : ''} ${width !== 0 ? '' : isBottom ? 'leave-bottom' : 'leave'}`}
      style={{ animationDelay: `${ind * 100}ms` }}
      onMouseEnter={() => clearInterval(intervalRef.current)}
      onMouseLeave={() => setToggle((t) => !t)}
      onClick={() => {
        clearInterval(intervalRef.current);
        setWidth(0);
      }}
    >
      <p>{message.msg}</p>
      <div className='toast-bar' style={{ width: width + '%', backgroundColor: colors[message.state] }}></div>
    </div>
  );
};

const ToastContainer = ({ children, styles }) => {
  const { position } = styles;
  return <div className={`toaster ${children.length ? 'toast-container' : ''} ${position}`}>{children}</div>;
};
