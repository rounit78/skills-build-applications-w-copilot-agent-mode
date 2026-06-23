import { useEffect, useState } from 'react';
import { fetchApi, normalizeApiResponse } from '../lib/api';

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/api/users/')
      .then((data) => setUsers(normalizeApiResponse<User>(data)))
      .catch((error) => setError(error?.message || 'Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2 className="mb-4">Users</h2>
      {loading && <div className="alert alert-secondary">Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? `${user.email}-${user.name}`}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
