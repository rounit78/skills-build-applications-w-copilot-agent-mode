import { useEffect, useState } from 'react';
import { fetchApi, normalizeApiResponse } from '../lib/api';

interface Team {
  _id?: string;
  name: string;
  members?: Array<{ name?: string } | string>;
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/api/teams')
      .then((data) => setTeams(normalizeApiResponse<Team>(data)))
      .catch((error) => setError(error?.message || 'Failed to load teams'))
      .finally(() => setLoading(false));
  }, []);

  const renderMembers = (members?: Team['members']) => {
    if (!members || members.length === 0) {
      return 'No members';
    }
    return members
      .map((member) => (typeof member === 'string' ? member : member.name ?? 'Unknown'))
      .join(', ');
  };

  return (
    <section>
      <h2 className="mb-4">Teams</h2>
      {loading && <div className="alert alert-secondary">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id ?? team.name}>
                  <td>{team.name}</td>
                  <td>{renderMembers(team.members)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
