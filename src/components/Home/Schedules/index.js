import React from 'react';
import AnimateHeight from "react-animate-height";
import { isAdmin } from '../../../services/api';
import { Admin } from "./Admin";
import { NotAdmin } from './NotAdmin';

import "./style.css";

class ScheduleWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      loading: true
    }
  };

  componentDidMount() {
    isAdmin().then(answer => this.setState({ isAdmin: answer, loading: false })).catch(err => this.setState({ isAdmin: false, loading: false }))
  };

  render() {
    if (this.state.loading) {
      return null;
    }
    return this.state.isAdmin ? <Admin section={this.props.section} /> : <NotAdmin section={this.props.section} />;
  }
}

export class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  };

  render() {
    return (
      <>
        <div onClick={() => this.setState({ open: !this.state.open })}>
          <p><u>{this.state.open ? "Close" : "View Full Design Schedule"}</u></p>
        </div>
        <AnimateHeight height={this.state.open ? "auto" : 0}>
          <div style={{
            width: "100%"
          }}>
            <ScheduleWrapper section={this.props.section} />
          </div>
        </AnimateHeight>
      </>
    );
  }
}