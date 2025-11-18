import React, { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import pp from "../Assets/pp.png";

import "./AIComponent.css";

const AIComponent = ({ setResult }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const respondToChat = useCallback(
    async (query) => {
      if (!query || !query.trim()) return;
      setIsLoading(true);
      setError(null); // Clear previous errors
      try {
        const res = await fetch("/.netlify/functions/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Function error: ${res.status} ${text}`);
        }

        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        setError("An error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
        setSearchTerm("");
      }
    },
    [setResult]
  );

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
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
            ref={inputRef}
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
