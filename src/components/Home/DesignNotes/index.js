import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import "react-tabs/style/react-tabs.css";
import { CreateTable } from "../../Shared/Table";
import { getDesignNotes } from '../../../services/api';
import { DesignNotesForm } from './Form';


export class DesignNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      sections: ["news", "opinion", "sports", "arts", "inserts"],
      properties: ["placement", "slug", "section"]
    }
  };

  componentDidMount() {
    getDesignNotes().then(data => this.setState({ data, loading: false }))
  };

  render() {
    if (this.state.loading) {
      return null;
    }
    console.log(this.state.data)
    return (
      <>
        <Tabs>
          <TabList>
            {this.state.sections.map(s => <Tab key={s}>{s}</Tab>)}
          </TabList>

          {this.state.sections.map(s => (
            <TabPanel key={s}>
              {CreateTable(this.state.data.filter(x => x.section === s), this.state.properties)}
            </TabPanel>
            ))}
        </Tabs>
        <DesignNotesForm properties={this.state.properties} />
      </>
    );
  }
}