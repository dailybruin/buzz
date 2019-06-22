import React from 'react';
import { postSchedule } from '../../../../../services/api';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { spreadsheetToSchedule } from '../../../../Shared/utils';

export class Spreadsheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
    this.newSchedule = this.newSchedule.bind(this);
  };

  newSchedule() {
    const entries = spreadsheetToSchedule(this.state.data);
    const schedule = {
      section: this.props.section,
      entries
    };
    postSchedule(schedule).then(({ data, status }) => {
      if (status < 400) {
        if (window) {
          window.location.reload();
        }
      }
    })
  }

  render() {
    return (
      <>
        <ReactDataSheet
          data={this.state.data}
          overflow="wrap"
          valueRenderer={(cell) => cell.value}
          onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
          onCellsChanged={changes => {
            const grid = this.state.data.map(row => [...row])
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value }
            })
            this.setState({ data: grid })
          }}
        />
        <button onClick={this.newSchedule} className="primary" type="submit">
          <span className="semibold">+</span> Create
        </button>
      </>
    );
  }
}