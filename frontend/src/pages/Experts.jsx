
import { FiUsers, FiSearch } from "react-icons/fi";
import { doctors } from "../data/doctors";
import DoctorCard from "../components/Shared/DoctorCard";
import { Helmet } from "react-helmet";

const Experts = () => {
  return (
    <div>
      <Helmet>
        <title>
          Expert Physiotherapists in Mahad, Raigad | PRO-KINETIC PHYSIOTHERAPY CENTER
        </title>
        <meta
          name="description"
          content="Meet certified physiotherapists at PRO-KINETIC PHYSIOTHERAPY CENTER in Mahad, Raigad. Sports injury specialists, musculoskeletal experts, cardiopulmonary care. Book consultation now."
        />
        <link rel="canonical" href="https://Wellness Physio Centerstudio.com/experts" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Expert Physiotherapists Mahad | PRO-KINETIC PHYSIOTHERAPY CENTER"
        />
        <meta
          property="og:description"
          content="Certified physiotherapy specialists at PRO-KINETIC PHYSIOTHERAPY CENTER in Mahad, Raigad offering sports injury treatment, musculoskeletal therapy & rehabilitation."
        />
        <meta
          property="og:image"
          content="https://Wellness Physio Centerstudio.com/assets/doctors-og-image.webp"
        />
        <meta
          property="og:url"
          content="https://Wellness Physio Centerstudio.com/experts"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Wellness Physio Center" />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="Wellness Physio Center" />
        <meta name="publisher" content="Wellness Physio Center" />
      </Helmet>

      {/* Background elements matching HeroSection */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-60 h-60 rounded-full bg-teal-200/20 blur-xl"></div>
        <div className="absolute bottom-1/3 right-20 w-80 h-80 rounded-full bg-orange-200/20 blur-xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-teal-50 py-28 overflow-hidden pt-40">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm mb-6 border border-teal-200">
              <FiUsers className="mr-2 text-teal-600" />
              <span>MEET THE TEAM</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
              Our Expert{" "}
              <span>Physiotherapists </span>
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              Certified specialists at PRO-KINETIC PHYSIOTHERAPY CENTER in Mahad, Raigad dedicated to your recovery and wellness journey.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative bg-white py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Specialist Team
            </h2>
            <p className="font-medium text-slate-700 max-w-2xl mx-auto">
              Our team of certified physiotherapists at PRO-KINETIC PHYSIOTHERAPY CENTER in Mahad brings
              diverse expertise and a shared commitment to your health and recovery.
            </p>
          </div>

          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  variant="featured"
                  showQualifications={true}
                  showContact={true}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 text-center border border-white/50">
              <div className="max-w-md mx-auto">
                <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-teal-100 to-orange-100 rounded-full flex items-center justify-center">
                  <FiSearch className="text-4xl text-teal-600" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">Our Team Coming Soon</h3>
                <p className="text-slate-700 mb-8 text-lg">
                  We're working on assembling our specialist team. Check back soon for updates!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Experts;
