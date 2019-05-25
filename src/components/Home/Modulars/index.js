import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import "react-tabs/style/react-tabs.css";
import { Modular } from './Modular';

const config = {
  "Public comment": ["name", "position", "comment", "explainer"],
  "Comments from the web": ["comment", "username", "section", "headline"],
  "USAC Comment": ["name", "position", "comment", "explainer"],
  "Twitter" : [],
  "OpinionHasOpinions": [],
  "TBT Refer": [],
  "TDTY": [],
  "Stonewall": []
};

export class Modulars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modulars: ["Public comment", "Comments from the web", "USAC Comment", "Twitter", "OpinionHasOpinions", "TBT Refer", "TDTY", "Stonewall"]
    }
  }

  render() {
    return (
      <Tabs>
        <TabList>
          {this.state.modulars.map(m => <Tab key={m}>{m}</Tab>)}
        </TabList>

          {this.state.modulars.map(m => (
            <TabPanel key={m}>
              <Modular category={m} fields={config[m]} />
            </TabPanel>
          ))}
      </Tabs>
    );
  }
}