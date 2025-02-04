// import React from "react";
// import "./style.css";
// import { Copied } from "../Shared/Copied";

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

  const format = (e) => {
    e.persist();
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
    setCopied(true);

    focus();
    document.execCommand("copy");
    e.target.focus();
  };

  return (
    <div className="row">
      <div className="flex-row">
        <button 
          className="toggleButton" 
          onClick={() => setBrackets(!brackets)}
        >
          {brackets ? "Remove brackets" : "Don't remove brackets"}
        </button>
      </div>
      <div className="flex-row">
        <textarea
          value={text}
          onChange={handleChange}
          className="flex-row-item"
          placeholder="Place text here"
        />
        <div className="linebreak-middleutils flex-row-item">
          <button className="primary" onClick={format}>
            Remove empty lines
          </button>
          <p>
            Approximate word count: <span>{wordCount}</span>
          </p>
          {copied && <Copied />}
        </div>
        <textarea
          ref={textInput}
          value={formattedText}
          readOnly
          className="flex-row-item"
          placeholder="Updated text will appear here"
        />
      </div>
    </div>
  );
};
