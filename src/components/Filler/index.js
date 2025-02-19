import React, { useState, useRef, useEffect, useMemo } from "react";
import { LoremIpsum } from "lorem-ipsum";
import "./style.css";
import { Copied } from "../Shared/Copied";

export const Filler = () => {
  const [paragraphCount, setParagraphCount] = useState("3");
  const [wordCount, setWordCount] = useState("500");
  const [copied, setCopied] = useState(false);
  const [shouldCopy, setShouldCopy] = useState(false); // Flag to trigger copying
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
    setCopied(false);
  };

  const handleParagraphCountChange = (e) => {
    setParagraphCount(e.target.value);
    setCopied(false);
  };

  useEffect(() => {
    if (shouldCopy && textareaRef.current) {
      navigator.clipboard.writeText(textareaRef.current.value)
        .then(() => setCopied(true))
        .catch(() => console.error("Failed to copy text"));

      setCopied(!copied);
      setShouldCopy(false); // Reset flag after copying
    }
  }, [shouldCopy]); // Runs only when shouldCopy changes to true

  const text = useMemo(generateText, [wordCount, paragraphCount]);

  return (
    <div className="flex-row">
      <div className="flex-item">
        <div>
          <label htmlFor="wordcount">Word count:</label>
          <input 
            onChange={handleWordCountChange}
            value={wordCount}
            step="100"
            type="number"
            name="wordcount"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="paragraphs">Paragraphs:</label>
          <input 
            onChange={handleParagraphCountChange}
            value={paragraphCount}
            type="number"
            name="paragraphs"
            min="1"
          />
        </div>
        <button onClick={() => setShouldCopy(true)}>Copy</button>
        {copied && <Copied/>}
      </div>
      <div className="flex-item">
        <textarea 
          ref={textareaRef} 
          style={textareaRef.current ? {height: textareaRef.current.scrollHeight + "px"} : {}} 
          readOnly 
          value={text} 
        />
      </div>
    </div>
  );
};