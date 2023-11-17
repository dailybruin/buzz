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
        <h2>Instagram Stories</h2>
        <InstagramStories date={this.state.dateString}  />
        <h2>Audits</h2>
        <a target="_blank" rel="noopener noreferrer" href={config.auditSheet}>Click here (new tab)</a>
        <h2>Opinion Modulars</h2>
        <Modulars date={this.state.dateString}  />
      </>
    )
  }
}

export default withRouter(Home);