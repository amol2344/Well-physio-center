
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiAward, FiSearch } from 'react-icons/fi';
import { handleImageError, FALLBACK_DOCTOR_IMAGE } from '../../utils/imageUtils';

const TeamSection = ({ teamMembers }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="eyebrow">MEET OUR EXPERT TEAM</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            World-Class <span className="bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent">Healthcare Professionals</span>
          </h2>
          <p className="text-slate-700 max-w-3xl mx-auto text-lg leading-relaxed">
            Our multidisciplinary team combines cutting-edge medical expertise with compassionate care,
            ensuring you receive the highest quality treatment tailored to your unique needs.
          </p>
        </div>

        {/* Team Cards Grid */}
        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member) => (
              <Link key={member.id} to={`/doctors/${member.id}`} className="group">
                <div
                  type="button"
                  onMouseEnter={() => setHoveredCard(member.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative w-full text-left transform transition-all duration-500 ${
                    hoveredCard === member.id ? 'scale-105 z-20' : 'hover:scale-105'
                  }`}
                >
                  {/* Card */}
                  <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-500">
                    {/* Image Section */}
                    <div className="relative h-96 overflow-hidden bg-slate-100">
                      <div className="flex items-center justify-center h-full">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => handleImageError(e, FALLBACK_DOCTOR_IMAGE)}
                          style={{ width: 'auto', height: 'auto', maxHeight: '100%', maxWidth: '100%' }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 via-transparent to-transparent"></div>

                      {/* Floating Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <FiStar className="w-5 h-5 text-yellow-500" />
                      </div>

                      {/* Name and Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{member.name}</h3>
                        <p className="text-teal-200 font-medium drop-shadow-md">{member.title}</p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <p className="text-slate-700 mb-6 line-clamp-3 leading-relaxed">{member.bio}</p>

                      {/* Qualifications */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <FiAward className="w-4 h-4 text-teal-500" />
                          <span className="text-sm font-semibold text-slate-700">Key Qualifications</span>
                        </div>
                        <div className="space-y-2">
                          {member.qualifications.map((qual) => (
                            <div key={qual} className="flex items-center gap-2 text-sm text-slate-600">
                              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                              <span className="line-clamp-1">{qual}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div>
                        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-orange-600 hover:from-orange-600 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                          View Full Profile <FiArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-500 to-orange-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>

                  {/* Floating Achievement Badge */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12">
                    Expert
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 text-center border border-white/50 mb-16">
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

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-block p-8 bg-white rounded-3xl shadow-xl border border-white/50">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Meet Your Perfect Doctor?</h3>
            <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
              Explore our complete team of specialists and find the right healthcare professional for your needs.
            </p>

            <Link to="/experts">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-orange-600 hover:from-orange-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                View All Experts
                <FiArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// PropTypes validation
TeamSection.propTypes = {
  teamMembers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      title: PropTypes.string,
      image: PropTypes.string,
      bio: PropTypes.string,
      qualifications: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

export default TeamSection;
