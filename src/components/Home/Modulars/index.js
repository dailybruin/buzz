import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import "react-tabs/style/react-tabs.css";
import { Modular } from './Modular';
import config from "../../../config";

export class Modulars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modulars: Object.keys(config.modulars)
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
              <Modular category={m} fields={config.modulars[m]} date={this.props.date} />
            </TabPanel>
          ))}
      </Tabs>
    );
  }
}