import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import WhatsAppIcon from "./components/Shared/WhatsAppIcon";
import ErrorBoundary from "./components/Feedback/ErrorBoundary";
import Loader from "./components/Shared/Loader";
import ScrollToTop from "./components/Shared/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Chatbot from "./components/Shared/Chatbot";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Shared/Login";
import Signup from "./components/Shared/Signup";

// Public pages
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import About from "./pages/About";
import Experts from "./pages/Experts";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Appointment from "./pages/Appointment";
import DoctorProfile from "./pages/DoctorProfile";
import Doorstep from "./pages/Doorstep";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";


// Blog detail pages
import ErgonomicBlog from "./pages/Blog/ErgonomicBlog";
import KneeOsteoarthritisBlog from "./pages/Blog/KneeOsteoarthritisBlog";
import BoneHealthBlog from "./pages/Blog/BoneHealthBlog";
import app from "./firebase/firebase";
// Loader wrapper component
const withLoader = (Component) => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center py-20">
        <Loader size="lg" color="blue" />
      </div>
    }
  >
    <Component />
  </Suspense>
);
function App() {
  return (
    
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen">
          <Navbar />
         <main className="flex-grow pt-24">
            <ScrollToTop behavior="smooth" />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={withLoader(Home)} />
              <Route path="/blog" element={withLoader(Blog)} />
              <Route path="/blog/ergonomic" element={withLoader(ErgonomicBlog)} />
              <Route
                path="/blog/knee-osteoarthritis"
                element={withLoader(KneeOsteoarthritisBlog)}
              />
              <Route
                path="/blog/bone-health"
                element={withLoader(BoneHealthBlog)}
              />

              <Route path="/experts" element={withLoader(Experts)} />
              <Route path="/doctors/:id" element={withLoader(DoctorProfile)} />
              <Route path="/exercises" element={withLoader(Exercises)} />
              <Route path="/about-us" element={withLoader(About)} />
              <Route path="/contact-us" element={withLoader(Contact)} />
              <Route path="/book-appointment" element={withLoader(Appointment)} />
              <Route
                path="/doorstep-physiotherapy"
                element={withLoader(Doorstep)}
              />
              <Route path="/privacy-policy" element={withLoader(PrivacyPolicy)} />
              <Route
                path="/terms-of-service"
                element={withLoader(TermsOfService)}
              />

              {/* Auth routes */}
              <Route path="/login" element={withLoader(Login)} />
              <Route path="/signup" element={withLoader(Signup)} />

              {/* 404 */}
              <Route path="*" element={withLoader(NotFound)} />
            </Routes>
          </main>
          <Footer />
          <Chatbot/>
          <WhatsAppIcon />
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </ErrorBoundary>
  
  );
}

export default App;