
import React, { useState, useEffect, useRef } from "react";
import BoneStructure from "../../assets/BoneHealthBlog/Bone-Structure.webp";

const BoneHealthBlog = () => {
  const contentRefs = useRef([]);
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

    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      contentRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 py-8 px-4 pt-24 pb-16">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-teal-400 to-orange-400 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      <main className="max-w-4xl mx-auto relative">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-200/30 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-orange-200/30 rounded-full blur-xl"></div>

        {/* Intro */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-10 border border-white/30 shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-400 via-orange-400 to-teal-400"></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent mt-4">
            Building a Fracture-Proof Future: Why Weightlifting Beats Walking
            for Bone Health
          </h1>
          <div className="flex justify-center mb-6">
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-orange-400 rounded-full"></div>
          </div>
          <p className="text-lg leading-relaxed text-slate-700 text-center mb-2">
            We often think about our health in terms of things we can see or
            feel—the strength of our muscles, the health of our heart, or the
            number on a weighing scale. But deep inside our bodies, our bones
            are silently working, providing the framework for our entire lives.
          </p>
        </div>

        {/* Osteoporosis Section with Image */}
        <div
          ref={(el) => (contentRefs.current[0] = el)}
          className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-10 border border-white/30 shadow-xl transition-all duration-700 ease-out opacity-0 translate-y-10"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="bg-gradient-to-r from-teal-400 to-orange-400 p-2 rounded-lg mr-3 shadow-md">
              {/* Bone Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M14.24 8.06c-.19-.19-.34-.44-.38-.71A5.01 5.01 0 0012 7a5 5 0 00-4.24 7.06c.07.27-.03.57-.22.76l-1.41 1.41a2.003 2.003 0 002.83 2.83l1.41-1.41c.19-.19.49-.29.76-.22A5.001 5.001 0 0012 17a5 5 0 004.24-7.06c-.07-.27.03-.57.22-.76l1.41-1.41a2.003 2.003 0 10-2.83-2.83l-1.41 1.41z"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
              What is Osteoporosis? The Honeycomb in Your Bones
            </span>
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Image */}
            <div className="w-full md:w-2/5 flex justify-center">
              <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg w-full h-64 flex items-center justify-center border border-white/30">
                <img
                  src={BoneStructure}
                  alt="Healthy bone vs osteoporotic bone structure"
                  loading="lazy"
                  className="relative z-10 w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            {/* Text */}
            <div className="w-full md:w-3/5 space-y-4 text-slate-700">
              <p>
                Imagine a healthy bone under a microscope. It looks like a dense
                sponge or a tightly-knit honeycomb, strong and resilient. Now,
                imagine that same bone with osteoporosis. The holes in the
                honeycomb have become much larger, making the entire structure
                weak, brittle, and fragile.
              </p>
              <p>
                This is osteoporosis. It's a disease that thins and weakens your
                bones, making them so delicate that even a minor stumble, a
                cough, or bending over to pick something up can cause a painful
                fracture. It's often called a "silent disease" because you can't
                feel your bones getting weaker until one of them breaks.
              </p>
            </div>
          </div>
        </div>

        {/* Bone Bank Section */}
        <div
          ref={(el) => (contentRefs.current[1] = el)}
          className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-10 border border-white/30 shadow-xl transition-all duration-700 ease-out opacity-0 translate-y-10"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="bg-gradient-to-r from-teal-400 to-orange-400 p-2 rounded-lg mr-3 shadow-md">
              {/* Lightbulb Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
              How Do Bones Get Stronger? The "Bone Bank" Account
            </span>
          </h2>
          <div className="text-slate-700 space-y-4">
            <p>
              It's helpful to think of your bones like a bank account.
              Throughout your youth, you are busy making "deposits" of bone
              tissue, building up your savings. Your peak bone mass, the
              strongest your bones will ever be, is usually reached around age
              30. After that, your body starts to make slow "withdrawals." The
              goal is to keep your bone bank account as full as possible for as
              long as possible.
            </p>
            <p>
              So, how do you make a deposit? Bones are living tissues that
              respond to stress and load. When you put force on your bones, you
              send a signal to your body: "We need to be stronger here!" In
              response, your body sends bone-building cells to deposit more
              calcium and minerals, making that bone denser and stronger. This
              is the fundamental principle of bone health.
            </p>
          </div>
        </div>

        {/* Walking Section */}
        <div
          ref={(el) => (contentRefs.current[2] = el)}
          className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-10 border border-white/30 shadow-xl transition-all duration-700 ease-out opacity-0 translate-y-10"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="bg-gradient-to-r from-teal-400 to-orange-400 p-2 rounded-lg mr-3 shadow-md">
              {/* Walking Person Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M16 17l-1-4-2-3 1-4M12 12l-2 2-2-1M17 21l-4-2-1-3M6 16V13a2 2 0 012-2h2"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
              Walking is a Great Start, But It's Not Enough
            </span>
          </h2>
          <div className="text-slate-700 space-y-4">
            <p>
              A daily walk is fantastic for your cardiovascular health, your
              mood, and your overall well-being. It is a "weight-bearing"
              exercise, meaning your bones have to support your body weight, and
              this does provide some benefit. However, our bodies are incredibly
              efficient and adaptable.
            </p>
            <p>
              After a while, your body gets used to the gentle, repetitive
              stress of walking. It no longer sees it as a challenge that
              requires building new bone. The signal to make a "deposit" into
              your bone bank fades. While walking helps to slow down bone loss,
              it doesn't do much to actively build significant new bone density.
            </p>
          </div>
        </div>

        {/* Weightlifting Section */}
        <div
          ref={(el) => (contentRefs.current[3] = el)}
          className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-10 border border-white/30 shadow-xl transition-all duration-700 ease-out opacity-0 translate-y-10"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="bg-gradient-to-r from-teal-400 to-orange-400 p-2 rounded-lg mr-3 shadow-md">
              {/* Dumbbell Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M6 16V8M6 8H4v8h2zM20 16V8M20 8h2v8h-2zM7 10h10v4H7z"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
              Why Weightlifting is the Real Bone-Builder
            </span>
          </h2>

          <div className="text-slate-700 space-y-4">
            <p>
              This is where weightlifting and resistance training change the
              game. When you lift a weight, your muscles have to contract
              powerfully. These muscles are attached to your bones by tendons.
              The act of lifting creates a strong "tugging" force on your bones.
            </p>
            <p>
              This tugging is a much louder and more urgent signal to your body
              than walking. It's an alarm bell that shouts, "We are under a
              heavy load! We need to reinforce this structure immediately!"
            </p>
            <p>
              This powerful stimulus is what truly kick-starts your
              bone-building cells. They rush to the site and deposit new
              minerals, making the bone thicker, stronger, and more resistant to
              fractures. This applies to any form of resistance training—lifting
              dumbbells, using resistance bands, or even bodyweight exercises
              like squats and modified push-ups. The tension is the magic
              ingredient. It challenges the skeleton in a way that walking
              simply cannot.
            </p>
          </div>
        </div>

        {/* Key Takeaways */}
        <div
          ref={(el) => (contentRefs.current[4] = el)}
          className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-xl transition-all duration-700 ease-out opacity-0 translate-y-10"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="bg-gradient-to-r from-teal-400 to-orange-400 p-2 rounded-lg mr-3 shadow-md">
              {/* Checkmark Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
              Key Takeaways for Bone Health
            </span>
          </h2>
          <ul className="space-y-4 mb-6 text-slate-700">
            <li>
              ✅ Peak bone mass is achieved around age 30, after which we slowly
              lose bone density.
            </li>
            <li>
              ✅ Bones need progressive resistance to stimulate growth, not just
              repetitive motion.
            </li>
            <li>
              ✅ Walking maintains bone density but doesn't significantly build
              new bone.
            </li>
            <li>
              ✅ Weightlifting creates the "tugging" force needed to stimulate
              bone-building cells.
            </li>
            <li>
              ✅ It's never too late to start strength training for bone health.
            </li>
          </ul>
          <div className="bg-gradient-to-r from-teal-50 to-orange-50 p-5 rounded-xl border border-white mt-6">
            <p className="text-lg font-medium text-center text-slate-700">
              In conclusion, think of your exercise routine as a team. Walking
              is the player that takes care of your heart and endurance. But
              weightlifting is the specialized player you need to build and
              protect your very foundation. By adding some form of resistance
              training to your routine, you are not just building muscle; you
              are making crucial deposits into your bone bank, ensuring your
              skeleton remains strong, resilient, and ready to support you for a
              long and active life.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BoneHealthBlog;
