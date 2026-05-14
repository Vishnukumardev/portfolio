import React, { memo } from "react";
import ScrollService from ".././../../utilities/ScrollService";
import "./Profile.css";
import Typical from "react-typical";
const resumeFile = require("../../../assets/files/resume.pdf");

const Profile: React.FC = memo(() => {
  return (
    <div className="profile-container">
      <div className="profile-parent">
        <div className="profile-details">
      
          <div className="profile-details-name">
            <span className="primary-text">
              {" "}
              Hello, I'M <span className="highlighted-text">Vishnu Kumar</span>
            </span>
          </div>
          <div className="profile-details-role">
            <div className="primary-text"> {/* Fixed: Changed <span> containing an <h1> to a <div> to adhere to valid HTML semantics */}
              <h1>
                {" "}
                <Typical
                  loop={Infinity}
                  steps={[
                    "Enthusiastic Dev😎",
                    1000,
                    "Mobile Application Dev",
                    1000,
                    "Cross Platform Dev📱",
                    1000,
                    "Flutter Developer📱",
                    1000,
                  ]}
                />
              </h1>
            </div>
            <span className="profile-role-tagline">
              becoming tech Savvy of building applications
              <br /> with front and back end operations.
            </span>
          </div>
          <div className="profile-options">
            <button
              className="btn primary-btn"
              onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
            >
              {" "}
              Hire Me{" "}
            </button>
            <a href={resumeFile} download="resume.pdf">
              <button className="btn highlighted-btn"> Get Resume </button>
            </a>
          </div>
        </div>
        <div className="profile-picture">
          <div className="profile-picture-background"></div>
        </div>
      </div>
    </div>
  );
});

Profile.displayName = "Profile"; // Explicitly defined displayName since the component is wrapped in React.memo
export default Profile;
