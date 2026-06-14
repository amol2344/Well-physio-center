
import { Helmet } from "react-helmet";
import {
  FiAward,
  FiUsers,
  FiHeart,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

import PillowSqueezeImage from "../assets/KneeBlog/Pillow-Squeeze.webp";
import QuadSetsImage from "../assets/KneeBlog/Quad-Sets.webp";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateStats();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const animateStats = () => {
    const duration = 2000;
    const steps = 60;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 overflow-hidden font-body text-slate-800 bg-gradient-to-br from-slate-50 to-teal-50">
      <Helmet>
        <title>About Us | PRO-KINETIC PHYSIOTHERAPY CENTER - Expert Physiotherapy Care in Mahad, Raigad</title>
        <meta
          name="description"
          content="Learn about PRO-KINETIC PHYSIOTHERAPY CENTER's mission to deliver seamless, evidence-based physiotherapy care in Mahad, Raigad. Discover our innovative approach to holistic healthcare."
        />
        <meta
          name="keywords"
          content="about PRO-KINETIC, physiotherapy clinic Mahad, mission, vision, team, healthcare professionals, rehabilitation, movement therapy"
        />
        <link rel="canonical" href="https://Wellness Physio Centerstudio.com/about-us" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="About PRO-KINETIC PHYSIOTHERAPY CENTER - Transforming Healthcare Through Innovation" />
        <meta
          property="og:description"
          content="Delivering seamless, holistic healthcare with expert physiotherapists in Mahad, Raigad. Bridging injury recovery and lifelong wellness."
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://Wellness Physio Centerstudio.com/about-us" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Wellness Physio Center" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Wellness Physio Center - Expert Physiotherapy Care" />
        <meta
          name="twitter:description"
          content="Learn about our mission to deliver seamless, evidence-based physiotherapy care in Mumbai. Personalized treatment plans for optimal recovery."
        />
        <meta name="twitter:image" content="/logo.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "PRO-KINETIC PHYSIOTHERAPY CENTER",
            "description": "Physiotherapy clinic delivering seamless, holistic healthcare with expert physiotherapists in Mahad, Raigad",
            "url": "https://Wellness Physio Centerstudio.com/about-us",
            "logo": "/logo.png",
            "medicalSpecialty": "Physiotherapy",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Physiotherapy Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Physiotherapy Treatment",
                    "description": "Evidence-based physiotherapy care for injury recovery and lifelong wellness"
                  }
                }
              ]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Opposite MMA Housing Society, Mahad MIDC",
              "addressLocality": "Mahad",
              "addressRegion": "Raigad",
              "postalCode": "402309",
              "addressCountry": "India"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-teal-50 py-16 md:py-28 font-heading">
        {/* Background elements matching HeroSection */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-4 md:left-10 w-40 h-40 md:w-60 md:h-60 rounded-full bg-teal-200/20 blur-xl"></div>
          <div className="absolute bottom-1/3 right-8 md:right-20 w-60 h-60 md:w-80 md:h-80 rounded-full bg-orange-200/20 blur-xl"></div>
        </div>

        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${PillowSqueezeImage})`   }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
          <div
            className={`transition-all duration-1000 ease-out transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs md:text-sm mb-4 md:mb-6 border border-teal-200">
              <FiHeart className="mr-1 md:mr-2 text-teal-600 w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm">Trusted by healthcare professionals</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2 bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
              Your Journey to{" "}
              <span className="text-orange-600">Lifelong Wellness</span> Starts
              Here
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-700 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
              Bridging the gap between injury recovery and lifelong wellness
              through personalized, evidence-based care
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-16 md:h-24 bg-gradient-to-b from-slate-50 to-transparent opacity-5"></div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent z-10"></div>
                <img
                  src={QuadSetsImage}
                  alt="Wellness Physio Center physiotherapy team providing expert care in Mumbai"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-lg md:rounded-xl shadow-lg z-20">
                  <div className="flex items-center">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-teal-600 to-orange-600 rounded-full flex items-center justify-center text-white mr-2 md:mr-3">
                      <FiAward className="w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm md:text-base">
                        Multi-Specialty Care
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600">
                        Experts working together for your health
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-20 h-20 md:w-32 md:h-32 bg-orange-200/20 rounded-full z-0"></div>
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-16 h-16 md:w-24 md:h-24 bg-teal-200/20 rounded-full z-0"></div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="text-sm md:text-base font-semibold text-teal-600 mb-2">OUR MISSION</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6 font-['Montserrat']">
                Delivering{" "}
                <span className="bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">Seamless Healthcare</span>
              </h2>

              <p className="text-base md:text-lg text-slate-700 font-body leading-relaxed mb-6 md:mb-8">
                Our mission is to deliver a seamless, holistic healthcare
                experience by bringing together expert doctors from various
                specialties under one roof.
              </p>

              <div className="space-y-4 md:space-y-6">
                {/* Teamwork in Care */}
                <div className="flex gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-lg md:rounded-xl flex items-center justify-center">
                    <FiUsers className="text-teal-600 text-lg md:text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 md:mb-2 text-sm md:text-base">
                      Teamwork in Care
                    </h3>
                    <p className="text-slate-700 text-sm md:text-base">
                      Encouraging collaboration across specialties for
                      comprehensive diagnosis and treatment.
                    </p>
                  </div>
                </div>

                {/* Movement First */}
                <div className="flex gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg md:rounded-xl flex items-center justify-center">
                    <FiTrendingUp className="text-orange-600 text-lg md:text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 md:mb-2 text-sm md:text-base">
                      Movement First
                    </h3>
                    <p className="text-slate-700 text-sm md:text-base">
                      Promoting physiotherapy-led recovery with a focus on
                      movement and rehabilitation.
                    </p>
                  </div>
                </div>

                {/* Personalized Plans */}
                <div className="flex gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-lg md:rounded-xl flex items-center justify-center">
                    <FiStar className="text-teal-600 text-lg md:text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 md:mb-2 text-sm md:text-base">
                      Personalized Plans
                    </h3>
                    <p className="text-slate-700 text-sm md:text-base">
                      Using advanced diagnostics and evidence-based methods to
                      tailor care to each patient's unique needs and lifestyle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-50 to-teal-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 bg-orange-200/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-teal-200/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center max-w-3xl">
          <div className="px-2">
            <div className="text-sm md:text-base font-semibold text-orange-600 mb-2">OUR VISION</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6 font-['Montserrat']">
              Transforming Healthcare Through{" "}
              <span className="bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">Innovation</span>
            </h2>

            <p className="text-base md:text-lg text-slate-700 font-body leading-relaxed">
              Our vision is to transform healthcare by creating a new
              standard of care that combines innovative science and
              compassionate treatment. We focus on integrated,
              physiotherapy-led solutions to help every patient reach their
              full potential.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
