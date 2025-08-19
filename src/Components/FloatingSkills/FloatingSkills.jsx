import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaWordpress,
  FaPhp,
  FaAws,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiHtml5,
  SiCss3,
  SiMui,
  SiAntdesign,
  SiBootstrap,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiGraphql,
  SiHeroku,
  SiShopify,
  SiJira,
  SiFigma,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";
import { DiMysql } from "react-icons/di";
import developerData from "../../Assets/info.json";
import "./FloatingSkills.css";
import { IoLogoXbox } from "react-icons/io";
import { IoInformation } from "react-icons/io5";

const iconMap = {
  ReactJS: FaReact,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Redux: SiRedux,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  "Material UI": SiMui,
  "Ant Design": SiAntdesign,
  Bootstrap: SiBootstrap,
  "Node.js": FaNodeJs,
  ExpressJS: SiExpress,
  "REST APIs": null, // No specific icon
  Firebase: SiFirebase,
  MongoDB: SiMongodb,
  SQL: DiMysql,
  GraphQL: SiGraphql,
  "Git (GitHub, GitLab)": FaGitAlt,
  Docker: FaDocker,
  Heroku: SiHeroku,
  AWS: FaAws,
  Zoho: null, // No specific icon
  Shopify: SiShopify,
  Jira: SiJira,
  "UI/UX Design (Figma)": SiFigma,
  WordPress: FaWordpress,
  Liquid: null, // No specific icon
  "CI/CD pipelines": null, // No specific icon
  "Agile/Scrum": null, // No specific icon
  NextJS: SiNextdotjs,
  TailwindCSS: SiTailwindcss,
  PHP: FaPhp,
};

const quadrantBoundaries = {
  frontEnd: { top: [5, 45], left: [5, 45] },
  backEnd: { top: [5, 45], left: [55, 95] },
  devOpsAndTools: { top: [55, 95], left: [5, 45] },
  other: { top: [55, 95], left: [55, 95] },
};

const FloatingSkills = () => {
  const { skills } = developerData;
  const [toAnimate, setToAnimate] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const [positions] = useState(() => {
    const initialPositions = {};
    Object.entries(skills).forEach(([category, skillList]) => {
      const quadrant = quadrantBoundaries[category];
      if (!quadrant) return;

      const numSkills = skillList.length;
      const gridCols = Math.ceil(Math.sqrt(numSkills));
      const gridRows = Math.ceil(numSkills / gridCols);

      const cellWidth = (quadrant.left[1] - quadrant.left[0]) / gridCols;
      const cellHeight = (quadrant.top[1] - quadrant.top[0]) / gridRows;

      skillList.forEach((skillData, index) => {
        const col = index % gridCols;
        const row = Math.floor(index / gridCols);

        const left =
          quadrant.left[0] + col * cellWidth + (Math.random() * cellWidth) / 4;
        const top =
          quadrant.top[0] + row * cellHeight + (Math.random() * cellHeight) / 4;

        initialPositions[skillData.skill] = {
          top: `${top}%`,
          left: `${left}%`,
        };
      });
    });
    return initialPositions;
  });

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Animation variants for the popup itself
  // It will scale up and fade in from the center
  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.75,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const iconClicked = (skill) => {
    setSelectedSkill(skill);
    setToAnimate(!toAnimate);
    console.log("boom");
  };

  const ModalGG = () => {
    return (
      <>
        {/* create a modal */}

        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setToAnimate(true)} // Close modal when backdrop is clicked
        >
          <motion.div
            className="modal-content"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            <div className="modal-header">
              <h2>Skills : {selectedSkill}</h2>
              <button
                className="close-button"
                onClick={() => setToAnimate(true)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              
            </div>
          </motion.div>
        </motion.div>
      </>
    );
  };

  return (
    <div className="floating-skills-container">
      <AnimatePresence>{!toAnimate && <ModalGG />}</AnimatePresence>

      <div className="quadrant front-end">
        <h3 className="quadrant-title">Front End</h3>
      </div>
      <div className="quadrant back-end">
        <h3 className="quadrant-title">Back End</h3>
      </div>
      <div className="quadrant devops-tools">
        <h3 className="quadrant-title">DevOps & Tools</h3>
      </div>
      <div className="quadrant other">
        <h3 className="quadrant-title">Other</h3>
      </div>

      {Object.values(skills)
        .flat()
        .map((skillData, index) => {
          const Icon = iconMap[skillData.skill];
          if (!Icon) return null;

          return (
            <motion.div
              onClick={() => iconClicked(skillData.skill)}
              key={skillData.skill}
              className="skill-bubble"
              style={{
                top: positions[skillData.skill]?.top,
                left: positions[skillData.skill]?.left,
              }}
              animate={
                toAnimate
                  ? {
                      translateX: [
                        (Math.random() - 0.3) * 90,
                        (Math.random() - 0.3) * 90,
                      ],
                      translateY: [
                        (Math.random() - 0.3) * 90,
                        (Math.random() - 0.3) * 90,
                      ],
                    }
                  : {
                      translateX: 0,
                      translateY: 0,
                    }
              }
              transition={
                toAnimate && {
                  duration: Math.random() * 2 + 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
              }
            >
              <Icon />
            </motion.div>
          );
        })}
    </div>
  );
};

export default FloatingSkills;