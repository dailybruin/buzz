import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AnimateHeight from "react-animate-height";

import "react-tabs/style/react-tabs.css";
import { CreateTable } from "../Shared/Table";

let myTable = CreateTable([{ "placement": "A", "slug": "news.measles" }, { "placement": "B", "slug": "op.measles" }, { "placement": "CP", "slug": "op.measles" }], ["placement", "slug"]);

class ActualForm extends React.Component {
  render() {
    return (
      <div>
        <div>
          <label for="placement">Placement</label>
          <input name="placement"></input>
        </div>
        <div>
          <label for="slug">Slug</label>
          <input name="slug"></input>
        </div>
        <div>
          <label for="art">Art/Flag</label>
          <input name="art"></input>
        </div>
        <div>
          <label for="count">Word Count</label>
          <input name="count"></input>
        </div>
        <div>
          <label for="status">Status</label>
          <input name="status"></input>
        </div>
        <button>+ Create</button>
      </div>
    )
  }
}

class NotesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div>
      <div onClick={() => this.setState({ open: !this.state.open })}>
          <p><u>{this.state.open ? "Close Form" : "Open Form"}</u></p>
        </div>
        <AnimateHeight height={this.state.open ? "auto" : 0}>
          <div style={{
            border: "1px solid black",
            padding: "1.5em 1em"
          }}>
            <ActualForm />
          </div>
        </AnimateHeight>
      </div>
    )
  }
}

export class DesignNotes extends React.Component {
  render() {
    return (
      <>
      <Tabs>
        <TabList>
          <Tab>News</Tab>
          <Tab>Opinion</Tab>
          <Tab>Arts</Tab>
          <Tab>Inserts</Tab>
        </TabList>

        <TabPanel>
            {myTable}
        </TabPanel>
        <TabPanel>
            {CreateTable([{ "placement": "A", "slug": "op.measles" }, { "placement": "B", "slug": "op.measles" }, { "placement": "CP", "slug": "op.measles" }], ["placement", "slug"])}
        </TabPanel>
        <TabPanel>
            {myTable}
        </TabPanel>
        <TabPanel>
            {myTable}
        </TabPanel>
      </Tabs>
      <NotesForm />
      </>
    );
  }
}