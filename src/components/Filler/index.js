import React, { useState, useRef, useEffect, useMemo } from "react";
import { LoremIpsum } from "lorem-ipsum";
import "./style.css";
import Copied from "../Shared/Copied";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export const Filler = () => {
  const [paragraphCount, setParagraphCount] = useState(3);
  const [wordCount, setWordCount] = useState(500);
  const [copied, setCopied] = useState(false); // flag for Copied component animation
  const [shouldCopy, setShouldCopy] = useState(false); // flag for the copy button
  const textareaRef = useRef(null);

  // function generateText() {
  //   const wordsPerSentence = wordCount / paragraphCount / 4;

  //   const lorem = new LoremIpsum({
  //     sentencesPerParagraph: {
  //       min: 4,
  //       max: 4
  //     },
  //     wordsPerSentence: {
  //       min: Math.floor(wordsPerSentence),
  //       max: Math.ceil(wordsPerSentence)
  //     },
  //   });

  //   let text = lorem.generateParagraphs(paragraphCount);
  //   let wordsOfText = text.split(/\s+/); // regex matching spaces (and any repeated)
  //   let numWords = wordsOfText.length;

  //   if (numWords < wordCount) {
  //     const tail = lorem.generateWords(wordCount - numWords);
  //     return text + " " + tail;
  //   } 
  //   else if (numWords > wordCount) {    
  //     const shortenedArray = wordsOfText.slice(0, wordCount);
  //     return shortenedArray.join(" ");
  //   } 
  //   else {
  //     return text;
  //   }
  // }
  function generateText() {
    const totalWords = wordCount;
    const numParagraphs = paragraphCount;
    
    // Create a list of words for the total word count
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        min: 4,
        max: 4
      },
      wordsPerSentence: {
        min: 6,
        max: 12
      },
    });
  
    // Generate the full text for all paragraphs
    let fullText = lorem.generateParagraphs(numParagraphs);
  
    // Ensure that the total number of words is as close to `wordCount` as possible
    let wordsOfText = fullText.split(/\s+/);
    let numWords = wordsOfText.length;
  
    if (numWords < totalWords) {
      // If the total number of words is too few, add extra words
      const tail = lorem.generateWords(totalWords - numWords);
      wordsOfText = wordsOfText.concat(tail.split(/\s+/));
    } else if (numWords > totalWords) {
      // If the total number of words is too many, trim the extra words
      wordsOfText = wordsOfText.slice(0, totalWords);
    }
  
    // Split the words into paragraphs again, ensuring the total number of paragraphs is respected
    const wordsPerParagraph = Math.floor(wordsOfText.length / numParagraphs);
    const paragraphs = [];
  
    for (let i = 0; i < numParagraphs; i++) {
      const start = i * wordsPerParagraph;
      const end = start + wordsPerParagraph;
      const paragraph = wordsOfText.slice(start, end).join(" ");
      paragraphs.push(paragraph);
    }
  
    // Handle any remaining words if they don't fit exactly into paragraphs
    if (wordsOfText.length % numParagraphs !== 0) {
      paragraphs[numParagraphs - 1] += " " + wordsOfText.slice(numParagraphs * wordsPerParagraph).join(" ");
    }
  
    return paragraphs.join("\n"); // Join paragraphs with double newlines for separation
  }
  

  const handleWCPCInput = (value, type, max) => {
    const isWCInput = type === "WC";
    const isPCInput = type === "PC";
    let targetVal = isWCInput ? wordCount : paragraphCount;
    const potentialVal = parseInt(value);
  
    if (value === "") {
      targetVal = 0;
    } else if (isNaN(potentialVal)) {
      return;
    } else {
      targetVal = potentialVal;
    }
  
    if (targetVal < 0) targetVal = 0;
    else if (targetVal > max) targetVal = max;
  
    if (isWCInput) setWordCount(targetVal);
    else if (isPCInput) setParagraphCount(targetVal);
  };

  function incOrDecWCPC(action, type) {
    const isIncrease = action === "increase";
    const isDecrease = action === "decrease";

    if (!isIncrease && !isDecrease) return;

    const updateValue = (curr, delta, min) => {
      const newValue = curr + delta;
      return newValue >= min ? newValue : min;
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
              onChange={(e) => handleWCPCInput(e.target.value, "WC", 100000)}
              value={String(wordCount)}
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
              onChange={(e) => handleWCPCInput(e.target.value, "PC", 10000)}
              value={String(paragraphCount)}
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