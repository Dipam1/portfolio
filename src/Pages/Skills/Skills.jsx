import React from 'react';
import { motion } from 'framer-motion';
import PageHeaders from '../../Components/PageHeaders/PageHeaders'; 
import './Skills.css';

const Skills = () => {
  return (
    <motion.div className="skills-container main-page-container">
      <PageHeaders title="Skills" />
    </motion.div>
  );
};

export default Skills;
