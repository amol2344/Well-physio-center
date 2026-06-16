
import { FiPhone, FiMail, FiMapPin, FiHeart, FiClock } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Footer = () => {
  const contactInfo = [
    {
      id: "email",
      icon: <FiMail className="text-teal-500 text-xl" />,
      text: "wellnessphysiocenters@gmail.com",
      link: "mailto:wellnessphysiocenters@gmail.com",
    },
    {
      id: "phone",
      icon: <FiPhone className="text-orange-500 text-xl" />,
      text: "8460286466",
      link: "tel:8460286466",
    },
    {
      id: "map",
      icon: <FiMapPin className="text-teal-500 text-xl" />,
      text: "PRO-KINETIC PHYSIOTHERAPY CENTER, Opposite MMA Housing Society, Mahad MIDC, Raigad District, Maharashtra (Pin: 402309)",
      link: "https://www.google.com/maps/place/Dr+Trupti+'s+Physiotherapy+Clinic/@18.0973678,73.4640713,16.8z/data=!4m6!3m5!1s0x3bc281201f3ec739:0xeb5c2644cf3dc7e6!8m2!3d18.0973847!4d73.4666351!16s%2Fg%2F11x76xd05b?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D",
      target: "_blank",
    },
  ];

  const links = [
    {
      title: "Quick Links",
      items: [
        { name: "Home", link: "/" },
        { name: "Door Step", link: "/doorstep-physiotherapy" },
        { name: "About Us", link: "/about-us" },
        { name: "Exercises", link: "/exercises" },
        { name: "Appointment", link: "/book-appointment" },
        { name: "Contact", link: "/contact-us" },
        { name: "Blog", link: "/blog" },
      ],
    },
    {
      title: "Support",
      items: [
        { name: "Privacy Policy", link: "/privacy-policy" },
        { name: "Terms of Service", link: "/terms-of-service" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Dr Trupti's Physiotherapy Clinic - Instagram",
      icon: <FaInstagram size={24} />,
      link: "https://www.instagram.com/reel/DW9FZPbjArF/",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-teal-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={logo}
                alt="Wellness Physio CenterStudio Logo"
                className="h-16 w-auto drop-shadow-2xl"
              />
              <div>
                <h3 className="text-3xl font-bold">Wellness Physio Center</h3>
                <p className="text-teal-300 font-medium">Studio</p>
              </div>
            </div>
            <p className="text-slate-300 mb-8 leading-relaxed text-lg">
              Empowering your journey to better health through personalized therapy and rehabilitation programs tailored to your unique needs.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-gradient-to-r from-teal-500 to-orange-500 hover:border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  aria-label={`Visit our ${social.name} page`}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {links.map((section) => (
              <div key={section.title}>
                <h4 className="text-xl font-semibold mb-6 text-teal-300">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.link}
                        className="text-slate-300 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-xl font-semibold mb-6 text-teal-300">
              Get In Touch
            </h4>
            <div className="space-y-5">
              {contactInfo.map((info) => (
                <a
                  key={info.id}
                  href={info.link}
                  target={info.target || "_self"}
                  rel={
                    info.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                  className="flex items-start gap-4 text-slate-300 hover:text-white transition-all duration-300 p-4 rounded-2xl hover:bg-white/5 backdrop-blur-sm group"
                  aria-label={info.text}
                >
                  <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 group-hover:bg-gradient-to-r from-teal-500/20 to-orange-500/20 transition-all duration-300">
                    {info.icon}
                  </span>
                  <span className="text-base leading-relaxed">
                    {info.text}
                  </span>
                </a>
              ))}
            </div>

            {/* Timings */}
            <div className="mt-8 p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <FiClock className="text-orange-400 text-xl" />
                <h5 className="text-lg font-semibold text-teal-300">
                  Clinic Timings
                </h5>
              </div>
              <p className="text-slate-300 text-sm">
                Mon - Sat: 9:00 AM - 7:00 PM
              </p>
              <p className="text-slate-400 text-sm">
                Sunday: By Appointment
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 px-6 py-2 text-sm text-slate-400 font-medium rounded-full">
              Your Health, Our Priority
            </span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-6 md:flex-row justify-between items-center text-center">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <p className="text-slate-400 text-base flex items-center gap-2">
              © {new Date().getFullYear()} Wellness Physio Center. Made with
              <FiHeart className="text-orange-500 text-lg" />
              in Mumbai
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="/privacy-policy"
              className="text-slate-400 hover:text-teal-300 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-slate-400 hover:text-teal-300 text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
