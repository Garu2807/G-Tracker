import { Route, Routes } from 'react-router-dom';
import BoardsList from './features/boards/BoardsList';
import BoardPage from './features/boards/BoardPage';
import NavBar from './features/navbar/NavBar';
import TasksList from './features/tasks/TasksList';
import TaskPage from './features/tasks/TaskPage';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/boards" element={<BoardsList />} />
        <Route path="/boards/:id" element={<BoardPage />} />

        <Route path="/tasks" element={<TasksList />} />
        <Route path="/tasks/:id" element={<TaskPage />} />

      </Routes>
    </div>
  );
}

export default App;
