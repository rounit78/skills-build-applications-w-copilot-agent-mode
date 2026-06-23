import { useEffect, useState } from 'react';
import { fetchApi, normalizeApiResponse } from '../lib/api';

interface Activity {
  _id?: string;
  userId?: { name?: string } | string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/api/activities/')
      .then((data) => setActivities(normalizeApiResponse<Activity>(data)))
      .catch((error) => setError(error?.message || 'Failed to load activities'))
      .finally(() => setLoading(false));
  }, []);

  const getUserName = (userId: Activity['userId']) => {
    if (!userId) return 'Unknown';
    if (typeof userId === 'string') return userId;
    return userId.name ?? 'Unknown';
  };

  return (
    <section>
      <h2 className="mb-4">Activities</h2>
      {loading && <div className="alert alert-secondary">Loading activities...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Activity</th>
                <th>Duration</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.type}-${activity.durationMinutes}-${activity.caloriesBurned}`}>
                  <td>{getUserName(activity.userId)}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
