import React, { useState, useCallback } from "react";
import { respondAsDipam as geminirespondAsDipam } from "./GeminiAI"; // Renamed to avoid conflict
import { motion } from "framer-motion";

import "./AIComponent.css";
import { Typewriter } from "../Assets/TypeWriter";

const AIComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const respondToChat = useCallback(async (query) => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      const result = await geminirespondAsDipam(query);
      setResult(result);
    } catch (err) {
      console.error(err);
      setError("An error occurred.Please try again later.");
    } finally {
      setIsLoading(false);
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

  const Result = () => {
    return (
      <div className="ai-result">
        {isLoading && <p>Loading...</p>}
        {result.answer ? <Typewriter text={result.answer} /> : ""}
      </div>
    );
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
          <label
            className="c-form__toggle"
            data-title="Click to ask me ANYTHING!!"
            onClick={handleToggle}
          ></label>
        </div>
      </div>
      <Result />
    </motion.div>
  );
};

export default AIComponent;
