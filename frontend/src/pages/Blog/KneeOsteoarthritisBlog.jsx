import React, { useEffect, useRef, useState } from "react";
import QuadSetsImage from "../../assets/KneeBlog/Quad-Sets.webp";
import LegRaisesImage from "../../assets/KneeBlog/Stright-Leg.webp";
import HamstringCurlsImage from "../../assets/KneeBlog/Hamstring-Curls.webp";
import GluteBridgesImage from "../../assets/KneeBlog/Glute-Bridges.webp";
import SideLegRaisesImage from "../../assets/KneeBlog/Side_leg.webp";
import SitToStandImage from "../../assets/KneeBlog/Sit-to-Stand.webp";
import QuadExtensionsImage from "../../assets/KneeBlog/Dynamic-Quad.webp";
import HeelRaisesImage from "../../assets/KneeBlog/Heel-Raises.webp";
import PillowSqueezeImage from "../../assets/KneeBlog/Pillow-Squeeze.webp";
import StepUpsImage from "../../assets/KneeBlog/Step-Ups.webp";
import PropTypes from "prop-types";

// Add unique id to each exercise
const exercises = [
  {
    id: "1",
    title: "Quad Sets",
    description:
      "This is a simple but effective exercise for activating your quadriceps (front thigh muscles) without putting pressure on the knee joint.",
    steps: [
      "Lie on your back with your legs straight.",
      "Place a small rolled-up towel under one knee.",
      "Tighten the thigh muscles of that leg, pressing the back of your knee into the towel.",
      "Hold the contraction for 5 seconds, then relax.",
      "Repeat 10 times on each leg.",
    ],
    image: QuadSetsImage,
  },
  {
    id: "2",
    title: "Straight Leg Raises",
    description: "This exercise strengthens the quadriceps and hip flexors.",
    steps: [
      "Lie on your back with one leg straight and the other bent with your foot flat on the floor.",
      "Tighten the thigh muscle of your straight leg and slowly lift it about a foot off the floor.",
      "Hold for 3-5 seconds, then slowly lower your leg.",
      "Do 10-15 repetitions on each leg.",
    ],
    image: LegRaisesImage,
  },
  {
    id: "3",
    title: "Hamstring Curls",
    description:
      "This exercise targets the hamstrings (muscles at the back of your thigh).",
    steps: [
      "Lie on your stomach and keep both legs straight.",
      "Slowly bend one knee, bringing your heel up towards your buttock.",
      "Hold for 3-5 seconds.",
      "Do 10-15 repetitions on each leg.",
    ],
    image: HamstringCurlsImage,
  },
  {
    id: "4",
    title: "Glute Bridges",
    description:
      "Bridges are great for strengthening your glutes and hamstrings, which helps to support your knees.",
    steps: [
      "Lie on your back with your knees bent and feet flat on the floor, hip-width apart.",
      "Squeeze your glutes and lift your hips off the floor until your body forms a straight line from your shoulders to your knees.",
      "Hold for 3-5 seconds, then slowly lower your hips.",
      "Repeat 10-15 times.",
    ],
    image: GluteBridgesImage,
  },
  {
    id: "5",
    title: "Side Leg Raises",
    description:
      "This exercise strengthens the hip abductor muscles, which are important for hip and knee stability.",
    steps: [
      "Lie on your side with your legs stacked.",
      "Keeping your top leg straight, lift it towards the ceiling without rocking your torso.",
      "Hold for a moment at the top.",
      "Do 10-15 repetitions on each side.",
    ],
    image: SideLegRaisesImage,
  },
  {
    id: "6",
    title: "Sit to Stand",
    description:
      "This functional exercise strengthens your quads, hamstrings, and glutes, and it mimics a movement you do every day.",
    steps: [
      "Sit on the edge of a sturdy chair with your feet flat on the floor.",
      "Cross your arms over your chest and, keeping your back straight, slowly stand up.",
      "Then, slowly sit back down.",
      "Repeat 10-15 times.",
    ],
    image: SitToStandImage,
  },
  {
    id: "7",
    title: "Dynamic Quad Extensions",
    description:
      "This exercise is excellent for isolating and strengthening your quadriceps through a controlled range of motion.",
    steps: [
      "Sit tall on a sturdy chair with your back supported and your feet flat on the floor.",
      "Slowly straighten one leg out in front of you until it is as straight as you can comfortably get it.",
      "Focus on squeezing the muscles on the front of your thigh as you lift.",
      "Hold the straight-leg position briefly for 1-2 seconds at the peak of the contraction.",
      "Slowly lower your leg back to the starting position.",
      "Repeat 10-15 times on one leg before switching to the other.",
    ],
    image: QuadExtensionsImage,
  },
  {
    id: "8",
    title: "Heel Raises",
    description:
      "This exercise strengthens your calf muscles, which play a role in supporting the knee.",
    steps: [
      "Stand with your feet flat on the floor, holding onto a chair or counter for support.",
      "Slowly raise your heels off the floor, coming up onto your toes.",
      "Hold for 3-5 seconds.",
      "Do 10-15 repetitions.",
    ],
    image: HeelRaisesImage,
  },
  {
    id: "9",
    title: "Pillow Squeeze",
    description: "This exercise targets the inner thigh muscles (adductors).",
    steps: [
      "Lie on your back with your knees bent and a pillow between your knees.",
      "Squeeze the pillow with your knees.",
      "Hold the squeeze for 5 seconds, then relax.",
      "Repeat 10-15 times.",
    ],
    image: PillowSqueezeImage,
  },
  {
    id: "10",
    title: "Step-Ups",
    description:
      "Step-ups are a great way to build strength for activities like climbing stairs.",
    steps: [
      "Stand in front of a small step or the bottom step of a staircase.",
      "Step up with one foot, then bring the other foot up to meet it.",
      "Step back down with the first foot, followed by the second.",
      "Repeat 10 times, leading with one leg, then switch and do 10 more leading with the other leg.",
    ],
    image: StepUpsImage,
  },
];

const ExerciseCard = ({ exercise, index, refProp }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      ref={refProp}
      className={`relative overflow-hidden rounded-2xl p-6 mb-10 transition-all duration-700 ease-out
      ${index % 2 === 0 ? "ml-0" : "mr-0"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"></div>
      <div
        className={`absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-blue-400/30 to-purple-400/30 
        transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-50"}`}
      ></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-2/5 flex justify-center">
          <div className="relative bg-white/30 backdrop-blur-sm p-4 rounded-2xl shadow-lg w-full h-72 flex items-center justify-center overflow-hidden border border-white/30">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-2xl"></div>
            <img
              src={exercise.image}
              alt={`Illustration of ${exercise.title}`}
              loading="lazy"
              className="relative z-10 w-full h-full object-contain rounded-lg transition-transform duration-500 ease-out"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
          </div>
        </div>
        <div className="w-full md:w-3/5">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold text-lg mr-3 shadow-md">
              {index + 1}
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {exercise.title}
            </h3>
          </div>

          <p className="italic mb-4 text-gray-700 bg-white/40 p-3 rounded-lg backdrop-blur-sm">
            {exercise.description}
          </p>

          <h4 className="font-semibold mb-3 text-blue-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
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

          <ul className="space-y-3">
            {exercise.steps.map((step, i) => (
              <li key={step} className="flex items-start text-gray-700">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold mr-3 mt-1">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

// PropTypes after component declaration
ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  refProp: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

const KneeOsteoarthritisBlog = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 pt-24">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <main className="max-w-4xl mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-200/30 rounded-full blur-xl"></div>

        <div className="relative bg-white/30 backdrop-blur-lg rounded-3xl p-8 mb-10 border border-white/20 shadow-xl overflow-hidden">
          {/* Header gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>

       <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-4">
  Managing Knee Osteoarthritis: The Power of Strengthening Exercises
</h1>

          <div className="flex justify-center mb-6">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </div>

          <p className="text-lg leading-relaxed text-gray-700 text-center mb-2">
            Think of knee osteoarthritis as the cushioning in your knee joint
            wearing thin over time. This can make your knee feel painful, stiff,
            and hard to move. While there's no magic cure, you can do a lot to
            manage it and feel much better. One of the best things you can do is
            a regular exercise routine designed to help your knees.
          </p>
        </div>

        <div className="relative bg-white/30 backdrop-blur-lg rounded-3xl p-8 mb-10 border border-white/20 shadow-xl overflow-hidden">
          <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-400/10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-400/10 rounded-full"></div>

          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 p-2 rounded-lg mr-3 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
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
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Strength Matters
            </span>
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              The main idea behind these exercises is to build up the muscles
              around your knee—specifically the ones in the front and back of
              your thighs, and in your butt. When these muscles are strong, they
              act like shock absorbers for your knee. They take a lot of the
              pressure off the worn-out, painful parts of the joint.
            </p>

            <p>
              This not only eases the pain but also makes you feel much steadier
              on your feet, so you're less likely to fall. Plus, moving around
              helps keep the joint from getting too stiff and can help you
              manage your weight. Losing even a few pounds takes a lot of stress
              off your knees.
            </p>

            <p className="font-medium bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              To get these benefits, the most important thing you can do is
              focus on exercises that build muscle. These strengthening
              exercises are the foundation for feeling better and getting back
              to doing the things you enjoy.
            </p>
          </div>
        </div>

        <div className="relative bg-white/30 backdrop-blur-lg rounded-3xl p-8 mb-10 border border-white/20 shadow-xl overflow-hidden">
          <h2 className="text-3xl font-semibold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            10 Essential Exercises for Knee Osteoarthritis Relief
          </h2>

          <div className="space-y-2">
            {exercises.map((exercise, index) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                index={index}
                refProp={(el) => (exerciseRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>

        <div className="relative bg-white/30 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>

          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 p-2 rounded-lg mr-3 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
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
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Important Tips
            </span>
          </h2>

          <ul className="space-y-4 mb-6">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 flex-shrink-0">
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
              <span>Start with low reps and build gradually.</span>
            </li>

            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 flex-shrink-0">
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
              <span>
                Listen to your body and stop if you feel any sharp pain.
              </span>
            </li>

            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 flex-shrink-0">
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
              <span>
                It's always a good idea to talk to your doctor or a physical
                therapist before starting a new exercise program.
              </span>
            </li>

            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 flex-shrink-0">
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
              <span>Discomfort is okay, but pain is a red flag.</span>
            </li>

            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 flex-shrink-0">
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
              <span>
                Consistency is more important than intensity - regular practice
                yields the best results.
              </span>
            </li>
          </ul>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border border-white mt-6">
            <p className="text-lg font-medium text-center text-gray-700">
              By committing to these exercises, you're not just managing
              osteoarthritis—you're reclaiming control over your movement,
              comfort, and confidence.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KneeOsteoarthritisBlog;
