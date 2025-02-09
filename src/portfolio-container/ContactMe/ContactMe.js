import React, { useEffect, useState, useRef } from "react";
import imgBack from "../../../src/images/im4.jpg";
import load1 from "../../../src/images/load2.gif";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import "./ContactMe.css";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import Footer from "../Footer/Footer";
import Typical from "react-typical";
import emailjs from '@emailjs/browser';


export const ContactMe = (props) => {
  const form = useRef();
  useEffect(() => {
    const fadeInScreenHandler = (screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
    };
  
    const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(
      fadeInScreenHandler
    );
  
    return () => fadeInSubscription.unsubscribe();
  }, [props.id]); // ✅ Only use `props.id` as a dependency
  

  const [banner, setBanner] = useState("");
  const [bool, setBool] = useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();
    setBool(true);

    emailjs
      .sendForm(
        "service_fln8mtv",
        "template_4102fp6",
        form.current,
        "GKttJ7c8af9ZPsGFg"
      )
      .then((result) => {
        console.log(result.text);
        setBanner("Message sent successfully! ✅");
      })
      .catch((error) => {
        console.log(error.text);
        setBanner("Error sending message. ❌");
      })
      .finally(() => setBool(false));
  };

  return (
    <div className="main-container" id={props.id || ""}>
      <ScreenHeading subHeading={"Let's Keep In Touch"} title={props.screenName || ""} />
      <div className="central-form">
        <div className="col">
          <h2 className="title">
            <Typical loop={Infinity} steps={["Get in Touch 🤝", 1000]} />
          </h2>

          {/* Social Links */}
          <a href="https://www.facebook.com">
            <i className="fa fa-facebook-square" />
          </a>
          <a href="https://www.google.com">
            <i className="fa fa-google-plus-square" />
          </a>
          <a href="https://www.instagram.com">
            <i className="fa fa-instagram" />
          </a>
          <a href="https://www.youtube.com">
            <i className="fa fa-youtube-square" />
          </a>
          <a href="https://www.twitter.com">
            <i className="fa fa-twitter" />
          </a>
        </div>

        <div className="back-form">
          <div className="img-back">
            <h4>Send your message</h4>
            <img src={imgBack} alt="Mail Background" />
          </div>
          <form ref={form} onSubmit={formSubmit}>
            <p>{banner}</p>
            <input type="hidden" name="to_name" value="Vishnu Kumar" />

            <label htmlFor="name">Name</label>
            <input type="text" name="from_name" required />

            <label htmlFor="email">Email</label>
            <input type="email" name="reply_to" required />

            <label htmlFor="message">Message</label>
            <textarea name="message" required />

            <div className="send-btn">
              <button type="submit" disabled={bool}>
                {bool ? <img src={load1} alt="loading" /> : "Send "}
                <i className="fa fa-paper-plane"></i>
              </button>
              <button type="reset">Clear</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactMe;