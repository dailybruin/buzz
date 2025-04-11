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
  const [tabIndex, setTabIndex] = useState(() => {
    // Initialize tab index from localStorage or default to 0
    const savedTab = localStorage.getItem("designNotesTab");
    return savedTab ? parseInt(savedTab) : 0;
  });
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

  const editFunction = (item) => {
    const modalItem = properties.reduce((acc, curr) => ({
      ...acc,
      [curr]: item[curr],
    }), {});
    modalItem.section = item.section;
    modalItem._id = item._id;
    setEditingItem(modalItem);
  };

  if (loading) {
    return null;
  }



  return (
    <>
    {/* <Tabs
        selectedIndex={tabIndex}
        onSelect={(index) => {
          setTabIndex(index);
          localStorage.setItem("designNotesTab", index);
        }}
      >
        <TabList>
          {sections.map(s => <Tab key={s}>{s}</Tab>)}
        </TabList> */}
      <Tabs
              selectedIndex={tabIndex}
              onSelect={(index) => {
                setTabIndex(index);
                localStorage.setItem("designNotesTab", index);
                // Clear editing state when changing tabs
                setEditingItem(null);
              }}
      >
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