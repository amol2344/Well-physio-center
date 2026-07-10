import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHeart,
  FiUser,
  FiLogOut,
  FiChevronDown,
  FiShield,
  FiGrid,
} from "react-icons/fi";
import logo from "../../assets/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef(null);
  const profileRef = useRef(null);
  const { currentUser, role, name } = useAuth();
  console.log("Navbar debug:", { currentUser: currentUser?.email, role });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
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
    setProfileOpen(false);
    closeMobileMenu();
  };

  const panelLink =
    role === "admin"
      ? { to: "/admin", label: "Admin Panel", icon: FiShield }
      : role === "sysadmin"
      ? { to: "/sysadmin", label: "SysAdmin Panel", icon: FiShield }
      : role === "user"
      ? { to: "/patient-dashboard", label: "Dashboard", icon: FiGrid }
      : null;

  const displayName = name || currentUser?.email || "";
  const initial = displayName.trim().charAt(0).toUpperCase() || "U";

  return (
    <header
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg py-2 border-b border-teal-100"
          : "bg-slate-50/90 backdrop-blur-lg py-2.5 border-b border-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center space-x-2.5 group shrink-0"
          >
            <div className="relative">
              <img
                src={logo}
                alt="Wellness Physio Center Logo"
                className="h-8 lg:h-9 w-auto transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 to-orange-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-[15px] lg:text-base font-bold bg-gradient-to-r from-teal-700 to-orange-600 bg-clip-text text-transparent whitespace-nowrap">
                Wellness Physio Center
              </span>
              <span className="hidden xl:flex text-[11px] text-slate-500 font-medium items-center gap-1 whitespace-nowrap">
                <FiHeart className="text-orange-500" size={10} />
                Physiotherapy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — segmented pill strip, fixed sizing at every breakpoint */}
          <nav className="hidden lg:flex items-center flex-1 min-w-0 justify-center">
            <div
              className="flex items-center gap-0.5 bg-white/60 border border-slate-200/70 rounded-full px-1 py-1 shadow-sm min-w-0 overflow-x-auto [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap text-[13px] font-medium shrink-0 ${
                      active
                        ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-sm"
                        : "text-slate-600 hover:text-teal-700 hover:bg-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <Link
              to="/book-appointment"
              onClick={closeMobileMenu}
              className="ml-4 px-4 py-2 bg-gradient-to-r from-teal-600 to-orange-600 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Book Now
            </Link>
          </nav>

          {/* Right cluster: auth + Book Now — fixed footprint, never grows with breakpoint */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {currentUser ? (
              <>
                {panelLink && (
                  <Link
                    to={panelLink.to}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold hover:bg-teal-100 transition-all duration-300 whitespace-nowrap"
                  >
                    <panelLink.icon size={15} />
                    {panelLink.label}
                  </Link>
                )}

                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-slate-200 bg-white hover:shadow-md transition-all duration-300"
                  >
                    <span className="flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-br from-teal-600 to-orange-500 text-white text-xs font-semibold shrink-0">
                      {initial}
                    </span>
                    <FiChevronDown
                      size={14}
                      className={`text-slate-400 transition-transform duration-300 ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {displayName}
                        </p>
                        {role && (
                          <span className="inline-block mt-1 text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">
                            {role}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut size={16} />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-full text-sm text-slate-600 hover:text-teal-700 hover:bg-white transition-all duration-300 whitespace-nowrap"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5 py-2 rounded-full bg-gradient-to-r from-teal-600 to-orange-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            )}

            
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 rounded-2xl bg-white shadow-lg text-teal-700 z-[60] transition-all duration-300 hover:shadow-2xl hover:scale-105 shrink-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX size={22} className="text-teal-700" />
            ) : (
              <FiMenu size={22} className="text-teal-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen
              ? "max-h-[85vh] overflow-y-auto opacity-100 mt-3"
              : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-100 p-4">
            {currentUser && (
              <div className="flex items-center gap-3 px-3 py-2.5 mb-2.5 rounded-2xl bg-gradient-to-r from-teal-50 to-orange-50">
                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-teal-600 to-orange-500 text-white text-sm font-semibold shrink-0">
                  {initial}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {displayName}
                  </p>
                  {role && (
                    <span className="inline-block mt-0.5 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-white text-teal-700">
                      {role}
                    </span>
                  )}
                </div>
              </div>
            )}

            <nav className="flex flex-col space-y-1.5">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`px-5 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                    location.pathname === link.path
                      ? "bg-gradient-to-r from-teal-500 to-orange-500 text-white font-semibold shadow-lg"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 40}ms` : "0ms",
                  }}
                >
                  <span>{link.name}</span>
                  {location.pathname === link.path && <FiHeart size={16} />}
                </Link>
              ))}

              {currentUser ? (
                <div className="mt-1 space-y-1.5">
                  {panelLink && (
                    <Link
                      to={panelLink.to}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 justify-center w-full px-5 py-3 rounded-2xl bg-teal-50 text-teal-700 font-semibold"
                    >
                      <panelLink.icon size={16} />
                      {panelLink.label}
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 justify-center w-full px-5 py-3 rounded-2xl bg-red-50 text-red-600 font-semibold"
                  >
                    <FiLogOut size={16} />
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="mt-1 flex gap-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex-1 px-5 py-3 rounded-2xl bg-slate-50 text-slate-700 font-medium text-center hover:bg-slate-100 transition-all duration-300"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="flex-1 px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-orange-600 text-white font-semibold text-center shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <Link
                to="/book-appointment"
                onClick={closeMobileMenu}
                className="mt-2 px-5 py-3 bg-gradient-to-r from-teal-600 to-orange-600 text-white font-semibold rounded-2xl shadow-lg text-center"
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