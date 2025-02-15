// import React from "react";
// import "./style.css";
import { Copied } from "../Shared/Copied";

// export class Linebreak extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       brackets: false,
//       text: "",
//       formattedText: "",
//       wordCount: null,
//       copied: false
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.format = this.format.bind(this);
//     this.focus = this.focus.bind(this);
//     this.textInput = React.createRef();
//   }

//   handleChange(event) {
//     this.setState({ text: event.target.value });
//   }

//   focus() {
//     this.textInput.current.select();
//   }

//   format(e) {
//     e.persist();
//     let to = this.state.text.replace(/\n\n\n/g, "\n");
    
//     to = to.replace(/\n\n/g, "\n");
//     if (this.state.brackets == false) {
//       to = to.replace(/\[.*?\]/g, "");
//     }
//     to = to.replace(/\n\n\n/g, "\n");
//     to = to.replace(/\n\n/g, "\n");

//     let wordCount = to.trim().split(/\s+/).length

//     this.setState({
//       formattedText: to,
//       wordCount,
//       copied: true
//     }, () => {
//       this.focus();
//       document.execCommand("copy");
//       e.target.focus();
//     });
//   }

//   render() {
//     return (
//       <div className="row">
//         <div className="flex-row">
//         <button className="toggleButton" onClick={() => this.setState({ brackets: !this.state.brackets})}>{this.state.brackets ? "Remove brackets" : "Don't remove brackets"}</button>
//         </div>
//         <div className="flex-row">
//           <textarea value={this.state.text} onChange={this.handleChange} className="flex-row-item" placeholder="Place text here" />
//           <div className="linebreak-middleutils flex-row-item">
//             <button className="primary" onClick={(e) => this.format(e)}>Remove empty lines</button>
//             <p>
//               Approximate word count: <span>{this.state.wordCount}</span>
//             </p>
//             {
//               this.state.copied && <Copied />
//             }
//           </div>
//           <textarea ref={this.textInput} value={this.state.formattedText} readOnly className="flex-row-item" placeholder="Updated text will appear here" />
//         </div>
//       </div>
//     );
//   }
// }

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
