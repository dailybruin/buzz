import React from 'react';
import { getModulars } from '../../../services/api';
import { CreateTable } from '../../Shared/Table';
import { ModularForm } from './Form';

export class Modular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    }
  }

  componentDidMount() {
    getModulars(this.props.category, this.props.date).then(data => {
      this.setState({
        data: data ? data : [],
        loading: false
      })
    })
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <>
        {CreateTable(this.state.data, this.props.fields)}
        <ModularForm date={this.props.date} category={this.props.category} fields={this.props.fields} />
      </>
    );
  }
}