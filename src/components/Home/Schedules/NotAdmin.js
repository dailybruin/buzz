import React from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

export const NotAdmin = ({data}) => (
  <ReactDataSheet
    data={data}
    overflow="wrap"
    valueRenderer={(cell) => cell.value}
    onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
    onCellsChanged={changes => {
      return null;
    }}
  />
)