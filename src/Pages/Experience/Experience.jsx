import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';
import PageHeaders from '../../Components/PageHeaders/PageHeaders';

const Experience = () => {
  return (
    <motion.div className="experience-container main-page-container">
      <PageHeaders title="Experience" />
    </motion.div>
  );
};

export default Experience;
