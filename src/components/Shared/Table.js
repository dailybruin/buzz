import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "./Table.css"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaRegCopy } from "react-icons/fa";

export const CreateTable = (data, columns, deleteFunction, editFunction, sting) => (
  <Table>
    <Thead>
      <Tr>
        {columns.map(x =>  <Th key={x}>{x}</Th>)}
        {(deleteFunction || editFunction)
          ? (
            <Th key="actions">actions</Th>
          )
          : null}
      </Tr>
    </Thead>
    <Tbody>
      {data
      .slice()
      .sort((a, b) => {
        if (!columns.length) return 0; // Prevent sorting if no columns
    
        const firstCol = columns[0]; 
        const valA = a[firstCol] ? String(a[firstCol]).toLowerCase() : "";
        const valB = b[firstCol] ? String(b[firstCol]).toLowerCase() : "";
    
        return valA.localeCompare(valB);
      })
      .map((item, index) => {
        return (
          <Tr key={index}>
            {columns.map(property => {
              const value = item[property];
              try {
                if (property === "link" && value && new URL(value).hostname === "dailybruin.com") {
                  return (
                    <Td key={`${property}-${value}`}>
                    <a href={value} target="_blank" rel="noopener noreferrer">
                      {value}
                    </a>
                    {/* Add Copy Button for the link */}
                    <button 
                      onClick={() => navigator.clipboard.writeText(value)} 
                      style={{ marginLeft: '2px', backgroundColor: 'white', color: 'black' }}
                    >
                      <FaRegCopy />
                    </button>
                  </Td>
                  )
                }
                else if (property === "slug" && value) {
                  return (
                  <Td key={`${property}-${value}`}>
                    {value} 
                    <button onClick={() => navigator.clipboard.writeText(value)} style={{ marginLeft: '2px',backgroundColor: "white", color: "black" }}>
                    <FaRegCopy/>
                    </button>
                  </Td>)
                }
              }
              catch { }
              return (
                <Td key={`${property}-${value}`}>{value ? value : '\u00A0'}</Td>
              )
            })}
            {(deleteFunction || editFunction || sting)
              ? (<Td className="deleteTableData" key={`delete-${index}`}>
                {deleteFunction 
                ? (<span className="delete" onClick={() => deleteFunction(item["_id"]).then(() => {
                  if (window) {
                    window.location.reload();
                  }
                })}>Delete</span>)
                : null}
                {editFunction
                  ? (<span className="edit" onClick={() => editFunction(item["_id"])}>Edit</span>)
                  : null}
                {sting
                  ? (<span className="sting" onClick={() => sting(item["_id"])}>Sting</span>)
                  : null}
              </Td>)
              : null}
          </Tr>
        )
      })}
    </Tbody>
  </Table>
)
