import React from "react";
import "./style.css";

export class Linebreak extends React.Component {
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
        <div className="linebreak-row">
        <button onClick={() => this.setState({ brackets: !this.state.brackets})}>{this.state.brackets ? "Remove brackets" : "Don't remove brackets"}</button>
        </div>
        <div className="linebreak-row">
          <textarea value={this.state.text} onChange={this.handleChange} className="linebreak-row-item" placeholder="Place text here" />
          <div className="linebreak-middleutils linebreak-row-item">
            <button className="linebreakButton" onClick={(e) => this.format(e)}>Remove empty lines</button>
            <p>
              Approximate word count: <span>{this.state.wordCount}</span>
            </p>
            {
              this.state.copied && (
                <p>Text copied to clipboard! Paste away!</p>
              )
            }
          </div>
          <textarea ref={this.textInput} value={this.state.formattedText} readOnly className="linebreak-row-item" placeholder="Updated text will appear here" />
        </div>
      </div>
    );
  }
}