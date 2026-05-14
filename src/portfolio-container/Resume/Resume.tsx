import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Resume.css";
import { FaExternalLinkAlt } from "react-icons/fa";

/* 1. DEFINE EXPLICIT TYPES FOR ALL COMPONENT INTERFACES */
interface ResumeProps {
  id?: string;
}

interface BaseHeadingProps {
  heading?: string;
  subHeading?: string;
  fromDate?: string;
  toDate?: string;
  description?: string;
}

interface ResumeHeadingProps extends BaseHeadingProps {
  link?: string;
}

interface WorkHeadingProps extends BaseHeadingProps {
  technologies?: string;
}

/* MEMOIZED COMPONENT TEMPLATES */
const ResumeHeading: React.FC<ResumeHeadingProps> = memo((props) => {
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
          <div />
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
          </a>
        ) : null}
      </div>
    </div>
  );
});
ResumeHeading.displayName = "ResumeHeading";

const WorkHeading: React.FC<WorkHeadingProps> = memo((props) => {
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
          <div />
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
});
WorkHeading.displayName = "WorkHeading";

/* STATIC CONSTANTS */
const RESUME_BULLETS = [
  { label: "Education", logoSrc: "education.svg" },
  { label: "Work History", logoSrc: "work-history.svg" },
  { label: "Programming Skills", logoSrc: "programming-skills.svg" },
  { label: "Projects", logoSrc: "projects.svg" },
  { label: "Interests", logoSrc: "interests.svg" },
];

const PROGRAMMING_SKILLS = [
  { skill: "Flutter", ratingPercentage: 85 },
  { skill: "GetX", ratingPercentage: 70 },
  { skill: "BLoC", ratingPercentage: 65 },
  { skill: "MVVM Architecture", ratingPercentage: 65 },
  { skill: "MVC Architecture", ratingPercentage: 75 },
  { skill: "GitHub Actions CI/CD", ratingPercentage: 80 },
  { skill: "RESTful APIs", ratingPercentage: 80 },
  { skill: "Django", ratingPercentage: 65 },
  { skill: "Laravel", ratingPercentage: 55 },
  { skill: "Google Maps API", ratingPercentage: 70 },
  { skill: "Payment Gateway Integration", ratingPercentage: 65 },
  { skill: "UI/UX Implementation", ratingPercentage: 80 },
];

const EDUCATION_DETAILS = [
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

const WORK_EXPERIENCE = [
  {
    company: "Five9s Solutions",
    role: "Associate Software Developer",
    fromDate: "APR 2025",
    toDate: "AUG 2026",
    description:
      "Worked on production-level code following the MVC architecture, implementing features and resolving real test case issues to optimize app performance. Translated Figma designs into fully functional user interfaces with high accuracy. Integrated RESTful APIs to facilitate seamless real-time data communication across the application.",
    technologies: "Flutter, MVC Architecture, RESTful APIs",
  },
];

const PROJECTS = [
  {
    title: "HomeFood",
    role: "Associate Software Developer (Five9s Solutions)",
    fromDate: "APR 2025",
    toDate: "AUG 2026",
    description:
      "Contributed to the HomeFood project by resolving production issues and implementing new features as part of the development team. Applied MVC architecture and GetX for efficient state management. Integrated a payment gateway and Google Maps APIs for location tracking. Began learning Laravel to meet project backend requirements and implemented APIs for backend processing.",
    technologies: "Flutter, MVC Architecture, GetX, Google Maps API, Payment Gateway, Laravel",
    link: ""
  },
  {
    title: "AgriIot",
    role: "Associate Software Developer (Five9s Solutions)",
    fromDate: "APR 2025",
    toDate: "AUG 2025",
    description:
      "Developed modules and implemented features such as an inventory management system. Designed and developed backend using Django to ensure efficient API functionality and seamless data flow. Converted Figma designs into functional UI components using design patterns and integrated backend APIs for a smooth user experience.",
    technologies: "Flutter, Django, API Development, UI Design Patterns, Figma",
    link: ""
  },
];

const Resume: React.FC<ResumeProps> = (props) => {
  const [selectedBulletIndex, setSelectedBulletIndex] = useState<number>(0);
  const [carousalOffsetStyle, setCarousalOffsetStyle] = useState<React.CSSProperties>({});

  // 2. Safely type-cast telemetry params to pass compilation
  const fadeInScreenHandler = useCallback((screen: any) => {
    if (!screen || screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id || '');
  }, [props.id]);

  // 3. Merged layout creation and unsubscription safely inside useEffect
  useEffect(() => {
    const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
    
    return () => {
      /* UNSUBSCRIBE THE SUBSCRIPTIONS */
      fadeInSubscription.unsubscribe();
    };
  }, [fadeInScreenHandler]);

  const handleCarousal = (index: number) => {
    let offsetHeight = 360; // Set this matching your standard item CSS container wrapper box height
    setCarousalOffsetStyle({
      transform: `translateY(-${index * offsetHeight}px)`
    });
    setSelectedBulletIndex(index);
  };

   const getBullets = () => {
    return RESUME_BULLETS.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"}
        key={index}
      >
        <img
          className="bullet-logo"
          /* FIXED: Changed path from '../../../assets/resume' to '../../assets/resume' */
          src={require(`../../assets/resume/${bullet.logoSrc}`)}
          alt="B"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };


  const resumeDetails = useMemo(() => [
    /* EDUCATION */
    <div className="resume-screen-container" key="education">
      {EDUCATION_DETAILS.map((edu, index) => (
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
        {WORK_EXPERIENCE.map((work, index) => (
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
    <div className="resume-screen-container programming-skills-container" key="programming-skills">
      {PROGRAMMING_SKILLS.map((skill, index) => (
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
      {PROJECTS.map((projectsDetails, index) => (
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
    /* INTERESTS (Completed implementation from broken prompt snippet) */
    <div className="resume-screen-container" key="interests">
      <ResumeHeading
        heading="Teaching"
        description="I believe that teaching is a part of learning also. With teaching, I can develop my skills as understanding my ability to learn new tech everyday."
      />
      <ResumeHeading
        heading="Music"
        description="Listening to soothing music is something I can never avoid in my daily life, as it helps me unwind and focus."
      />
    </div>,
  ], []);

  return (
    <div className="resume-container screen-container" id={props.id || ""}>
      <div className="resume-content">
        <ScreenHeading title={"Resume"} subHeading={"My Formal Bio Details"} />
        <div className="resume-card">
          <div className="resume-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>

          <div className="resume-bullet-details">
            <div style={carousalOffsetStyle} className="resume-details-carousal">
              {resumeDetails}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Resume);
