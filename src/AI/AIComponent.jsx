import React, { useState, useCallback } from "react";
import { respondAsDipam as geminirespondAsDipam } from "./GeminiAI"; // Renamed to avoid conflict
import { motion } from "framer-motion";
import pp from "../Assets/pp.png";

import "./AIComponent.css";
import { Typewriter } from "../Assets/TypeWriter";

const AIComponent = ({ result, setResult, isChecked, setIsChecked }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [error, setError] = useState(null);


  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const respondToChat = useCallback(async (query) => {
    setIsLoading(true);
    setIsResultOpen(false);
    setError(null); // Clear previous errors
    try {
      const result = await geminirespondAsDipam(query);
      setResult(result);
    } catch (err) {
      console.error(err);
      setError("An error occurred.Please try again later.");
    } finally {
      setIsLoading(false);
      setSearchTerm("");
      setIsResultOpen(true);
    }
  }, []);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const popVariant = {
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: {
      opacity: 0,
      y: 20,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="ai-component"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={`c-formContainer ${isChecked ? "is-checked" : ""}`}>
        <div className="c-form">
          <input
            name="chat-input"
            className="c-form__input"
            placeholder="ASK ME ANYTHING"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                respondToChat(searchTerm);
              }
            }}
          />
          <label className="c-form__buttonLabel">
            <button
              className="c-form__button"
              type="button"
              onClick={() => respondToChat(searchTerm)}
            >
              Send
            </button>
          </label>
          <div className="c-form__toggle bg-none" onClick={handleToggle}>
            <img src={pp} alt="" />
          </div>
        </div>
      </div>

      {isLoading && <div className="loader"></div>}
    </motion.div>
  );
};

export default AIComponent;
