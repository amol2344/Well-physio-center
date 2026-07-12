import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
   serverTimestamp,
} from "firebase/firestore";

import {
  FiUsers,
  FiMail,
  FiTag,
  FiHome,
  FiSearch,
} from "react-icons/fi";

import { db } from "../firebase/firebase";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const ROLES = [
  { value: "patient", label: "Patient" },
  { value: "admin", label: "Admin" },
  { value: "sysadmin", label: "Physiotherapist" },
];
const TABS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: FiHome,
  },
  {
    id: "users",
    label: "User Management",
    icon: FiUsers,
  },
  {
    id: "contacts",
    label: "Contact Requests",
    icon: FiMail,
  },
  {
    id: "plans",
    label: "Subscription Requests",
    icon: FiTag,
  },
];

export default function AdminPanel() {
  const { currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [plans, setPlans] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingUid, setUpdatingUid] = useState(null);

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [search, setSearch] =
    useState("");
  // =============================
  // Fetch Users from Backend
  // =============================

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const token =
        await currentUser.getIdToken();

      const res = await fetch(
        `${API_BASE}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok)
        throw new Error(
          data.error || "Failed to fetch users"
        );

      setUsers(data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  if (currentUser) {
    console.log("UID:", currentUser.uid);
  }
}, [currentUser]);
  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  // =============================
  // Live Contact Messages
  // =============================


useEffect(() => {
  if (!currentUser) return;

  const q = query(
    collection(db, "contactRequests"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      console.log("✅ Contact listener works");

      setContacts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    },
    (error) => {
      console.log("CONTACT LISTENER FAILED");
      console.log(error.code);
      console.log(error.message);
    }
  );

  return unsubscribe;
}, [currentUser]);

  // =============================
  // Live Subscription Requests
  // =============================

  
 useEffect(() => {
  if (!currentUser) return;

  const q = query(
    collection(db, "planInquiries"),
    orderBy("createdAt", "desc")
  );
const unsubscribe = onSnapshot(
  q,
  (snapshot) => {
    console.log("✅ Plan listener works");
    setPlans(snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })));
  },
  (error) => {
    console.log("PLAN LISTENER FAILED");
    console.log(error.code);
    console.log(error.message);
  }
);

  return unsubscribe;
}, [currentUser]);
    // =============================
  // Change User Role
  // =============================

  const handleRoleChange = async (targetUid, newRole) => {
    setUpdatingUid(targetUid);
    setError("");

    try {
      const token = await currentUser.getIdToken();

      const res = await fetch(
        `${API_BASE}/api/admin/set-role`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            targetUid,
            newRole,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok)
        throw new Error(
          data.error || "Failed to update role"
        );

      setUsers((prev) =>
        prev.map((user) =>
          user.uid === targetUid
            ? {
                ...user,
                role: newRole,
              }
            : user
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingUid(null);
    }
  };

  // =============================
  // Delete Contact Message
  // =============================

  const deleteContact = async (id) => {
    const ok = window.confirm(
      "Delete this contact message?"
    );

    if (!ok) return;

    try {
      await deleteDoc(
        doc(db, "contactRequests", id)
      );
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  // =============================
  // Mark Contact as Read
  // =============================
const completePlan = async (id) => {
  try {
    await updateDoc(doc(db, "planInquiries", id), {
      status: "Completed",
      completedAt: serverTimestamp(),
    });

    alert("Subscription marked as completed successfully ✅");

  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};


  const markContactRead = async (id) => {
    try {
      await updateDoc(
        doc(db, "contactRequests", id),
        {
          status: "Read",
        }
      );
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  // =============================
  // Approve Subscription
  // =============================

  const approvePlan = async (id) => {
  try {
    await updateDoc(doc(db, "planInquiries", id), {
      status: "Active",
      approvedAt: serverTimestamp(),
    });

    alert("Subscription approved successfully ✅");

  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

  // =============================
  // Reject Subscription
  // =============================

  const rejectPlan = async (id) => {
  try {
    await updateDoc(doc(db, "planInquiries", id), {
      status: "Rejected",
    });

    alert("Subscription rejected successfully ❌");

  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

  // =============================
  // Delete Subscription
  // =============================

  const deletePlan = async (id) => {
    const ok = window.confirm(
      "Delete this subscription request?"
    );

    if (!ok) return;

    try {
      await deleteDoc(
        doc(db, "planInquiries", id)
      );
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  // =============================
  // Search Users
  // =============================

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      (user.name || "")
        .toLowerCase()
        .includes(value) ||
      (user.email || "")
        .toLowerCase()
        .includes(value) ||
      (user.role || "")
        .toLowerCase()
        .includes(value)
    );
  });

    return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-orange-600 bg-clip-text text-transparent">

              Admin Dashboard

            </h1>

            <p className="text-slate-500 mt-2">
              Welcome back, Administrator
            </p>

          </div>

        </div>

        {/* Error */}

        {error && (

          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6">

            {error}

          </div>

        )}

        {/* Navigation */}

        <div className="bg-white rounded-2xl shadow mb-8">

          <div className="flex gap-2 p-3 border-b overflow-x-auto">

            {TABS.map((tab) => {

              const Icon = tab.icon;

              return (

                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl transition

                  ${
                    activeTab === tab.id
                      ? "bg-teal-600 text-white"
                      : "hover:bg-slate-100"
                  }`}

                >

                  <Icon />

                  {tab.label}

                </button>

              );

            })}

          </div>

        </div>

        {/* Dashboard */}

        {activeTab === "dashboard" && (

          <>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">

              <div className="bg-white rounded-2xl shadow p-6">

                <h3 className="text-slate-500">
                 Total Registered Users
                </h3>

                <p className="text-4xl font-bold mt-3 text-teal-600">

                  {users.length}

                </p>

              </div>

              <div className="bg-white rounded-2xl shadow p-6">

                <h3 className="text-slate-500">

                  Contact Messages

                </h3>

                <p className="text-4xl font-bold mt-3 text-orange-600">

                  {contacts.length}

                </p>

              </div>

              <div className="bg-white rounded-2xl shadow p-6">

                <h3 className="text-slate-500">

                  Subscription Requests

                </h3>

                <p className="text-4xl font-bold mt-3 text-teal-700">

                  {plans.length}

                </p>

              </div>

            </div>

            {/* Recent Activity */}

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-2xl font-bold mb-5">

                System Overview

              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <div className="border rounded-xl p-5">

                  <h3 className="font-semibold mb-3">

                    Latest Contact Message

                  </h3>

                  {contacts.length === 0 ? (

                    <p>No messages available.</p>

                  ) : (

                    <>
                      <p>

                        <b>Name:</b> {contacts[0].name}

                      </p>

                      <p>

                        <b>Email:</b> {contacts[0].email}

                      </p>

                      <p className="text-slate-500 mt-2">

                        {contacts[0].message}

                      </p>
                    </>

                  )}

                </div>

                <div className="border rounded-xl p-5">

                  <h3 className="font-semibold mb-3">

                    Latest Subscription

                  </h3>

                  {plans.length === 0 ? (

                    <p>No subscription requests.</p>

                  ) : (

                    <>
                      <p>

                        <b>Name:</b> {plans[0].name}

                      </p>

                      <p>

                        <b>Plan:</b> {plans[0].plan}

                      </p>

                      <p>

                        <b>Email:</b> {plans[0].email}

                      </p>

                      <span className="inline-block mt-3 px-3 py-1 bg-yellow-100 rounded-full text-sm">

                        {plans[0].status || "Pending"}

                      </span>

                    </>

                  )}

                </div>

              </div>

            </div>

          </>

        )}
                {/* ================= USERS ================= */}

        {activeTab === "users" && (

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
  Patient & Staff Management
</h2>

              <input
                type="text"
               placeholder="Search patients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-xl px-4 py-2 w-72"
              />

            </div>

            {loading ? (

              <p>Loading users...</p>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-slate-100">

                    <tr>

                      <th className="text-left px-4 py-3">

                        Name

                      </th>

                      <th className="text-left px-4 py-3">

                        Email

                      </th>

                      <th className="text-left px-4 py-3">

                        Role

                      </th>

                      <th className="text-left px-4 py-3">

                        Change Role

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredUsers.map((user) => (

                      <tr
                        key={user.uid}
                        className="border-b"
                      >

                        <td className="px-4 py-4 font-medium">

                          {user.name || "No Name"}

                        </td>

                        <td className="px-4 py-4">

                          {user.email}

                        </td>

                        <td className="px-4 py-4">

                      <span
  className={`px-3 py-1 rounded-full text-sm ${
    user.role === "sysadmin"
      ? "bg-purple-100 text-purple-700"
      : user.role === "admin"
      ? "bg-orange-100 text-orange-700"
      : "bg-teal-100 text-teal-700"
  }`}
>
  {user.role === "sysadmin"
    ? "Physiotherapist"
    : user.role === "admin"
    ? "Admin"
    : "Patient"}
</span>


                        </td>

                        <td className="px-4 py-4">

                          <select
                            value={user.role}
                            disabled={
                              user.uid === currentUser.uid ||
                              updatingUid === user.uid
                            }
                            onChange={(e) =>
                              handleRoleChange(
                                user.uid,
                                e.target.value
                              )
                            }
                            className="border rounded-lg px-3 py-2"
                          >

                            {ROLES.map((role) => (
  <option key={role.value} value={role.value}>
    {role.label}
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

        )}
        {/* ================= CONTACT MESSAGES ================= */}

{activeTab === "contacts" && (

<div className="bg-white rounded-2xl shadow-lg p-6">

<div className="flex justify-between items-center mb-6">

<h2 className="text-2xl font-bold">

Contact Messages

</h2>

<span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full">

{contacts.length} Messages

</span>

</div>

{contacts.length === 0 ? (

<div className="text-center py-16 text-slate-500">

No Contact Messages Found

</div>

) : (

<div className="space-y-5">

{contacts.map((contact) => (

<div
key={contact.id}
className="border rounded-2xl p-6 hover:shadow-md transition"
>

<div className="flex justify-between items-start">

<div>

<h3 className="text-xl font-semibold">

{contact.name}

</h3>

<p className="text-slate-500">

{contact.email}

</p>

</div>

<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

New

</span>

</div>

<div className="grid md:grid-cols-2 gap-4 mt-5">

<div>

<p>

<b>Phone</b>

</p>

<p className="text-slate-600">

{contact.phone || "-"}

</p>

</div>

<div>

<p>

<b>Submitted</b>

</p>

<p className="text-slate-600">

{contact.createdAt?.seconds
? new Date(
contact.createdAt.seconds * 1000
).toLocaleString()
: "-"}

</p>

</div>

</div>

<div className="mt-5">

<p className="font-semibold mb-2">

Message

</p>

<div className="bg-slate-50 rounded-xl p-4">

<p className="text-slate-700 whitespace-pre-wrap">

{contact.message}

</p>

</div>

</div>

<div className="flex gap-3 mt-6">

<a
href={`mailto:${contact.email}`}
className="px-5 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition"
>

Reply

</a>

{contact.phone && (

<a
href={`tel:${contact.phone}`}
className="px-5 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
>

Call

</a>

)}

</div>

</div>

))}

</div>

)}

</div>

)}
{/* ================= SUBSCRIPTION REQUESTS ================= */}

{activeTab === "plans" && (

<div className="bg-white rounded-2xl shadow-lg p-6">

<div className="flex justify-between items-center mb-6">

<h2 className="text-2xl font-bold">

Subscription Requests

</h2>

<span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full">

{plans.length} Requests

</span>

</div>

{plans.length === 0 ? (

<div className="text-center py-16 text-slate-500">

No Subscription Requests Found

</div>

) : (

<div className="space-y-5">

{plans.map((plan) => (

<div
key={plan.id}
className="border rounded-2xl p-6 hover:shadow-md transition"
>

<div className="flex justify-between items-start">

<div>

<h3 className="text-xl font-semibold">

{plan.name}

</h3>

<p className="text-slate-500">

{plan.email}

</p>

</div>

<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

New Request

</span>

</div>

<div className="grid md:grid-cols-2 gap-5 mt-5">

<div>

<p>

<b>Phone</b>

</p>

<p className="text-slate-600">

{plan.phone || "-"}

</p>

</div>

<div>

<p>

<b>Selected Plan</b>

</p>

<p className="font-semibold text-teal-600">

{plan.plan || "-"}

</p>

</div>

<div>

<p>

<b>Submitted On</b>

</p>

<p className="text-slate-600">

{plan.createdAt?.seconds
? new Date(plan.createdAt.seconds * 1000).toLocaleString()
: "-"}

</p>

</div>

<div>

<p>

<b>Status</b>

</p>

<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">

Pending

</span>

</div>

</div>

{plan.message && (

<div className="mt-5">

<p className="font-semibold mb-2">

Additional Notes

</p>

<div className="bg-slate-50 rounded-xl p-4">

<p className="text-slate-700 whitespace-pre-wrap">

{plan.message}

</p>

</div>

</div>

)}

<div className="flex flex-wrap gap-3 mt-6">

<a
href={`mailto:${plan.email}`}
className="px-5 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition"
>

Reply

</a>

{plan.phone && (

<a
href={`tel:${plan.phone}`}
className="px-5 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
>

Call

</a>

)}

{plan.status === "Pending" && (
  <>
    <button
      onClick={() => approvePlan(plan.id)}
      className="px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
    >
      Approve
    </button>

    <button
      onClick={() => rejectPlan(plan.id)}
      className="px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
    >
      Reject
    </button>
  </>
)}


{plan.status === "Active" && (
  <button
    onClick={() => completePlan(plan.id)}
    className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
  >
    Complete
  </button>
)}
</div>

</div>

))}

</div>

)}

</div>

)}

      </div>

    </div>

  );
}