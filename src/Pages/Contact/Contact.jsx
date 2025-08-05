import React from 'react';
import { motion } from 'framer-motion';
import PageHeaders from '../../Components/PageHeaders/PageHeaders';
import './Contact.css';

const Contact = () => {
  return (
    <motion.div className="contact-container main-page-container">
      <PageHeaders title="Contact" />
    </motion.div>
  );
};

export default Contact;
