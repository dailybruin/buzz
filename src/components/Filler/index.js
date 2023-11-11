import React from "react";
import { LoremIpsum } from "lorem-ipsum";
import "./style.css";
import { Copied } from "../Shared/Copied";

export class Filler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      paragraphCount: 3,
      paragraphText: "3",
      wordcount: 500,
      wordText: "500",
      copied: false
    };
    this.textareaRef = React.createRef();
    this.updateWordcount =  this.updateWordcount.bind(this);
    this.updateParagraphcount = this.updateParagraphcount.bind(this);
  }

  generateText() {
    const wordsPerSentence = this.state.wordcount / this.state.paragraphCount / 4;

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

    let text = lorem.generateParagraphs(this.state.paragraphCount);
    let numWords = text.split(" ");
    const correctedLength = numWords.length + this.state.paragraphCount - 1;
    if (correctedLength < this.state.wordcount) {
      const tail = lorem.generateWords(this.state.wordcount - numWords.length);
      return text + " " + tail;
    } else if (correctedLength > this.state.wordcount) {
      const shortenedArray = numWords.slice(0, this.state.wordcount - this.state.paragraphCount + 1);
      return shortenedArray.join(" ");
    } else {
      return text;
    }
  }

  updateWordcount(wordcount) {
    wordcount = wordcount?.toString();
    this.setState({
      wordText: wordcount && /^\d+$/.test(wordcount) && wordcount.charAt(0) !== "0" ? wordcount : "",
      wordcount: wordcount && /^\d+$/.test(wordcount) && wordcount >= 0 ? parseInt(wordcount) : 0, // check for integer values >= 0
      copied: true
    }, () => {
      this.textareaRef.current.select();
      document.execCommand("copy");
      this.textareaRef.current.focus();
    })
  }

  updateParagraphcount(paragraphCount) {
    this.setState({
      paragraphText: paragraphCount && /^\d+$/.test(paragraphCount) && paragraphCount.charAt(0) !== "0" ? paragraphCount : "",
      paragraphCount: paragraphCount && /^\d+$/.test(paragraphCount) && paragraphCount >= 1 ? parseInt(paragraphCount) : 1, // check for integer values >= 1
      copied: true
    }, () => {
      this.textareaRef.current.select();
      document.execCommand("copy");
      this.textareaRef.current.focus();
    })
  }

  render() {
    const text = this.generateText();

    return (
      <div className="flex-row">
        <div className="flex-item">
          <div>
          <label htmlFor="wordcount">Word count:</label>
          <input onChange={e => this.updateWordcount(e.target.value)} value={this.state.wordText} step="100" type="number" name="wordcount" min="0" />
            <span className="semibold pointer" onClick={() => this.updateWordcount(Math.ceil((this.state.wordcount + 99) / 100) * 100)}>&#8593;</span>
            <span className="semibold pointer" onClick={() => this.updateWordcount(Math.round((this.state.wordcount - 99) / 100) * 100)}>&#8595;</span>
          </div>
          <div>
          <label htmlFor="paragraphs">Paragraphs:</label>
            <input onChange={e => this.updateParagraphcount(e.target.value)} value={this.state.paragraphText} type="number" name="paragraphs" min="1" />
        </div>
        {this.state.copied && <Copied />}
        </div>
        <div className="flex-item"><textarea ref={this.textareaRef} style={this.textareaRef.current ? {height: this.textareaRef.current.scrollHeight + "px" } : {}} readOnly value={text} /></div>
      </div>
    );
  }
}