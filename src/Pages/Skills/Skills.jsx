import React from 'react';
import { motion } from 'framer-motion';
import developerData from '../../Assets/info.json';
import FloatingSkills from '../../Components/FloatingSkills/FloatingSkills';
import './Skills.css';

const Skills = () => {
  const { skills } = developerData;
  const allSkills = Object.values(skills).flat();

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
    <div className="skills-page">
      <motion.div
        className="skills-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="page-header" variants={itemVariants}>
          Skills
        </motion.h1>
        <FloatingSkills skills={allSkills} />
      </motion.div>
    </div>
  );
};

export default Skills;