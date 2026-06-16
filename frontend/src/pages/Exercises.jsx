
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FiSearch, FiHeart } from "react-icons/fi";
// Import images
import StaticQuadsImg from "../assets/KneeBlog/Dynamic-Quad.webp";
import LungesImg from "../assets/lunges.webp";
import WallSquatsImg from "../assets/wall-squats.webp";
import ClamShellsImg from "../assets/clam-shells.webp";
import SquatsImg from "../assets/squats.webp";
import SideWalkImg from "../assets/side-walk.webp";
import CatCowImg from "../assets/Cat-Cow-stretch.webp";
import PendulumImg from "../assets/Pendulum-Swing.webp";
import ChinTucksImg from "../assets/ErgonomicBlog/Chin-Tuck.webp";
import AnklePumpsImg from "../assets/Ankle-Pumps.webp";

const Exercises = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const difficultyLevels = [
    { id: "beginner", name: "Beginner", color: "from-teal-500 to-teal-700" },
    { id: "intermediate", name: "Intermediate", color: "from-orange-500 to-orange-700" },
    { id: "advanced", name: "Advanced", color: "from-purple-500 to-purple-700" },
  ];

  const exercises = [
    {
      id: 1,
      title: "Static Quads",
      description: "Sit on the floor with one leg straight and the other bent. Tighten the thigh muscle of your straight leg and hold for 5-10 seconds. Repeat 10-15 times.",
      difficulty: "beginner",
      category: "knee",
      image: StaticQuadsImg,
      equipment: ["None"],
      therapist: { name: "Dr. Truptti", specialty: "Orthopedic" },
    },
    {
      id: 2,
      title: "Lunges",
      description: "Step forward with your right leg and lower your body by bending your knees.",
      difficulty: "intermediate",
      category: "knee",
      image: LungesImg,
      equipment: ["None"],
      therapist: { name: "Dr. Truptti", specialty: "Sports Medicine" },
    },
    {
      id: 3,
      title: "Wall Squats",
      description: "Position yourself against a wall with your feet flat on the floor and shoulder-width apart.",
      difficulty: "beginner",
      category: "knee",
      image: WallSquatsImg,
      equipment: ["None"],
      therapist: { name: "Dr. Truptti", specialty: "Geriatric" },
    },
    {
      id: 4,
      title: "Clam Shells",
      description: "Start by lying on your side with your spine, hips, and head aligned in a straight line.",
      difficulty: "beginner",
      category: "knee",
      image: ClamShellsImg,
      equipment: ["None"],
      therapist: { name: "Dr. Truptti", specialty: "Orthopedic" },
    },
    {
      id: 5,
      title: "Squats",
      description: "Slowly bend your knees to lower your body, making sure to keep your back and pelvis straight.",
      difficulty: "intermediate",
      category: "knee",
      image: SquatsImg,
      equipment: ["None"],
      therapist: { name: "Dr. Truptti", specialty: "Sports Medicine" },
    },
    {
      id: 6,
      title: "Side Walk",
      description: "Put band around the ankle and walk sideways and back to starting position.",
      difficulty: "intermediate",
      category: "knee",
      image: SideWalkImg,
      equipment: ["Resistance Band"],
      therapist: { name: "Dr. Truptti", specialty: "Geriatric" },
    },
    {
      id: 7,
      title: "Cat-Cow Stretch",
      description: "Start on hands and knees. Arch your back upward like a cat, then drop your belly down while lifting your head and tailbone. Repeat 10-15 times.",
      difficulty: "beginner",
      category: "back",
      image: CatCowImg,
      equipment: ["Yoga Mat"],
      therapist: { name: "Dr. Truptti", specialty: "Chiropractic" },
    },
    {
      id: 8,
      title: "Pendulum Swing",
      description: "Lean forward with one arm hanging down. Gently swing arm in small circles clockwise and counterclockwise. Do 10 circles in each direction.",
      difficulty: "beginner",
      category: "shoulder",
      image: PendulumImg,
      equipment: ["None"],
      therapist: { name: "Dr. Truptti", specialty: "Sports Medicine" },
    },
    {
      id: 9,
      title: "Chin Tucks",
      description: 'Sit or stand with shoulders relaxed. Gently pull chin straight back creating a "double chin". Hold for 5 seconds and release. Repeat 10 times.',
      difficulty: "beginner",
      category: "neck",
      image: ChinTucksImg,
      equipment: ["None"],
      therapist: { name: "Dr. Truptti", specialty: "Physical Therapy" },
    },
    {
      id: 10,
      title: "Ankle Pumps",
      description: "Lie or sit with legs extended. Point toes away from you then pull them back toward you. Repeat 10-20 times every hour to improve circulation.",
      difficulty: "beginner",
      category: "post-surgery",
      image: AnklePumpsImg,
      equipment: ["None"],
      therapist: { name: "Dr. Truptti", specialty: "Rehabilitation" },
    },
  ];

  const filteredExercises = exercises.filter((exercise) => {
    const matchesCategory = activeFilter === "all" || exercise.category === activeFilter;
    const matchesSearch =
      exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulties.length === 0 ||
      selectedDifficulties.includes(exercise.difficulty.toLowerCase());
    return matchesCategory && matchesSearch && matchesDifficulty;
  });

  const clearFilters = () => {
    setActiveFilter("all");
    setSearchQuery("");
    setSelectedDifficulties([]);
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-slate-50 via-white to-teal-50 relative overflow-hidden">
      <Helmet>
        <title>Exercise Library | Wellness Physio Center</title>
        <meta
          name="description"
          content="Browse physiotherapy exercises by category and difficulty. Evidence-based routines curated by professionals."
        />
        <link rel="canonical" href="https://Wellness Physio Centerstudio.com/exercises" />
        <meta property="og:title" content="Exercise Library | Wellness Physio Center" />
        <meta
          property="og:description"
          content="Explore curated physiotherapy exercises by professionals."
        />
        <meta property="og:image" content="/logo.png" />
      </Helmet>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-60 h-60 rounded-full bg-teal-200/20 blur-xl"></div>
        <div className="absolute bottom-1/3 right-20 w-80 h-80 rounded-full bg-orange-200/20 blur-xl"></div>
      </div>

      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-md z-40 py-2 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search exercises..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/70 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
            Exercise Library
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Browse our collection of physiotherapy exercises curated by professionals
          </p>
        </div>

        {/* Exercises Grid */}
        {filteredExercises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExercises.map((exercise) => {
              const difficultyGradient =
                difficultyLevels.find(d => d.id === exercise.difficulty)?.color ||
                "from-purple-500 to-purple-700";
              const favoriteActive = favorites.includes(exercise.id);

              return (
                <div
                  key={exercise.id}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-white/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl group"
                >
                  <div className="relative">
                    <img
                      src={exercise.image}
                      alt={exercise.title}
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent"></div>
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => toggleFavorite(exercise.id)}
                        className={`p-2 rounded-full backdrop-blur-md border border-white/30 transition-all duration-300 ${
                          favoriteActive ? "bg-red-500/30 text-red-500 hover:bg-red-500/40" : "bg-white/70 text-gray-500 hover:bg-white"
                        }`}
                      >
                        <FiHeart className={`w-5 h-5 ${favoriteActive ? "fill-current" : ""}`} />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${difficultyGradient} shadow-md`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{exercise.title}</h3>
                    <p className="text-slate-700 mb-5 line-clamp-2 leading-relaxed">{exercise.description}</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-orange-100 rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <span className="text-teal-700 font-bold text-sm">{exercise.therapist.name.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{exercise.therapist.name}</p>
                        <p className="text-xs text-slate-600">{exercise.therapist.specialty}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 text-center border border-white/50">
            <div className="max-w-md mx-auto">
              <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-teal-100 to-orange-100 rounded-full flex items-center justify-center">
                <FiSearch className="text-4xl text-teal-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">No exercises found</h3>
              <p className="text-slate-700 mb-8 text-lg">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <button
                onClick={clearFilters}
                className="px-8 py-3 bg-gradient-to-r from-teal-500 to-orange-500 hover:from-orange-500 hover:to-teal-500 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercises;
