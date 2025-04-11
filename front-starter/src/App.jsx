import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Books from './pages/Books';
import ReadingList from './pages/ReadingList';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='signup' element={<Signup />} />
        <Route path='books' element={<Books />} />
        <Route path='reading-list' element={<ReadingList />} />
      </Route>
    </Routes>
  );
}

export default App;
