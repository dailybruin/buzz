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
      currentPage: 1,
      rowsPerPage: 5,
    };
  
    this.handlePageChange = this.handlePageChange.bind(this); 
    this.handleRowsPerPageChange = this.handleRowsPerPageChange.bind(this);
  }

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

  handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= this.getTotalPages()) {
      this.setState({ currentPage: newPage });
    }
  }
  
  handleRowsPerPageChange(event) {
    const newRowsPerPage = parseInt(event.target.value, 10);
    this.setState({ rowsPerPage: newRowsPerPage, currentPage: 1 });
  }

getTotalPages() {
  return Math.max(1, Math.ceil(this.state.data.length / this.state.rowsPerPage));
}

  render() {
    if (this.state.loading) {
      return null;
    }

    const { data, properties, currentPage, rowsPerPage } = this.state;
  
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = this.getTotalPages();
  
  return (
    <>
      {CreateTable(currentItems, properties, deleteStory, this.receiveItem)}
  
      <div className="pagination-container">
        <div className="pagination-info">
          {`${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, data.length)} of ${data.length}`}
        </div>
  
        <div className="rows-per-page-dropdown">
          <label>Rows per page: </label>
          <select 
            value={rowsPerPage} 
            onChange={this.handleRowsPerPageChange}
          >
            {[5, 10, 20].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
  
        <div className="pagination-arrows">
          <button 
            onClick={() => this.handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          
          <button 
            onClick={() => this.handlePageChange(currentPage + 1)} 
            disabled={currentPage >= totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
        <StoryForm date={this.props.date} properties={properties} />
    </>
  );
}
}