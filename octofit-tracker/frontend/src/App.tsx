import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <main className="container py-5">
        <header className="mb-4 text-center">
          <h1 className="display-5">Octofit Tracker</h1>
          <p className="lead">A React 19 + Vite frontend for the Octofit multi-tier app.</p>
        </header>

        <div className="mb-4">
          <div className="btn-group d-flex flex-wrap" role="group">
            <Link className="btn btn-outline-primary m-1" to="/users">
              Users
            </Link>
            <Link className="btn btn-outline-primary m-1" to="/teams">
              Teams
            </Link>
            <Link className="btn btn-outline-primary m-1" to="/activities">
              Activities
            </Link>
            <Link className="btn btn-outline-primary m-1" to="/workouts">
              Workouts
            </Link>
            <Link className="btn btn-outline-primary m-1" to="/leaderboard">
              Leaderboard
            </Link>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>

        <footer className="mt-5 text-muted small">
          <p>
            If you are running in Codespaces, set <code>VITE_CODESPACE_NAME</code> in
            <code>.env.local</code> so the frontend connects to the correct backend URL.
          </p>
        </footer>
      </main>
    </BrowserRouter>
  );
}

export default App;
