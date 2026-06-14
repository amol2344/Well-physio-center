
import { FiUser, FiArrowRight, FiBookOpen, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

import LegRaisesImage from "../assets/KneeBlog/Stright-Leg.webp";
import SeatedSpinal from "../assets/ErgonomicBlog/Seated-Spinal.webp";
import BoneHealthImage from "../assets/BoneHealthBlog/Bone-Structure.webp";

import { Helmet } from "react-helmet";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title:
        "The Ergonomic Advantage: 10 Desk Exercises to Injury-Proof Your Workday",
      excerpt:
        "Long hours at a desk can lead to muscle stiffness and poor posture. These simple exercises can be done right at your workstation to keep your body healthy.",
      category: "Workplace Wellness",
      image: SeatedSpinal,
      author: "Dr. Truptti B. Mehta (PT)",
      slug: "/blog/ergonomic",
    },
    {
      id: 2,
      title:
        "Managing Knee Osteoarthritis: The Power of Strengthening Exercises",
      excerpt:
        "Learn how to build up the muscles around your knee to act as shock absorbers and reduce pain from osteoarthritis.",
      category: "Joint Health",
      image: LegRaisesImage,
      author: "Dr. Truptti B. Mehta (PT)",
      slug: "/blog/knee-osteoarthritis",
    },
    {
      id: 3,
      title:
        "Building a Fracture-Proof Future: Why Weightlifting Beats Walking for Bone Health",
      excerpt:
        "Discover why weight training is essential for bone health and how it can help prevent osteoporosis as we age.",
      category: "Bone Health",
      image: BoneHealthImage,
      author: "Dr. Truptti B. Mehta (PT)",
      slug: "/blog/bone-health",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <Helmet>
        <title>Blog | Wellness Physio Center</title>
        <meta
          name="description"
          content="Expert insights on physiotherapy, ergonomics, knee osteoarthritis, bone health, and more from Wellness Physio Center."
        />
        <meta
          name="keywords"
          content="physiotherapy blog, ergonomic tips, knee OA exercises, bone health"
        />
        <link rel="canonical" href="https://Wellness Physio Centerstudio.com/blog" />
        <meta property="og:title" content="Wellness Physio Center Blog" />
        <meta
          property="og:description"
          content="Expert insights, research updates, and wellness tips from our team of specialists."
        />
        <meta property="og:image" content="/logo.png" />
      </Helmet>
      {/* Background elements matching HeroSection */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-60 h-60 rounded-full bg-teal-200/20 blur-xl"></div>
        <div className="absolute bottom-1/3 right-20 w-80 h-80 rounded-full bg-orange-200/20 blur-xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-teal-50 to-orange-50 py-28 overflow-hidden pt-40">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm mb-6 border border-teal-200">
            <FiBookOpen className="mr-2 text-teal-600" />
            <span>Expert Health Insights</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
            Wellness Physio Center <span className="text-orange-600">Blog</span>
          </h1>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto mb-10">
            Expert insights, research updates, and wellness tips from our team
            of specialists
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 inline-flex items-center gap-4 border border-white/30">
            <div className="h-6 w-px bg-orange-200/40"></div>
            <div className="flex items-center justify-center gap-2 text-slate-700">
              <FiHeart className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium">HEALTH & WELLNESS</span>
            </div>
            <div className="h-6 w-px bg-orange-200/40"></div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="relative bg-slate-50 py-16 relative z-10 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
              Expert Insights
            </h2>
            <p className="font-medium text-slate-700 max-w-2xl mx-auto">
              Discover evidence-based approaches to pain management, injury
              prevention, and optimal movement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border border-white/30"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-56 object-contain bg-slate-100 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-teal-600 to-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <Link
                      to={post.slug}
                      className="flex items-center justify-between pt-4 border-t border-slate-100 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center">
                          <FiUser className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {post.author}
                        </span>
                      </div>
                      <span className="flex items-center gap-2 group-hover:gap-4 transition-all duration-300 text-orange-600 font-medium">
                          Read More
                        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
