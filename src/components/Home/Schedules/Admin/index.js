import React from 'react';
import Modal from 'react-modal';
import { patchSchedule } from '../../../../services/api';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { Form } from './New/index';


export class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      showModal: false
    };
    this.updateValue = this.updateValue.bind(this);
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