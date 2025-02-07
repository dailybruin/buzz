import React, { useState, useEffect } from 'react';
import { CreateTable } from '../../Shared/Table';
import config from "../../../config";
import { getStories, deleteStory } from '../../../services/api';
import StoryForm from './Form';

const InstagramStories = ({ date }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const properties = config.stories.properties;

  useEffect(() => {
    getStories(date).then(fetchedData => {
      setData(fetchedData);
      setLoading(false);
    });
  }, [date]);

  const closeModal = () => setShowModal(false);

  const receiveItem = (item) => {
    let modalItemData = config.designNotes.properties.reduce((acc, curr) => ({ ...acc, [curr]: item[curr] }), {});
    setModalItem(modalItemData);
    setShowModal(true);
  };

  const getTotalPages = () => Math.max(1, Math.ceil(data.length / rowsPerPage));

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= getTotalPages()) {
      setCurrentPage(newPage);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  if (loading) {
    return null;
  }

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = getTotalPages();

  return (
    <>
      {CreateTable(currentItems, properties, deleteStory, receiveItem)}

      <div className="pagination-container">
        <div className="pagination-info">
          {`${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, data.length)} of ${data.length}`}
        </div>

        <div className="rows-per-page-dropdown">
          <label>Rows per page: </label>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            {[5, 10, 20].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div className="pagination-arrows">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            &lt;
          </button>
          
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
            &gt;
          </button>
        </div>
      </div>
      <StoryForm date={date} properties={properties} />
    </>
  );
};

export default InstagramStories;
