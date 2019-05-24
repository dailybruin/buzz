import React from 'react';
import "./style.css";
import { DesignNotes } from './DesignNotes';
import { CreateTable } from '../Shared/Table';

export class Home extends React.Component {
  render() {
    return (
      <>
      <h1 className="home_header">Production for: <span className="semibold">Today, May 22, 2019</span></h1>
        <h2>Callista<span className="notbold"> is currently on shift.</span></h2>
        <p><u>View full Design schedule.</u></p>
        <h2>Design Notes</h2>
      <DesignNotes />
        <h2>Instagram Stories</h2>
      {CreateTable([{"caption": "hi this is a cool person"}, {"caption": "hoohoo they are cool"}], ["caption"])}
      </>
    )
  }
}