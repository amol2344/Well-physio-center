
import React, { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import {
  FiCheck,
  FiShield,
  FiZap,
  FiAward,
  FiInfo,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiArrowRight,
  FiClock,
  FiHome,
  FiVideo,
  FiPackage,
  FiLock,
  FiStar,
  FiHeart,
} from "react-icons/fi";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";




const PricingCard = ({ plan, onSelectPlan }) => {
  const planIcons = {
    "First Consultation": {
      icon: <FiShield className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    "Therapy Sessions": { icon: <FiZap className="w-5 h-5 sm:w-6 sm:h-6" /> },
    "Home Care": { icon: <FiHome className="w-5 h-5 sm:w-6 sm:h-6" /> },
    Modules: { icon: <FiPackage className="w-5 h-5 sm:w-6 sm:h-6" /> },
  };

  const colorVariants = {
    teal: {
      bg: "from-teal-500 via-teal-600 to-cyan-600",
      lightBg: "from-teal-50 to-cyan-50",
      glass: "bg-teal-500/10 backdrop-blur-lg border-teal-200/60",
      text: "text-teal-600",
      button:
        "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-teal-500/25",
      featureIcon: "text-teal-500",
      glow: "shadow-lg shadow-teal-500/20",
      badge: "bg-teal-500/10 text-teal-700 border-teal-200",
    },
    blue: {
      bg: "from-teal-500 via-teal-600 to-orange-500",
      lightBg: "from-teal-50 to-orange-50",
      glass: "bg-teal-500/10 backdrop-blur-lg border-teal-200/60",
      text: "text-teal-600",
      button:
        "bg-gradient-to-r from-teal-500 to-orange-600 hover:from-teal-600 hover:to-orange-700 shadow-teal-500/25",
      featureIcon: "text-teal-500",
      glow: "shadow-lg shadow-teal-500/20",
      badge: "bg-teal-500/10 text-teal-700 border-teal-200",
    },
    indigo: {
      bg: "from-orange-500 via-orange-600 to-teal-500",
      lightBg: "from-orange-50 to-teal-50",
      glass: "bg-orange-500/10 backdrop-blur-lg border-orange-200/60",
      text: "text-orange-600",
      button:
        "bg-gradient-to-r from-orange-500 to-teal-600 hover:from-orange-600 hover:to-teal-700 shadow-orange-500/25",
      featureIcon: "text-orange-500",
      glow: "shadow-lg shadow-orange-500/20",
      badge: "bg-orange-500/10 text-orange-700 border-orange-200",
    },
    purple: {
      bg: "from-teal-500 via-orange-500 to-teal-600",
      lightBg: "from-teal-50 to-orange-50",
      glass: "bg-teal-500/10 backdrop-blur-lg border-teal-200/60",
      text: "text-teal-600",
      button:
        "bg-gradient-to-r from-teal-500 to-orange-600 hover:from-teal-600 hover:to-orange-700 shadow-teal-500/25",
      featureIcon: "text-teal-500",
      glow: "shadow-lg shadow-teal-500/20",
      badge: "bg-teal-500/10 text-teal-700 border-teal-200",
    },
  };

  const colors = colorVariants[plan.color] || colorVariants.teal;

  return (
    <div
      className={`relative text-left bg-white rounded-2xl sm:rounded-3xl border-2 border-slate-100 transition-all duration-500 group h-full flex flex-col hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer ${
        plan.featured
          ? `ring-2 ring-offset-2 ${colors.glow} transform -translate-y-2 border-transparent`
          : "hover:border-teal-200"
      }`}
    >
      {/* Background Gradient Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.lightBg} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
      />

      {/* Featured Badge */}
      {plan.featured && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
          <div
            className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold border ${colors.badge} backdrop-blur-sm flex items-center gap-1`}
          >
            <FiStar className="w-3 h-3" />
            Most Popular
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="relative p-4 sm:p-6 text-center border-b border-slate-100/60">
        <div className="flex justify-center mb-3 sm:mb-4">
          <div
            className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${colors.glass} border backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}
          >
            {planIcons[plan.name]?.icon}
          </div>
        </div>

        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {plan.name}
          </h3>
          {plan.subtitle && (
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              {plan.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="relative p-4 sm:p-6 flex flex-col flex-grow">
        {/* Price Section */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-2xl sm:text-4xl font-bold text-slate-900">
              {plan.price}
            </span>
            {plan.period && (
              <span className="text-slate-500 text-sm sm:text-base font-medium">
                /{plan.period}
              </span>
            )}
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow">
          {plan.features.map((feature, index) => (
            <li
              key={feature}
              className="flex items-start group/item hover:translate-x-1 transition-transform duration-200"
            >
              <div
                className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg ${colors.glass} mr-2 sm:mr-3 backdrop-blur-sm border border-white/30 group-hover/item:scale-110 transition-transform duration-200 flex-shrink-0 mt-0.5`}
              >
                <FiCheck className={`${colors.featureIcon} w-3 h-3`} />
              </div>
              <span className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Button Section */}
        <div className="mt-auto pt-3 sm:pt-4">
          <button
            type="button"
            className={`w-full py-2.5 sm:py-3 px-4 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 ${colors.button} transform group-hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 backdrop-blur-sm text-sm sm:text-base`}
            onClick={() => onSelectPlan(plan)}
          >
            {plan.buttonText || "Get Started"}
            <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

PricingCard.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    price: PropTypes.string.isRequired,
    period: PropTypes.string,
    color: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    buttonText: PropTypes.string,
    featured: PropTypes.bool,
  }).isRequired,
  onSelectPlan: PropTypes.func.isRequired,
};

const PlanModal = ({ plan, isOpen, onClose, onSubmit }) => {
    const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    sessionType: "in-person",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
const navigate = useNavigate();
  // API URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const colorVariants = {
    teal: {
      bg: "from-teal-500 to-cyan-500",
      lightBg: "from-teal-50 to-cyan-100",
      glass: "bg-teal-500/10 backdrop-blur-lg border-teal-200/60",
      glassDark: "bg-teal-500/15 backdrop-blur-xl border-teal-200/40",
      text: "text-teal-600",
      border: "border-teal-200",
      button:
        "bg-gradient-to-r from-teal-500 to-orange-600 hover:from-teal-600 hover:to-orange-700 shadow-teal-500/25",
      inputFocus: "focus:ring-teal-500/20 focus:border-teal-400",
      progress: "bg-gradient-to-r from-teal-500 to-orange-500",
    },
    blue: {
      bg: "from-teal-500 to-orange-500",
      lightBg: "from-teal-50 to-orange-100",
      glass: "bg-teal-500/10 backdrop-blur-lg border-teal-200/60",
      glassDark: "bg-teal-500/15 backdrop-blur-xl border-teal-200/40",
      text: "text-teal-600",
      border: "border-teal-200",
      button:
        "bg-gradient-to-r from-teal-500 to-orange-600 hover:from-teal-600 hover:to-orange-700 shadow-teal-500/25",
      inputFocus: "focus:ring-teal-500/20 focus:border-teal-400",
      progress: "bg-gradient-to-r from-teal-500 to-orange-500",
    },
    indigo: {
      bg: "from-orange-500 to-teal-500",
      lightBg: "from-orange-50 to-teal-100",
      glass: "bg-orange-500/10 backdrop-blur-lg border-orange-200/60",
      glassDark: "bg-orange-500/15 backdrop-blur-xl border-orange-200/40",
      text: "text-orange-600",
      border: "border-orange-200",
      button:
        "bg-gradient-to-r from-orange-500 to-teal-600 hover:from-orange-600 hover:to-teal-700 shadow-orange-500/25",
      inputFocus: "focus:ring-orange-500/20 focus:border-orange-400",
      progress: "bg-gradient-to-r from-orange-500 to-teal-500",
    },
    purple: {
      bg: "from-teal-500 to-orange-500",
      lightBg: "from-teal-50 to-orange-100",
      glass: "bg-teal-500/10 backdrop-blur-lg border-teal-200/60",
      glassDark: "bg-teal-500/15 backdrop-blur-xl border-teal-200/40",
      text: "text-teal-600",
      border: "border-teal-200",
      button:
        "bg-gradient-to-r from-teal-500 to-orange-600 hover:from-teal-600 hover:to-orange-700 shadow-teal-500/25",
      inputFocus: "focus:ring-teal-500/20 focus:border-teal-400",
      progress: "bg-gradient-to-r from-teal-500 to-orange-500",
    },
  };

  const colors = colorVariants[plan?.color] || colorVariants.teal;

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill out all required fields.");
      return false;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number.");
      return false;
    }

    return true;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
if (!currentUser) {
  toast.error(
    "Please log in or sign up first to continue."
  );

  navigate("/login");

  return;
}
    // Validate form first
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Refactored message to avoid nested template literals
      const planPriceText =
        `Plan Price: ${plan.price}` +
        (plan.period ? ` per ${plan.period}` : "");
      
      // Prepare API request data
      const requestData = {
        type: 'pricing',
        data: {
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          plan_name: plan.name,
          session_type: formData.sessionType,
          message: formData.message || "None",
          plan_price: planPriceText,
        }
      };
// Save subscription request to Firebase
await addDoc(collection(db, "planInquiries"), {
  userId: currentUser.uid,

  name: formData.name,
  email: formData.email,
  phone: formData.phone,

  planName: plan.name,
  price: plan.price,
  duration: plan.period || "One Time",

  message: formData.message || "",

  status: "Pending",

  createdAt: serverTimestamp(),

  approvedAt: null,
  completedAt: null,
});
      // Send request to backend
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          `Thank you for your interest in ${plan.name}! We'll contact you within 2 hours.`
        );

        // Reset form data
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          sessionType: "in-person",
        });

        if (onSubmit) onSubmit(formData, plan);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error("Form submission error:", err);
      const errorMessage = err.response?.data?.error || err.message || "Failed to send message. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="relative w-full max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Main Modal Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              {/* Plan Info */}
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${colors.glassDark} border backdrop-blur-sm shadow-lg flex-shrink-0`}
                >
                  {plan.name === "First Consultation" && (
                    <FiShield className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                  )}
                  {plan.name === "Therapy Sessions" && (
                    <FiZap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                  )}
                  {plan.name === "Home Care" && (
                    <FiHome className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                  )}
                  {plan.name === "Modules" && (
                    <FiPackage className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                  )}
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">
                    {plan.name}
                  </h2>
                  {plan.subtitle && (
                    <p className="text-slate-600 font-medium text-sm sm:text-base truncate">
                      {plan.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Price & Close Button Container */}
              <div className="flex items-center justify-between sm:justify-end space-x-4">
                {/* Price */}
                <div className="text-right">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                    {plan.price}
                  </div>
                  {plan.period && (
                    <div className="text-slate-500 font-medium text-xs sm:text-sm">
                      per {plan.period}
                    </div>
                  )}
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all duration-200 hover:scale-110 shadow-lg flex-shrink-0"
                >
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-slate-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-slate-600">
                Step {currentStep} of 2
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-600">
                {currentStep === 1 ? "Plan Details" : "Contact Information"}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 sm:h-2">
              <div
                className={`h-1.5 sm:h-2 rounded-full ${colors.progress} transition-all duration-300`}
                style={{ width: `${(currentStep / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 lg:p-8">
            {currentStep === 1 && (
              <div className="space-y-6 sm:space-y-8">
                {/* Features Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div
                      className={`p-2 rounded-xl ${colors.glassDark} border backdrop-blur-sm shadow-lg flex-shrink-0`}
                    >
                      <FiAward
                        className={`${colors.text} w-4 h-4 sm:w-5 sm:h-5`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        What's Included
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1">
                        Everything you need for your recovery journey
                      </p>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid gap-3 sm:gap-4">
                    {plan.features.map((feature, index) => (
                      <div
                        key={feature}
                        className="flex items-start p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all duration-200"
                      >
                        <div
                          className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg ${colors.glass} mr-3 backdrop-blur-sm border border-white/30 flex-shrink-0 mt-0.5`}
                        >
                          <FiCheck className={`${colors.text} w-3 h-3`} />
                        </div>
                        <span className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits Card */}
                <div
                  className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${colors.glassDark} backdrop-blur-sm border ${colors.border} shadow-lg`}
                >
                  <div className="flex items-center mb-3">
                    <div
                      className={`p-1.5 sm:p-2 rounded-lg ${colors.glass} mr-3 flex-shrink-0`}
                    >
                      <FiHeart
                        className={`${colors.text} w-3 h-3 sm:w-4 sm:h-4`}
                      />
                    </div>
                    <h4 className="font-semibold text-slate-800 text-sm sm:text-base">
                      Why Choose This Plan?
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600">
                    <div className="flex items-center space-x-2">
                      <FiClock className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>Quick response within 2 hours</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiUser className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>Certified professionals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiShield className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>Secure & confidential</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiZap className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>Flexible scheduling</span>
                    </div>
                  </div>
                </div>

                {/* Next Step Button */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={nextStep}
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 ${colors.button} text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base`}
                  >
                    Continue to Contact
                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Contact Form Header */}
                <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <div
                    className={`p-2 rounded-xl ${colors.glassDark} border backdrop-blur-sm shadow-lg flex-shrink-0`}
                  >
                    <FiUser
                      className={`${colors.text} w-4 h-4 sm:w-5 sm:h-5`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Contact Information
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">
                      We'll get back to you within 2 hours
                    </p>
                  </div>
                </div>

                {/* Name & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center text-xs sm:text-sm font-semibold text-slate-700">
                      <FiUser className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 ${colors.border} rounded-2xl focus:outline-none focus:ring-4 ${colors.inputFocus} transition-all duration-200 placeholder-slate-400 text-slate-800 font-medium shadow-sm text-sm sm:text-base`}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-xs sm:text-sm font-semibold text-slate-700">
                      <FiPhone className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 ${colors.border} rounded-2xl focus:outline-none focus:ring-4 ${colors.inputFocus} transition-all duration-200 placeholder-slate-400 text-slate-800 font-medium shadow-sm text-sm sm:text-base`}
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center text-xs sm:text-sm font-semibold text-slate-700">
                    <FiMail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 ${colors.border} rounded-2xl focus:outline-none focus:ring-4 ${colors.inputFocus} transition-all duration-200 placeholder-slate-400 text-slate-800 font-medium shadow-sm text-sm sm:text-base`}
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Session Type - Only for Therapy Sessions */}
                {plan.name === "Therapy Sessions" && (
                  <div className="space-y-2">
                    <label className="flex items-center text-xs sm:text-sm font-semibold text-slate-700">
                      <FiVideo className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                      Preferred Session Type *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, sessionType: "in-person" })
                        }
                        className={`p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 font-medium text-xs sm:text-sm ${
                          formData.sessionType === "in-person"
                            ? `${colors.button} text-white border-transparent shadow-lg`
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        <FiUser className="w-3 h-3 sm:w-4 sm:h-4" />
                        In-Person
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            sessionType: "teleconsultation",
                          })
                        }
                        className={`p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 font-medium text-xs sm:text-sm ${
                          formData.sessionType === "teleconsultation"
                            ? `${colors.button} text-white border-transparent shadow-lg`
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        <FiVideo className="w-3 h-3 sm:w-4 sm:h-4" />
                        Teleconsultation
                      </button>
                    </div>
                  </div>
                )}

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="flex items-center text-xs sm:text-sm font-semibold text-slate-700">
                    <FiMessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    Additional Notes
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 ${colors.border} rounded-2xl focus:outline-none focus:ring-4 ${colors.inputFocus} transition-all duration-200 placeholder-slate-400 text-slate-800 font-medium resize-none shadow-sm text-sm sm:text-base`}
                    placeholder="Tell us about your specific requirements, medical conditions, or any questions you might have..."
                  />
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-6 border-t border-slate-200 gap-4 sm:gap-0">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-slate-100 text-slate-700 font-semibold rounded-2xl transition-all duration-200 hover:bg-slate-200 flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base order-2 sm:order-1"
                  >
                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 ${colors.button} text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 shadow-md text-sm sm:text-base order-1 sm:order-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiMail className="w-3 h-3 sm:w-4 sm:h-4" />
                        Send Inquiry
                      </>
                    )}
                  </button>
                </div>

                {/* Privacy Note */}
                <div className="text-center pt-3 sm:pt-4">
                  <p className="text-xs text-slate-500 flex items-center justify-center">
                    <FiLock className="w-3 h-3 mr-2 flex-shrink-0" />
                    Your information is secure and encrypted. We respect your
                    privacy.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

PlanModal.propTypes = {
  plan: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pricingPlans = [
    {
      id: 1,
      name: "First Consultation",
      subtitle: "Start your wellness journey",
      price: "FREE",
      period: "",
      color: "teal",
      features: [
        "Completely free first consultation",
        "Professional assessment",
        "Expert professional guidance",
        "No commitment required",
      ],
      buttonText: "Book Free Session",
      featured: true,
    },
    {
      id: 2,
      name: "Therapy Sessions",
      subtitle: "In-person & remote options",
      price: "₹499",
      period: "session",
      color: "blue",
      features: [
        "60-minute professional sessions",
        "Choose in-person or teleconsultation",
        "Expert rehabilitation guidance",
        "Personalized exercise plans",
        "Flexible scheduling options",
      ],
      buttonText: "Book Session",
    },
    {
      id: 3,
      name: "Home Care",
      subtitle: "Premium at-home service",
      price: "₹899",
      period: "session",
      color: "indigo",
      features: [
        "Therapy at your doorstep",
        "All equipment provided",
        "Personalized one-on-one attention",
        "Family training included",
        "Emergency support available",
        "Comprehensive care plans",
      ],
      buttonText: "Get Home Care",
    },
    {
      id: 4,
      name: "Modules",
      subtitle: "Custom learning packages",
      price: "₹100",
      period: "module",
      color: "purple",
      features: [
        "Enhance your program with modules",
        "Specialized exercise modules",
        "Self-paced learning platform",
        "Regular content updates",
      ],
      buttonText: "Explore Modules",
    },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPlan(null), 300);
  };

  const handleFormSubmit = (formData, plan) => {
    console.log("Form submitted successfully:", { formData, plan });
    handleCloseModal();
  };

  return (
    <section className="relative py-12 sm:py-24 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 px-4 sm:px-6">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-teal-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-80 sm:h-80 bg-orange-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center justify-center w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse" />

          <span className="eyebrow">TRANSPARENT PRICING</span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-slate-900 leading-tight">
            Professional Care for Your{" "}
            <span className="text-gradient">Recovery Journey</span>
          </h2>

          <p className="text-sm sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed px-2">
            Choose from our flexible therapy options designed to fit your
            lifestyle and recovery needs. Professional care with modern
            convenience.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelectPlan={handleSelectPlan}
            />
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm max-w-md">
            <FiInfo className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 mr-2 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-slate-600 font-medium text-center">
              *Prices may vary based on location and individual need
            </p>
          </div>
        </div>

        {/* Plan Modal */}
        <PlanModal
          plan={selectedPlan}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
        />
      </div>
    </section>
  );
};

export default PricingSection;
