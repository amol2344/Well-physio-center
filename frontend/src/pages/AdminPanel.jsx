import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ROLES = ["user", "admin", "Physiotherapist"];

export default function AdminPanel() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingUid, setUpdatingUid] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(`${API_BASE}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch users");
      setUsers(data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleRoleChange = async (targetUid, newRole) => {
    setUpdatingUid(targetUid);
    setError("");
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(`${API_BASE}/api/admin/set-role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetUid, newRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update role");

      setUsers((prev) =>
        prev.map((u) => (u.uid === targetUid ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingUid(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-orange-600 bg-clip-text text-transparent mb-6">
        Admin Panel — Manage Users
      </h1>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading users...</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-600 text-sm">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.uid} className="border-t border-slate-100">
                  <td className="px-6 py-4">{u.name || "—"}</td>
                  <td className="px-6 py-4 text-slate-600">{u.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.role === "admin"
                          ? "bg-orange-100 text-orange-700"
                          : u.role === "Physiotherapist"
                          ? "bg-teal-100 text-teal-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={u.role}
                      disabled={u.uid === currentUser.uid || updatingUid === u.uid}
                      onChange={(e) => handleRoleChange(u.uid, e.target.value)}
                      className="px-3 py-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}