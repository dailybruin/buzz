import React from 'react';
import "./style.css";
import { DesignNotes } from './DesignNotes';
import { CreateTable } from '../Shared/Table';
import { Modulars } from './Modulars';
import { InstagramStories } from './InstagramStories';

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
        <InstagramStories />
        <h2>Audits</h2>
        <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/spreadsheets/d/1qbUG4uckkvszNUMZbPkS1PYTr7RMHbR7PJ57ksiF8ZY/edit">Click here (new tab)</a>
        <h2>Opinion Modulars</h2>
        <Modulars />
      </>
    )
  }
}