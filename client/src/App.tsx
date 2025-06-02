import { Route, Routes } from 'react-router-dom';
import BoardsList from './features/boards/BoardsList';
import BoardPage from './features/boards/BoardPage';
import NavBar from './features/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/boards" element={<BoardsList />} />
        <Route path="/boards/:id" element={<BoardPage />} />
      </Routes>
    </div>
  );
}

export default App;
