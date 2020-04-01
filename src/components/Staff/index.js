import React from "react";
import { getStaff, deleteMember, stingMember } from "../../services/api";
import { CreateTable } from "../Shared/Table";
import { AddMember } from "./AddMember";

const StingText = `🐝 Buzzzzz

You’ve been stung to update something on Buzz! Take a look at https://buzz.dailybruin.com.`;

export class StaffList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
    this.transformData = this.transformData.bind(this);
    this.tagline = this.tagline.bind(this);
    this.sting = this.sting.bind(this);
  }

  componentDidMount() {
    getStaff().then(res => {
      const data = this.transformData(res);
      this.setState({
        data,
        loading: false
      })
    })
  }

  tagline(someone) {
    if (someone.twitter && someone.twitter!="") {
      return `Email ${someone.lastName} at ${someone.slug}@dailybruin.com or tweet @${someone.twitter}.`
    }
    return `Email ${someone.lastName} at ${someone.slug}@dailybruin.com.`
  }

  transformData(data) {
    return data.map(x => ({
      _id: x._id,
      name: `${x.firstName} ${x.lastName}`,
      position: x.position || "",
      twitter: x.twitter || "",
      tagline: this.tagline(x)
    }))
  }

  sting(someone) {
    stingMember(someone._id);
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <>
        <h1>Staff List</h1>
        <AddMember />
        {CreateTable(this.state.data, ["name", "position", "twitter", "tagline"], deleteMember, undefined, stingMember(StingText))}
      </>
    )
  }
}