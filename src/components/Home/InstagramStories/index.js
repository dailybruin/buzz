import React from 'react';
import { CreateTable } from '../../Shared/Table';
import config from "../../../config";
import { getStories } from '../../../services/api';
import { StoryForm } from './Form';

export class InstagramStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      properties: config.stories.properties
    }
  };

  componentDidMount() {
    getStories(this.props.date).then(data => this.setState({ data, loading: false }));
  };

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <>
        {CreateTable(this.state.data, this.state.properties)}
        <StoryForm date={this.props.date} properties={this.state.properties} />
      </>
    );
  }
}