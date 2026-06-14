
import {
  FiHome,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
  FiUser,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import { Helmet } from "react-helmet";

import HamstringCurlsImage from "../assets/KneeBlog/Hamstring-Curls.webp";

const Doorstep = () => {
  const serviceAreas = [
    "Mahad",
    "Raigad",
    "Pali",
    "Mangaon",
    "Mahad MIDC",
    "Khed",
    "Khopoli",
    "Poladpur",
    "Sudhagad",
    "Murud",
  ];

  const services = [
    {
      icon: <FiUser className="w-8 h-8 text-teal-600" />,
      title: "Initial Assessment",
      description:
        "Comprehensive evaluation of your condition and mobility assessment",
      benefits: [
        "Detailed diagnosis",
        "Personalized treatment plan",
        "Progress tracking",
      ],
    },
    {
      icon: <FiCheckCircle className="w-8 h-8 text-orange-600" />,
      title: "Therapy Sessions",
      description: "Hands-on treatment including manual therapy and exercises",
      benefits: [
        "Pain relief techniques",
        "Mobility improvement",
        "Strength training",
      ],
    },
    {
      icon: <FiShield className="w-8 h-8 text-teal-600" />,
      title: "Post-Surgical Care",
      description: "Specialized rehabilitation after surgical procedures",
      benefits: [
        "Wound care guidance",
        "Rehabilitation exercises",
        "Recovery monitoring",
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-teal-50 min-h-screen pt-16">
      <Helmet>
        <title>Doorstep Physiotherapy | Wellness Physio Center</title>
        <meta name="description" content="Professional home-visit physiotherapy services across Mahad & Raigad. Certified therapists from PRO-KINETIC PHYSIOTHERAPY CENTER bring expert care to your doorstep." />
        <link rel="canonical" href="https://Wellness Physio Centerstudio.com/doorstep-physiotherapy" />
        <meta property="og:title" content="Doorstep Physiotherapy | PRO-KINETIC PHYSIOTHERAPY CENTER" />
        <meta property="og:description" content="Expert physiotherapy care in the comfort of your home in Mahad & Raigad." />
        <meta property="og:image" content="/logo.png" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-teal-50 py-20 overflow-hidden">
        {/* Background elements matching HeroSection */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-60 h-60 rounded-full bg-teal-200/20 blur-xl"></div>
          <div className="absolute bottom-1/3 right-20 w-80 h-80 rounded-full bg-orange-200/20 blur-xl"></div>
        </div>

        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${HamstringCurlsImage})` }}
        ></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm mb-6 border border-teal-200">
            <FiHome className="mr-2 text-teal-600" />
            <span>Convenient Care at Your Doorstep</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
            Professional <span className="text-orange-600">Home Visit</span>{" "}
            Physiotherapy
          </h1>

          <p className="text-xl text-slate-700 max-w-2xl mx-auto mb-10">
            Receive expert physiotherapy care in the comfort of your home. Our
            certified therapists bring the clinic experience to you.
          </p>

          {/* CTA Button matching HeroSection */}
          <a href="/book-appointment" className="inline-block mb-12">
            <button className="group flex items-center px-6 py-3 text-sm font-medium rounded-full bg-gradient-to-r from-teal-600 to-orange-600 text-white shadow-md hover:from-orange-600 hover:to-teal-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mx-auto">
              Book Your Home Visit
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </a>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-white/30">
              <FiCalendar className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-1 text-slate-900">Flexible Scheduling</h3>
              <p className="text-sm text-slate-700">Book at your convenience</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-white/30">
              <FaRupeeSign className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-1 text-slate-900">Affordable Pricing</h3>
              <p className="text-sm text-slate-700">
                Quality care within budget
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-white/30">
              <FiShield className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-1 text-slate-900">Certified Experts</h3>
              <p className="text-sm text-slate-700">Licensed professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50 to-transparent opacity-5"></div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
              Our DoorStep <span className="text-orange-600">Services</span>
            </h2>

            <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
              We bring comprehensive physiotherapy services directly to your
              home with all the equipment needed for effective treatment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6">{service.description}</p>

                <ul className="space-y-3">
                  {service.benefits.map((benefit, i) => (
                    <li key={benefit} className="flex items-center text-slate-700">
                      <FiCheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-teal-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-200/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
              Service <span className="text-orange-600">Areas</span>
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              We currently serve these areas in Mahad & Raigad. Contact us to check
              availability in your locality.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {serviceAreas.map((area, index) => (
                  <div
                    key={area}
                    className="flex items-center p-2 rounded-lg hover:bg-teal-50 transition-colors duration-200"
                  >
                    <FiMapPin className="w-5 h-5 text-teal-600 mr-2" />
                    <span className="text-slate-700 font-medium">{area}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-teal-50 to-orange-50 rounded-lg border border-teal-200">
                <p className="text-slate-900 text-center">
                  <strong>Note:</strong> Additional charges may apply for areas
                  beyond 5km radius from our clinic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doorstep;
