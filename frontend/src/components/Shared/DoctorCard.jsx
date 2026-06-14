
import {
  FiMail,
  FiPhone,
  FiClock,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  handleImageError,
  FALLBACK_DOCTOR_IMAGE,
} from "../../utils/imageUtils";

const DoctorCard = ({
  doctor,
  variant = "default",
  showQualifications = true,
  showContact = true,
}) => {
  const variants = {
    default: {
      card: "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300",
      image: "h-96",
      button:
        "w-full mt-6 py-3 px-6 bg-gradient-to-r from-teal-600 to-orange-600 hover:from-orange-600 hover:to-teal-600 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg",
    },
    compact: {
      card: "bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300",
      image: "h-64",
      button:
        "w-full mt-4 py-2 px-4 bg-gradient-to-r from-teal-600 to-orange-600 hover:from-orange-600 hover:to-teal-600 text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2",
    },
    featured: {
      card: "bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300",
      image: "h-96",
      button:
        "w-full mt-6 py-3 px-6 bg-gradient-to-r from-teal-600 to-orange-600 hover:from-orange-600 hover:to-teal-600 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg",
    },
  };

  const currentVariant = variants[variant];

  return (
    <div className={`group ${currentVariant.card} flex flex-col h-full`}>
      <div className={`relative ${currentVariant.image} overflow-hidden`}>
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => handleImageError(e, FALLBACK_DOCTOR_IMAGE)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white drop-shadow-lg">
            {doctor.name}
          </h3>
          <p className="text-teal-200 font-medium text-sm drop-shadow-md">
            {doctor.specialty || doctor.title}
          </p>
        </div>
      </div>

      {/* Make inner section fill remaining height */}
      <div className="flex flex-col justify-between flex-grow p-6">
        <div>
          <p className="text-slate-700 mb-4 line-clamp-3">{doctor.bio}</p>

          {showQualifications && doctor.qualifications && (
            <div className="space-y-2 mb-4">
              {doctor.qualifications.slice(0, 2).map((qualification) => (
                <div key={qualification} className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{qualification}</span>
                </div>
              ))}
            </div>
          )}

          {showContact && doctor.contact && (
            <div className="space-y-2 text-sm text-slate-700 border-t border-slate-100 pt-4 mb-4">
              {doctor.contact.email && (
                <div className="flex items-center gap-2">
                  <FiMail className="w-4 h-4 text-teal-500" />
                  <a
                    href={`mailto:${doctor.contact.email}`}
                    className="hover:text-teal-600 transition-colors truncate"
                  >
                    {doctor.contact.email}
                  </a>
                </div>
              )}

              {doctor.contact.phone && (
                <div className="flex items-center gap-2">
                  <FiPhone className="w-4 h-4 text-teal-500" />
                  <a
                    href={`tel:${doctor.contact.phone.replaceAll(/\D/g, "")}`}
                    className="hover:text-teal-600 transition-colors"
                  >
                    {doctor.contact.phone}
                  </a>
                </div>
              )}

              {doctor.contact.hours && (
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4 text-teal-500" />
                  <span>{doctor.contact.hours}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Keep button fixed at bottom */}
        <Link to={`/doctors/${doctor.id}`} className="mt-auto">
          <button className={`${currentVariant.button}`}>
            View Full Profile
            <FiArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    specialty: PropTypes.string,
    title: PropTypes.string,
    bio: PropTypes.string,
    qualifications: PropTypes.arrayOf(PropTypes.string),
    contact: PropTypes.shape({
      email: PropTypes.string,
      phone: PropTypes.string,
      hours: PropTypes.string,
    }),
  }).isRequired,
  variant: PropTypes.oneOf(["default", "compact", "featured"]),
  showQualifications: PropTypes.bool,
  showContact: PropTypes.bool,
};

export default DoctorCard;
