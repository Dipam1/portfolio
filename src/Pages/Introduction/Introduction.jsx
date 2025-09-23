import React, { useState } from "react";
// To use motion effects, you'll need to install framer-motion
// npm install framer-motion
import { motion } from "framer-motion";
import developerData from "../../Assets/info.json";
import "./Introduction.css";
import AIComponent from "../../AI/AIComponent";
import { Typewriter } from "../../Assets/TypeWriter";

// Helper for icons
const Icon = ({ path, className = "icon" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d={path} />
  </svg>
);

// Icon Paths
const ICONS = {
  GITHUB:
    "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  LINKEDIN:
    "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  EMAIL:
    "M24 5.457v13.086c0 1.373-1.127 2.5-2.5 2.5h-19c-1.373 0-2.5-1.127-2.5-2.5v-13.086c.012-.044.024-.087.038-.129l11.962 7.623 11.962-7.623c.014.042.026.085.038.129zm-12 4.08l-11.923-7.597c.524-.826 1.451-1.362 2.423-1.362h19c.972 0 1.899.536 2.423 1.362l-11.923 7.597z",
  LOCATION:
    "M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z",
};

export default function Introduction() {
  const [result, setResult] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const { personalInfo, professionalSummary } = developerData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <>
      <div className="introduction-page">
        <div className="container">
          <motion.header
            className="page-header"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="profile-image ai-section"
              variants={itemVariants}
            >
              {!isChecked ? (
                <motion.div
                  className="close-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, rotate: [0, -2, 2, -2, 0] }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  Click Here
                </motion.div>
              ) : (
                ""
              )}
              <AIComponent
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                setResult={setResult}
                result={result}
              />
            </motion.div>
            <motion.h1 className="intro-name" variants={itemVariants}>
              {personalInfo.name}
            </motion.h1>
            <motion.p className="intro-title" variants={itemVariants}>
              {personalInfo.title}
            </motion.p>

            <motion.div className="location-info" variants={itemVariants}>
              <Icon path={ICONS.LOCATION} />
              <span>{personalInfo.location}</span>
            </motion.div>

            <motion.p className="summary" variants={itemVariants}>
              {result?.answer ? (
                <Typewriter text={result.answer} />
              ) : (
                professionalSummary
              )}
            </motion.p>

            <motion.div className="social-links" variants={itemVariants}>
              <motion.a
                href={`https://linkedin.com/${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon path={ICONS.LINKEDIN} />
              </motion.a>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon path={ICONS.EMAIL} />
              </motion.a>
            </motion.div>
          </motion.header>
        </div>
      </div>
    </>
  );
}
