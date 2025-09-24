import React from 'react';
import { motion } from 'framer-motion';
import developerData from '../../Assets/info.json';
import itemVariants from "../../Assets/itemVariant.json";

import './Experience.css';

const Experience = () => {
  const { experience } = developerData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  //ITEM VAR

  return (
    <div className="experience-page">
      <motion.div
        className="experience-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="page-header" variants={itemVariants}>
          Experience
        </motion.h1>
        <div className="experience-timeline">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card"
              variants={itemVariants}
            >
              <div className="experience-card-header">
                <h3 className="company-name">{exp.company} - <span className="job-title">{exp.title}</span></h3>
                <p className="date-range">{exp.startDate} – {exp.endDate}</p>
              </div>
              <p className="location">{exp.location}</p>
              <div className="experience-card-body">
                <ul className="responsibilities-list">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
              <div className="technologies-container">
                {exp.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;