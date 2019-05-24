import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export const CreateTable = (data, columns) => (
  <Table>
    <Thead>
      <Tr>
        {columns.map(x =>  <Th>{x}</Th>)}
      </Tr>
    </Thead>
    <Tbody>
      {data.map(item => {
        return (
          <Tr>
            {columns.map(property => {
              return (
                <Td>{item[property.toLowerCase()]}</Td>
              )
            })}
          </Tr>
        )
      })}
    </Tbody>
  </Table>
)