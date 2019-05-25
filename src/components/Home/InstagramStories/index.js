import React from 'react';
import { CreateTable } from '../../Shared/Table';

export class InstagramStories extends React.Component {
  render() {
    return CreateTable([{ "caption": "hi this is a cool person"}, { "caption": "hoohoo they are cool"}], ["caption"])
  }
}