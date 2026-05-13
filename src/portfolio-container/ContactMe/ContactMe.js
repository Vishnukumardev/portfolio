/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef, useCallback, useMemo, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faGooglePlusSquare,
  faInstagram,
  faYoutubeSquare,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import "./ContactMe.css";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import Footer from "../Footer/Footer";
import Typical from "react-typical";
import emailjs from "@emailjs/browser";
import imgBack from "../../../src/images/im4.jpg";
import load1 from "../../../src/images/load2.gif";

const ContactMe = (props) => {
  const form = useRef();
  
  const fadeInScreenHandler = useCallback((screen) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  }, [props.id]);

  const fadeInSubscription = useMemo(
    () => ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler),
    [fadeInScreenHandler]
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [banner, setBanner] = useState("");
  const [bool, setBool] = useState(false);

  useEffect(() => {
    return () => {
      /* UNSUBSCRIBE THE SUBSCRIPTIONS */
      fadeInSubscription.unsubscribe();
    };
  }, [fadeInSubscription]);

  const formSubmit = useCallback(async (e) => {
    e.preventDefault();
    setBool(true);
    emailjs
      .sendForm(
        "service_fln8mtv",
        "template_4102fp6",
        form.current,
        "GKttJ7c8af9ZPsGFg"
      )
      .then(
        (result) => {
          console.log(result.text);
          setBanner("Message sent successfully!");
          setName("");
          setEmail("");
          setMessage("");
          setBool(false);
        },
        (error) => {
          console.log(error.text);
          setBanner("Failed to send message. Try again.");
          setBool(false);
        }
      );
  }, []);

  const handleReset = useCallback(() => {
    setName("");
    setEmail("");
    setMessage("");
    setBanner("");
  }, []);

  return (
    <div className="main-container" id={props.id || ""}>
      <ScreenHeading
        subHeading={"Let's Keep In Touch"}
        title={props.screenName ? props.screenName : ""}
      />
      <div className="central-form">
        <div className="col">
          <h2 className="title">
            {" "}
            <Typical loop={Infinity} steps={["Get in Touch 🤝", 1000]} />
          </h2>
        </div>

        <div className="back-form">
          <div className="img-back">
            <h4>Send your message</h4>
            <img src={imgBack} alt="contact background" loading="lazy" />
          </div>
          <form ref={form} onSubmit={formSubmit}>
            <p>{banner}</p>
            <input type="hidden" name="to_name" value="Vishnu Kumar" />
            <label htmlFor="name">Name</label>
            <input type="text" name="from_name" value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="email">Email</label>
            <input type="email" name="reply_to" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="message">Message</label>
            <textarea type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />

            <div className="send-btn">
              <button type="submit">
                Send <i className="fa fa-paper-plane"></i>
                {bool ? (
                  <b className="load">
                    <img src={load1} alt="loading" loading="lazy" />
                  </b>
                ) : (
                  ""
                )}
              </button>
              <button type="reset" onClick={handleReset}>Clear</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default memo(ContactMe);
