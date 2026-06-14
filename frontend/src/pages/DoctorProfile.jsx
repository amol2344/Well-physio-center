
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FiMail,
  FiPhone,
  FiClock,
  FiMapPin,
  FiStar,
  FiAward,
  FiBookOpen,
  FiUsers,
  FiCalendar,
  FiArrowLeft,
  FiSearch,
} from "react-icons/fi";
import { getDoctorById } from "../utils/doctorUtils";
import { handleImageError, FALLBACK_DOCTOR_IMAGE } from "../utils/imageUtils";
import { useState } from "react";

const DoctorProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Find the doctor by ID using utility function
  const doctor = getDoctorById(id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 pt-40">
        <Helmet>
          <title>Doctor Not Found | Wellness Physio Center</title>
        </Helmet>
        <div className="container mx-auto px-4">
          <Link
            to="/experts"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors mb-8"
          >
            <FiArrowLeft className="mr-2" />
            Back to Experts
          </Link>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 text-center border border-white/50">
            <div className="max-w-md mx-auto">
              <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-teal-100 to-orange-100 rounded-full flex items-center justify-center">
                <FiSearch className="text-4xl text-teal-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">Doctor Not Found</h3>
              <p className="text-slate-700 mb-8 text-lg">
                The doctor profile you're looking for isn't available right now. Check back soon for updates!
              </p>
              <Link
                to="/experts"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-orange-600 hover:from-orange-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FiArrowLeft className="w-5 h-5" />
                View All Experts
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: FiUsers },
    { id: "qualifications", label: "Qualifications", icon: FiAward },
    { id: "specializations", label: "Specializations", icon: FiBookOpen },
    { id: "contact", label: "Contact Hours", icon: FiClock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 pt-40">
      <Helmet>
        <title>{`${doctor.name} | ${doctor.title} | Wellness Physio Center`}</title>
        <meta
          name="description"
          content={`Profile of ${doctor.name}, ${doctor.title}. ${doctor.bio}`}
        />
        <link
          rel="canonical"
          href={`https://Wellness Physio Centerstudio.com/doctors/${doctor.id}`}
        />
        <meta
          property="og:title"
          content={`${doctor.name} | ${doctor.title}`}
        />
        <meta
          property="og:description"
          content={doctor.longBio || doctor.bio}
        />
        <meta property="og:image" content={doctor.image} />
      </Helmet>
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link
          to="/experts"
          className="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Experts
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Doctor Image - Enhanced for better visibility */}
            <div className="lg:col-span-1">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-[500px] lg:h-[600px] object-cover object-center rounded-2xl shadow-xl"
                  loading="lazy"
                  onError={(e) => handleImageError(e, FALLBACK_DOCTOR_IMAGE)}
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                  <FiStar className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">
                  {doctor.name}
                </h1>
                <p className="text-xl bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent font-semibold mb-4">
                  {doctor.title}
                </p>
                <p className="text-slate-700 text-lg leading-relaxed">
                  {doctor.bio}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-teal-50 p-4 rounded-xl text-center border border-teal-100">
                  <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent">
                    {doctor.experience}
                  </div>
                  <div className="text-sm text-slate-700">Experience</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
                  <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent">
                    {doctor.consultationFee}
                  </div>
                  <div className="text-sm text-slate-700">Consultation</div>
                </div>
                <div className="bg-teal-50 p-4 rounded-xl text-center border border-teal-100">
                  <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent">
                    {doctor.languages.length}
                  </div>
                  <div className="text-sm text-slate-700">Languages</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
                  <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent">
                    {doctor.qualifications.length}
                  </div>
                  <div className="text-sm text-slate-700">Certifications</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-orange-600 hover:from-orange-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <FiCalendar className="w-5 h-5" />
                  Book Consultation
                </button>
                <a
                  href={`tel:${doctor.contact.phone}`}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-teal-200 text-teal-700 hover:bg-teal-50 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <FiPhone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-teal-600 to-orange-600 text-white shadow-lg"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                About {doctor.name}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 leading-relaxed mb-6">
                  {doctor.longBio}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/50">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Education
                    </h3>
                    <p className="text-slate-700">{doctor.education}</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/50">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Languages Spoken
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((language, index) => (
                        <span
                          key={language}
                          className="px-4 py-2 bg-gradient-to-r from-teal-100 to-orange-100 text-teal-700 rounded-full text-sm font-semibold"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Qualifications Tab */}
          {activeTab === "qualifications" && (
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Qualifications & Certifications
              </h2>
              <div className="space-y-6">
                {doctor.certificate && (
                  <div className="bg-white p-6 rounded-2xl shadow-xl border border-white/50">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Certificate
                    </h3>
                    <div className="flex justify-center">
                      <img
                        src={doctor.certificate}
                        alt="Dr. Trupti's Certificate"
                        className="max-w-full h-auto rounded-xl shadow-lg"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    Professional Qualifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctor.qualifications.map((qual, index) => (
                      <div
                        key={qual}
                        className="bg-white p-6 rounded-xl border border-white/50 flex items-start shadow-lg"
                      >
                        <FiAward className="w-6 h-6 text-teal-600 mr-4 mt-1 flex-shrink-0" />
                        <span className="text-slate-700 text-lg">{qual}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Specializations Tab */}
          {activeTab === "specializations" && (
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Specializations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctor.specializations.map((spec) => (
                  <div
                    key={spec}
                    className="bg-white p-6 rounded-xl border border-white/50 flex items-start shadow-lg"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-100 to-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FiBookOpen className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="text-slate-700 text-lg">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Contact Information & Availability
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    Contact Details
                  </h3>
                  {doctor.contact.email && (
                    <div className="flex items-center bg-white p-4 rounded-xl border border-white/50 shadow-lg">
                      <FiMail className="w-6 h-6 text-teal-600 mr-4 flex-shrink-0" />
                      <a href={`mailto:${doctor.contact.email}`} className="text-slate-700 hover:text-teal-600">
                        {doctor.contact.email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center bg-white p-4 rounded-xl border border-white/50 shadow-lg">
                    <FiPhone className="w-6 h-6 text-teal-600 mr-4 flex-shrink-0" />
                    <a href={`tel:${doctor.contact.phone}`} className="text-slate-700 hover:text-teal-600">
                      {doctor.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center bg-white p-4 rounded-xl border border-white/50 shadow-lg">
                    <FiClock className="w-6 h-6 text-teal-600 mr-4 flex-shrink-0" />
                    <div>
                      <p className="text-slate-700">{doctor.contact.hours}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    Address
                  </h3>
                  <div className="flex items-start bg-white p-6 rounded-xl border border-white/50 shadow-lg">
                    <FiMapPin className="w-6 h-6 text-teal-600 mr-4 mt-1 flex-shrink-0" />
                    <p className="text-slate-700 text-lg">{doctor.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DoctorProfile;
