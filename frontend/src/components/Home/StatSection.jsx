
import { FiUsers, FiHeart, FiCheck, FiUser } from 'react-icons/fi';

const StatsSection = () => {
  const stats = [
    { 
      id: 'patients', 
      value: '1000+', 
      label: 'Patients Helped', 
      icon: <FiUsers className="text-4xl mb-4 text-white" />,
      gradient: 'from-teal-500 to-teal-600'
    },
    { 
      id: 'satisfaction', 
      value: '98%', 
      label: 'Satisfaction Rate', 
      icon: <FiHeart className="text-4xl mb-4 text-white" />,
      gradient: 'from-orange-500 to-orange-600'
    },
    { 
      id: 'protocols', 
      value: '150+', 
      label: 'Clinical Protocols', 
      icon: <FiCheck className="text-4xl mb-4 text-white" />,
      gradient: 'from-teal-500 to-orange-500'
    },
    { 
      id: 'physios', 
      value: '40+', 
      label: 'Expert Physios', 
      icon: <FiUser className="text-4xl mb-4 text-white" />,
      gradient: 'from-orange-500 to-teal-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div 
              key={stat.id}
              className="text-center p-8 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-400 hover:scale-105"
            >
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-teal-300 to-orange-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-slate-200 font-semibold text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
