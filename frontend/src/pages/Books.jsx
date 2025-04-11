import { useContext, useEffect, useState } from 'react';
import { ToasterContext } from '../contexts/ToasterContext.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';

const Books = () => {
  const [books, setBooks] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('unset'); // unset, pending, success, error
  const { toaster } = useContext(ToasterContext);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchBooks = async () => {
      setStatus('pending');

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/books?page=${page}&limit=3`);
        const { data, message } = await res.json();
        if (!res.ok) throw new Error(message);
        setBooks(data);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        toaster.error(error.message);
      }
    };

    fetchBooks();
  }, [page]);

  const changeReadingList = async (bookId, method) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}/books/${bookId}`, {
        method,
        credentials: 'include',
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        // },
      });

      const { data, message } = await res.json();
      if (!res.ok) throw new Error(message);
      setUser(data);
    } catch (error) {
      toaster.error(error.message);
    }
  };

  return (
    <>
      <h1>Books 📚</h1>
      <div className='grid grid-cols-[2rem_1fr_1fr_1fr_2rem] gap-5 my-10'>
        {/* {status === 'pending' && <span className='loading loading-bars loading-xl col-span-5'></span>} */}
        <button onClick={() => setPage((prev) => (prev === 1 ? 7 : prev - 1))} className='btn btn-circle self-center'>
          ❮
        </button>
        {books &&
          books.map((book, ind) => {
            const isOnReadingList = user && user.readingList.some((b) => b.bookRefId === book._id);
            const method = isOnReadingList ? 'DELETE' : 'POST';
            return (
              <div key={book._id} className='card bg-base-100 w-80 shadow-sm border'>
                <figure className='px-10 pt-10 min-h-60'>
                  <img height={240} src={`https://picsum.photos/200?random=${ind}`} alt='' className='rounded-xl' />
                </figure>
                <div className='card-body items-center text-center'>
                  <h2 className='card-title'>{book.title}</h2>
                  <h3 className='card-title text-sm'>{book.author}</h3>
                  <p>{book.description}</p>
                  <div className='card-actions'>
                    {user && (
                      <button onClick={() => changeReadingList(book._id, method)} className='btn btn-primary'>
                        {isOnReadingList ? 'Remove from' : 'Add to'} reading List
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

        <button onClick={() => setPage((prev) => (prev === 7 ? 1 : prev + 1))} className='btn btn-circle self-center'>
          ❯
        </button>
      </div>
    </>
  );
};

export default Books;
