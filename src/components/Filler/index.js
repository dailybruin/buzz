import React, { useState, useRef, useEffect, useMemo } from "react";
import { LoremIpsum } from "lorem-ipsum";
import "./style.css";
import { Copied } from "../Shared/Copied";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export const Filler = () => {
  const [paragraphCount, setParagraphCount] = useState("3");
  const [wordCount, setWordCount] = useState("500");
  const [copied, setCopied] = useState(false); // flag for Copied component animation
  const [shouldCopy, setShouldCopy] = useState(false); // flag for 
  const textareaRef = useRef(null);

  function generateText() {
    const parsedWordCount = !isNaN(parseInt(paragraphCount)) && parseInt(wordCount) > 0 ? parseInt(wordCount) : 0;
    const parsedParagraphCount = !isNaN(parseInt(paragraphCount)) && parseInt(paragraphCount) > 0 ? parseInt(paragraphCount) : 1;
    const wordsPerSentence = parsedWordCount / parsedParagraphCount / 4;

    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        min: 4,
        max: 4
      },
      wordsPerSentence: {
        min: Math.floor(wordsPerSentence),
        max: Math.ceil(wordsPerSentence)
      },
    });

    let text = lorem.generateParagraphs(parsedParagraphCount);
    let numWords = text.split(" ");
    const correctedLength = numWords.length + parsedParagraphCount - 1;
    if (correctedLength < parsedWordCount) {
      const tail = lorem.generateWords(parsedWordCount - numWords.length);
      return text + " " + tail;
    } else if (correctedLength > parsedWordCount) {
      const shortenedArray = numWords.slice(0, parsedWordCount - parsedParagraphCount + 1);
      return shortenedArray.join(" ");
    } else {
      return text;
    }
  }

  const handleWordCountChange = (e) => {
    setWordCount(e.target.value);
  };

  const handleParagraphCountChange = (e) => {
    setParagraphCount(e.target.value);
  };

  const incOrDecWCPC = (action, type) => {
    if (action === "increase")
    {
      if (type === "WC")
      {
        const newValue = parseInt(wordCount) + 50;
        setWordCount(String(newValue));
      }
      else if (type === "PC")
      {
        const newValue = parseInt(paragraphCount) + 1;
        setParagraphCount(String(newValue));
      }
    }
    else if (action === "decrease")
    {
      if (type === "WC" && parseInt(wordCount) > 49)
      {
        const newValue = parseInt(wordCount) - 50;
        setWordCount(String(newValue));
      }
      else if (type === "PC" && parseInt(paragraphCount) > 0)
      {
        const newValue = parseInt(paragraphCount) - 1;
        setParagraphCount(String(newValue));
      }
    }
  }

  useEffect(() => {
    if (shouldCopy && textareaRef.current) {
      navigator.clipboard.writeText(textareaRef.current.value)
        .then(() => {
          setCopied(false);
          setTimeout(() => setCopied(true), 2);
        })
        .catch(() => console.error("Failed to copy text"));
      setShouldCopy(false);
    }
  }, [shouldCopy]);

  const text = useMemo(generateText, [wordCount, paragraphCount]);

  return (
    <div>
      <h1>Filler Text Generator</h1>
      <div className="flex-item">
        <div className="filler-count">
          <label htmlFor="wordcount">Word count</label>
          <div className="filler-number-input">
            <button onClick={() => incOrDecWCPC("decrease", "WC")} id="filler-button" className="filler-button-minus">
              <FaMinus className="filler-icon"/>
            </button>
            <input 
              onChange={handleWordCountChange}
              value={wordCount}
              step="50"
              type="number"
              name="wordcount"
              min="0"
            />
            <button onClick={() => incOrDecWCPC("increase", "WC")} id="filler-button" className="filler-button-plus">
              <FaPlus className="filler-icon"/>
            </button>
          </div>
        </div>
        <div className="filler-count">
          <label htmlFor="paragraphs">Paragraphs</label>
          <div className="filler-number-input">
            <button onClick={() => incOrDecWCPC("decrease", "PC")} id="filler-button" className="filler-button-minus">
              <FaMinus className="filler-icon"/>
            </button>
            <input 
              onChange={handleParagraphCountChange}
              value={paragraphCount}
              type="number"
              name="paragraphs"
              min="1"
            />
            <button onClick={() => incOrDecWCPC("increase", "PC")} id="filler-button" className="filler-button-plus">
                <FaPlus className="filler-icon"/>
            </button> 
          </div>
        </div>
      </div>
      <div className="filler-textbox-and-copy">
        <textarea 
          ref={textareaRef} 
          style={{ height: "55vh", width: "60vw" }} 
          readOnly 
          value={text} 
        />
        <div>
            <button id="copy" type="button" onClick={() => setShouldCopy(true)}>Copy</button>
        </div>
        {copied && <Copied/>}
      </div>
    </div>
  );
};