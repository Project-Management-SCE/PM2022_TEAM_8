import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./MainFooter.css";
const MainFooter = () => {
  return (
    <div className="footer-container">
      <div className="inside-footer-container">
        <div className="company-details-div">
          <h3>What To Watch</h3>
          <p>
            Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus
            ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique
            lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.
          </p>
        </div>
        <div className="services-list-div">
          <h3>Services</h3>
          <ul>
            <li>
              <NavLink to="/movies">Movies</NavLink>
            </li>
            <li>
              <NavLink to="/movies">Series</NavLink>
            </li>
            <li>
              <NavLink to="/admin_login">Admin</NavLink>
            </li>
          </ul>
        </div>
        <div className="about-list-div">
          <h3>About</h3>
          <ul>
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="#">Team</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="social-media-container">
        <div className="social">
          <a
            href="https://www.youtube.com/c/jamesqquick"
            className="youtube social"
          >
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
          <a
            href="https://www.facebook.com/learnbuildteach/"
            className="facebook social"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            href="https://www.twitter.com/jamesqquick"
            className="twitter social"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a
            href="https://www.instagram.com/learnbuildteach"
            className="instagram social"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
      </div>

      <p className="copyright">Company Name © 2018</p>
    </div>
  );
};

export default MainFooter;
