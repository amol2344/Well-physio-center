
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import {
  FiUser,
  FiActivity,
  FiHeart,
  FiAlertCircle,
  FiMapPin,
  FiArrowRight,
  
  FiArrowLeft,
  FiClock,
  FiPhoneCall,
  FiSend
} from "react-icons/fi";
import PropTypes from "prop-types";

// InfoCard Component with Prop Validation
const InfoCard = ({ icon: Icon, title, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mr-3 border border-blue-100">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <div>{children}</div>
  </motion.div>
);
InfoCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  delay: PropTypes.number,
};
InfoCard.defaultProps = {
  delay: 0,
};

// Step 1: Personal Information
const PersonalInfoStep = ({ formData, errors, handleInputChange }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
        <FiUser className="text-2xl text-blue-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Personal Information</h2>
      <p className="text-gray-600">Tell us about yourself</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
          First Name *
        </label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          className={`w-full p-4 text-base border rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-colors ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your first name"
        />
        {errors.firstName && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <FiAlertCircle className="w-4 h-4" />
            {errors.firstName}
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
          Last Name *
        </label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          className={`w-full p-4 text-base border rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-colors ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your last name"
        />
        {errors.lastName && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <FiAlertCircle className="w-4 h-4" />
            {errors.lastName}
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth *
        </label>
        <input
          type="date"
          id="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          className={`w-full p-4 text-base border rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-colors ${
            errors.dateOfBirth ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.dateOfBirth && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <FiAlertCircle className="w-4 h-4" />
            {errors.dateOfBirth}
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className={`w-full p-4 text-base border rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-colors ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your phone number"
        />
        {errors.phone && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <FiAlertCircle className="w-4 h-4" />
            {errors.phone}
          </motion.p>
        )}
      </div>

      <div className="md:col-span-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={`w-full p-4 text-base border rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-colors ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <FiAlertCircle className="w-4 h-4" />
            {errors.email}
          </motion.p>
        )}
      </div>

      <div className="md:col-span-2">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className={`w-full p-4 text-base border rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-colors ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your complete address"
        />
        {errors.address && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <FiAlertCircle className="w-4 h-4" />
            {errors.address}
          </motion.p>
        )}
      </div>
    </div>
  </motion.div>
);
PersonalInfoStep.propTypes = {
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    additionalInfo: PropTypes.string,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

// Step 2: Pain & Symptoms
const PainSymptomsStep = ({ bodyAreas, selectedPoints, errors, togglePoint, painLevel, setPainLevel, quickQuestions, handleQuickQuestionChange }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-100">
        <FiActivity className="text-2xl text-orange-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Pain & Symptoms</h2>
      <p className="text-gray-600">Describe what you're experiencing</p>
    </div>

    {/* Pain Areas Selection */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Where are you experiencing pain? *</h3>
      {errors.painAreas && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm mb-4 flex items-center gap-1">
          <FiAlertCircle className="w-4 h-4" />
          {errors.painAreas}
        </motion.p>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {bodyAreas.map((area, index) => (
          <motion.button
            key={area.name}
            type="button"
            onClick={() => togglePoint(area.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
              selectedPoints.includes(area.name)
                ? "bg-blue-50 border-blue-500 text-blue-700"
                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            <span className="text-2xl mb-2">{area.icon}</span>
            <span className="text-sm font-medium">{area.name}</span>
          </motion.button>
        ))}
      </div>
    </div>

    {/* Pain Level */}
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Pain Level: {painLevel}/10</h3>
      <div className="space-y-4">
        <input
          type="range"
          min="0"
          max="10"
          value={painLevel}
          onChange={(e) => setPainLevel(Number.parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>No Pain</span>
          <span>Moderate</span>
          <span>Severe</span>
        </div>
      </div>
    </div>

    {/* Quick Questions */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions *</h3>
      {errors.quickQuestions && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm mb-4 flex items-center gap-1">
          <FiAlertCircle className="w-4 h-4" />
          {errors.quickQuestions}
        </motion.p>
      )}
      {[
        { id: "work", question: "Does this pain affect your work?" },
        { id: "activities", question: "Does it affect daily activities?" },
        { id: "sports", question: "Does it affect sports or hobbies?" },
        { id: "previous", question: "Have you had this pain before?" }
      ].map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-900">{item.question}</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={item.id}
                  value="No"
                  checked={quickQuestions[item.id] === "No"}
                  onChange={() => handleQuickQuestionChange(item.id, "No")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 font-medium">No</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={item.id}
                  value="Yes"
                  checked={quickQuestions[item.id] === "Yes"}
                  onChange={() => handleQuickQuestionChange(item.id, "Yes")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 font-medium">Yes</span>
              </label>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);
PainSymptomsStep.propTypes = {
  bodyAreas: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
  })).isRequired,
  selectedPoints: PropTypes.arrayOf(PropTypes.string).isRequired,
  errors: PropTypes.object.isRequired,
  togglePoint: PropTypes.func.isRequired,
  painLevel: PropTypes.number.isRequired,
  setPainLevel: PropTypes.func.isRequired,
  quickQuestions: PropTypes.object.isRequired,
  handleQuickQuestionChange: PropTypes.func.isRequired,
};

// Step 3: Medical History
const MedicalHistoryStep = ({
  medicalQuestions, errors, handleMedicalQuestionChange, formData, handleInputChange, isFormComplete
}) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-100">
        <FiHeart className="text-2xl text-green-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Medical History</h2>
      <p className="text-gray-600">Help us understand your health background</p>
    </div>

    {/* Medical Questions */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Questions *</h3>
      {errors.medicalQuestions && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm mb-4 flex items-center gap-1">
          <FiAlertCircle className="w-4 h-4" />
          {errors.medicalQuestions}
        </motion.p>
      )}
      {[
        { id: "medications", question: "Are you taking any medications?", icon: "💊" },
        { id: "heart", question: "Do you have heart problems?", icon: "❤" },
        { id: "breathing", question: "Any breathing difficulties?", icon: "🌬" },
        { id: "bloodPressure", question: "Do you have high blood pressure?", icon: "🩸" },
        { id: "surgeries", question: "Have you had any surgeries?", icon: "🦴" },
        { id: "allergies", question: "Any medication allergies?", icon: "🤧" }
      ].map(item => (
        <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-900">
              <span className="text-xl mr-3">{item.icon}</span>
              {item.question}
            </span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name={`med${item.id}`} 
                  value="No" 
                  checked={medicalQuestions[item.id] === "No"}
                  onChange={() => handleMedicalQuestionChange(item.id, "No")} 
                  className="w-4 h-4 text-blue-600" 
                />
                <span className="text-gray-700 font-medium">No</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name={`med${item.id}`} 
                  value="Yes" 
                  checked={medicalQuestions[item.id] === "Yes"}
                  onChange={() => handleMedicalQuestionChange(item.id, "Yes")} 
                  className="w-4 h-4 text-blue-600" 
                />
                <span className="text-gray-700 font-medium">Yes</span>
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Additional Information */}
    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FiAlertCircle className="w-5 h-5 text-blue-600 mr-2" />
        Additional Information
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Please share any other health concerns or information that might help us understand your condition better.
      </p>
      <textarea
        id="additional-info"
        rows="4"
        placeholder="Type any additional information here..."
        value={formData.additionalInfo}
        onChange={e => handleInputChange("additionalInfo", e.target.value)}
        className="w-full p-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-colors bg-white"
      ></textarea>
    </div>



    {/* Form Completion Status */}
    <div className={`p-4 rounded-xl border ${isFormComplete() ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}`}>
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${isFormComplete() ? "bg-green-500" : "bg-yellow-500"}`}></div>
        <p className={`text-sm font-medium ${isFormComplete() ? "text-green-700" : "text-yellow-700"}`}>
          {isFormComplete()
            ? "All required fields are completed. You can submit your appointment request."
            : "Please complete all required fields marked with * to submit your appointment request."}
        </p>
      </div>
    </div>
  </motion.div>
);

MedicalHistoryStep.propTypes = {
  medicalQuestions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleMedicalQuestionChange: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    additionalInfo: PropTypes.string,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isFormComplete: PropTypes.func.isRequired,
};


const Appointment = () => {
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [painLevel, setPainLevel] = useState(5);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    address: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState({});
  const [medicalQuestions, setMedicalQuestions] = useState({});
  const [quickQuestions, setQuickQuestions] = useState({});
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });
  
  // API URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const steps = ["Personal Information", "Pain & Symptoms", "Medical History"];
  const bodyAreas = [
    { name: "Head", icon: "🧠" }, { name: "Neck", icon: "👔" }, { name: "Shoulders", icon: "💪" },
    { name: "Back", icon: "🔼" }, { name: "Arms", icon: "🦵" }, { name: "Hands", icon: "✋" },
    { name: "Chest", icon: "❤" }, { name: "Stomach", icon: "🍎" }, { name: "Hips", icon: "🔄" },
    { name: "Legs", icon: "🚶" }, { name: "Knees", icon: "🦵" }, { name: "Feet", icon: "👣" },
  ];

  // Helper functions for validation
  const validatePersonalInfo = (errors) => {
    const requiredFields = [
      { field: 'firstName', message: 'First name is required' },
      { field: 'lastName', message: 'Last name is required' },
      { field: 'dateOfBirth', message: 'Date of birth is required' },
      { field: 'phone', message: 'Phone number is required' },
      { field: 'address', message: 'Address is required' }
    ];

    requiredFields.forEach(({ field, message }) => {
      if (!formData[field]?.trim?.()) {
        errors[field] = message;
      }
    });

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Email is invalid";
    }
  };

  const validatePainSymptoms = (errors) => {
    if (selectedPoints.length === 0) {
      errors.painAreas = "Please select at least one pain area";
    }

    const quickQuestionIds = ["work", "activities", "sports", "previous"];
    const hasUnansweredQuestions = quickQuestionIds.some(id => !quickQuestions[id]);
    
    if (hasUnansweredQuestions) {
      errors.quickQuestions = "Please answer all quick questions";
    }
  };

  const validateMedicalHistory = (errors) => {
    const medicalQuestionIds = ["medications", "heart", "breathing", "bloodPressure", "surgeries", "allergies"];
    const hasUnansweredMedicalQuestions = medicalQuestionIds.some(id => !medicalQuestions[id]);
    
    if (hasUnansweredMedicalQuestions) {
      errors.medicalQuestions = "Please answer all medical questions";
    }
  };

  const validateStep = (step) => {
    let errors = {};
    
    const stepValidators = {
      0: () => validatePersonalInfo(errors),
      1: () => validatePainSymptoms(errors),
      2: () => validateMedicalHistory(errors)
    };

    if (stepValidators[step]) {
      stepValidators[step]();
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const togglePoint = (pointName) => {
    setSelectedPoints((prev) =>
      prev.includes(pointName)
        ? prev.filter((p) => p !== pointName)
        : [...prev, pointName]
    );
  };

  const handleMedicalQuestionChange = (questionId, value) => {
    setMedicalQuestions((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleQuickQuestionChange = (questionId, value) => {
    setQuickQuestions((prev) => ({ ...prev, [questionId]: value }));
  };

  const validateEmail = (email) => {
    if (typeof email !== "string") return false;
    if (email.length === 0 || email.length > 254) return false;
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email);
  };

  const isFormComplete = () => {
    const personalInfoComplete = formData.firstName.trim() && formData.lastName.trim() && formData.dateOfBirth && formData.phone.trim() && formData.email.trim() && formData.address.trim();
    const painSymptomsComplete = selectedPoints.length > 0 && Object.keys(quickQuestions).length === 4;
    const medicalHistoryComplete = Object.keys(medicalQuestions).length === 6;
    return personalInfoComplete && painSymptomsComplete && medicalHistoryComplete;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const nextStep = () => { 
    if (validateStep(currentStep)) setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1)); 
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep) || !isFormComplete()) { 
      toast.error("Please complete all required fields before submitting."); 
      return; 
    }
    
    setStatus({ submitting: true, success: false, error: null });
    
    // Prepare API request data
    const requestData = {
      type: 'appointment',
      data: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        user_email: formData.email,
        user_phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        address: formData.address,
        pain_areas: selectedPoints.join(", "),
        pain_level: painLevel,
        affects_work: quickQuestions.work || "Not answered",
        affects_daily: quickQuestions.activities || "Not answered",
        affects_sports: quickQuestions.sports || "Not answered",
        previous_pain: quickQuestions.previous || "Not answered",
        medications: medicalQuestions.medications || "Not answered",
        heart_problems: medicalQuestions.heart || "Not answered",
        breathing: medicalQuestions.breathing || "Not answered",
        blood_pressure: medicalQuestions.bloodPressure || "Not answered",
        surgeries: medicalQuestions.surgeries || "Not answered",
        allergies: medicalQuestions.allergies || "Not answered",
        additional_info: formData.additionalInfo || "None provided",
      }
    };

    try {
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
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ 
          firstName: "", 
          lastName: "", 
          dateOfBirth: "", 
          phone: "", 
          email: "", 
          address: "", 
          additionalInfo: "" 
        });
        setSelectedPoints([]); 
        setPainLevel(5);
        setMedicalQuestions({}); 
        setQuickQuestions({});
        setCurrentStep(0); 
        toast.success("Your appointment request has been submitted successfully! We'll contact you within 24 hours to confirm.");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error(err);
      setStatus({ submitting: false, success: false, error: "Network error. Please try again later." });
      toast.error("Network error. Please try again later.");
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoStep
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        );
      case 1:
        return (
          <PainSymptomsStep
            bodyAreas={bodyAreas}
            selectedPoints={selectedPoints}
            errors={errors}
            togglePoint={togglePoint}
            painLevel={painLevel}
            setPainLevel={setPainLevel}
            quickQuestions={quickQuestions}
            handleQuickQuestionChange={handleQuickQuestionChange}
          />
        );
      case 2:
        return (
          <MedicalHistoryStep
            medicalQuestions={medicalQuestions}
            errors={errors}
            handleMedicalQuestionChange={handleMedicalQuestionChange}
            formData={formData}
            handleInputChange={handleInputChange}
            isFormComplete={isFormComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-32 px-4 pb-8">
      <Helmet>
        <title>Book Appointment | Wellness Physio Center</title>
        <meta
          name="description"
          content="Book your appointment with Wellness Physio Center. Complete our secure intake form for personalized healthcare."
        />
      </Helmet>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-100 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Information Cards */}
            <InfoCard icon={FiClock} title="Working Hours" delay={0.3}>
              <div className="space-y-3 text-gray-700">
                {[
                  { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
                  { day: "Saturday", time: "10:00 AM - 2:00 PM" },
                  { day: "Emergency", time: "24/7 Available" },
                ].map((schedule, index) => (
                  <motion.div
                    key={schedule.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="font-medium text-gray-600">
                      {schedule.day}
                    </span>
                    <span
                      className={`font-semibold ${
                        schedule.day === "Emergency"
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {schedule.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </InfoCard>

            <InfoCard icon={FiMapPin} title="Our Location" delay={0.4}>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold text-gray-900">Wellness Physio Center</p>
                <p className="text-sm text-gray-600">
                  Shop no 06, Building number 12, Dignity CHS,
                  <br />
                  Near Kedarnath Mandir,
                  <br />
                  Nehru Nagar, Kurla East
                </p>
              </div>
            </InfoCard>

            <InfoCard icon={FiPhoneCall} title="Contact Us" delay={0.5}>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Phone</span>
                  <span className="font-semibold text-gray-900">
                    9004684173
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Email</span>
                  <span className="font-semibold text-gray-900 text-sm">
                    stridewellstudio@gmail.com
                  </span>
                </div>
              </div>
            </InfoCard>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full flex flex-col">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-gray-900 to-blue-900 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      Book Your Appointment
                    </h2>
                    <p className="text-blue-200">
                      Complete our Patient intake form
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-200 text-sm">
                      Step {currentStep + 1} of {steps.length}
                    </span>
                    <div className="flex gap-1">
                      {steps.map((_, index) => (
                        <div
                          key={_}
                          className={`w-2 h-2 rounded-full ${
                            index === currentStep
                              ? "bg-white"
                              : "bg-blue-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 p-8">
                <AnimatePresence mode="wait">
                  {renderStepContent(currentStep)}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    whileHover={{ scale: currentStep === 0 ? 1 : 1.02 }}
                    whileTap={{ scale: currentStep === 0 ? 1 : 0.98 }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                      currentStep === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-500 text-white hover:bg-gray-600 shadow-sm"
                    }`}
                  >
                    <FiArrowLeft className="w-4 h-4" />
                    Back
                  </motion.button>

                  {currentStep < steps.length - 1 ? (
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Next Step
                      <FiArrowRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={!isFormComplete() || status.submitting}
                      whileHover={{
                        scale:
                          isFormComplete() && !status.submitting ? 1.02 : 1,
                      }}
                      whileTap={{
                        scale:
                          isFormComplete() && !status.submitting ? 0.98 : 1,
                      }}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm ${
                        isFormComplete() && !status.submitting
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {status.submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <FiSend className="w-4 h-4" />
                          Submit Appointment
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Inline styles moved to CSS classes */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Appointment;