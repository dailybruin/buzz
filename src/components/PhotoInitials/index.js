import React from 'react';
import { CreateTable } from '../Shared/Table';
import { getMultimedia } from '../../services/api';

export class PhotoInitials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
    this.transformData = this.transformData.bind(this);
  }

  componentDidMount() {
    getMultimedia().then(res => {
      const data = this.transformData(res);
      this.setState({
        data,
        loading: false
      })
    })
  }

  transformData(data) {
    return data.map(x => ({
      _id: x._id,
      name: `${x.firstName} ${x.lastName}`,
      initials: x.initials || "",
      position: x.position || "",
    }))
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <>
        <h1>Photo Initials</h1>
        {CreateTable(this.state.data, ["initials", "name", "position"])}
      </>
    );
  }
}