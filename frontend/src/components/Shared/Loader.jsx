import PropTypes from "prop-types";
import logo from "../../assets/logo.png";

const Loader = ({ 
  size = "lg", 
  color = "primary", 
  variant = "smooth-spin",
  text = "Loading...",
  showText = false,
  overlay = false,
  fullScreen = false 
}) => {
  const sizes = {
    sm: { container: "w-6 h-6", text: "text-sm" },
    md: { container: "w-12 h-12", text: "text-base" },
    lg: { container: "w-20 h-20", text: "text-lg" },
    xl: { container: "w-28 h-28", text: "text-xl" }
  };

  const colors = {
    primary: "text-teal-600",
    secondary: "text-gray-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600"
  };

  const animations = {
    "smooth-spin": "animate-[spin_2s_linear_infinite]",
    "pulse-spin": "animate-[spin_1.5s_ease-in-out_infinite]",
    "bounce-spin": "animate-[bounce_1s_infinite,spin_3s_linear_infinite]",
    "fade-spin": "animate-[spin_2s_linear_infinite,ping_3s_ease-in-out_infinite]"
  };

  // Container styles based on props
  const containerClasses = `
    flex flex-col items-center justify-center 
    ${fullScreen ? "fixed inset-0 bg-white bg-opacity-95 z-50" : "p-6"}
    ${overlay && !fullScreen ? "absolute inset-0 bg-slate-50 bg-opacity-80 rounded-lg" : ""}
  `;

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Modern loader with teal/orange gradient effect */}
        <div className="relative">
          {/* Gradient background ring */}
          <div
            className={`absolute inset-0 ${sizes[size].container} bg-gradient-to-r from-teal-100 to-orange-100 rounded-full shadow-sm`}
          ></div>

          {/* Animated ring */}
          <svg
            className={`absolute inset-0 ${sizes[size].container} transform -rotate-90`}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="80 200"
              className="animate-spin origin-center"
              style={{ animationDuration: "1.8s" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Centered logo */}
          <div
            className={`relative flex items-center justify-center ${sizes[size].container}`}
          >
            <img
              src={logo}
              alt="Loading..."
              className={`w-1/2 h-1/2 ${animations[variant]} ${colors[color]} transition-all duration-500 ease-out`}
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))"
              }}
            />
          </div>
        </div>

        {/* Loading text with progress indicator */}
        {showText && (
          <div className="text-center space-y-3">
            <p className={`font-semibold text-slate-800 ${sizes[size].text}`}>
              {text}
            </p>
            <div className="flex justify-center space-x-1.5">
              {[0, 1, 2].map((dot) => (
                <div
                  key={`dot-${dot}`}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-orange-500 animate-bounce"
                  style={{
                    animationDelay: `${dot * 0.15}s`,
                    animationDuration: "0.8s"
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ PropTypes validation
Loader.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  color: PropTypes.oneOf(["primary", "secondary", "success", "warning", "error"]),
  variant: PropTypes.oneOf(["smooth-spin", "pulse-spin", "bounce-spin", "fade-spin"]),
  text: PropTypes.string,
  showText: PropTypes.bool,
  overlay: PropTypes.bool,
  fullScreen: PropTypes.bool
};

export default Loader;
