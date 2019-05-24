import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export const CreateTable = (data, columns) => (
  <Table>
    <Thead>
      <Tr>
        {columns.map(x =>  <Th key={x}>{x}</Th>)}
      </Tr>
    </Thead>
    <Tbody>
      {data.map((item, index) => {
        return (
          <Tr key={index}>
            {columns.map(property => {
              return (
                <Td key={`${property}-${item[property.toLowerCase()]}`}>{item[property.toLowerCase()]}</Td>
              )
            })}
          </Tr>
        )
      })}
    </Tbody>
  </Table>
)