import React from 'react';
import { withRouter, Link } from "react-router-dom";
import "./style.css";
import { DesignNotes } from './DesignNotes';
import { Modulars } from './Modulars';
import { InstagramStories } from './InstagramStories';
import { Schedule } from './Schedules';
import config from '../../config';

const dateMatcher = /(\d{4})\-(\d{1,2})\-(\d{1,2})/;

const formatDate = dateObject => ((dateObject.getDate() === new Date().getDate() ? "Today, " : dateObject.getDate() === new Date().getDate() + 1 ? "Tomorrow, " : "") + new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(dateObject)
)

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      date: null,
      dateString: null
    };
    this.parseParams = this.parseParams.bind(this);
    this.navigateDate = this.navigateDate.bind(this);
  }

  parseParams() {
    if (window) {
      const urlParams = new URLSearchParams(window.location.search);
      const dateString = urlParams.get('date');
      const YMDArr = dateMatcher.exec(dateString);
      if (YMDArr) {
        YMDArr.shift();
        const now = new Date();
        return new Date(YMDArr[0], YMDArr[1] - 1, YMDArr[2], now.getHours(), now.getMinutes(), now.getSeconds())
      }
      return null;
    }
    return null;
  }

  componentDidMount() {
    const paramDate = this.parseParams();
    const date = paramDate ? paramDate : new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    this.setState({ date, dateString, loading: false });
  }

  navigateDate(amount) {
    const next = new Date(this.state.date);
    next.setDate(next.getDate() + amount);
    const year = next.getFullYear();
    const month = next.getMonth() + 1;
    const day = next.getDate();
    if (window) {
      window.location = `/?date=${year}-${month}-${day}`;
    }
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <>
        <h1 className="notbold">Production for: <span className="semibold pointer" onClick={() => this.navigateDate(-1)}>&#8592;</span><span className="semibold">{formatDate(this.state.date)}</span><span className="semibold pointer" onClick={() => this.navigateDate(1)}>&#8594;</span></h1>
        <Schedule section="design" />
        <h2>Design Notes</h2>
        <DesignNotes date={this.state.dateString} />
        <h2 className='home-title'>Instagram Stories</h2>
        <InstagramStories date={this.state.dateString}  />
        <h2 className='home-title'>Audits</h2>
        <div className='audit-link'>
          <a target="_blank" rel="noopener noreferrer" href={config.auditSheet}>
            <svg width="64px" height="64px" viewBox="0 0 20 20" version="1.1" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>icon/20/icon-open-in-new</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Output-svg" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="out" transform="translate(-838.000000, -29.000000)" fill="#000000"> <path d="M855,46 L841,46 L841,32 L848,32 L848,30 L841,30 C839.89,30 839,30.9 839,32 L839,46 C839,47.1 839.89,48 841,48 L855,48 C856.1,48 857,47.1 857,46 L857,39 L855,39 L855,46 L855,46 Z M850,30 L850,32 L853.59,32 L843.76,41.83 L845.17,43.24 L855,33.41 L855,37 L857,37 L857,30 L850,30 L850,30 Z" id="path"> </path> </g> </g> </g></svg>
            Open in New Tab
          </a>
        </div>
        <h2 className='home-title'>Opinion Modulars</h2>
        <Modulars date={this.state.dateString}  />
      </>
    )
  }
}

export default withRouter(Home);