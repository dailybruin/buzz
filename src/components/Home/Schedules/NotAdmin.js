import React from 'react';

import { getSchedule } from '../../../services/api';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { scheduleToSpreadsheet } from '../../Shared/utils';

export class NotAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  };

  componentDidMount() {
    getSchedule(this.props.section).then(data => {
      const spreadsheet = scheduleToSpreadsheet(data);
      spreadsheet.forEach(x => x.forEach(y => y.readOnly = true))
      this.setState({ data: spreadsheet, loading: false })
    })
  };

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <ReactDataSheet
        data={this.state.data}
        overflow="wrap"
        valueRenderer={(cell) => cell.value}
        onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
        onCellsChanged={changes => {
          return null;
        }}
      />
    )
  }
}