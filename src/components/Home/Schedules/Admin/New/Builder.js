import React from "react";
import config from "../../../../../config";
import { numToDay } from '../../../../Shared/utils';

export class Builder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numDays: 5,
      starts: {},
      ends: {}
    };
    this.changeDays = this.changeDays.bind(this);
    this.changeStart = this.changeStart.bind(this);
    this.changeEnd = this.changeEnd.bind(this);
    this.buildData = this.buildData.bind(this);
  };

  changeDays(num) {
    const newData = [[{ readOnly: true, value: '' }]];
    for (let i = 0; i < num; i++) {
      newData[0].push({ value: i, readOnly: true, valueViewer: () => numToDay(i) })
    }
    this.setState({
      data: newData,
      numDays: num
    });
  }

  buildData() {
    const data = [[{ readOnly: true, value: '' }]];
    const { numDays } = this.state;
    for (let i = 0; i < numDays; i++) {
      data[0].push({ value: i, readOnly: true, valueViewer: () => numToDay(i) })
    }
    const emptyValue = { value: "" };
    config.schedule.sections.forEach((section, i) => {
      data.push([{
        readOnly: true,
        value: `${section} (${this.state.starts[section]} - ${this.state.ends[section]})`
      }])
      for (let j = 0; j < numDays; j++) {
        data[i+1].push(emptyValue)
      }
    });
    this.props.showSpreadsheet(data);
  }

  changeStart(section, value) {
    this.setState({
      starts: Object.assign(this.state.starts, { [section]: value })
    })
  }

  changeEnd(section, value) {
    this.setState({
      ends: Object.assign(this.state.ends, { [section]: value })
    });
  }

  render() {
    return (
      <>
        <div>
          <label htmlFor="numDays">How many days?</label>
          <input onChange={e => this.changeDays(e.target.value)} value={this.state.numDays} type="number" name="numDays" min="1" max="7" />
        </div>
        {config.schedule.sections.map(section => (
          <div key={section}>
            <div key={`${section}-start`}>
              <label htmlFor={`${section}-start`}>{section} start time</label>
              <input onChange={e => this.changeStart(section, e.target.value)} type="time" name={`${section}-start`} />
            </div>
            <div key={`${section}-end`}>
              <label htmlFor={`${section}-end`}>{section} end time</label>
              <input onChange={e => this.changeEnd(section, e.target.value)} type="time" name={`${section}-end`} />
            </div>
          </div>
        ))}
        <button onClick={this.buildData}>Build</button>
      </>
    )
  }
}