import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ScrollToTop = ({ behavior = "instant" }) => {
  const location = useLocation();

  useEffect(() => {
    const scrollBehavior = behavior === "smooth" ? "smooth" : "auto";
    window.scrollTo({ top: 0, left: 0, behavior: scrollBehavior });
  }, [location.pathname, location.search, behavior]);

  return null;
};

ScrollToTop.propTypes = {
  behavior: PropTypes.oneOf(["instant", "smooth"]),
};

export default ScrollToTop;
