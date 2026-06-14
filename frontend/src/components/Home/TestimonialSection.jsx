
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import PropTypes from "prop-types";

const TestimonialCard = ({ testimonial }) => {
  const rating = testimonial?.rating ?? 0;

  return (
    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-400 group border-2 border-slate-100 hover:border-teal-100 h-full flex flex-col">
      {/* Content Area */}
      <div className="p-8 flex flex-col flex-grow">
        {/* Quote Icon */}
        <div className="mb-6">
          <FaQuoteLeft className="text-teal-600 text-3xl opacity-80" />
        </div>

        {/* Testimonial Text */}
        <div className="mb-8 flex-grow">
          <p className="text-slate-700 text-lg leading-relaxed">
            {testimonial?.content}
          </p>
        </div>

        {/* Rating Stars */}
        <div className="flex justify-center mb-6" aria-label={`Rating: ${rating} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={`${testimonial.id}-star-${i}`}
              className={`text-2xl mx-1 ${
                i < rating ? "text-orange-500 fill-orange-500" : "text-slate-200 fill-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Author Info */}
        <div className="flex items-center pt-6 border-t border-slate-100">
          <div className="relative mr-5 flex-shrink-0">
            {testimonial?.avatar ? (
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="bg-gradient-to-br from-teal-600 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-lg">
                {testimonial?.name?.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-900 text-xl truncate">
              {testimonial?.name}
            </h4>
            <p className="text-base text-teal-700 font-semibold truncate">{testimonial?.role}</p>
            {testimonial?.company && (
              <p className="text-sm text-slate-500 mt-1 truncate">{testimonial.company}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="h-2 bg-gradient-to-r from-teal-600 via-orange-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
    </div>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    content: PropTypes.string.isRequired,
    rating: PropTypes.number,
    name: PropTypes.string.isRequired,
    role: PropTypes.string,
    company: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
};

const TestimonialsSection = ({ testimonials }) => {
  const displayTestimonials = testimonials || [];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="eyebrow">Testimonials</span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Trusted by <span className="text-gradient">Patients & Clinicians</span>
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-xl">
            Professional endorsements and patient success stories that speak volumes about our care
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {displayTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

TestimonialsSection.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      content: PropTypes.string.isRequired,
      rating: PropTypes.number,
      name: PropTypes.string.isRequired,
      role: PropTypes.string,
      company: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
};

export default TestimonialsSection;
