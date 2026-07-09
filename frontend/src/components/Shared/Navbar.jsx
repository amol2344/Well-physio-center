import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHeart,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import logo from "../../assets/logo.png";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navbarRef = useRef(null);

  const { currentUser, role } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Door Step",
      path: "/doorstep-physiotherapy",
    },
    {
      name: "About",
      path: "/about-us",
    },
    {
      name: "Exercises",
      path: "/exercises",
    },
    {
      name: "Appointment",
      path: "/book-appointment",
    },
    {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "Experts",
      path: "/experts",
    },
    {
      name: "Contact",
      path: "/contact-us",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const handleOutsideClick = (e) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.body.style.overflow = isOpen
      ? "hidden"
      : "unset";

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeMobileMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    await signOut(auth);
    closeMobileMenu();
  };

  return (
    <header
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
      ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-slate-200 py-3"
          : "bg-white/80 backdrop-blur-lg py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between">

          {/* ================= Logo ================= */}

          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 flex-shrink-0"
          >
            <img
              src={logo}
              alt="Wellness Physio Center"
              className="h-10 lg:h-12 w-auto transition-transform duration-300 hover:scale-105"
            />

            <div className="leading-tight">

              <h1
                className="
                text-lg
                xl:text-xl
                2xl:text-2xl
                font-bold
                bg-gradient-to-r
                from-teal-700
                to-orange-600
                bg-clip-text
                text-transparent
                whitespace-nowrap
              "
              >
                Wellness Physio Center
              </h1>

              <p className="hidden sm:flex items-center gap-1 text-sm text-slate-500">

                <FiHeart className="text-orange-500" />

                Physiotherapy

              </p>

            </div>

          </Link>

          {/* Desktop Navigation Starts Here */}
{/* ================= Desktop Navigation ================= */}

<nav className="hidden xl:flex items-center flex-1 justify-center mx-8">

  <div className="flex items-center gap-1">

    {navLinks.map((link) => {

      const active = location.pathname === link.path;

      return (

        <Link
          key={link.path}
          to={link.path}
          className={`
          relative
          px-3
          2xl:px-4
          py-2.5
          rounded-xl
          font-medium
          whitespace-nowrap
          transition-all
          duration-300

          ${
            active
              ? "text-teal-700"
              : "text-slate-600 hover:text-teal-700"
          }
          `}
        >

          {active && (
            <span
              className="
              absolute
              inset-0
              rounded-xl
              bg-gradient-to-r
              from-teal-100
              to-orange-100
              "
            />
          )}

          <span className="relative z-10">
            {link.name}
          </span>

        </Link>

      );

    })}

  </div>

</nav>

{/* ================= Desktop Right Section ================= */}

<div className="hidden xl:flex items-center gap-3 flex-shrink-0">

  {currentUser ? (

    <>

      {/* Dashboard Button */}

      {role === "admin" && (

        <Link
          to="/admin"
          className="
          px-4
          py-2
          rounded-xl
          bg-orange-100
          text-orange-700
          font-medium
          hover:bg-orange-200
          transition
          whitespace-nowrap
          "
        >
          Admin Panel
        </Link>

      )}

      {role === "sysadmin" && (

        <Link
          to="/sysadmin-dashboard"
          className="
          px-4
          py-2
          rounded-xl
          bg-teal-100
          text-teal-700
          font-medium
          hover:bg-teal-200
          transition
          whitespace-nowrap
          "
        >
          SysAdmin
        </Link>

      )}

      {role === "user" && (

        <Link
          to="/patient-dashboard"
          className="
          px-4
          py-2
          rounded-xl
          bg-blue-100
          text-blue-700
          font-medium
          hover:bg-blue-200
          transition
          whitespace-nowrap
          "
        >
          Dashboard
        </Link>

      )}

      {/* Email */}

      <div
        className="
        hidden
        2xl:flex
        items-center
        gap-2
        px-3
        py-2
        rounded-xl
        bg-slate-50
        "
      >

        <FiUser className="text-teal-600" />

        <span className="text-sm text-slate-600 max-w-[170px] truncate">

          {currentUser.email}

        </span>

      </div>

      {/* Logout */}

      <button
        onClick={handleLogout}
        className="
        flex
        items-center
        gap-2
        px-4
        py-2
        rounded-xl
        hover:bg-red-50
        text-slate-600
        hover:text-red-600
        transition
        "
      >

        <FiLogOut />

        Logout

      </button>

    </>

  ) : (

    <>

      <Link
        to="/login"
        className="
        px-4
        py-2
        rounded-xl
        hover:bg-slate-100
        text-slate-600
        hover:text-teal-700
        transition
        "
      >
        Log In
      </Link>

      <Link
        to="/signup"
        className="
        px-5
        py-2.5
        rounded-xl
        bg-gradient-to-r
        from-teal-600
        to-orange-600
        text-white
        font-medium
        shadow-md
        hover:shadow-xl
        transition
        "
      >
        Sign Up
      </Link>

    </>

  )}

  {/* Book Appointment */}

  <Link
    to="/book-appointment"
    className="
    ml-2
    px-6
    py-2.5
    rounded-xl
    bg-gradient-to-r
    from-teal-600
    to-orange-600
    text-white
    font-semibold
    shadow-lg
    hover:shadow-2xl
    hover:-translate-y-0.5
    transition-all
    whitespace-nowrap
    "
  >
    Book Now
  </Link>

</div>

{/* ================= Mobile Menu Button ================= */}

<button
  className="
  xl:hidden
  p-3
  rounded-xl
  bg-white
  shadow-md
  text-teal-700
  transition
  hover:shadow-lg
  "
  onClick={() => setIsOpen(!isOpen)}
>

  {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}

</button>
{/* ================= Mobile Menu ================= */}

<div
  className={`xl:hidden overflow-hidden transition-all duration-500 ease-in-out ${
    isOpen
      ? "max-h-[900px] opacity-100 mt-4"
      : "max-h-0 opacity-0 mt-0"
  }`}
>
  <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

    {/* Navigation Links */}

    <nav className="flex flex-col py-3">

      {navLinks.map((link) => {

        const active = location.pathname === link.path;

        return (
          <Link
            key={link.path}
            to={link.path}
            onClick={closeMobileMenu}
            className={`
              flex
              items-center
              justify-between
              px-6
              py-4
              mx-3
              my-1
              rounded-2xl
              transition-all
              duration-300

              ${
                active
                  ? "bg-gradient-to-r from-teal-600 to-orange-600 text-white shadow-lg"
                  : "text-slate-700 hover:bg-slate-100"
              }
            `}
          >
            <span className="font-medium">
              {link.name}
            </span>

            {active && <FiHeart />}
          </Link>
        );

      })}

      {/* Divider */}

      <div className="border-t border-slate-200 my-4"></div>

      {/* ================= Auth Section ================= */}

      {currentUser ? (

        <div className="px-4 space-y-3">

          {/* Dashboard */}

          {role === "admin" && (

            <Link
              to="/admin"
              onClick={closeMobileMenu}
              className="
              block
              w-full
              text-center
              py-3
              rounded-2xl
              bg-orange-100
              text-orange-700
              font-semibold
              "
            >
              Admin Panel
            </Link>

          )}

          {role === "sysadmin" && (

            <Link
              to="/sysadmin-dashboard"
              onClick={closeMobileMenu}
              className="
              block
              w-full
              text-center
              py-3
              rounded-2xl
              bg-teal-100
              text-teal-700
              font-semibold
              "
            >
              SysAdmin Dashboard
            </Link>

          )}

          {role === "user" && (

            <Link
              to="/patient-dashboard"
              onClick={closeMobileMenu}
              className="
              block
              w-full
              text-center
              py-3
              rounded-2xl
              bg-blue-100
              text-blue-700
              font-semibold
              "
            >
              Patient Dashboard
            </Link>

          )}

          {/* Email */}

          <div className="flex items-center gap-3 bg-slate-100 rounded-2xl p-4">

            <FiUser className="text-xl text-teal-600" />

            <div className="overflow-hidden">

              <p className="text-xs text-slate-500">
                Logged in as
              </p>

              <p className="font-medium truncate">
                {currentUser.email}
              </p>

            </div>

          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            py-3
            rounded-2xl
            bg-red-50
            text-red-600
            font-semibold
            hover:bg-red-100
            transition
            "
          >
            <FiLogOut />

            Logout

          </button>

        </div>

      ) : (

        <div className="px-4 flex flex-col gap-3">

          <Link
            to="/login"
            onClick={closeMobileMenu}
            className="
            w-full
            text-center
            py-3
            rounded-2xl
            border
            border-slate-300
            hover:bg-slate-100
            transition
            "
          >
            Log In
          </Link>

          <Link
            to="/signup"
            onClick={closeMobileMenu}
            className="
            w-full
            text-center
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-teal-600
            to-orange-600
            text-white
            font-semibold
            shadow-lg
            "
          >
            Sign Up
          </Link>

        </div>

      )}

      {/* Book Appointment */}

      <div className="px-4 mt-5 mb-3">

        <Link
          to="/book-appointment"
          onClick={closeMobileMenu}
          className="
          block
          w-full
          text-center
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-teal-600
          to-orange-600
          text-white
          font-bold
          shadow-xl
          hover:shadow-2xl
          transition
          "
        >
          Book Appointment
        </Link>

      </div>

    </nav>

  </div>
</div>

</div></div>

</header>
);
};

export default Navbar;