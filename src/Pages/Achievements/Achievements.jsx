import React from "react";

import { motion } from "framer-motion";
import PageHeaders from "../../Components/PageHeaders/PageHeaders";
import "./Achievements.css";

const Achievements = () => {
  return (
    <motion.div className="achievements-container main-page-container">
      <PageHeaders title="Achievements" />
    </motion.div>
  );
};

export default Achievements;
