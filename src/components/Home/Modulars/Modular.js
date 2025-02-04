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
      loading: true,
      currentPage: 1,   
      rowsPerPage: 5,    
    };
    this.receiveItem = this.receiveItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleRowsPerPageChange = this.handleRowsPerPageChange.bind(this);
  }

  componentDidMount() {
    getModulars(this.props.category, this.props.date).then(data => {
      this.setState({
        data: data ? data : [],
        loading: false
      });
    });
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

  handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= this.getTotalPages()) {
      this.setState({ currentPage: newPage });
    }
  }
  
  handleRowsPerPageChange(event) {
    const newRowsPerPage = parseInt(event.target.value, 10);
    this.setState({ rowsPerPage: newRowsPerPage, currentPage: 1 }); // Reset page
  }

  getTotalPages() {
    return Math.max(1, Math.ceil(this.state.data.length / this.state.rowsPerPage));
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    const { data, currentPage, rowsPerPage } = this.state;
    const totalPages = this.getTotalPages();

    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    
    return (
      <>
        {this.state.showModal && (
          <BuzzModal
            submitFunc={this.state.submitFunc}
            closeModal={this.closeModal}
            isOpen={this.state.showModal}
            item={this.state.modalItem}
          />
        )}
        <div style={{ maxWidth: '100%' }}>
          {CreateTable(currentItems, this.props.fields, deleteModular, this.receiveItem)}

          <div className="pagination-container">
            <div className="pagination-info">
              {`${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, data.length)} of ${data.length}`}
            </div>
            <div className="rows-per-page-dropdown">
              <label>Rows per page: </label>
              <select value={rowsPerPage} onChange={this.handleRowsPerPageChange}>
                {[5, 10, 20].map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
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
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        <ModularForm date={this.props.date} category={this.props.category} fields={this.props.fields} />
      </>
    );
  }
}