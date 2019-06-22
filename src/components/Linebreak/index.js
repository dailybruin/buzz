import React from "react";
import "./style.css";
import { Copied } from "../Shared/Copied";

export class Linebreak extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      brackets: false,
      text: "",
      formattedText: "",
      wordCount: null,
      copied: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.format = this.format.bind(this);
    this.focus = this.focus.bind(this);
    this.textInput = React.createRef();
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  focus() {
    this.textInput.current.select();
  }

  format(e) {
    e.persist();
    let to = this.state.text.replace(/\n\n\n/g, "\n");
    
    to = to.replace(/\n\n/g, "\n");
    if (this.state.brackets == false) {
      to = to.replace(/\[.*?\]/g, "");
    }
    to = to.replace(/\n\n\n/g, "\n");
    to = to.replace(/\n\n/g, "\n");

    let wordCount = to.trim().split(/\s+/).length

    this.setState({
      formattedText: to,
      wordCount,
      copied: true
    }, () => {
      this.focus();
      document.execCommand("copy");
      e.target.focus();
    });
  }

  render() {
    return (
      <div className="row">
        <div className="flex-row">
        <button className="toggleButton" onClick={() => this.setState({ brackets: !this.state.brackets})}>{this.state.brackets ? "Remove brackets" : "Don't remove brackets"}</button>
        </div>
        <div className="flex-row">
          <textarea value={this.state.text} onChange={this.handleChange} className="flex-row-item" placeholder="Place text here" />
          <div className="linebreak-middleutils flex-row-item">
            <button className="primary" onClick={(e) => this.format(e)}>Remove empty lines</button>
            <p>
              Approximate word count: <span>{this.state.wordCount}</span>
            </p>
            {
              this.state.copied && <Copied />
            }
          </div>
          <textarea ref={this.textInput} value={this.state.formattedText} readOnly className="flex-row-item" placeholder="Updated text will appear here" />
        </div>
      </div>
    );
  }
}