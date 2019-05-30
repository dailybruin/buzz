import React from 'react';
import Modal from 'react-modal';
import { getSchedule, patchSchedule } from '../../../../services/api';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { Form } from './New/index';
import { scheduleToSpreadsheet } from '../../../Shared/utils';

const data = [
  [
    { readOnly: true, value: '' },
    { value: 0, readOnly: true },
    { value: 1, readOnly: true },
    { value: 2, readOnly: true },
    { value: 3, readOnly: true },
    { value: 4, readOnly: true }
  ],
  [{ readOnly: true, value: "AE (2:30 - 5 PM)" }, { value: "Brian" }, { value: "Nicole" }, { value: "April" }, { value: "Benny" }, { value: "Lizzy" }],
  [{ readOnly: true, value: "Opinion (2:45 - 4:30 PM)" }, { value: "Mary" }, { value: "Sam" }, { value: "Lisa" }, { value: "Maggie" }, { value: "Aileen" }],
  [{ readOnly: true, value: "News (2:30 - 5 PM)" }, { value: "Elton" }, { value: "Sophie" }, { value: "Claire" }, { value: "Jonathan" }],
  [{ readOnly: true, value: "Sports (2:30 - 5 PM)" }, { value: "Eden" }, { value: "Angela S" }, { value: "Lauren" }, { value: "Isabelle" }, { value: "Khang" }]
]

export class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      showModal: false
    };
    this.updateValue = this.updateValue.bind(this);
  };

  componentDidMount() {
    getSchedule(this.props.section).then(data => {
      const spreadsheet = scheduleToSpreadsheet(data);
      this.setState({ data: spreadsheet, loading: false })
    })
  };

  updateValue(id, value) {
    patchSchedule({ 
      section: this.props.section, 
      id,
      newValue: value
    }).then(() => {
      if (window) {
        window.location.reload();
      }
    })
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <>
        <button onClick={() => this.setState({ showModal: true })}>New Schedule</button>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
          contentLabel="Example Modal"
        >
          <button onClick={() => this.setState({ showModal: false })}>close</button>
          <Form section={this.props.section} />
        </Modal>
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
            this.setState({ data: grid }, () => this.updateValue(changes[0].cell.key, changes[0].value ))
          }}
        />
      </>
    );
  }
}