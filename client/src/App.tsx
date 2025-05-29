import { Route, Routes } from 'react-router-dom';
import BoardsList from './features/boards/BoardsList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BoardsList />} />
      </Routes>
    </div>
  );
}

export default App;
