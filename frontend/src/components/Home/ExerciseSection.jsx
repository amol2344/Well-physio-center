
import { FiArrowRight } from "react-icons/fi";
import PropTypes from "prop-types";
import ExerciseCard from "../Shared/ExerciseCard";

const ExercisesSection = ({ featuredExercises }) => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <span className="eyebrow">Exercise Library</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Evidence-Based <span className="text-gradient">Protocols</span>
            </h2>
            <p className="text-slate-600 text-xl">
              Clinically-proven routines for targeted rehabilitation
            </p>
          </div>
          <a href="/exercises">
            <button className="flex items-center px-8 py-4 bg-white text-teal-700 font-semibold rounded-2xl shadow-lg border-2 border-teal-100 hover:bg-gradient-to-r from-teal-500 to-orange-500 hover:text-white hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              View all exercises <FiArrowRight className="ml-3 text-xl" />
            </button>
          </a>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
    </section>
  );
};

ExercisesSection.propTypes = {
  featuredExercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};

export default ExercisesSection;
