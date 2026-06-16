import {
  FiFileText,
  FiAlertTriangle,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const TermsOfService = () => {
  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-[#0F2A4D] to-[#1A3D6D]">
      {/* Background elements matching HeroSection */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-60 h-60 rounded-full bg-[#76B041]/10 blur-xl"></div>
        <div className="absolute bottom-1/3 right-20 w-80 h-80 rounded-full bg-[#76B041]/10 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-[#76B041]/30">
            <FiFileText className="text-[#76B041] text-2xl" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-[#EAF4FB]">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-[#76B041]/10 to-[#1A3D6D]/10 border border-[#76B041]/20 rounded-lg p-6 mb-8 backdrop-blur-sm">
          <div className="flex items-start">
            <FiAlertTriangle className="text-[#76B041] text-xl mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-2">
                Important Notice
              </h3>
              <p className="text-white">
                These terms govern your use of Wellness Physio Center's services. By
                using our services, you agree to these terms. Please read them
                carefully.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg border border-white/30 p-8">
          <div className="prose prose-lg max-w-none">
            {/* Agreement */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-gray-700">
                By accessing or using Wellness Physio Center's website and services,
                you agree to be bound by these Terms of Service. If you disagree
                with any part of these terms, you may not access our services.
              </p>
            </section>

            {/* Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4 flex items-center">
              
                2. Healthcare Services
              </h2>
              <p className="text-gray-700 mb-4">
                Wellness Physio Center provides physiotherapy and related healthcare
                services. Our services include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Physical therapy sessions</li>
                <li>Rehabilitation programs</li>
                <li>Health assessments</li>
                <li>Personalized treatment plans</li>
                <li>Educational resources</li>
              </ul>
            </section>

            {/* Appointments and Cancellations */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4">
                3. Appointments and Cancellations
              </h2>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-[#1A3D6D]">
                  Scheduling
                </h3>
                <p className="text-gray-700">
                  Appointments can be scheduled through our website, by phone,
                  or in person. We require 24 hours notice for cancellations or
                  rescheduling.
                </p>
              </div>
            </section>

            {/* Payments */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4 flex items-center">
                4. Payments and Billing
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  Payment is due at the time of service unless other
                  arrangements have been made
                </li>
                <li>
                  We accept major credit cards, insurance, and other payment
                  methods
                </li>
                <li>Prices are subject to change with reasonable notice</li>
                <li>
                  Insurance claims will be submitted on your behalf when
                  applicable
                </li>
              </ul>
            </section>

            {/* Medical Disclaimer */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4">
                5. Medical Disclaimer
              </h2>
              <p className="text-gray-700 mb-4">
                The information provided on our website and during consultations
                is for educational purposes only and is not a substitute for
                professional medical advice, diagnosis, or treatment.
              </p>
              <p className="text-gray-700">
                Always seek the advice of your physician or other qualified
                health provider with any questions you may have regarding a
                medical condition.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-gray-700">
                All content on our website, including text, graphics, logos, and
                images, is the property of Wellness Physio Center and is protected by
                copyright laws. You may not reproduce, distribute, or create
                derivative works without our permission.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-700">
                Wellness Physio Center shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages
                resulting from your use of or inability to use our services.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4">
                8. Changes to Terms
              </h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. We will
                notify you of any changes by posting the new Terms of Service on
                this page and updating the "Last updated" date.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4">
                9. Governing Law
              </h2>
              <p className="text-gray-700">
                These terms shall be governed by and construed in accordance
                with the laws of the state where Wellness Physio Center is located,
                without regard to its conflict of law provisions.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4">
                10. Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="bg-gradient-to-r from-[#76B041]/10 to-[#1A3D6D]/10 p-4 rounded-lg border border-[#76B041]/20">
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center">
                    <FiMail className="w-4 h-4 text-[#76B041] mr-2" />
                    <span>wellnessphysiocenters@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <FiPhone className="w-4 h-4 text-[#76B041] mr-2" />
                    <span>8460286466</span>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="w-4 h-4 text-[#76B041] mr-2" />
                    <span>
                      PRO-KINETIC PHYSIOTHERAPY CENTER<br />
                      Opposite MMA Housing Society, Mahad MIDC, Raigad District, Maharashtra (Pin: 402309)
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-[#EAF4FB] text-sm">
              By using our services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
