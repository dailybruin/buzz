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
  const [shouldCopy, setShouldCopy] = useState(false); // flag for the copy button
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
    let wordsOfText = text.split(/\s+/); // regex matching spaces (and any repeated)
    let numWords = wordsOfText.length;

    if (numWords < parsedWordCount) {
      const tail = lorem.generateWords(parsedWordCount - numWords);
      return text + " " + tail;
    } 
    else if (numWords > parsedWordCount) {    
      console.log(`numWords > parsedWordCount\nnumwords:${numWords}`);
      const shortenedArray = wordsOfText.slice(0, parsedWordCount);
      return shortenedArray.join(" ");
    } 
    else {
      return text;
    }
  }

  function incOrDecWCPC(action, type) {
    const isIncrease = action === "increase";
    const isDecrease = action === "decrease";

    if (!isIncrease && !isDecrease)
      return;

    const updateValue = (curr, delta, min) => {
      const newValue = parseInt(curr) + delta;
      return newValue >= min ? String(newValue) : String(min);
    }

    const updateAction = {
      WC: () => setWordCount(updateValue(wordCount, (isIncrease ? 50 : -50), 0)),
      PC: () => setParagraphCount(updateValue(paragraphCount, (isIncrease ? 1 : -1), 0))
    };

    if (updateAction[type])
      updateAction[type]();
  }

  useEffect(() => {
    if (shouldCopy && textareaRef.current) {
      navigator.clipboard.writeText(textareaRef.current.value)
        .then(() => {
          // kind of busted, but this is so that the Copied animation shows up
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
              onChange={(e) => setWordCount(e.target.value)}
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
              onChange={(e) => setParagraphCount(e.target.value)}
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