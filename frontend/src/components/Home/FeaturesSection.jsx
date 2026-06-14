
import { FiUser, FiActivity, FiCalendar } from "react-icons/fi";

const FeaturesSection = () => {
  const features = [
    {
      id: "feature1",
      icon: <FiUser className="text-3xl" />,
      title: "Comprehensive Assessment",
      description:
        "Our advanced assessment process evaluates your condition thoroughly and designs a personalized treatment plan.",
      gradient: "from-teal-500 to-teal-600",
      bg: "bg-teal-50",
    },
    {
      id: "feature2",
      icon: <FiActivity className="text-3xl" />,
      title: "Personalized Health Check",
      description:
        "A detailed evaluation to understand your unique needs and create a treatment plan tailored just for you.",
      gradient: "from-orange-500 to-orange-600",
      bg: "bg-orange-50",
    },
    {
      id: "feature3",
      icon: <FiCalendar className="text-3xl" />,
      title: "Interactive Training Plans",
      description:
        "Follow structured exercise programs with visual guidance to ensure safe and effective practice.",
      gradient: "from-teal-500 to-orange-500",
      bg: "bg-slate-50",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="eyebrow">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Clinical Expertise <span className="text-gradient">Made Accessible</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-xl">
            Our evidence-based approach combines professional knowledge with cutting-edge technology
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`${feature.bg} p-10 rounded-3xl hover:shadow-2xl transition-all duration-400 group relative overflow-hidden border-2 border-transparent hover:border-teal-100`}
            >
              {/* Animated Background Element */}
              <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-gradient-to-r from-teal-200/40 to-orange-200/40 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl"></div>

              {/* Icon */}
              <div className={`bg-gradient-to-r ${feature.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-400 text-white`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4 relative inline-block">
                {feature.title}
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-teal-500 to-orange-500 transition-all duration-400 group-hover:w-full"></span>
              </h3>

              <p className="text-slate-600 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
