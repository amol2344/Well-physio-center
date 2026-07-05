import {
  FaCalendarCheck,
  FaClipboardList,
  FaFileMedical,
  FaBell,
  FaUserCircle,
  FaRunning,
  FaHome,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function PatientDashboard() {
  const { name, currentUser } = useAuth();

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

        {/* Stats */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">

            <FaCalendarCheck className="text-4xl text-teal-600 mb-3" />

            <h2 className="text-xl font-bold">Upcoming</h2>

            <p className="text-slate-500 mt-2">1 Appointment</p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <FaClipboardList className="text-4xl text-orange-500 mb-3" />

            <h2 className="text-xl font-bold">Exercises</h2>

            <p className="text-slate-500 mt-2">3 Assigned</p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <FaFileMedical className="text-4xl text-blue-600 mb-3" />

            <h2 className="text-xl font-bold">Reports</h2>

            <p className="text-slate-500 mt-2">2 Available</p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <FaBell className="text-4xl text-red-500 mb-3" />

            <h2 className="text-xl font-bold">Notifications</h2>

            <p className="text-slate-500 mt-2">5 New</p>

          </div>

        </div>

        {/* Main Grid */}

        <div className="grid lg:grid-cols-3 gap-6 mt-8">

          {/* Left */}

          <div className="lg:col-span-2 space-y-6">

            {/* Appointment */}

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-2xl font-bold mb-4">
                Upcoming Appointment
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <p className="text-slate-500">Doctor</p>

                  <p className="font-semibold">
                    Dr. Pranav Patil
                  </p>

                </div>

                <div>

                  <p className="text-slate-500">Date</p>

                  <p className="font-semibold">
                    12 July 2026
                  </p>

                </div>

                <div>

                  <p className="text-slate-500">Time</p>

                  <p className="font-semibold">
                    11:30 AM
                  </p>

                </div>

                <div>

                  <p className="text-slate-500">Status</p>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                    Confirmed

                  </span>

                </div>

              </div>

            </div>

            {/* Exercise */}

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-2xl font-bold mb-4">
                Today's Exercise
              </h2>

              <div className="space-y-4">

                <div className="flex items-center gap-4">

                  <FaRunning className="text-teal-600 text-2xl" />

                  <div>

                    <p className="font-semibold">
                      Back Stretching
                    </p>

                    <p className="text-slate-500">
                      15 Minutes
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <FaRunning className="text-orange-500 text-2xl" />

                  <div>

                    <p className="font-semibold">
                      Shoulder Mobility
                    </p>

                    <p className="text-slate-500">
                      20 Minutes
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="space-y-6">

            {/* Profile */}

            <div className="bg-white rounded-2xl shadow p-6 text-center">

              <FaUserCircle className="mx-auto text-7xl text-teal-600" />

              <h2 className="mt-4 text-xl font-bold">

                {name}

              </h2>

              <p className="text-slate-500">

                {currentUser?.email}

              </p>

              <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-orange-600 text-white">

                View Profile

              </button>

            </div>

            {/* Notifications */}

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-xl font-bold mb-4">

                Recent Notifications

              </h2>

              <ul className="space-y-3">

                <li className="text-slate-600">

                  ✔ Appointment confirmed.

                </li>

                <li className="text-slate-600">

                  ✔ Exercise plan updated.

                </li>

                <li className="text-slate-600">

                  ✔ New report uploaded.

                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}