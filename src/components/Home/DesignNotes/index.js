import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import "react-tabs/style/react-tabs.css";
import { CreateTable } from "../../Shared/Table";
import { getDesignNotes, deleteDesignNote, patchDesignNote } from '../../../services/api';
import { DesignNotesForm } from './Form';
import config from "../../../config";
import { BuzzModal } from '../../Shared/Modal';

export class DesignNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      sections: config.designNotes.sections,
      properties: config.designNotes.properties,
      showModal: false,
      modalItem: null
    };
    this.receiveItem = this.receiveItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
  };

  componentDidMount() {
    getDesignNotes(this.props.date).then(data => this.setState({ data, loading: false }))
  };

  closeModal() {
    this.setState({ showModal: false });
  }

  receiveItem(item) {
    let modalItem = config.designNotes.properties.reduce((acc, curr) => ({ ...acc, [curr]: item[curr] }), {});
    this.setState({
      showModal: true,
      submitFunc: patchDesignNote(item["_id"]),
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
        <Tabs>
          <TabList>
            {this.state.sections.map(s => <Tab key={s}>{s}</Tab>)}
          </TabList>
          {this.state.sections.map(s => (
            <TabPanel key={s}>
              {CreateTable(this.state.data.filter(x => x.section === s), this.state.properties, deleteDesignNote, this.receiveItem)}
              <DesignNotesForm date={this.props.date} section={s} properties={this.state.properties} />
            </TabPanel>
            ))}
        </Tabs>
      </>
    );
  }
}