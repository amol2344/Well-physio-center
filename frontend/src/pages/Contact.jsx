import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUp,
  FiSend,
  FiAlertCircle,
} from "react-icons/fi";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // API URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // Input sanitization function to prevent XSS
  const sanitizeInput = (input) => {
    if (typeof input !== "string") return "";
    return input
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#x27;")
      .replaceAll("/", "&#x2F;")
      .trim();
  };

  // Enhanced validation
  const validateForm = () => {
    const errors = {};
    // Only sanitize here, not during typing!
    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedEmail = sanitizeInput(formData.email);
    const sanitizedMessage = sanitizeInput(formData.message);

    // Name validation
    if (!sanitizedName) {
      errors.name = "Name is required";
    } else if (sanitizedName.length < 2) {
      errors.name = "Name must be at least 2 characters long";
    } else if (sanitizedName.length > 50) {
      errors.name = "Name must be less than 50 characters";
    }

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!sanitizedEmail) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(sanitizedEmail)) {
      errors.email = "Please enter a valid email address";
    } else if (sanitizedEmail.length > 100) {
      errors.email = "Email must be less than 100 characters";
    }

    // Message validation
    if (!sanitizedMessage) {
      errors.message = "Message is required";
    } else if (sanitizedMessage.length < 10) {
      errors.message = "Message must be at least 10 characters long";
    } else if (sanitizedMessage.length > 1000) {
      errors.message = "Message must be less than 1000 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Show scroll button
  useEffect(() => {
    const handleScroll = () => setShowScrollButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Only use raw input here (do not sanitize)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setFormErrors({});
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting.");
      return;
    }
    setStatus({ submitting: true, success: false, error: null });

    // Prepare API request data
    const requestData = {
      type: 'contact',
      data: {
        user_name: sanitizeInput(formData.name),
        user_email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message),
      }
    };

    try {
      // Save to Firestore so it shows up in the sysadmin dashboard
      await addDoc(collection(db, "contactSubmissions"), {
        userUid: auth.currentUser ? auth.currentUser.uid : null,
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message),
        createdAt: serverTimestamp(),
      });

      // Send request to backend (existing email notification, unchanged)
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ submitting: false, success: true, error: null });
        resetForm();
        toast.success("Your message has been sent successfully!");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error("Form submission error:", err);

      // Generic error message for security
      const userFriendlyError =
        "Network error. Please check your connection and try again.";

      setStatus({
        submitting: false,
        success: false,
        error: userFriendlyError,
      });
      toast.error(userFriendlyError);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-white to-teal-50 py-16 relative z-10">
      <Helmet>
        <title>Contact Us | Wellness Physio Center - Physiotherapy Clinic in Mumbai</title>
        <meta
          name="description"
          content="Contact Wellness Physio Center in Mumbai for physiotherapy appointments, consultations, and personalized treatment plans. Get expert care for pain relief and rehabilitation."
        />
        <meta
          name="keywords"
          content="contact physiotherapy Mumbai, Wellness Physio Center contact, book physiotherapy appointment, pain management clinic, rehabilitation center Mumbai, physiotherapist near me"
        />
        <link rel="canonical" href="https://Wellness Physio Centerstudio.com/contact-us" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Contact Wellness Physio Center - Expert Physiotherapy in Mumbai" />
        <meta
          property="og:description"
          content="Get in touch with Wellness Physio Center for professional physiotherapy services, pain management, and rehabilitation treatments in Mumbai."
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://Wellness Physio Centerstudio.com/contact-us" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Wellness Physio Center" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "PRO-KINETIC PHYSIOTHERAPY CENTER",
            "description": "Professional physiotherapy clinic providing pain management and rehabilitation services in Mahad, Raigad",
            "url": "https://Wellness Physio Centerstudio.com/contact-us",
            "logo": "/logo.png",
            "medicalSpecialty": "Physiotherapy",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-8460286466",
              "contactType": "Customer Service",
              "email": "wellnessphysiocenters@gmail.com",
              "areaServed": "IN",
              "availableLanguage": ["English", "Hindi", "Marathi"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Opposite MMA Housing Society, Mahad MIDC",
              "addressLocality": "Mahad",
              "addressRegion": "Raigad",
              "postalCode": "402309",
              "addressCountry": "India"
            },
            "openingHours": "Mo-Fr 09:00-19:00"
          })}
        </script>
      </Helmet>

      {/* Scroll to top button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-10 bg-gradient-to-r from-teal-600 to-orange-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce md:animate-none backdrop-blur-sm"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-teal-50 to-orange-50 py-20 pt-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm mb-6 border border-teal-200">
            <FiSend className="mr-2 text-teal-600" />
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent">
            Get In <span className="text-orange-600">Touch</span>
          </h1>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            We'd love to hear from you. Please fill out the form below or use
            our contact information.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30">
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-teal-600 to-orange-600 p-3 rounded-full">
                  <FiMapPin className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Our Address
                  </h3>
                  <p className="text-slate-700">
                PRO-KINETIC PHYSIOTHERAPY CENTER<br />
                Opposite MMA Housing Society, Mahad MIDC, Raigad District, Maharashtra (Pin: 402309)
              </p>
                </div>
              </div>
            </div>

            <div className="bg-white backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30">
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-teal-600 to-orange-600 p-3 rounded-full">
                  <FiMail className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Email Us
                  </h3>
                  <p className="text-slate-700">wellnessphysiocenters@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30">
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-teal-600 to-orange-600 p-3 rounded-full">
                  <FiPhone className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Call Us
                  </h3>
                  <p className="text-slate-700 font-medium">8460286466</p>
                  <p className="text-sm text-teal-600 mt-1">
                    Available 9 AM - 6 PM, Mon-fri
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent mb-6">
                Send us a Message
              </h2>
              <form onSubmit={onSubmit} noValidate>
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      maxLength={50}
                      className="mt-1 block w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <FiAlertCircle className="mr-1" /> {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                      maxLength={100}
                      className="mt-1 block w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <FiAlertCircle className="mr-1" /> {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      required
                      maxLength={1000}
                      className="mt-1 block w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <FiAlertCircle className="mr-1" /> {formErrors.message}
                      </p>
                    )}
                    <div className="text-right text-sm text-slate-500 mt-1">
                      {formData.message.length}/1000
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={status.submitting}
                      className="group w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-medium text-white bg-gradient-to-r from-teal-600 to-orange-600 hover:from-orange-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                    >
                      {status.submitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <FiSend className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Map Section */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <FiMapPin className="mr-2 text-teal-600" /> Find Us
              </h3>
              <div className="overflow-hidden rounded-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0682967825383!2d73.4640713!3d18.0973678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc281201f3ec739:0xeb5c2644cf3dc7e6!2sDr+Trupti's+Physiotherapy+Clinic!5e0!3m2!1sen!2sin!4v1781027670000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                  title="Google Maps location of Dr Trupti's Physiotherapy Clinic"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;