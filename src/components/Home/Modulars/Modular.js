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

  useEffect(() => {
    getModulars(category, date).then((fetchedData) => {
      setData(fetchedData || []);
      setLoading(false);
    });
  }, [category, date]);

  const closeModal = () => {
    setShowModal(false);
  };

  const receiveItem = (item) => {
    const modalItem = config.modulars[category].reduce((acc, curr) => ({ ...acc, [curr]: item[curr] }), {});
    setModalItem(modalItem);
    setSubmitFunc(() => patchModular(item["_id"])); // Set the submit function for modal
    setShowModal(true);
  };

  if (loading) {
    return null;
  }

  return (
    <>
      {showModal && (
        <BuzzModal
          submitFunc={submitFunc}
          closeModal={closeModal}
          isOpen={showModal}
          item={modalItem}
        />
      )}
      <div style={{ maxWidth: "100%" }}>
        {CreateTable(data, fields, deleteModular, receiveItem)}
      </div>
      <ModularForm date={date} category={category} fields={fields} />
    </>
  );
};

export default Modular;
