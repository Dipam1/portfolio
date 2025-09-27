import itemVariants from "../../Assets/itemVariant.json";
import React from "react";
import { motion } from "framer-motion";

import "./Contact.css";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  //ITEM VAR

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "2e9bb313-27a8-4bc0-be2c-44a63a5e18e4");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message Sent Successfully!!!");
      event.target.reset();
    } else {
      console.log("Errrror", data);
      setResult(data.message);
    }
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
        <motion.div variants={itemVariants} className="contact-content">
          <motion.form className="contact-form" onSubmit={onSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
            ></textarea>
            <button type="submit">Submit Form</button>
          </motion.form>
          <span>{result}</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
