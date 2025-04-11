import React, { useState, useRef } from "react";
import "./style.css";

export const Linebreak = () => {
  const [brackets, setBrackets] = useState(false);
  const [text, setText] = useState("");
  const [formattedText, setFormattedText] = useState("");
  const [wordCount, setWordCount] = useState(null);
  const [copied, setCopied] = useState(false);

  const textInput = useRef(null);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const focus = () => {
    textInput.current.select();
  };

  const format = async (e) => {
    e.persist();
    setCopied(false); // Reset copied state first

    let to = text.replace(/\n\n\n/g, "\n");
    to = to.replace(/\n\n/g, "\n");

    if (!brackets) {
      to = to.replace(/\[.*?\]/g, "");
    }

    to = to.replace(/\n\n\n/g, "\n");
    to = to.replace(/\n\n/g, "\n");

    const wordCount = to.trim().split(/\s+/).length;

    setFormattedText(to);
    setWordCount(wordCount);

    focus();

    try {
      await navigator.clipboard.writeText(to);
      setCopied(true); // Set copied to true after successful copy
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
    
    e.target.focus();
  };

  return (
    <div className="row">
      <div className="info-box">
        Linebreak Formatter
      </div>
      <div className="label-container">
        <div className="Original">Original</div>
        <div className="Result">Result</div>
      </div>

      <div className="input-container">
        <div className="flex-row">
          <textarea
            value={text}
            onChange={handleChange}
            className="flex-row-item"
            placeholder="Input text here..."
          />
        </div>
        <div className="flex-row">
          <textarea
            ref={textInput}
            value={formattedText}
            readOnly
            className="flex-row-item2"
            placeholder="Output text will appear here..."
          />
        </div>
      </div>

      <div className="word-count-container">
        <p className="word-count">Approximate word count: <span>{wordCount}</span></p>
      </div>

      <div className="flex-row">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={brackets}
            onChange={() => setBrackets(!brackets)}
            id="checkbox-color"
            className="checkbox-input"
          />
          Don't remove brackets
        </label>
      </div>

      <div className="middleutils">
        <button id="remove-button" className="primary" type="button" onClick={format}>Remove Empty Lines</button>
        {copied && <Copied />}
      </div>
    </div>
  );
};
