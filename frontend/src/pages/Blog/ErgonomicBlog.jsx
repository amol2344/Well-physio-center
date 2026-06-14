
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Import images
import ChinTuck from "../../assets/ErgonomicBlog/Chin-Tuck.webp";
import CoreContraction from "../../assets/ErgonomicBlog/Core-Contraction.webp";
import HepFlexor from "../../assets/ErgonomicBlog/Hep-Flexor.webp";
import SeatedCat from "../../assets/ErgonomicBlog/Seated-Cat.webp";
import SeatedLeg from "../../assets/ErgonomicBlog/Seated-Leg.webp";
import SeatedShoulder from "../../assets/ErgonomicBlog/Seated-Shoulder.webp";
import SeatedSpinal from "../../assets/ErgonomicBlog/Seated-Spinal.webp";
import UpperTrapezius from "../../assets/ErgonomicBlog/Upper-Trapezius.webp";
import WristPrayer from "../../assets/ErgonomicBlog/Wrist-Prayer.webp";

const exercises = [
  {
    title: "Chin Tuck",
    description:
      "Helps strengthen neck muscles and corrects forward head posture from long desk work.",
    steps: [
      "Sit or stand tall.",
      "Gently tuck your chin toward your chest without bending your neck.",
      "Hold for 5 seconds and release.",
    ],
    goal: "Reduce neck strain and improve posture.",
    reps: "10 reps",
    image: ChinTuck,
  },
  {
    title: "Core Contraction",
    description:
      "Activates core muscles to support your lower back during long sitting hours.",
    steps: [
      "Sit upright with feet flat.",
      "Draw your belly button in toward your spine.",
      "Hold for 5–10 seconds and release.",
    ],
    goal: "Strengthen core stability.",
    reps: "10 reps",
    image: CoreContraction,
  },
  {
    title: "Hip Flexor Stretch",
    description: "Stretches hip flexors tight from sitting for long hours.",
    steps: [
      "Stand and place one foot forward in a lunge position.",
      "Gently push hips forward, keeping chest tall.",
      "Hold for 20–30 seconds.",
    ],
    goal: "Reduce hip tightness.",
    reps: "2–3 reps per side",
    image: HepFlexor,
  },
  {
    title: "Seated Cat Stretch",
    description: "Improves flexibility and relieves tension in the spine.",
    steps: [
      "Sit tall with hands on knees.",
      "Arch your back and lift chest (Cow).",
      "Then round your back and tuck chin (Cat).",
    ],
    goal: "Enhance spine mobility.",
    reps: "10 reps",
    image: SeatedCat,
  },
  {
    title: "Seated Leg Extension",
    description:
      "Strengthens quadriceps and improves circulation while sitting.",
    steps: [
      "Sit with back straight.",
      "Extend one leg fully and squeeze thigh.",
      "Hold for 3 seconds, then lower.",
    ],
    goal: "Prevent stiffness and improve knee strength.",
    reps: "10 reps each leg",
    image: SeatedLeg,
  },
  {
    title: "Seated Shoulder Rolls",
    description: "Relieves shoulder stiffness and improves blood flow.",
    steps: [
      "Sit upright with arms relaxed.",
      "Roll shoulders backward in a circular motion 10 times.",
      "Then roll forward 10 times.",
    ],
    goal: "Reduce shoulder and neck tension.",
    reps: "10 reps each way",
    image: SeatedShoulder,
  },
  {
    title: "Seated Spinal Twist",
    description: "Improves spinal mobility and reduces stiffness.",
    steps: [
      "Sit tall with feet flat.",
      "Place right hand on chair back, left hand on thigh.",
      "Twist gently to the right, hold, then switch sides.",
    ],
    goal: "Enhance spine flexibility.",
    reps: "5 reps per side",
    image: SeatedSpinal,
  },
  {
    title: "Upper Trapezius Stretch",
    description: "Stretches upper shoulder muscles to release desk tension.",
    steps: [
      "Sit tall and hold chair with one hand.",
      "Tilt head to opposite side gently.",
      "Hold for 20 seconds, switch sides.",
    ],
    goal: "Relieve upper shoulder tightness.",
    reps: "2 reps per side",
    image: UpperTrapezius,
  },
  {
    title: "Wrist Prayer Stretch",
    description: "Relieves wrist tension caused by typing and mouse use.",
    steps: [
      "Sit with palms together in prayer position.",
      "Lower hands slowly toward waist while keeping palms pressed.",
      "Hold for 20–30 seconds.",
    ],
    goal: "Stretch wrist flexors and prevent stiffness.",
    reps: "2 reps",
    image: WristPrayer,
  },
];

// Exercise Card Component
const ExerciseCard = ({ exercise, index, refProp }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      ref={refProp}
      className="relative overflow-hidden rounded-3xl p-8 mb-10 transition-all duration-700 ease-out opacity-0 translate-y-10"
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl"></div>

      {/* Animated gradient border effect */}
      <div
        className={`absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-teal-400/30 to-orange-400/30 
        transition-all duration-500 ${
          isHovered ? "opacity-100" : "opacity-50"
        }`}
      ></div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-start">
        {exercise.image && (
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative bg-gradient-to-br from-white/60 via-white/40 to-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl w-full h-80 flex items-center justify-center overflow-hidden border-2 border-white/60 group">
              {/* Background decorative elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-orange-500/10 rounded-[2.5rem]"></div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-[2.5rem] p-[3px]">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-orange-500 to-teal-500 rounded-[2.5rem] opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </div>

              <img
                src={exercise.image}
                alt={`Illustration of ${exercise.title}`}
                loading="lazy"
                className="relative z-20 w-full h-full object-contain rounded-2xl transition-all duration-700 ease-out"
                style={{ 
                  transform: isHovered ? "scale(1.12) rotate(1deg)" : "scale(1)",
                  filter: isHovered 
                    ? "drop-shadow(0 0 30px rgba(13,148,136,0.4)) brightness(1.05) saturate(1.1)" 
                    : "drop-shadow(0 0 10px rgba(13,148,136,0.1))"
                }}
              />
              
              {/* Floating decorative icons for visual interest */}
              <div className="absolute top-4 left-4 w-6 h-6 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
            </div>
          </div>
        )}

        <div className="w-full lg:w-3/5">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-orange-500 text-white font-bold text-xl mr-4 shadow-lg">
              {index + 1}
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
              {exercise.title}
            </h3>
          </div>

          <p className="italic mb-6 text-slate-700 bg-white/50 p-4 rounded-2xl backdrop-blur-sm border border-slate-200">
            {exercise.description}
          </p>

          <h4 className="font-semibold mb-4 text-teal-700 flex items-center text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            How to do it:
          </h4>

          <ul className="space-y-4 mb-8">
            {exercise.steps.map((step, i) => (
              <li key={step} className="flex items-start text-slate-700 text-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-teal-100 to-orange-100 rounded-full flex items-center justify-center text-teal-700 text-sm font-bold mr-4 mt-0.5 shadow-md">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-teal-50/70 to-orange-50/70 p-5 rounded-2xl border-2 border-teal-100 shadow-lg">
              <p className="text-base font-semibold text-teal-700 mb-2">
                Ergonomic Goal
              </p>
              <p className="text-slate-700 text-lg">{exercise.goal}</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50/70 to-teal-50/70 p-5 rounded-2xl border-2 border-orange-100 shadow-lg">
              <p className="text-base font-semibold text-orange-700 mb-2">
                Recommended Reps
              </p>
              <p className="text-slate-700 text-lg">{exercise.reps}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    goal: PropTypes.string.isRequired,
    reps: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  refProp: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

const ErgonomicBlog = () => {
  const exerciseRefs = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    exerciseRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      exerciseRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 py-10 px-4 pt-28">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-orange-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <main className="max-w-5xl mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-teal-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>

        <div className="relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 mb-12 border-2 border-white/30 shadow-2xl overflow-hidden">
          {/* Header section*/}
          <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-teal-500 via-orange-500 to-teal-500"></div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent mt-6">
            The Ergonomic Advantage: 10 Desk Exercises to Injury-Proof Your
            Workday
          </h1>

          <div className="flex justify-center mb-8">
            <div className="w-32 h-1.5 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full"></div>
          </div>

          <p className="text-xl leading-relaxed text-slate-700 text-center mb-3">
            Long hours at a desk can lead to muscle stiffness, poor posture, and
            repetitive strain injuries. These simple yet effective exercises can
            be done right at your workstation to keep your body healthy and
            pain-free throughout the workday.
          </p>
        </div>

        <div className="relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 mb-12 border-2 border-white/30 shadow-2xl overflow-hidden">
          <div className="absolute -top-6 -right-6 w-36 h-36 bg-teal-400/10 rounded-full"></div>
          <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-orange-400/10 rounded-full"></div>

          <h2 className="text-3xl font-semibold mb-8 flex items-center">
            <span className="bg-gradient-to-r from-teal-500 to-orange-500 p-3 rounded-2xl mr-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
            <span className="bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent text-2xl">
              Why Desk Exercises Matter
            </span>
          </h2>

          <div className="space-y-5 text-slate-700">
            <p className="text-lg">
              Sitting for prolonged periods can lead to a variety of health
              issues, including poor posture, muscle imbalances, decreased
              circulation, and increased risk of chronic conditions.
              Incorporating simple exercises throughout your workday can:
            </p>

            <ul className="space-y-4">
              <li className="flex items-start text-lg">
                <span className="bg-gradient-to-r from-teal-100 to-orange-100 text-teal-700 rounded-full p-2 mr-4 flex-shrink-0 mt-1 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span>Improve posture and reduce back pain</span>
              </li>

              <li className="flex items-start text-lg">
                <span className="bg-gradient-to-r from-teal-100 to-orange-100 text-teal-700 rounded-full p-2 mr-4 flex-shrink-0 mt-1 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span>Increase blood circulation and energy levels</span>
              </li>

              <li className="flex items-start text-lg">
                <span className="bg-gradient-to-r from-teal-100 to-orange-100 text-teal-700 rounded-full p-2 mr-4 flex-shrink-0 mt-1 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span>Prevent repetitive strain injuries</span>
              </li>

              <li className="flex items-start text-lg">
                <span className="bg-gradient-to-r from-teal-100 to-orange-100 text-teal-700 rounded-full p-2 mr-4 flex-shrink-0 mt-1 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span>Enhance focus and productivity</span>
              </li>
            </ul>

            <p className="font-medium bg-gradient-to-r from-teal-50/70 to-orange-50/70 p-6 rounded-2xl border-2 border-teal-100 mt-6 text-lg">
              Try to perform these exercises every 60-90 minutes during your
              workday for best results. Even just a few minutes of movement can
              make a significant difference in how you feel.
            </p>
          </div>
        </div>

        <div className="relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 mb-12 border-2 border-white/30 shadow-2xl overflow-hidden">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-10 text-center bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
            10 Essential Desk Exercises for Office Workers
          </h2>

          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <ExerciseCard
                key={exercise}
                exercise={exercise}
                index={index}
                refProp={(el) => (exerciseRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>

        <div className="relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 border-2 border-white/30 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 via-orange-500 to-teal-500"></div>

          <h2 className="text-2xl lg:text-3xl font-semibold mb-8 flex items-center">
            <span className="bg-gradient-to-r from-teal-500 to-orange-500 p-3 rounded-2xl mr-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </span>
            <span className="bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent text-2xl">
              Pro Tips for Success
            </span>
          </h2>

          <ul className="space-y-5 mb-8">
            <li className="flex items-start text-lg">
              <span className="bg-gradient-to-r from-teal-100 to-orange-100 text-teal-700 rounded-full p-3 mr-4 flex-shrink-0 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span>Set reminders to take micro-breaks every hour</span>
            </li>

            <li className="flex items-start text-lg">
              <span className="bg-gradient-to-r from-teal-100 to-orange-100 text-teal-700 rounded-full p-3 mr-4 flex-shrink-0 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span>
                Focus on proper form rather than number of repetitions
              </span>
            </li>

            <li className="flex items-start text-lg">
              <span className="bg-gradient-to-r from-teal-100 to-orange-100 text-teal-700 rounded-full p-3 mr-4 flex-shrink-0 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span>
                Listen to your body and avoid any movements that cause pain
              </span>
            </li>

            <li className="flex items-start text-lg">
              <span className="bg-gradient-to-r from-teal-100 to-orange-100 text-teal-700 rounded-full p-3 mr-4 flex-shrink-0 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span>
                Combine these exercises with proper workstation ergonomics
              </span>
            </li>

            <li className="flex items-start text-lg">
              <span className="bg-gradient-to-r from-teal-100 to-orange-100 text-teal-700 rounded-full p-3 mr-4 flex-shrink-0 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span>
                Stay consistent - even brief daily practice yields significant
                benefits
              </span>
            </li>
          </ul>

          <div className="bg-gradient-to-r from-teal-50 to-orange-50 p-7 rounded-3xl border-2 border-white mt-8 shadow-xl">
            <p className="text-xl font-medium text-center text-slate-700 leading-relaxed">
              By incorporating these simple exercises into your daily routine,
              you'll not only prevent pain and injury but also boost your
              energy, focus, and overall productivity throughout the workday.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErgonomicBlog;
