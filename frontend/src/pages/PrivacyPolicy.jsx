import {
  FiShield,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const PrivacyPolicy = () => {
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
            <FiShield className="text-[#76B041] text-2xl" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        </div>

        {/* Content */}
        <div className="bg-white backdrop-blur-md rounded-lg shadow-lg border border-white/30 p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 mb-4">
                Welcome to Wellness Physio Center. We are committed to protecting
                your personal information and your right to privacy. This
                Privacy Policy explains how we collect, use, and safeguard your
                information when you visit our website or use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4 flex items-center">
    
                2. Information We Collect
              </h2>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-[#1A3D6D]">
                  Personal Information
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Name and contact information</li>
                  <li>
                    Health and medical information relevant to your treatment
                  </li>
                  <li>Appointment scheduling information</li>
                  <li>Payment and billing information</li>
                </ul>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>To provide and manage our healthcare services</li>
                <li>To schedule and confirm appointments</li>
                <li>To communicate with you about your treatment</li>
                <li>To process payments and billing</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4 flex items-center">
                4. Data Security
              </h2>
              <p className="text-gray-700">
                We implement appropriate technical and organizational security
                measures to protect your personal information. However, no
                method of transmission over the Internet is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4">
                5. Your Rights
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Access and review your personal information</li>
                <li>Request corrections to your information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Request data portability</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4 flex items-center">
                6. Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <div className="bg-gradient-to-r from-[#76B041]/10 to-[#1A3D6D]/10 p-4 rounded-lg border border-[#76B041]/20">
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center">
                    <FiMail className="w-4 h-4 text-[#76B041] mr-2" />
                    <span>Wellness Physio Centerstudio@gmail.com</span>
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

            {/* Updates */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1A3D6D] mb-4 flex items-center">
                7. Policy Updates
              </h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. The updated
                version will be indicated by an updated "Last updated" date and
                the updated version will be effective as soon as it is
                accessible.
              </p>
            </section>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-[#EAF4FB] text-sm">
              This privacy policy is designed to be transparent about how we
              handle your personal information in compliance with applicable
              healthcare privacy regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
