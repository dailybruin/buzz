import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import "react-tabs/style/react-tabs.css";
import { CreateTable } from "../../Shared/Table";
import { getDesignNotes, deleteDesignNote, patchDesignNote } from '../../../services/api';
import { DesignNotesForm } from './Form';
import config from "../../../config";
import { BuzzModal } from '../../Shared/Modal';

const DesignNotes = ({ date }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [submitFunc, setSubmitFunc] = useState(null);
  //const [referText, setReferText] = useState(null);

  const { sections, properties } = config.designNotes;

  useEffect(() => {
    getDesignNotes(date).then(data => {
      setData(data);
      setLoading(false);
    });
  }, [date]);

  const closeModal = () => {
    setShowModal(false);
  };

  const [editingItem, setEditingItem] = useState(null);

  // const editFunction = (item) => {
  //   console.log("It made it here", item);
  //   console.log(properties);
  //   // const modalItem = properties.reduce((acc, curr) => ({ ...acc, [curr]: item[curr] }), {});
  //   const modalItem = properties.reduce((acc, curr) => {
  //     console.log(`Processing property: ${curr}, Value: ${item[curr]}`);
  //     return { ...acc, [curr]: item[curr] };
  //   }, {});
  //   // setShowModal(true);
  //   setSubmitFunc(() => patchDesignNote(item["_id"]));
  //   setModalItem(modalItem);
  // };
  const editFunction = (item) => {
    const modalItem = properties.reduce((acc, curr) => ({
      ...acc,
      [curr]: item[curr],
    }), {});
    modalItem.section = item.section;
    modalItem._id = item._id;
    console.log("Modal Item", modalItem);
  
    setEditingItem(modalItem);
  };

  if (loading) {
    return null;
  }

  return (
    <>
      {/* {showModal && (
        <BuzzModal
          submitFunc={submitFunc}
          closeModal={closeModal}
          isOpen={showModal}
          item={modalItem}
        />
      )} */}
      <Tabs>
        <TabList>
          {sections.map(s => <Tab key={s}>{s}</Tab>)}
        </TabList>
        {sections.map(s => (
          <TabPanel key={s}>
            {CreateTable(data.filter(x => x.section === s), properties, deleteDesignNote, editFunction)}
            {/* Show edit form if editingItem matches this section */}
            {editingItem && editingItem.section === s && (
              <DesignNotesForm
                date={date}
                section={s}
                properties={properties}
                initialValues={editingItem}
              />
            )}
            {/* Show regular "Add" form if not editing */}
            {!editingItem && (
              <DesignNotesForm
                date={date}
                section={s}
                properties={properties}
              />
            )}
          </TabPanel>
        ))}
      </Tabs>
    </>
  );
};

export default DesignNotes;