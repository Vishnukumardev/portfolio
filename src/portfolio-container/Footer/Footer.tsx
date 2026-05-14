import React, { memo, useMemo } from 'react'
import './Footer.css'
import { faFacebook, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SOCIAL_DETAILS = [
  { icon: faFacebook, link: '#' },
  { icon: faLinkedin, link: '#' },
  { icon: faInstagram, link: '#' }
];

const Footer = memo(() => {
    /* GET CURRENT YEAR */
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    /* RENDER SOCIAL ICONS */
    const getSocials = useMemo(() => {
        return (SOCIAL_DETAILS.map((social, index) => (
            <a rel="noopener noreferrer" key={index} href={social.link} target="_blank" >
                <FontAwesomeIcon className="social-icon" icon={social.icon} />
            </a>
        )));
    }, []);

    return (
        <div className="main-footer-container">
            <div className="main-footer-content">
                <div className="main-footer-message">
                    <span> Created by Vishnu Kumar { currentYear } </span>
                </div>
                <div className="main-footer-socials">
                    { getSocials }
                </div>
            </div>
        </div>
    )
});

Footer.displayName = "Footer";
export default Footer;