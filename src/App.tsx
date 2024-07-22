import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '@/styles/globals.css';
import '@/styles/tailwind.css';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Detail } from './pages/Detail';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail/:id/:media_type' element={<Detail />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
