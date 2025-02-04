// import React from 'react';
// import { getModulars, deleteModular, patchModular } from '../../../services/api';
// import { CreateTable } from '../../Shared/Table';
// import { BuzzModal } from '../../Shared/Modal';
// import { ModularForm } from './Form';
// import config from '../../../config';

// export class Modular extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       loading: true
//     };
//     this.receiveItem = this.receiveItem.bind(this);
//     this.closeModal = this.closeModal.bind(this);
//   }

//   componentDidMount() {
//     getModulars(this.props.category, this.props.date).then(data => {
//       this.setState({
//         data: data ? data : [],
//         loading: false
//       })
//     })
//   }

//   closeModal() {
//     this.setState({ showModal: false });
//   }

//   receiveItem(item) {
//     let modalItem = config.modulars[this.props.category].reduce((acc, curr) => ({ ...acc, [curr]: item[curr] }), {});
//     this.setState({
//       showModal: true,
//       submitFunc: patchModular(item["_id"]),
//       modalItem
//     });
//   }

//   render() {
//     if (this.state.loading) {
//       return null;
//     }
//     return (
//       <>
//         {this.state.showModal
//           ? <BuzzModal
//             submitFunc={this.state.submitFunc}
//             closeModal={this.closeModal}
//             isOpen={this.state.showModal}
//             item={this.state.modalItem}
//           />
//           : null}
//         <div style={{maxWidth:"100%"}}>
//           {CreateTable(this.state.data, this.props.fields, deleteModular, this.receiveItem)}
//         </div>
//         <ModularForm date={this.props.date} category={this.props.category} fields={this.props.fields} />
//       </>
//     );
//   }
// }
import React, { useState, useEffect } from 'react';
import { getModulars, deleteModular, patchModular } from '../../../services/api';
import { CreateTable } from '../../Shared/Table';
import { BuzzModal } from '../../Shared/Modal';
import ModularForm from './Form';
import config from '../../../config';

const Modular = ({ category, date, fields }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [submitFunc, setSubmitFunc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getModulars(category, date).then((fetchedData) => {
      setData(Array.isArray(fetchedData) ? fetchedData : []);
      setLoading(false);
    });
  }, [category, date]);

  const closeModal = () => {
    setShowModal(false);
  };

  const receiveItem = (item) => {
    const modalItem = config.modulars[category].reduce((acc, curr) => ({ ...acc, [curr]: item[curr] }), {});
    setModalItem(modalItem);
    setSubmitFunc(() => patchModular(item['_id'])); // Set the submit function for modal
    setShowModal(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= getTotalPages()) {
      setCurrentPage(newPage);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page
  };

  const getTotalPages = () => {
    return Math.max(1, Math.ceil(data.length / rowsPerPage));
  };

  if (loading) {
    return null;
  }

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = Array.isArray(data) ? data.slice(indexOfFirstItem, indexOfLastItem) : [];

  return (
    <>
      {showModal && (
        <BuzzModal submitFunc={submitFunc} closeModal={closeModal} isOpen={showModal} item={modalItem} />
      )}
      <div style={{ maxWidth: '100%' }}>
        {CreateTable(currentItems, fields, deleteModular, receiveItem)}

        <div className="pagination-container">
          <div className="pagination-info">
            {`${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, data.length)} of ${data.length}`}
          </div>
          <div className="rows-per-page-dropdown">
            <label>Rows per page: </label>
            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="pagination-arrows">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              &lt;
            </button>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === getTotalPages()}>
              &gt;
            </button>
          </div>
        </div>
      </div>
      <ModularForm date={date} category={category} fields={fields} />
    </>
  );
};

export default Modular;
