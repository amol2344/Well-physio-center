import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiHeart, FiUser, FiLogOut } from "react-icons/fi";
import logo from "../../assets/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navbarRef = useRef(null);
  const { currentUser, role } = useAuth();
  console.log("Navbar debug:", { currentUser: currentUser?.email, role });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);
    };

    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Door Step", path: "/doorstep-physiotherapy" },
    { name: "About", path: "/about-us" },
    { name: "Exercises", path: "/exercises" },
    { name: "Appointment", path: "/book-appointment" },
    { name: "Blog", path: "/blog" },
    { name: "Experts", path: "/experts" },
    { name: "Contact", path: "/contact-us" },
  ];

  const closeMobileMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    await signOut(auth);
    closeMobileMenu();
  };

  return (
    <header
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-2xl py-3 border-b-2 border-teal-100"
          : "bg-slate-50/95 backdrop-blur-lg py-5 border-b border-transparent"
      }`}
    >
     <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center space-x-4 group"
          >
            <div className="relative">
              <img
                src={logo}
                alt="Wellness Physio Center Logo"
                className="h-12 w-auto transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 to-orange-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-orange-600 bg-clip-text text-transparent whitespace-nowrap">
                Wellness Physio Center
              </span>
              <span className="text-sm text-slate-500 font-medium flex items-center gap-1 whitespace-nowrap">
                <FiHeart className="text-orange-500" />
                Physiotherapy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-3 rounded-2xl transition-all duration-400 group whitespace-nowrap ${
                  location.pathname === link.path
                    ? "text-teal-700 font-semibold"
                    : "text-slate-600 hover:text-teal-700"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {location.pathname === link.path && (
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-100 to-orange-100 rounded-2xl" />
                )}
                {location.pathname !== link.path && (
                  <div className="absolute inset-0 bg-slate-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
            ))}

            {/* Auth section */}
            {currentUser ? (
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-200">
               {/* Admin Button */}
{role === "admin" && (
  <Link
    to="/admin"
    className="px-4 py-2 rounded-xl bg-orange-100 text-orange-700 font-medium hover:bg-orange-200 transition-all duration-300 whitespace-nowrap"
  >
    Admin Panel
  </Link>
)}

{/* SysAdmin Button */}
{role === "sysadmin" && (
  <Link
    to="/sysadmin"
    className="px-4 py-2 rounded-xl bg-teal-100 text-teal-700 font-medium hover:bg-teal-200 transition-all duration-300 whitespace-nowrap"
  >
    SysAdmin Panel
  </Link>
)}
{role === "user" && (
  <Link
    to="/patient-dashboard"
    onClick={closeMobileMenu}
    className="block w-full px-6 py-3 rounded-2xl bg-blue-100 text-blue-700 font-semibold text-center whitespace-nowrap"
  >
    Patient Dashboard
  </Link>
)}
                <span className="flex items-center gap-2 text-sm text-slate-600 whitespace-nowrap">
                  <FiUser className="text-teal-600" />
                  {currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300 whitespace-nowrap"
                >
                  <FiLogOut size={16} />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2 pl-4 border-l border-slate-200">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-teal-700 hover:bg-slate-100 transition-all duration-300 whitespace-nowrap"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-orange-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Link
              to="/book-appointment"
              onClick={closeMobileMenu}
              className="ml-4 px-8 py-3 bg-gradient-to-r from-teal-600 to-orange-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 whitespace-nowrap"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-4 rounded-2xl bg-white shadow-lg text-teal-700 z-[60] transition-all duration-300 hover:shadow-2xl hover:scale-105"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX size={28} className="text-teal-700" />
            ) : (
              <FiMenu size={28} className="text-teal-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen
              ? "max-h-[700px] opacity-100 mt-4"
              : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-100 p-6">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                    location.pathname === link.path
                      ? "bg-gradient-to-r from-teal-500 to-orange-500 text-white font-semibold shadow-lg"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  <span>{link.name}</span>
                  {location.pathname === link.path && (
                    <FiHeart size={18} />
                  )}
                </Link>
              ))}

              {/* Auth section - mobile */}
             {/* Auth section - mobile */}
{currentUser ? (
  <div className="mt-2 space-y-3">

    {role === "admin" && (
      <Link
        to="/admin"
        onClick={closeMobileMenu}
        className="block w-full px-6 py-3 rounded-2xl bg-orange-100 text-orange-700 font-semibold text-center"
      >
        Admin Panel
      </Link>
    )}

    {role === "sysadmin" && (
      <Link
        to="/sysadmin-dashboard"
        onClick={closeMobileMenu}
        className="block w-full px-6 py-3 rounded-2xl bg-teal-100 text-teal-700 font-semibold text-center"
      >
        SysAdmin Dashboard
      </Link>
    )}
    {role === "user" && (
  <Link
    to="/patient-dashboard"
    className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-all duration-300"
  >
    Patient Dashboard
  </Link>
)}

    <div className="px-6 py-4 rounded-2xl bg-slate-50 flex items-center justify-between">
      <span className="flex items-center gap-2 text-sm text-slate-600">
        <FiUser className="text-teal-600" />
        {currentUser.email}
      </span>

      <button
        onClick={handleLogout}
        className="flex items-center gap-1 text-red-600 font-medium"
      >
        <FiLogOut size={16} />
        Log Out
      </button>
    </div>

  </div>
) : (
                <div className="mt-2 flex gap-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 text-slate-700 font-medium text-center hover:bg-slate-100 transition-all duration-300"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-orange-600 text-white font-semibold text-center shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <Link
                to="/book-appointment"
                onClick={closeMobileMenu}
                className="mt-4 px-6 py-4 bg-gradient-to-r from-teal-600 to-orange-600 text-white font-semibold rounded-2xl shadow-lg text-center"
              >
                Book Your Appointment
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;