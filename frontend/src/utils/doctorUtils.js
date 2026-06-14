import { doctors } from '../data/doctors';

/**
 * Get all doctors
 * @returns {Array} Array of all doctors
 */
export const getAllDoctors = () => doctors;

/**
 * Get a doctor by ID
 * @param {number} id - Doctor ID
 * @returns {Object|null} Doctor object or null if not found
 */
export const getDoctorById = (id) => {
  return doctors.find(doctor => doctor.id === Number.parseInt(id)) || null;
};

/**
 * Get doctors by specialty
 * @param {string} specialty - Specialty to filter by
 * @returns {Array} Array of doctors with matching specialty
 */
export const getDoctorsBySpecialty = (specialty) => {
  return doctors.filter(doctor => 
    doctor.specialty.toLowerCase().includes(specialty.toLowerCase()) ||
    doctor.title.toLowerCase().includes(specialty.toLowerCase())
  );
};

/**
 * Transform doctor data for card display
 * @param {Object} doctor - Doctor object
 * @param {Object} options - Transformation options
 * @returns {Object} Transformed doctor data
 */
export const transformDoctorForCard = (doctor, options = {}) => {
  const {
    maxQualifications = 2,
    includeContact = true,
    includeAddress = false
  } = options;

  return {
    id: doctor.id,
    name: doctor.name,
    title: doctor.title,
    specialty: doctor.specialty,
    bio: doctor.bio,
    qualifications: doctor.qualifications.slice(0, maxQualifications),
    image: doctor.image,
    contact: includeContact ? doctor.contact : null,
    address: includeAddress ? doctor.address : null
  };
};

/**
 * Transform doctor data for home page team section
 * @param {Object} doctor - Doctor object
 * @returns {Object} Transformed doctor data for team section
 */
export const transformDoctorForTeam = (doctor) => {
  return transformDoctorForCard(doctor, {
    maxQualifications: 2,
    includeContact: true,
    includeAddress: false
  });
};

/**
 * Transform doctor data for experts page
 * @param {Object} doctor - Doctor object
 * @returns {Object} Transformed doctor data for experts page
 */
export const transformDoctorForExperts = (doctor) => {
  return transformDoctorForCard(doctor, {
    maxQualifications: 3,
    includeContact: true,
    includeAddress: false
  });
};

/**
 * Get featured doctors (can be used for homepage highlights)
 * @param {number} limit - Maximum number of doctors to return
 * @returns {Array} Array of featured doctors
 */
export const getFeaturedDoctors = (limit = 4) => {
  return doctors.slice(0, limit);
};

/**
 * Search doctors by name, specialty, or qualifications
 * @param {string} query - Search query
 * @returns {Array} Array of matching doctors
 */
export const searchDoctors = (query) => {
  const searchTerm = query.toLowerCase();
  return doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm) ||
    doctor.specialty.toLowerCase().includes(searchTerm) ||
    doctor.title.toLowerCase().includes(searchTerm) ||
    doctor.qualifications.some(qual => 
      qual.toLowerCase().includes(searchTerm)
    )
  );
};

export default {
  getAllDoctors,
  getDoctorById,
  getDoctorsBySpecialty,
  transformDoctorForCard,
  transformDoctorForTeam,
  transformDoctorForExperts,
  getFeaturedDoctors,
  searchDoctors
};
