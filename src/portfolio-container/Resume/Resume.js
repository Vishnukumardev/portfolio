import React, { useState, useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Resume.css";
import { FaExternalLinkAlt } from "react-icons/fa";

const Resume = (props) => {
  /* STATES */
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffsetStyle, setCarousalOffsetStyle] = useState({});

  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;

    Animations.animations.fadeInScreen(props.id);
  };
  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  /* REUSABLE MINOR COMPONENTS */
  const ResumeHeading = (props) => {
    return (
      <div className="resume-heading">
        <div className="resume-main-heading">
          <div className="heading-bullet"></div>
          <span>{props.heading ? props.heading : ""}</span>
          {props.fromDate && props.toDate ? (
            <div className="heading-date">
              {props.fromDate + "-" + props.toDate}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="resume-sub-heading">
          <span>{props.subHeading ? props.subHeading : ""}</span>
        </div>
        <div className="resume-heading-description">
          <span>{props.description ? props.description : ""}</span>
        </div>
        <div className="resume-heading-link">
          {props.link ? (
            <a href={props.link} target="_blank" rel="noopener noreferrer">
              Link <FaExternalLinkAlt size={14} color="blue" />{" "}
              {/* Icon after Link */}
            </a>
          ) : null}
        </div>
      </div>
    );
  };
  const WorkHeading = (props) => {
    return (
      <div className="resume-heading">
        <div className="resume-main-heading">
          <div className="heading-bullet"></div>
          <span>{props.heading ? props.heading : ""}</span>
          {props.fromDate && props.toDate ? (
            <div className="heading-date">
              {props.fromDate + "-" + props.toDate}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="resume-sub-heading">
          <span>{props.subHeading ? props.subHeading : ""}</span>
        </div>
        <div className="resume-heading-description">
          <span>{props.description ? props.description : ""}</span>
          <div className="resume-heading-technologies">
            <span>{props.technologies ? props.technologies : ""}</span>
          </div>
        </div>
      </div>
    );
  };

  /* STATIC RESUME DATA */
  const resumeBullets = [
    { label: "Education", logoSrc: "education.svg" },
    { label: "Work History", logoSrc: "work-history.svg" },
    { label: "Programming Skills", logoSrc: "programming-skills.svg" },
    { label: "Projects", logoSrc: "projects.svg" },
    { label: "Interests", logoSrc: "interests.svg" },
  ];

  const programmingSkillsDetails = [
    { skill: "Flutter", ratingPercentage: 85 },
    { skill: "Get X ", ratingPercentage: 60 },
    { skill: "Github actions CI/CD", ratingPercentage: 80 },
  ];

  const educationDetails = [
    {
      title: "SNS COLLEGE OF TECHNOLOGY, PG",
      subTitle: "MASTER OF COMPUTER APPLICATIONS",
      fromDate: "JULY 2022",
      toDate: "JULY 2024",
    },
    {
      title: "SRI RAMASAMY NAIDU MEMORIAL COLLEGE, UG",
      subTitle: "BACHELOR OF COMPUTER APPLICATIONS",
      fromDate: "JULY 2019",
      toDate: "JULY 2022",
    },
  ];

  const workExperienceDetails = [
    {
      company: "Admiro Soft Technologies",
      role: "Flutter Developer (Frontend)",
      fromDate: "APR 2024",
      toDate: "AUG 2024",
      description:
        "Worked as a frontend Flutter developer, handling cross-platform projects for both web and mobile. Gained experience in UI/UX implementation and Flutter development best practices.",
      technologies: "Flutter, Cross-platform Development",
    },
    {
      company: "Elysium Intelligence and Business Solutions",
      role: "Flutter Developer (Frontend)",
      fromDate: "NOV 2024",
      toDate: "FEB 2025",
      description:
        "Contributed as a Flutter developer, focusing on state management using GetX, API integration, and model parsing. Improved app performance and user experience through efficient state management solutions.",
      technologies: "GetX, API Integration, Model Parsing",
    },
  ];

  const projectsDetails = [
    {
      title: "Camera App",
      role: "Side Project",
      fromDate: "SEP 2024",
      toDate: "OCT 2024",
      description:
        "Developed a cross-platform mobile application that utilizes device camera sensors to capture high-resolution images. Implemented custom camera controls and gallery integration for an enhanced user experience. Optimized image processing and storage using Flutter plugins to ensure efficient performance",
      link: "https://github.com/Vishnukumardev/camera_app",
    },
  ];

  const resumeDetails = [
    /* EDUCATION */
    <div className="resume-screen-container" key="education">
      {educationDetails.map((edu, index) => (
        <ResumeHeading
          key={index}
          heading={edu.title}
          subHeading={edu.subTitle}
          fromDate={edu.fromDate}
          toDate={edu.toDate}
        />
      ))}
    </div>,
    /* WORK EXPERIENCE */

    <div className="resume-screen-container" key="work-experience">
      <div className="experience-container">
        {workExperienceDetails.map((work, index) => (
          <WorkHeading
            key={index}
            heading={work.company}
            subHeading={work.role}
            fromDate={work.fromDate}
            toDate={work.toDate}
            description={work.description}
            technologies={`Technologies: ${work.technologies}`}
          />
        ))}
      </div>
    </div>,

    /* PROGRAMMING SKILLS */
    <div
      className="resume-screen-container programming-skills-container"
      key="programming-skills"
    >
      {programmingSkillsDetails.map((skill, index) => (
        <div className="skill-parent" key={index}>
          <div className="heading-bullet"></div>
          <span>{skill.skill}</span>
          <div className="skill-percentage">
            <div
              style={{ width: skill.ratingPercentage + "%" }}
              className="active-percentage-bar"
            ></div>
          </div>
        </div>
      ))}
    </div>,
    /* PROJECTS */
    <div className="resume-screen-container" key="projects">
      {projectsDetails.map((projectsDetails, index) => (
        <ResumeHeading
          key={index}
          heading={projectsDetails.title}
          subHeading={projectsDetails.role}
          fromDate={projectsDetails.fromDate}
          toDate={projectsDetails.toDate}
          description={projectsDetails.description}
          link={projectsDetails.link}
        />
      ))}
    </div>,
    /* Interests */
    <div className="resume-screen-container" key="interests">
      <ResumeHeading
        heading="Teaching"
        description="I believe that teaching is a part of learning also.With teaching,i can develop my skills as understanding my ability to learn new tech everyday."
      />
      <ResumeHeading
        heading="Music"
        description="I can be very much stressed sometimes.Music tends to keep me skill and work on my progress .That how my day and life goes."
      />
      <ResumeHeading
        heading="Book Reading"
        description="I like to read books from my school day .It somehjow kept on me as a habit for reading and it is fun "
      />
    </div>,
  ];

  const handleCarousal = (index) => {
    let offsetHeight = 360;

    let newCarousalOffset = {
      style: { transform: "translateY(" + index * offsetHeight * -1 + "px)" },
    };

    setCarousalOffsetStyle(newCarousalOffset);
    setSelectedBulletIndex(index);
  };

  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={
          index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"
        }
        key={index}
      >
        <img
          className="bullet-logo"
          src={require(`../../assets/Resume/${bullet.logoSrc}`)}
          alt="B"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  const getResumeScreens = () => {
    return (
      <div
        style={carousalOffsetStyle.style}
        className="resume-details-carousal"
      >
        {resumeDetails.map((ResumeDetail) => ResumeDetail)}
      </div>
    );
  };

  useEffect(() => {
    return () => {
      /* UNSUBSCRIBE THE SUBSCRIPTIONS */
      fadeInSubscription.unsubscribe();
    };
  }, [fadeInSubscription]);

  return (
    <div
      className="resume-container screen-container fade-in"
      id={props.id || ""}
    >
      <div className="resume-content">
        <ScreenHeading title={"Resume"} subHeading={"My formal Bio Details"} />
        <div className="resume-card">
          <div className="resume-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>

          <div className="resume-bullet-details">{getResumeScreens()}</div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
