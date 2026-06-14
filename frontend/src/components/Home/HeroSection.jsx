
import { FiArrowRight, FiCheckCircle, FiCalendar, FiActivity, FiUser } from "react-icons/fi";
import HeroImage from "../../assets/hero-image.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-teal-50 to-orange-50 overflow-hidden pt-32">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-teal-300/30 to-orange-300/30 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 -right-20 w-[28rem] h-[28rem] rounded-full bg-gradient-to-r from-orange-300/30 to-teal-300/30 blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-100 to-orange-100 rounded-full mb-8 border border-teal-200">
              <FiActivity className="text-teal-600 mr-3 text-xl" />
              <span className="text-teal-800 font-semibold text-sm uppercase tracking-wider">
                Evidence-Based Treatment
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-slate-900">
              Expert <span className="text-gradient">Physiotherapy</span>
              <br />
              Tailored To Your
              <span className="relative inline-block">
                <span className="relative z-10"> Unique Needs</span>
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0">
              Our licensed physiotherapists create personalized recovery plans
              based on 20+ years of clinical experience.
            </p>

            {/* Key Differentiators */}
            <div className="flex flex-col sm:flex-row gap-6 mb-10 justify-center lg:justify-start">
              <div className="flex items-center bg-white p-5 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-xl mr-4 shadow-md">
                  <FiUser className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-800">1-on-1 Sessions</p>
                  <p className="text-sm text-slate-500">
                    Direct therapist attention
                  </p>
                </div>
              </div>

              <div className="flex items-center bg-white p-5 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl mr-4 shadow-md">
                  <FiCalendar className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-800">Flexible Scheduling</p>
                  <p className="text-sm text-slate-500">
                    Available 6 days a week
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mb-12">
              <a
                href="/book-appointment"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="group flex items-center px-10 py-5 text-base font-semibold rounded-3xl bg-gradient-to-r from-teal-600 to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  Book Your Initial Assessment
                  <FiArrowRight className="ml-3 transition-transform group-hover:translate-x-2 text-xl" />
                </button>
              </a>

              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-8">
                <div className="flex items-center text-base bg-white/80 px-5 py-3 rounded-2xl shadow-sm border border-slate-200">
                  <FiCheckCircle className="text-teal-600 mr-2 text-xl" />
                  <span className="text-slate-700 font-medium">No long-term contracts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src={HeroImage}
                  alt="Physiotherapist working with patient"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating Success Metric */}
              <div className="absolute bottom-8 right-8 lg:bottom-10 lg:right-10 bg-gradient-to-r from-teal-600 to-orange-600 p-6 lg:p-8 rounded-3xl shadow-2xl z-20 text-white text-center w-32 h-32 lg:w-36 lg:h-36 flex flex-col items-center justify-center">
                <p className="text-3xl lg:text-4xl font-black">95%</p>
                <p className="text-xs lg:text-sm mt-2 leading-tight font-medium">
                  Patient Satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
