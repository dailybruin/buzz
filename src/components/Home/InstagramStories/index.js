import React, { useState, useEffect } from 'react';
import { CreateTable } from '../../Shared/Table';
import config from "../../../config";
import { getStories, deleteStory } from '../../../services/api';
import { StoryForm } from './Form';

export class InstagramStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      properties: config.stories.properties,
      showModal: false,
      modalItem: null,
    }
  };

  componentDidMount() {
    getStories(this.props.date).then(data => this.setState({ data, loading: false }));
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
        {CreateTable(this.state.data, this.state.properties, deleteStory, this.receiveItem)}
        <StoryForm date={this.props.date} properties={this.state.properties} />
      </>
    );
  }
}

