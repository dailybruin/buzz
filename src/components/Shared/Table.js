import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export const CreateTable = (data, columns, deleteFunction) => (
  <Table>
    <Thead>
      <Tr>
        {columns.map(x =>  <Th key={x}>{x}</Th>)}
        {deleteFunction
          ? (
            <Th key="actions">actions</Th>
          )
          : null}
      </Tr>
    </Thead>
    <Tbody>
      {data.map((item, index) => {
        console.log(data);
        return (
          <Tr key={index}>
            {columns.map(property => {
              return (
                <Td key={`${property}-${item[property]}`}>{item[property] ? item[property] : '\u00A0'}</Td>
              )
            })}
            {deleteFunction 
              ? (<Td className="deleteTableData" key={`delete-${index}`}>
                <span className="deleteButton" onClick={() => deleteFunction(item["_id"]).then(() => {
                  if (window) {
                    window.location.reload();
                  }
                })}>Delete</span>
              </Td>)
              : null}
          </Tr>
        )
      })}
    </Tbody>
  </Table>
)