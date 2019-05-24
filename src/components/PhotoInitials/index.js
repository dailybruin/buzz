import React from 'react';
import { CreateTable } from '../Shared/Table';

export class PhotoInitials extends React.Component {
  render() {
    return (
      <>
        <h1>Photo Initials</h1>
        {CreateTable([{ "initials": "ADX", "name": "Amy Dixon", "title": "Daily Bruin Senior Staff" }], ["initials", "name", "title"])}
      </>
    )
  }
}