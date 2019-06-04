import React from 'react';
import { getModulars, deleteModular, patchModular } from '../../../services/api';
import { CreateTable } from '../../Shared/Table';
import { BuzzModal } from '../../Shared/Modal';
import { ModularForm } from './Form';
import config from '../../../config';

export class Modular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
    this.receiveItem = this.receiveItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    getModulars(this.props.category, this.props.date).then(data => {
      this.setState({
        data: data ? data : [],
        loading: false
      })
    })
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  receiveItem(item) {
    let modalItem = config.modulars[this.props.category].reduce((acc, curr) => ({ ...acc, [curr]: item[curr] }), {});
    this.setState({
      showModal: true,
      submitFunc: patchModular(item["_id"]),
      modalItem
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <>
        {this.state.showModal
          ? <BuzzModal
            submitFunc={this.state.submitFunc}
            closeModal={this.closeModal}
            isOpen={this.state.showModal}
            item={this.state.modalItem}
          />
          : null}
        {CreateTable(this.state.data, this.props.fields, deleteModular, this.receiveItem)}
        <ModularForm date={this.props.date} category={this.props.category} fields={this.props.fields} />
      </>
    );
  }
}