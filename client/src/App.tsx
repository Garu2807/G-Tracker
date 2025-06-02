import { Route, Routes } from 'react-router-dom';
import BoardsList from './features/boards/BoardsList';
import BoardPage from './features/boards/BoardPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BoardsList />} />
        <Route path="/boards/:id" element={<BoardPage />} />
      </Routes>
    </div>
  );
}

export default App;
