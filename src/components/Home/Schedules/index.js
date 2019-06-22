import React from 'react';
import AnimateHeight from "react-animate-height";
import { isAdmin, getSchedule } from '../../../services/api';
import { Admin } from "./Admin";
import { NotAdmin } from './NotAdmin';

import "./style.css";
import { onShiftFromSchedule, scheduleToSpreadsheet } from '../../Shared/utils';

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

    if (this.state.isAdmin) {
      return <Admin data={this.props.data} section={this.props.section} />
    } else {
      let data = this.props.data;
      data.forEach(x => x.forEach(y => y.readOnly = true));
      return <NotAdmin data={data} section={this.props.section} />
    }
  }
}

export class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: true,
      onShift: "",
      data: []
    }
  };

  componentDidMount() {
    getSchedule(this.props.section).then(data => {
      const spreadsheet = scheduleToSpreadsheet(data);
      const onShift = onShiftFromSchedule(data);
      this.setState({ data: spreadsheet, onShift, loading: false })
    })
  };

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <>
        <h2>{this.state.onShift}<span className="notbold"> is currently on shift.</span></h2>
        <div onClick={() => this.setState({ open: !this.state.open })}>
          <p><u>{this.state.open ? "Close" : "View Full Design Schedule"}</u></p>
        </div>
        <AnimateHeight height={this.state.open ? "auto" : 0}>
          <div style={{
            width: "100%"
          }}>
            <ScheduleWrapper data={this.state.data} section={this.props.section} />
          </div>
        </AnimateHeight>
      </>
    );
  }
}