import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import {
  FiCalendar,
  FiMail,
  FiTag,
  FiCheck,
  FiX,
  FiClock,
  FiUser,
  FiPhone,
} from "react-icons/fi";
import { getDoc } from "firebase/firestore";
const TABS = [
  {
    id: "appointments",
    label: "Appointments",
    icon: FiCalendar,
  },
];

function StatusBadge({ status }) {
const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-green-100 text-green-700",
    Declined: "bg-red-100 text-red-700",
};
  return (
   <span
  className={`px-3 py-1 rounded-full text-xs font-semibold ${
    styles[status] || styles.Pending
  }`}
>
  {status}
</span>
  );
}

export default function SysAdminDashboard() {
  const { currentUser, name } = useAuth();
  const [activeTab, setActiveTab] = useState("appointments");

  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
const [selectedAppointment, setSelectedAppointment] = useState(null);
const [appointmentDate, setAppointmentDate] = useState("");
const [appointmentTime, setAppointmentTime] = useState("");
  useEffect(() => {
    setLoading(true);

    const unsubAppointments = onSnapshot(
      query(collection(db, "appointments"), orderBy("createdAt", "desc")),
      (snap) => {
        setAppointments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      }
    );

    const unsubContacts = onSnapshot(
      query(collection(db, "contactRequests"), orderBy("createdAt", "desc")),
      (snap) => {
        setContacts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    );

    const unsubPlans = onSnapshot(
      query(collection(db, "planInquiries"), orderBy("createdAt", "desc")),
      (snap) => {
        setPlans(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    );

    return () => {
      unsubAppointments();
      unsubContacts();
      unsubPlans();
    };
  }, []);

  const handleAppointmentDecision = async (appointmentId) => {

  setUpdatingId(appointmentId);

  const appointmentRef = doc(db, "appointments", appointmentId);

  try {

    await runTransaction(db, async (transaction) => {

      const appointmentDoc = await transaction.get(appointmentRef);

      if (!appointmentDoc.exists()) {
        throw new Error("Appointment not found.");
      }

      const data = appointmentDoc.data();

      if (
    data.status === "Accepted" ||
    data.status === "Cancelled"
) {
        throw new Error("Already accepted by another physiotherapist.");
      }

      transaction.update(appointmentRef, {
        status: "Accepted",
        assignedDoctorId: currentUser.uid,
        assignedDoctorName: name || currentUser.email,
        updatedAt: new Date(),
      });

    });

  } catch (error) {

    alert(error.message);

  } finally {

    setUpdatingId(null);

  }

};
const openScheduleModal = (appt) => {
  setSelectedAppointment(appt);
  setAppointmentDate(appt.appointmentDate || "");
  setAppointmentTime(appt.appointmentTime || "");
};

const saveSchedule = async () => {
  try {
    await updateDoc(
      doc(db, "appointments", selectedAppointment.id),
      {
        appointmentDate,
        appointmentTime,
        updatedAt: new Date(),
      }
    );

    setSelectedAppointment(null);
  } catch (err) {
    console.error(err);
    alert("Unable to save schedule.");
  }
};
  const formatDate = (ts) => {
    if (!ts) return "—";
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleString();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-orange-600 bg-clip-text text-transparent">
          Physiotherapist Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Welcome{name ? `, ${name}` : ""} — manage patient requests below.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 font-medium text-sm border-b-2 transition-all ${
                isActive
                  ? "border-teal-600 text-teal-700"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon size={16} />
              {tab.label}
              {tab.id === "appointments" && (
                <span className="ml-1 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                  {appointments.filter((a) => a.status === "Pending").length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <>
          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="space-y-4">
              {appointments.length === 0 && (
                <p className="text-slate-500">No appointment requests yet.</p>
              )}
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
                >
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                        <FiUser className="text-teal-600" />
                        {appt.patientName}
                      </h3>
                      <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                        <FiMail size={14} /> {appt.patientEmail}
                        <FiPhone size={14} className="ml-3" /> {appt.phone}
                      </p>
                    </div>
                    <StatusBadge status={appt.status} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 mb-4">
                    <p><span className="font-medium">Pain areas:</span> {(appt.painAreas || []).join(", ") || "—"}</p>
                    <p><span className="font-medium">Pain level:</span> {appt.painLevel}/10</p>
                    <p><span className="font-medium">Address:</span> {appt.address}</p>
                    <p><span className="font-medium">DOB:</span> {appt.dob}</p>
                  </div>

                  {appt.additionalInfo && (
                    <p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3 mb-4">
                      {appt.additionalInfo}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <FiClock size={12} /> {formatDate(appt.createdAt)}
                    </span>

                    {appt.status === "Pending" ? (
 <button
 onClick={() => handleAppointmentDecision(appt.id)}
  disabled={updatingId === appt.id}
  className="px-5 py-2 rounded-xl bg-green-600 text-white"
>
  Accept Appointment
</button>
) : (
 <div className="flex items-center gap-4">

  <div className="text-sm">
    <p><b>Status:</b> {appt.status}</p>

    <p>
      <b>Assigned Physiotherapist:</b>{" "}
      {appt.assignedDoctorName}
    </p>

    <p>
      <b>Date:</b> {appt.appointmentDate || "Not Scheduled"}
    </p>

    <p>
      <b>Time:</b> {appt.appointmentTime || "Not Scheduled"}
    </p>
  </div>

  {appt.assignedDoctorId === currentUser.uid && (
    <button
      onClick={() => openScheduleModal(appt)}
      className="bg-blue-600 text-white px-4 py-2 rounded-xl"
    >
      Schedule Appointment
    </button>
  )}

</div>
)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact Messages Tab */}
          {activeTab === "contacts" && (
            <div className="space-y-4">
              {contacts.length === 0 && (
                <p className="text-slate-500">No contact messages yet.</p>
              )}
              {contacts.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-slate-900">{c.name}</h3>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <FiClock size={12} /> {formatDate(c.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">{c.email}</p>
                  <p className="text-slate-700 bg-slate-50 rounded-xl p-3">{c.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* Plan Inquiries Tab */}
          {activeTab === "plans" && (
            <div className="space-y-4">
              {plans.length === 0 && (
                <p className="text-slate-500">No plan inquiries yet.</p>
              )}
              {plans.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-slate-900">{p.name}</h3>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <FiClock size={12} /> {formatDate(p.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-2">{p.email} · {p.phone}</p>
                  <p className="text-sm text-teal-700 font-medium mb-2">
                    {p.planName} ({p.planPrice}) — {p.sessionType}
                  </p>
                  {p.message && (
                    <p className="text-slate-700 bg-slate-50 rounded-xl p-3">{p.message}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {selectedAppointment && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl p-6 w-[420px]">

      <h2 className="text-xl font-bold mb-4">
        Schedule Appointment
      </h2>

      <label>Date</label>

      <input
        type="date"
        value={appointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
        className="w-full border rounded-lg p-2 mb-4"
      />

      <label>Time</label>

      <input
        type="time"
        value={appointmentTime}
        onChange={(e) => setAppointmentTime(e.target.value)}
        className="w-full border rounded-lg p-2"
      />

      <div className="flex justify-end gap-3 mt-5">

        <button
          onClick={() => setSelectedAppointment(null)}
          className="border px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={saveSchedule}
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          Save
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  );
}