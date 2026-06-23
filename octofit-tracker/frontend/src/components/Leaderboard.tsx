import { useEffect, useState } from 'react';
import { fetchApi, normalizeApiResponse } from '../lib/api';

interface LeaderboardEntry {
  _id?: string;
  rank: number;
  name: string;
  score: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/api/leaderboard/')
      .then((data) => setLeaderboard(normalizeApiResponse<LeaderboardEntry>(data)))
      .catch((error) => setError(error?.message || 'Failed to load leaderboard'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2 className="mb-4">Leaderboard</h2>
      {loading && <div className="alert alert-secondary">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id ?? `${entry.rank}-${entry.name}`}>
                  <td>{entry.rank}</td>
                  <td>{entry.name}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
