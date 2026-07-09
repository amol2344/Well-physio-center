import {
  FaCalendarCheck,
  FaBell,
  FaUserCircle,
  FaRunning,
} from "react-icons/fa";

import { useEffect, useState } from "react";import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function PatientDashboard() {
  const { name, currentUser } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "appointments"),
      where("patientId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const cancelAppointment = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) return;

    try {
      await updateDoc(doc(db, "appointments", id), {
        status: "Cancelled",
        cancelledBy: "Patient",
        cancelledAt: new Date(),
      });

      alert("Appointment cancelled successfully.");
    } catch (err) {
    console.error("Cancel Error:", err);
    alert(err.message);
}
  };
useEffect(() => {
  if (!currentUser) return;

  const q = query(
    collection(db, "planInquiries"),
    where("userId", "==", currentUser.uid)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {

    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    docs.sort((a, b) => {
      return (
        (b.createdAt?.seconds || 0) -
        (a.createdAt?.seconds || 0)
      );
    });

    setSubscription(docs[0] || null);

  });

  return unsubscribe;

}, [currentUser]);
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-gradient-to-r from-teal-600 to-orange-500 text-white p-8 shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome {name || "Patient"} 👋
        </h1>

        <p className="mt-2 text-lg opacity-90">
          Manage your appointments and physiotherapy journey.
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}

          <div className="lg:col-span-2 space-y-6">

            {/* Appointment History */}

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center gap-3 mb-5">
                <FaCalendarCheck className="text-3xl text-teal-600" />

                <h2 className="text-2xl font-bold">
                  Appointment History
                </h2>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : appointments.length === 0 ? (
                <p className="text-slate-500">
                  No appointments found.
                </p>
              ) : (
                appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border rounded-xl p-5 mb-5"
                  >
                    <div className="flex justify-between items-center">

                      <h3 className="font-bold text-lg">
                        Appointment
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          appointment.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : appointment.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-5">

                      <p>
                        <b>Physiotherapist:</b>{" "}
                        {appointment.assignedDoctorName ||
                          "Waiting for Assignment"}
                      </p>

                      <p>
                        <b>Pain Area:</b>{" "}
                        {appointment.painAreas?.join(", ")}
                      </p>

                      <p>
                        <b>Date:</b>{" "}
                        {appointment.appointmentDate ||
                          "Not Scheduled"}
                      </p>

                      <p>
                        <b>Time:</b>{" "}
                        {appointment.appointmentTime ||
                          "Not Scheduled"}
                      </p>

                    </div>

                    {appointment.status !== "Cancelled" &&
                      appointment.status !== "Completed" && (
                        <button
                          onClick={() =>
                            cancelAppointment(appointment.id)
                          }
                          className="mt-5 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
                        >
                          Cancel Appointment
                        </button>
                      )}
                  </div>
                ))
              )}
            </div>

            {/* Exercise */}

           

          </div>

          {/* RIGHT SIDE */}
                    <div className="space-y-6">

            {/* Profile */}

            <div className="bg-white rounded-2xl shadow p-6 text-center">

              <FaUserCircle className="mx-auto text-7xl text-teal-600" />

              <h2 className="mt-4 text-xl font-bold">
                {name || "Patient"}
              </h2>

              <p className="text-slate-500">
                {currentUser?.email}
              </p>

              <button
onClick={() => navigate("/patient/profile")}
className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-orange-600 text-white"
>
View Profile
</button>

            </div>
<div className="bg-white rounded-2xl shadow p-6">

  <h2 className="text-xl font-bold mb-4">
    Current Plan
  </h2>

  {!subscription ? (
  <p className="text-slate-500">
    No subscription purchased.
  </p>
) : subscription.status === "Active" ? (
  <div>

    <h3 className="text-lg font-semibold text-green-600">
      {subscription.planName}
    </h3>

    <p>
      Duration : {subscription.duration}
    </p>

    <p>
      Price : {subscription.price}
    </p>

    <p className="mt-3 text-green-600 font-semibold">
      Active
    </p>

  </div>

) : subscription.status === "Completed" ? (

  <div>

    <h3 className="text-lg font-semibold text-gray-600">
      {subscription.planName}
    </h3>

    <p className="mt-3 text-red-600 font-semibold">
      Subscription Expired
    </p>

  </div>

) : (

  <p className="text-slate-500">
    No active subscription.
  </p>

)}

</div>
            {/* Notifications */}

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center gap-3 mb-4">

                <FaBell className="text-2xl text-orange-500" />

                <h2 className="text-xl font-bold">
                  Recent Notifications
                </h2>

              </div>

              <ul className="space-y-3">
{subscription && subscription.status === "Rejected" && (
  <li className="border-b pb-2 text-red-600">
    ❌ Your subscription request has been rejected.
  </li>
)}
{subscription && subscription.status === "Completed" && (
  <li className="border-b pb-2 text-orange-600">
    ⚠️ Your {subscription.planName} subscription has expired.
  </li>
)}
{subscription && subscription.status === "Active" && (
  <li className="border-b pb-2 text-green-600">
    ✅ Your {subscription.planName} subscription has been approved.
  </li>
)}
                {appointments.length === 0 ? (

                  <li className="text-slate-500">
                    No notifications available.
                  </li>

                ) : (

                  appointments.map((appointment) => (

                    <li
                      key={appointment.id}
                      className="border-b pb-2 text-sm text-slate-700"
                    >

                      {appointment.status === "Accepted" && (
                        <>
                          ✅ Appointment accepted by{" "}
                          <b>{appointment.assignedDoctorName}</b>
                        </>
                      )}

                      {appointment.status === "Pending" && (
                        <>
                          ⏳ Appointment request submitted.
                        </>
                      )}

                      {appointment.status === "Cancelled" && (
                        <>
                          ❌ Appointment cancelled.
                        </>
                      )}

                      {appointment.status === "Completed" && (
                        <>
                          ✔ Appointment completed.
                        </>
                      )}

                    </li>

                  ))

                )}

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}