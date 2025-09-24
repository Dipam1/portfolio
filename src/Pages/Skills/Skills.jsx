import React from 'react';
import { motion } from 'framer-motion';
import developerData from '../../Assets/info.json';
import FloatingSkills from '../../Components/FloatingSkills/FloatingSkills';
import itemVariants from "../../Assets/itemVariant.json";

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

  //ITEM VAR

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
         <motion.div variants={containerVariants}>

        <FloatingSkills skills={allSkills} />
         </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;