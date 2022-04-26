import React, {FC, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./MainFooter.css";
import {Modal} from "antd";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import ContactUs from "../components/ContactUs";
const MainFooter:FC = () => {
  const location = useLocation()
  const [isModalVisible,setModalVisible] = useState(false);
  return (
    <div className="footer-container">
      <Modal
          title={`Contact us`}
          visible={isModalVisible}
          width={1000}
          onCancel={()=>setModalVisible(false)}
          footer={null}
          closeIcon={<FontAwesomeIcon className="fa-icon" icon={faClose} />}
          bodyStyle={{ background: "#eeeeee" }}
      >
        <ContactUs/>
      </Modal>
      <div className="inside-footer-container">
        <div className="company-details-div">
          <h3 className="footer_header">What To Watch</h3>
          <p>Welcome to What to Watch, worldwide media content.</p>
          <p>
            Feel free to find movies and series, add to your watch list and
            write a reviews.
          </p>
          <p>
            All you need Is quick registration and log in to enjoy the service.
          </p>
        </div>
        <div className="services-list-div">
          <h3>Services</h3>
          <ul>
            <li>
              <NavLink to="/movies">Movies</NavLink>
            </li>
            <li>
              <NavLink to="/series">Series</NavLink>
            </li>
            <li>
              <NavLink to={location.pathname} onClick={()=>(setModalVisible(!isModalVisible))}>Contact Us</NavLink>
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
              <a href="#">AboutUs</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="social-media-container">
        <div className="social">
          <a
            href="#"
            className="youtube social"
          >
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
          <a
            href="#"
            className="facebook social"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            href="#"
            className="twitter social"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a
            href="#"
            className="instagram social"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <p className="copyright">What2Watch © 2022</p>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
