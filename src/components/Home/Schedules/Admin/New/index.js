import React from 'react';
import { Builder } from './Builder';
import { Spreadsheet } from './Spreadsheet';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      built: false,
      niceData: []
    };
    this.showSpreadsheet = this.showSpreadsheet.bind(this);
  };

  showSpreadsheet(builtData) {
    this.setState({
      niceData: builtData,
      built: true
    });
  }

  render() {
    return this.state.built ? <Spreadsheet section={this.props.section} data={this.state.niceData} /> : <Builder showSpreadsheet={this.showSpreadsheet} />;
  }
}