import React from "react";
import { motion } from "framer-motion";
import "./PageHeaders.css";

const PageHeaders = ({ title }) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="page-header"
    >
      <h1>{title}</h1>
    </motion.header>
  );
};

export default PageHeaders;
