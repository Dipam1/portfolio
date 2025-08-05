import React from 'react';
import { motion } from 'framer-motion';
import developerData from '../../Assets/info.json';
import './Education.css';

const Education = () => {
  const { education } = developerData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="education-page">
      <motion.div 
        className="education-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="education-header" variants={itemVariants}>
          Education
        </motion.h1>
        <div className="education-timeline">
          {education.map((edu, index) => (
            <motion.div 
              key={index} 
              className="education-card"
              variants={itemVariants}
            >
              <div className="education-card-header">
                <h3 className="university-name">{edu.university}</h3>
                <p className="graduation-date">{edu.graduationDate}</p>
              </div>
              <div className="education-card-body">
                <p className="degree">{edu.degree}</p>
                {edu.gpa && <p className="gpa">GPA: {edu.gpa}</p>}
                {edu.percentage && <p className="percentage">Percentage: {edu.percentage}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Education;