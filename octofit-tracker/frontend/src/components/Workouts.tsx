import { useEffect, useState } from 'react';
import { fetchApi, normalizeApiResponse } from '../lib/api';

interface Workout {
  _id?: string;
  title: string;
  durationMinutes: number;
  intensity: 'low' | 'medium' | 'high';
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/api/workouts')
      .then((data) => setWorkouts(normalizeApiResponse<Workout>(data)))
      .catch((error) => setError(error?.message || 'Failed to load workouts'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2 className="mb-4">Workouts</h2>
      {loading && <div className="alert alert-secondary">Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Intensity</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id ?? `${workout.title}-${workout.durationMinutes}`}>
                  <td>{workout.title}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{workout.intensity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
