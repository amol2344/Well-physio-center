
import { FiHeart, FiPlay, FiStar, FiUser } from "react-icons/fi";
import PropTypes from "prop-types";

const ExerciseCard = ({ exercise, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 relative border-2 border-slate-100 hover:border-teal-200 flex flex-col h-full">
      {/* Floating Favorite Button */}
      <button
        onClick={onToggleFavorite}
        className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Add to favorites"
      >
        <FiHeart
          className={`text-slate-400 group-hover:text-orange-500 transition-colors duration-300 text-2xl ${
            isFavorite ? "text-orange-500 fill-orange-500" : ""
          }`}
        />
      </button>

      {/* Image Container */}
      <div className="relative h-72 w-full overflow-hidden rounded-t-3xl flex-shrink-0">
        <img
          src={exercise.image}
          alt={exercise.title}
          loading="lazy"
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Therapist Info */}
        {exercise.therapist && (
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-teal-100 to-orange-100 p-2.5 rounded-full mr-3">
                <FiUser className="text-teal-700" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {exercise.therapist.name}
                </p>
                <p className="text-xs text-slate-500">
                  {exercise.therapist.specialty}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-slate-900 leading-tight">
            {exercise.title}
          </h3>
          <div className="flex items-center bg-orange-50 px-3 py-1.5 rounded-2xl border border-orange-100">
            <FiStar className="text-orange-500 mr-2" />
            <span className="text-sm font-bold text-orange-800">
              {exercise.rating || "4.9"}
            </span>
          </div>
        </div>

        <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
          {exercise.description}
        </p>

        {/* Difficulty & Category */}
        <div className="flex gap-3 mb-6">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-2xl text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
            {exercise.difficulty}
          </span>
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-2xl text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
            {exercise.category}
          </span>
        </div>

        {/* Action Button */}
        <div className="relative overflow-hidden rounded-2xl group mt-auto">
          <a href="/exercises" className="block">
            <button className="w-full flex items-center justify-center py-4 px-7 bg-gradient-to-r from-teal-600 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <FiPlay className="mr-3 text-xl group-hover:animate-pulse" />
              <span>Start Exercise</span>
            </button>
          </a>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-orange-700 opacity-0 group-hover:opacity-20 rounded-2xl -z-10 blur-xl transition-opacity duration-300" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-500 to-orange-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
};

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    difficulty: PropTypes.string.isRequired,
    category: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.number,
    equipment: PropTypes.arrayOf(PropTypes.string),
    therapist: PropTypes.shape({
      name: PropTypes.string,
      specialty: PropTypes.string,
    }),
  }).isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
};

export default ExerciseCard;
