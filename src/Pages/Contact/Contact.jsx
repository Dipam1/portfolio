import React from "react";
import { motion } from "framer-motion";
import PageHeaders from "../../Components/PageHeaders/PageHeaders";
import "./Contact.css";

const Contact = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  return (
    <div className="contact-page">
      <motion.div
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="page-header" variants={itemVariants}>
          Contact
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default Contact;
