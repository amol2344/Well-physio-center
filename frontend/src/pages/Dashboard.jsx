import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  FiActivity, 
  FiCalendar, 
  FiVideo, 
  FiBarChart2, 
  FiMessageSquare, 
  FiSettings,
  FiChevronRight,
  FiUser,
  FiClock
} from 'react-icons/fi';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const upcomingAppointments = [
    {
      id: 1,
      date: '2023-06-15',
      time: '10:30 AM',
      type: 'Virtual',
      therapist: 'Dr. Sarah Johnson',
      specialty: 'Orthopedic Specialist',
      status: 'Confirmed',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      date: '2023-06-20',
      time: '2:00 PM',
      type: 'In-Person',
      therapist: 'Dr. Michael Chen',
      specialty: 'Sports Medicine',
      status: 'Confirmed',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  ];

  const recentExercises = [
    {
      id: 1,
      name: 'Knee Strengthening',
      date: '2023-06-10',
      duration: '15 min',
      completion: 100,
      category: 'Knee'
    },
    {
      id: 2,
      name: 'Back Flexibility',
      date: '2023-06-08',
      duration: '20 min',
      completion: 75,
      category: 'Back'
    },
    {
      id: 3,
      name: 'Shoulder Mobility',
      date: '2023-06-05',
      duration: '10 min',
      completion: 50,
      category: 'Shoulder'
    }
  ];

  const stats = [
    { id: 1, name: 'Upcoming Appointments', value: '2', change: '+1', changeType: 'positive' },
    { id: 2, name: 'Exercises Completed', value: '12', change: '+3', changeType: 'positive' },
    { id: 3, name: 'Therapy Progress', value: '65%', change: '+5%', changeType: 'positive' },
  ];

  // Helper functions
  const getProgressColor = (completion) => {
    if (completion === 100) return 'bg-green-500';
    if (completion > 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Knee':
        return 'bg-blue-100 text-blue-800';
      case 'Back':
        return 'bg-green-100 text-green-800';
      case 'Shoulder':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Therapy Dashboard | Wellness Physio Center</title>
        <meta name="description" content="View your upcoming appointments, recent exercises, and therapy progress on your Wellness Physio Center dashboard." />
        <link rel="canonical" href="https://Wellness Physio Centerstudio.com/dashboard" />
        <meta property="og:title" content="Therapy Dashboard | Wellness Physio Center" />
        <meta property="og:description" content="Track appointments, exercises, and progress." />
        <meta property="og:image" content="https://media.istockphoto.com/id/113712689/photo/physiotherapy-icon.jpg?s=612x612&w=0&k=20&c=vGfT0d3Vq3K10xR-7d4Q5Kb9xG6Vq1aR5rP5m9N0pL8=" />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Therapy Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiUser className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 w-64">
            <div className="p-4">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  JD
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">John Doe</h3>
                  <p className="text-xs text-gray-500">Patient</p>
                </div>
              </div>

              <nav className="space-y-1">
                {[
                  { id: 'overview', icon: <FiActivity />, label: 'Overview' },
                  { id: 'appointments', icon: <FiCalendar />, label: 'Appointments' },
                  { id: 'exercises', icon: <FiVideo />, label: 'Exercises' },
                  { id: 'progress', icon: <FiBarChart2 />, label: 'Progress' },
                  { id: 'messages', icon: <FiMessageSquare />, label: 'Messages' },
                  { id: 'settings', icon: <FiSettings />, label: 'Settings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm ${
                      activeTab === item.id 
                        ? 'bg-blue-50 text-blue-600 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="ml-3">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">

                {/* Welcome Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">Welcome back, John</h2>
                      <p className="text-gray-600">Your therapy progress is looking good. Keep it up!</p>
                    </div>
                    <button className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700">
                      View Schedule
                    </button>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.id}
                      className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{stat.name}</p>
                      <div className="flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900 mr-2">{stat.value}</p>
                        <span className={`text-xs font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upcoming Appointments */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start">
                          <img 
                            src={appointment.avatar} 
                            alt={appointment.therapist}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-gray-900">{appointment.therapist}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {appointment.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{appointment.specialty}</p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <FiClock className="mr-1.5" />
                              <span>{appointment.date} • {appointment.time}</span>
                              <span className="mx-2">•</span>
                              <span className={`flex items-center ${appointment.type === 'Virtual' ? 'text-blue-600' : 'text-purple-600'}`}>
                                <FiVideo className="mr-1" size={14} />
                                {appointment.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-200 text-center">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center w-full">
                      View all appointments <FiChevronRight className="ml-1" size={16} />
                    </button>
                  </div>
                </div>

                {/* Recent Exercises */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Exercises</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {recentExercises.map((exercise) => {
                      const progressColor = getProgressColor(exercise.completion);
                      const categoryColor = getCategoryColor(exercise.category);

                      return (
                        <div key={exercise.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                              <div className="flex items-center mt-1 space-x-3">
                                <span className={`text-xs px-2 py-1 rounded-full ${categoryColor}`}>{exercise.category}</span>
                                <span className="text-xs text-gray-500">{exercise.date} • {exercise.duration}</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div className={`h-2 rounded-full ${progressColor}`} style={{ width: `${exercise.completion}%` }}></div>
                              </div>
                              <span className="text-xs font-medium text-gray-700">{exercise.completion}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-200 text-center">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center w-full">
                      View exercise history <FiChevronRight className="ml-1" size={16} />
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* Other Tabs */}
            {activeTab !== 'overview' && (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 capitalize">{activeTab}</h2>
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                    {activeTab === 'appointments' && <FiCalendar size={48} />}
                    {activeTab === 'exercises' && <FiVideo size={48} />}
                    {activeTab === 'progress' && <FiBarChart2 size={48} />}
                    {activeTab === 'messages' && <FiMessageSquare size={48} />}
                    {activeTab === 'settings' && <FiSettings size={48} />}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    This is where your {activeTab} content would be displayed in a full implementation.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
