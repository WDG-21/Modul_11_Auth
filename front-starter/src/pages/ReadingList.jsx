import { useContext, useEffect, useState } from 'react';
import { ToasterContext } from '../contexts/ToasterContext';

const bookStatus = ['read', 'pending', 'wishlist'];

const ReadingList = () => {
  const { user } = useContext(AuthContext);
  const { toaster } = useContext(ToasterContext);
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchReadingList = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`);
        const { data, message } = await res.json();
        if (!res.ok) throw new Error(message);
        setBooks(data.readingList);
      } catch {
        toaster.error('Failed to get your Reading List');
      }
    };

    fetchReadingList();
  }, [user, toaster]);

  return (
    <>
      <h1>ReadingList</h1>
      {books &&
        books.map((book) => {
          const { title, author, description, _id } = book.bookRefId;
          const statuses = bookStatus.filter((s) => s !== book.status);
          return (
            <div key={book._id} className='card card-dash bg-base-100 w-96'>
              <div className='card-body'>
                <h2 className='card-title'>{title}</h2>
                <p>{author}</p>
                <p>{description}</p>
                <div className='card-actions justify-end'>
                  <select
                    value={book.status}
                    className='select select-accent capitalize'
                    onChange={(e) => alert('HANDLE STATUS CHANGE')}
                  >
                    <option disabled={true}>{book.status}</option>
                    {statuses.map((s) => (
                      <option key={book._id + s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ReadingList;
