import React from "react";
import { LoremIpsum } from "lorem-ipsum";
import "./style.css";
import { Copied } from "../Shared/Copied";

export class Filler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      paragraphCount: 3,
      wordCount: 500,
      text: "",
      error: "",
      copied: false
    };
    this.textareaRef = React.createRef();
    this.updateCount =  this.updateCount.bind(this);
    this.updateValues = this.updateValues.bind(this);
    this.copyText = this.copyText.bind(this);
  }

  generateText(wordCount, paragraphCount) {
    const wordsPerSentence = wordCount / paragraphCount / 4;
    let lorem;

    // check if wordCount is close to paragraphCount
    if (wordsPerSentence >= 2) {
      lorem = new LoremIpsum({
        sentencesPerParagraph: {
          min: 4,
          max: 4
        },
        wordsPerSentence: {
          min: Math.floor(wordsPerSentence),
          max: Math.ceil(wordsPerSentence)
        },
      });
    } else {
      // if wordCount is close to paragraphCount, display fewer sentences per paragraph
      lorem = new LoremIpsum({
        sentencesPerParagraph: {
          min: 1,
          max: 2
        },
        wordsPerSentence: {
          min: 1,
          max: Math.ceil(wordCount / paragraphCount / 2)
        },
      });
    }
    let text = lorem.generateParagraphs(paragraphCount);
    let words = text.split(/[\s\n]+/);  // split based on both whitespace and newlines
    let paragraphs = text.split('\n');

    // more words should be added
    if (words.length < wordCount) {
      const newWords = lorem.generateWords(wordCount - words.length).split(' ');
      let add = wordCount - words.length;
      // find the paragraph to start removing from
      let i = paragraphs.length - 1;
      while (add > 0) {
        // slice(0, -1) necessary to remove the full stop at the end
        paragraphs[i] = paragraphs[i].slice(0, -1) + " " + newWords.pop() + ".";
        add -= 1;

        // loop to an earlier paragraph for next rounds of addition
        i -= 1;
        if (i < 0) {
          i = paragraphs.length - 1;
        }
      }
      text = paragraphs.join('\n');
    } else if (words.length > wordCount) {
      // words should be removed

      // first, calculate number of words to be removed
      let remove = words.length - wordCount;
      // find the paragraph to start removing from
      let i = paragraphs.length - 1;

      while (remove > 0) {
        let splitParagraph = paragraphs[i].split(' ')
        // make sure removing words from current paragraph will not remove the entire paragraph
        if (splitParagraph.length > 1) {
          if (splitParagraph.length <= remove) {
            // always leave at least 1 word per paragraph, to not remove the entire paragraph
            paragraphs[i] = splitParagraph.slice(0, -splitParagraph.length + 1).join(' ');
            remove -= splitParagraph.length - 1;
          } else {
            // paragraph contains enough words to complete removal of all words necessary
            paragraphs[i] = splitParagraph.slice(0, -remove).join(' ');
            remove = 0;
          }
        }
        
        // make sure last word ends with a full stop
        if (paragraphs[i].slice(-1) !== '.') {
          paragraphs[i] += '.';
        }

        // loop to an earlier paragraph for next rounds of removal
        i -= 1;
        if (i < 0) {
          i = paragraphs.length - 1;
        }
      }
      text = paragraphs.join('\n');
    }

    return text;
  }

  updateCount(count, type) {
    // check string contains only digits
    const isNumber = /^\d+$/.test(count);
    if (isNumber || count.length === 0) {
      // type determines whether to change wordCount or paragraphCount
      if (type === "word") {
        this.setState({wordCount: Number(count)});
      } else {
        this.setState({paragraphCount: Number(count)});
      }
    }
  }

  updateValues() {
    this.setState({copied: false});
    // verify wordCount and paragraphCount are valid
    if (this.state.wordCount < this.state.paragraphCount) {
      this.setState({error: "Invalid word count. Please input a word count greater than paragraph count."});
      return;
    } else if (this.state.wordCount > 5000 || this.state.wordCount < 1) {
      this.setState({error: "Invalid word count. Please input a word count between 1 and 5000."});
      return;
    } else if (this.state.paragraphCount > 100 || this.state.paragraphCount < 1) {
      this.setState({error: "Invalid paragraph count. Please input a paragraph count between 1 and 100."});
      return;
    }

    // clear error message if exists
    if (this.state.error) this.setState({error: ""});

    // generate text and store in state
    const text = this.generateText(this.state.wordCount, this.state.paragraphCount);
    this.setState({text: text});
  }

  copyText() {
    if (this.state.text) {
      navigator.clipboard.writeText(this.state.text);
      this.setState({copied: true});
    }
  }

  render() {
    return (
      <div className="flex-row">
        <div className="flex-item">
          <div>
            <label htmlFor="wordCount">Words: </label>
            <input onChange={e => this.updateCount(e.target.value, "word")} value={this.state.wordCount} name="wordCount" />
          </div>
          <div>
            <label htmlFor="paragraphCount">Paragraphs: </label>
            <input onChange={e => this.updateCount(e.target.value, "paragraph")} value={this.state.paragraphCount} name="paragraphCount" />
          </div>
          <div>
            <button onClick={e => this.updateValues()}>Generate</button>
          </div>
          <div>
            <p className="error">{this.state.error}</p>
          </div>
        </div>
        <div className="flex-item">
          <textarea ref={this.textareaRef} readOnly value={this.state.text} />
          <button onClick={e => this.copyText()}>Copy</button>
          <p>{this.state.copied ? "Copied to clipboard!" : ""}</p>
        </div>
      </div>
    );
  }
}